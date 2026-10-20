/**
 * Les « sons amoureux » : des lettres qui, ensemble, font un seul son.
 *
 * - `examples[].word` : le son est entouré de crochets, ex. `l[ou]p`.
 */

export type FamilyId = 'voyelles' | 'consonnes' | 'mouilles' | 'bonus';
export type Tape = 'rose' | 'sage' | 'ochre' | 'taupe';

export interface Family {
  readonly id: FamilyId;
  readonly label: string;
  readonly description: string;
  readonly defaultEnabled: boolean;
  readonly tape: Tape;
}

export interface Example {
  /** Déterminant affiché et lu devant le mot (absent pour les mots qui ne sont pas des noms). */
  readonly det?: string;
  readonly word: string;
}

export interface Son {
  readonly id: string;
  readonly graphemes: readonly string[];
  readonly family: FamilyId;
  /** Comment ça se dit, à l'écrit, pour l'adulte. */
  readonly sound: string;
  readonly hint?: string;
  readonly examples: readonly Example[];
}

export const FAMILIES: readonly Family[] = [
  {
    id: 'voyelles',
    label: 'Voyelles amoureuses',
    description: 'ou, on, an, oi, ai, eau…',
    defaultEnabled: true,
    tape: 'rose',
  },
  {
    id: 'consonnes',
    label: 'Consonnes amoureuses',
    description: 'ch, ph, gn, qu, gu',
    defaultEnabled: true,
    tape: 'sage',
  },
  {
    id: 'mouilles',
    label: 'Sons mouillés',
    description: 'ill, ail, eil, euil, ouil',
    defaultEnabled: true,
    tape: 'ochre',
  },
  {
    id: 'bonus',
    label: 'Bonus',
    description: 'th, et',
    defaultEnabled: false,
    tape: 'taupe',
  },
];

