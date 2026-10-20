import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SessionStore } from '../../core/session.store';
import { SettingsStore } from '../../core/settings.store';
import { tapeOf } from '../../data/sons';
import { RoughCircle } from '../../shared/rough-circle';

@Component({
  selector: 'app-done',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RoughCircle],
  template: `
    <main class="mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center gap-8 px-4 py-10 text-center">
      <div class="flex flex-col items-center gap-3">
        <span class="text-6xl" aria-hidden="true">🌟</span>
        <h1 class="font-display text-6xl font-black text-ochre" appRoughCircle>Bravo !</h1>
        <p class="mt-3 font-hand text-3xl">
          Tu as lu {{ total() }} {{ total() > 1 ? 'sons amoureux' : 'son amoureux' }} !
        </p>
      </div>

      @if (session.toReview().length) {
        <section class="index-card w-full p-5 text-left" aria-labelledby="revoir">
          <h2 id="revoir" class="font-hand text-3xl">Ceux qui ont demandé un peu plus d'essais</h2>
          <ul class="mt-3 flex flex-col gap-2" role="list">
            @for (item of session.toReview(); track item.son.id) {
              <li class="flex items-center justify-between border-b border-dashed border-dot pb-1">
                <span class="font-read text-3xl font-bold" [class]="'hl-' + tape(item.son)">
                  {{ item.son.graphemes.join(' · ') }}
                </span>
                <span class="font-hand text-2xl tracking-widest text-pen" [attr.aria-label]="item.count + ' essais en plus'">
                  {{ tally(item.count) }}
                </span>
              </li>
            }
          </ul>
        </section>
      } @else {
        <p class="font-hand text-2xl text-sage">Tout du premier coup, quelle championne ! ✨</p>
      }

      <div class="flex w-full flex-col gap-3">
        @if (session.toReview().length) {
          <button type="button" class="btn-ink bg-rose-soft" (click)="replayHard()">Rejouer les sons difficiles</button>
        }
        <button type="button" class="btn-ink bg-ochre" (click)="replayAll()">Rejouer tout</button>
        <button type="button" class="btn-ink bg-white" (click)="session.quit()">Choisir d'autres sons</button>
      </div>
    </main>
  `,
})
export class Done {
  protected readonly session = inject(SessionStore);
  private readonly settings = inject(SettingsStore);

  protected readonly total = computed(() => this.session.progress().total);
  protected readonly tape = tapeOf;

  /** Bâtonnets façon bullet journal : |||| barré tous les 5. */
  protected tally(n: number): string {
    return '𝍸'.repeat(Math.floor(n / 5)) + '|'.repeat(n % 5);
  }

  protected replayHard(): void {
    this.session.start(this.session.toReview().map((r) => r.son.id));
  }

  protected replayAll(): void {
    this.session.start(this.settings.selected().map((s) => s.id));
  }
}
