import { computed, inject, Injectable, signal } from '@angular/core';
import { SettingsStore } from './settings.store';

/** Synthèse vocale du navigateur (Web Speech API), en français. */
@Injectable({ providedIn: 'root' })
export class SpeechService {
  private readonly settings = inject(SettingsStore);
  private readonly synth: SpeechSynthesis | null =
    typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

  readonly supported = this.synth !== null;
  readonly voices = signal<SpeechSynthesisVoice[]>([]);
  readonly speaking = signal(false);

  /** Voix françaises, Belgique d'abord. */
  readonly frenchVoices = computed(() =>
    this.voices()
      .filter((v) => v.lang.toLowerCase().startsWith('fr'))
      .sort((a, b) => score(b) - score(a)),
  );

  readonly activeVoice = computed<SpeechSynthesisVoice | null>(() => {
    const wanted = this.settings.voiceURI();
    const list = this.frenchVoices();
    return list.find((v) => v.voiceURI === wanted) ?? list[0] ?? null;
  });

  constructor() {
    if (!this.synth) return;
    const refresh = () => this.voices.set(this.synth?.getVoices() ?? []);
    refresh();
    this.synth.addEventListener('voiceschanged', refresh);
  }

  speak(text: string): void {
    if (!this.synth) return;
    this.synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = this.activeVoice();
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? 'fr-BE';
    u.rate = this.settings.rate();
    u.pitch = 1.05;
    u.onstart = () => this.speaking.set(true);
    u.onend = u.onerror = () => this.speaking.set(false);
    this.synth.speak(u);
  }

  stop(): void {
    this.synth?.cancel();
    this.speaking.set(false);
  }
}

function score(v: SpeechSynthesisVoice): number {
  const lang = v.lang.toLowerCase();
  let s = 0;
  if (lang === 'fr-be') s += 4;
  else if (lang === 'fr-fr') s += 3;
  // Les voix « naturelles » / en ligne sont nettement meilleures (Edge, Chrome, iOS).
  if (/natural|online|neural|premium|enhanced|google/i.test(v.name)) s += 2;
  if (v.localService) s += 0.5;
  return s;
}