export const SONS: readonly Son[] = [
  // ——— Voyelles amoureuses ———
  { id: 'ou', graphemes: ['ou'], family: 'voyelles', sound: 'ou',
    examples: [{ det: 'un', word: 'l[ou]p' }, { det: 'un', word: 'ch[ou]' }] },
  { id: 'oi', graphemes: ['oi'], family: 'voyelles', sound: 'oua',
    examples: [{ det: 'un', word: 'r[oi]' }, { det: 'une', word: 'ét[oi]le' }] },
  { id: 'on', graphemes: ['on', 'om'], family: 'voyelles', sound: 'on',
    hint: 'Devant m, b, p, on écrit « om ».',
    examples: [{ det: 'un', word: 'b[on]b[on]' }, { det: 'un', word: 'p[om]pier' }] },
  { id: 'an', graphemes: ['an', 'am'], family: 'voyelles', sound: 'an',
    hint: 'Devant m, b, p, on écrit « am ».',
    examples: [{ word: 'mam[an]' }, { det: 'une', word: 'l[am]pe' }] },
  { id: 'en', graphemes: ['en', 'em'], family: 'voyelles', sound: 'an',
    hint: 'Attention, piège : se dit comme « an » !',
    examples: [{ det: 'une', word: 'd[en]t' }, { det: 'une', word: 't[em]pête' }] },
  { id: 'in', graphemes: ['in', 'im'], family: 'voyelles', sound: 'in',
    examples: [{ det: 'un', word: 'lap[in]' }, { det: 'un', word: 't[im]bre' }] },
  { id: 'ain', graphemes: ['ain', 'aim'], family: 'voyelles', sound: 'in',
    hint: 'Se dit comme « in ».',
    examples: [{ det: 'un', word: 'p[ain]' }, { word: 'f[aim]' }] },
  { id: 'ein', graphemes: ['ein'], family: 'voyelles', sound: 'in',
    hint: 'Se dit comme « in ».',
    examples: [{ det: 'la', word: 'p[ein]ture' }, { det: 'un', word: 'fr[ein]' }] },
  { id: 'un', graphemes: ['un', 'um'], family: 'voyelles', sound: 'un',
    examples: [{ word: 'l[un]di' }, { det: 'un', word: 'parf[um]' }] },
  { id: 'oin', graphemes: ['oin'], family: 'voyelles', sound: 'ouin',
    examples: [{ word: 'c[oin] c[oin]' }, { det: 'un', word: 'p[oin]g' }] },
  { id: 'ien', graphemes: ['ien'], family: 'voyelles', sound: 'i-in',
    examples: [{ det: 'un', word: 'ch[ien]' }, { word: 'b[ien]' }] },
  { id: 'ai', graphemes: ['ai'], family: 'voyelles', sound: 'è',
    examples: [{ det: 'une', word: 'm[ai]son' }, { det: 'le', word: 'l[ai]t' }] },
  { id: 'ei', graphemes: ['ei'], family: 'voyelles', sound: 'è',
    hint: 'Se dit comme « ai ».',
    examples: [{ det: 'la', word: 'n[ei]ge' }, { det: 'une', word: 'bal[ei]ne' }] },
  { id: 'au', graphemes: ['au'], family: 'voyelles', sound: 'o',
    examples: [{ word: 'j[au]ne' }, { det: 'une', word: '[au]to' }] },
  { id: 'eau', graphemes: ['eau'], family: 'voyelles', sound: 'o',
    hint: 'Trois lettres pour un seul son : « o ».',
    examples: [{ det: 'un', word: 'bat[eau]' }, { det: 'un', word: 'gât[eau]' }] },
  { id: 'eu', graphemes: ['eu'], family: 'voyelles', sound: 'eu',
    examples: [{ det: 'le', word: 'f[eu]' }, { det: 'une', word: 'fl[eu]r' }] },
  { id: 'oeu', graphemes: ['œu'], family: 'voyelles', sound: 'eu',
    hint: 'Le o et le e sont collés : se dit comme « eu ».',
    examples: [{ det: 'un', word: 'c[œu]r' }, { det: 'un', word: '[œu]f' }] },
  { id: 'er', graphemes: ['er', 'ez'], family: 'voyelles', sound: 'é',
    hint: 'À la fin du mot.',
    examples: [{ det: 'un', word: 'n[ez]' }, { det: 'un', word: 'boulang[er]' }] },

  // ——— Consonnes amoureuses ———
  { id: 'ch', graphemes: ['ch'], family: 'consonnes', sound: 'ch',
    examples: [{ det: 'un', word: '[ch]at' }, { det: 'une', word: 'va[ch]e' }] },
  { id: 'ph', graphemes: ['ph'], family: 'consonnes', sound: 'f',
    hint: 'Se dit comme « f ».',
    examples: [{ det: 'une', word: '[ph]oto' }, { det: 'un', word: 'dau[ph]in' }] },
  { id: 'gn', graphemes: ['gn'], family: 'consonnes', sound: 'gn',
    examples: [{ det: 'une', word: 'monta[gn]e' }, { det: 'une', word: 'arai[gn]ée' }] },
  { id: 'qu', graphemes: ['qu'], family: 'consonnes', sound: 'k',
    hint: 'Le u ne se dit pas.',
    examples: [{ word: '[qu]atre' }, { det: 'une', word: 'co[qu]ille' }] },
  { id: 'gu', graphemes: ['gu'], family: 'consonnes', sound: 'g',
    hint: 'Devant e, i : le u ne se dit pas.',
    examples: [{ det: 'une', word: '[gu]itare' }, { det: 'une', word: 'ba[gu]e' }] },

  // ——— Sons mouillés ———
  { id: 'ill', graphemes: ['ill', 'ille'], family: 'mouilles', sound: 'ill (iye)',
    examples: [{ det: 'une', word: 'f[ille]' }, { det: 'un', word: 'pap[ill]on' }] },
  { id: 'ail', graphemes: ['ail', 'aille'], family: 'mouilles', sound: 'aïe',
    examples: [{ det: 'un', word: 'trav[ail]' }, { det: 'une', word: 'p[aille]' }] },
  { id: 'eil', graphemes: ['eil', 'eille'], family: 'mouilles', sound: 'èye',
    examples: [{ det: 'un', word: 'sol[eil]' }, { det: 'une', word: 'ab[eille]' }] },
  { id: 'euil', graphemes: ['euil', 'euille'], family: 'mouilles', sound: 'euye',
    examples: [{ det: 'un', word: 'écur[euil]' }, { det: 'une', word: 'f[euille]' }] },
  { id: 'ouil', graphemes: ['ouil', 'ouille'], family: 'mouilles', sound: 'ouye',
    examples: [{ det: 'une', word: 'gren[ouille]' }, { det: 'une', word: 'citr[ouille]' }] },

  // ——— Bonus ———
  { id: 'th', graphemes: ['th'], family: 'bonus', sound: 't',
    hint: 'Le h ne se dit pas.',
    examples: [{ det: 'un', word: '[th]é' }, { det: 'un', word: '[th]on' }] },
  { id: 'et', graphemes: ['et'], family: 'bonus', sound: 'è',
    hint: 'À la fin du mot.',
    examples: [{ det: 'un', word: 'poul[et]' }, { det: 'un', word: 'jou[et]' }] },
];

export const FAMILY_BY_ID: ReadonlyMap<FamilyId, Family> = new Map(FAMILIES.map((f) => [f.id, f]));

export function tapeOf(son: Son): Tape {
  return FAMILY_BY_ID.get(son.family)?.tape ?? 'rose';
}

export const SONS_BY_ID: ReadonlyMap<string, Son> = new Map(SONS.map((s) => [s.id, s]));

export interface WordPart {
  readonly text: string;
  readonly highlight: boolean;
}

/** `l[ou]p` → [{l}, {ou*}, {p}] */
export function parseWord(word: string): WordPart[] {
  const parts: WordPart[] = [];
  const re = /\[([^\]]+)\]|([^[]+)/g;
  for (const m of word.matchAll(re)) {
    if (m[1] !== undefined) parts.push({ text: m[1], highlight: true });
    else if (m[2] !== undefined) parts.push({ text: m[2], highlight: false });
  }
  return parts;
}

export function plainWord(word: string): string {
  return word.replace(/[[\]]/g, '');
}
