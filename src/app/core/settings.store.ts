import { computed, effect, Injectable, signal } from '@angular/core';
import { FAMILIES, FamilyId, SONS } from '../data/sons';

export type Mode = 'entrainement' | 'decouverte';

interface PersistedSettings {
  enabledIds: string[];
  mode: Mode;
  rate: number;
  voiceURI: string | null;
}

const STORAGE_KEY = 'sons-amoureux.settings.v1';

function defaults(): PersistedSettings {
  const enabledFamilies = new Set(FAMILIES.filter((f) => f.defaultEnabled).map((f) => f.id));
  return {
    enabledIds: SONS.filter((s) => enabledFamilies.has(s.family)).map((s) => s.id),
    mode: 'entrainement',
    rate: 0.8,
    voiceURI: null,
  };
}

function load(): PersistedSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw) as Partial<PersistedSettings>;
    const known = new Set(SONS.map((s) => s.id));
    return {
      ...defaults(),
      ...parsed,
      enabledIds: (parsed.enabledIds ?? defaults().enabledIds).filter((id) => known.has(id)),
    };
  } catch {
    return defaults();
  }
}

export type FamilyState = 'all' | 'some' | 'none';

@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private readonly initial = load();

  readonly enabledIds = signal<ReadonlySet<string>>(new Set(this.initial.enabledIds));
  readonly mode = signal<Mode>(this.initial.mode);
  readonly rate = signal<number>(this.initial.rate);
  readonly voiceURI = signal<string | null>(this.initial.voiceURI);

  /** Sons sélectionnés, dans l'ordre de la liste. */
  readonly selected = computed(() => SONS.filter((s) => this.enabledIds().has(s.id)));

  constructor() {
    effect(() => {
      const data: PersistedSettings = {
        enabledIds: [...this.enabledIds()],
        mode: this.mode(),
        rate: this.rate(),
        voiceURI: this.voiceURI(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        /* stockage indisponible : on garde en mémoire */
      }
    });
  }

  isEnabled(id: string): boolean {
    return this.enabledIds().has(id);
  }

  toggle(id: string): void {
    this.enabledIds.update((set) => {
      const next = new Set(set);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  familyState(family: FamilyId): FamilyState {
    const ids = SONS.filter((s) => s.family === family).map((s) => s.id);
    const on = ids.filter((id) => this.enabledIds().has(id)).length;
    return on === 0 ? 'none' : on === ids.length ? 'all' : 'some';
  }

  toggleFamily(family: FamilyId): void {
    const ids = SONS.filter((s) => s.family === family).map((s) => s.id);
    const enable = this.familyState(family) !== 'all';
    this.enabledIds.update((set) => {
      const next = new Set(set);
      for (const id of ids) {
        if (enable) next.add(id);
        else next.delete(id);
      }
      return next;
    });
  }

  selectAll(): void {
    this.enabledIds.set(new Set(SONS.map((s) => s.id)));
  }

  reset(): void {
    const d = defaults();
    this.enabledIds.set(new Set(d.enabledIds));
    this.mode.set(d.mode);
    this.rate.set(d.rate);
    this.voiceURI.set(d.voiceURI);
  }
}
