import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SessionStore } from './core/session.store';
import { Done } from './features/done/done';
import { Play } from './features/play/play';
import { Setup } from './features/setup/setup';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Setup, Play, Done],
  template: `
    @switch (session.view()) {
      @case ('setup') { <app-setup /> }
      @case ('play') { <app-play /> }
      @case ('done') { <app-done /> }
    }
  `,
})
export class App {
  protected readonly session = inject(SessionStore);
}
