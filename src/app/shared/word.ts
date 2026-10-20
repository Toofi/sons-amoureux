import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { parseWord, Tape } from '../data/sons';

/** Affiche un mot avec le son amoureux mis en couleur : l[ou]p → l<b>ou</b>p */
@Component({
  selector: 'app-word',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@for (part of parts(); track $index) {
    @if (part.highlight) {
      <span class="font-bold underline decoration-2 underline-offset-4" [class]="'hl-' + tape()">{{
        part.text
      }}</span>
    } @else {
      <span>{{ part.text }}</span>
    }
  }`,
})
export class Word {
  readonly word = input.required<string>();
  readonly tape = input<Tape>('rose');
  protected readonly parts = computed(() => parseWord(this.word()));
}
