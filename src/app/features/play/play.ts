import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SessionStore } from '../../core/session.store';
import { SettingsStore } from '../../core/settings.store';
import { SpeechService } from '../../core/speech.service';
import { plainWord, tapeOf } from '../../data/sons';
import { RoughCircle } from '../../shared/rough-circle';
import { Word } from '../../shared/word';

@Component({
  selector: 'app-play',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Word, RoughCircle, NgTemplateOutlet],
  templateUrl: './play.html',
  host: { '(document:keydown)': 'onKey($event)' },
})
export class Play {
  protected readonly session = inject(SessionStore);
  protected readonly speech = inject(SpeechService);
  private readonly settings = inject(SettingsStore);

  protected readonly card = this.session.card;
  protected readonly tape = computed(() => {
    const c = this.card();
    return c ? tapeOf(c) : 'rose';
  });

  /** Verso visible : retourné en mode entraînement, toujours en mode découverte. */
  protected readonly showBack = computed(
    () => this.settings.mode() === 'decouverte' || this.session.revealed(),
  );
  protected readonly flippable = computed(() => this.settings.mode() === 'entrainement');

  /** Habit tracker : un rond par carte du paquet. */
  protected readonly dots = computed(() => {
    const { done, total } = this.session.progress();
    return Array.from({ length: total }, (_, i) => i < done);
  });

  protected flip(): void {
    if (this.flippable() && !this.session.revealed()) this.session.reveal();
  }

  protected say(): void {
    const c = this.card();
    if (c) this.speech.speak(c.say);
  }

  protected sayWord(word: string): void {
    this.speech.speak(plainWord(word));
  }

  protected answer(known: boolean): void {
    this.speech.stop();
    this.session.answer(known);
  }

  protected onKey(e: KeyboardEvent): void {
    if (e.target instanceof HTMLElement && e.target.closest('button, input, select')) {
      if (e.key === ' ' || e.key === 'Enter') return;
    }
    if (!this.showBack()) {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.flip();
      }
      return;
    }
    if (e.key === 'ArrowRight') this.answer(true);
    else if (e.key === 'ArrowLeft') this.answer(false);
    else if (e.key.toLowerCase() === 's') this.say();
  }
}
