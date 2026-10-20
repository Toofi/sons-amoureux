import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SessionStore } from '../../core/session.store';
import { SettingsStore } from '../../core/settings.store';
import { SpeechService } from '../../core/speech.service';
import { FAMILIES, SONS } from '../../data/sons';

@Component({
  selector: 'app-setup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './setup.html',
})
export class Setup {
  protected readonly settings = inject(SettingsStore);
  protected readonly speech = inject(SpeechService);
  private readonly session = inject(SessionStore);

  protected readonly families = FAMILIES.map((family) => ({
    family,
    sons: SONS.filter((s) => s.family === family.id),
  }));

  protected readonly count = computed(() => this.settings.selected().length);

  protected start(): void {
    this.session.start(this.settings.selected().map((s) => s.id));
  }

  protected onVoice(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.settings.voiceURI.set(value || null);
  }

  protected onRate(event: Event): void {
    this.settings.rate.set(Number((event.target as HTMLInputElement).value));
  }

  protected testVoice(): void {
    this.speech.speak('Bonjour ! On, comme dans bonbon.');
  }
}
