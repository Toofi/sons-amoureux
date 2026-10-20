import { computed, Injectable, signal } from '@angular/core';
import { SONS_BY_ID, Son } from '../data/sons';
import { createDeck, current, DeckState, fail, isFinished, pass } from './deck';

export type View = 'setup' | 'play' | 'done';

@Injectable({ providedIn: 'root' })
export class SessionStore {
  readonly view = signal<View>('setup');
  readonly deck = signal<DeckState>(createDeck([]));
  readonly revealed = signal(false);

  readonly card = computed<Son | null>(() => {
    const id = current(this.deck());
    return id ? (SONS_BY_ID.get(id) ?? null) : null;
  });

  readonly progress = computed(() => ({
    done: this.deck().done.length,
    total: this.deck().total,
  }));

  /** Sons qui ont demandé au moins un essai de plus, du plus raté au moins raté. */
  readonly toReview = computed(() =>
    Object.entries(this.deck().misses)
      .sort((a, b) => b[1] - a[1])
      .map(([id, count]) => ({ son: SONS_BY_ID.get(id)!, count })),
  );

  start(ids: readonly string[]): void {
    if (ids.length === 0) return;
    this.deck.set(createDeck(ids));
    this.revealed.set(false);
    this.view.set('play');
  }

  reveal(): void {
    this.revealed.set(true);
  }

  answer(known: boolean): void {
    this.deck.update((d) => (known ? pass(d) : fail(d)));
    this.revealed.set(false);
    if (isFinished(this.deck())) this.view.set('done');
  }

  quit(): void {
    this.view.set('setup');
  }
}
