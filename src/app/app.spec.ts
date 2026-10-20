import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { SessionStore } from './core/session.store';
import { SettingsStore } from './core/settings.store';
import { SONS } from './data/sons';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it("affiche l'écran de choix des sons", async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Sons amoureux');
  });

  it('par défaut, tout est sélectionné sauf le bonus', () => {
    const settings = TestBed.inject(SettingsStore);
    expect(settings.selected().length).toBe(SONS.filter((s) => s.family !== 'bonus').length);
    expect(settings.familyState('bonus')).toBe('none');
  });

  it('filtrer une famille retire ses sons du paquet', () => {
    const settings = TestBed.inject(SettingsStore);
    settings.toggleFamily('mouilles');
    expect(settings.selected().some((s) => s.family === 'mouilles')).toBe(false);
  });

  it('une partie se termine quand toutes les cartes sont validées', () => {
    const session = TestBed.inject(SessionStore);
    session.start(['ou', 'on']);
    expect(session.view()).toBe('play');
    session.answer(false);
    session.answer(true);
    session.answer(true);
    expect(session.view()).toBe('done');
    expect(session.toReview().length).toBe(1);
  });
});
