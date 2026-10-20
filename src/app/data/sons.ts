/**
 * Les « sons amoureux » : des lettres qui, ensemble, font un seul son.
 *
 * - `examples[].word` : le son est entouré de crochets, ex. `l[ou]p`.
 * - `say` : ce que la synthèse vocale lit pour faire entendre le son isolé.
 *   Les moteurs TTS lisent mal certains graphèmes seuls (« ch » épelé, « eu » lu [y]…),
 *   d'où une orthographe adaptée. À ajuster ici si une voix prononce mal.
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
  readonly word: string;
  readonly emoji: string;
}

export interface Son {
  readonly id: string;
  readonly graphemes: readonly string[];
  readonly family: FamilyId;
  /** Comment ça se dit, à l'écrit, pour l'adulte. */
  readonly sound: string;
  /** Texte envoyé à la synthèse vocale. */
  readonly say: string;
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
  { id: 'ou', graphemes: ['ou'], family: 'voyelles', sound: 'ou', say: 'ou',
    examples: [{ word: 'l[ou]p', emoji: '🐺' }, { word: 'ch[ou]', emoji: '🥬' }] },
  { id: 'oi', graphemes: ['oi'], family: 'voyelles', sound: 'oua', say: 'oua',
    examples: [{ word: 'r[oi]', emoji: '👑' }, { word: 'ét[oi]le', emoji: '⭐' }] },
  { id: 'on', graphemes: ['on', 'om'], family: 'voyelles', sound: 'on', say: 'on',
    hint: 'Devant m, b, p, on écrit « om ».',
    examples: [{ word: 'b[on]b[on]', emoji: '🍬' }, { word: 'p[om]pier', emoji: '🚒' }] },
  { id: 'an', graphemes: ['an', 'am'], family: 'voyelles', sound: 'an', say: 'an',
    hint: 'Devant m, b, p, on écrit « am ».',
    examples: [{ word: 'mam[an]', emoji: '👩' }, { word: 'l[am]pe', emoji: '💡' }] },
  { id: 'en', graphemes: ['en', 'em'], family: 'voyelles', sound: 'an', say: 'an',
    hint: 'Attention, piège : se dit comme « an » !',
    examples: [{ word: 'd[en]t', emoji: '🦷' }, { word: 't[em]pête', emoji: '⛈️' }] },
  { id: 'in', graphemes: ['in', 'im'], family: 'voyelles', sound: 'in', say: 'hein',
    examples: [{ word: 'lap[in]', emoji: '🐰' }, { word: 't[im]bre', emoji: '✉️' }] },
  { id: 'ain', graphemes: ['ain', 'aim'], family: 'voyelles', sound: 'in', say: 'hein',
    hint: 'Se dit comme « in ».',
    examples: [{ word: 'p[ain]', emoji: '🍞' }, { word: 'f[aim]', emoji: '😋' }] },
  { id: 'ein', graphemes: ['ein'], family: 'voyelles', sound: 'in', say: 'hein',
    hint: 'Se dit comme « in ».',
    examples: [{ word: 'p[ein]ture', emoji: '🎨' }, { word: 'fr[ein]', emoji: '🚲' }] },
  { id: 'un', graphemes: ['un', 'um'], family: 'voyelles', sound: 'un', say: 'un',
    examples: [{ word: 'l[un]di', emoji: '📅' }, { word: 'parf[um]', emoji: '🌸' }] },
  { id: 'oin', graphemes: ['oin'], family: 'voyelles', sound: 'ouin', say: 'ouin',
    examples: [{ word: 'c[oin] c[oin]', emoji: '🦆' }, { word: 'p[oin]g', emoji: '✊' }] },
  { id: 'ien', graphemes: ['ien'], family: 'voyelles', sound: 'i-in', say: 'i-hein',
    examples: [{ word: 'ch[ien]', emoji: '🐶' }, { word: 'b[ien]', emoji: '👍' }] },
  { id: 'ai', graphemes: ['ai'], family: 'voyelles', sound: 'è', say: 'ait',
    examples: [{ word: 'm[ai]son', emoji: '🏠' }, { word: 'l[ai]t', emoji: '🥛' }] },
  { id: 'ei', graphemes: ['ei'], family: 'voyelles', sound: 'è', say: 'ait',
    hint: 'Se dit comme « ai ».',
    examples: [{ word: 'n[ei]ge', emoji: '❄️' }, { word: 'bal[ei]ne', emoji: '🐳' }] },
  { id: 'au', graphemes: ['au'], family: 'voyelles', sound: 'o', say: 'au',
    examples: [{ word: 'j[au]ne', emoji: '💛' }, { word: '[au]to', emoji: '🚗' }] },
  { id: 'eau', graphemes: ['eau'], family: 'voyelles', sound: 'o', say: 'eau',
    hint: 'Trois lettres pour un seul son : « o ».',
    examples: [{ word: 'bat[eau]', emoji: '⛵' }, { word: 'gât[eau]', emoji: '🎂' }] },
  { id: 'eu', graphemes: ['eu'], family: 'voyelles', sound: 'eu', say: 'euh',
    examples: [{ word: 'f[eu]', emoji: '🔥' }, { word: 'fl[eu]r', emoji: '🌼' }] },
  { id: 'oeu', graphemes: ['œu'], family: 'voyelles', sound: 'eu', say: 'euh',
    hint: 'Le o et le e sont collés : se dit comme « eu ».',
    examples: [{ word: 'c[œu]r', emoji: '❤️' }, { word: '[œu]f', emoji: '🥚' }] },
  { id: 'er', graphemes: ['er', 'ez'], family: 'voyelles', sound: 'é', say: 'et',
    hint: 'À la fin du mot.',
    examples: [{ word: 'n[ez]', emoji: '👃' }, { word: 'boulang[er]', emoji: '🥖' }] },

  // ——— Consonnes amoureuses ———
  { id: 'ch', graphemes: ['ch'], family: 'consonnes', sound: 'ch', say: 'che',
    examples: [{ word: '[ch]at', emoji: '🐱' }, { word: 'va[ch]e', emoji: '🐄' }] },
  { id: 'ph', graphemes: ['ph'], family: 'consonnes', sound: 'f', say: 'fe',
    hint: 'Se dit comme « f ».',
    examples: [{ word: '[ph]oto', emoji: '📷' }, { word: 'dau[ph]in', emoji: '🐬' }] },
  { id: 'gn', graphemes: ['gn'], family: 'consonnes', sound: 'gn', say: 'gne',
    examples: [{ word: 'monta[gn]e', emoji: '⛰️' }, { word: 'arai[gn]ée', emoji: '🕷️' }] },
  { id: 'qu', graphemes: ['qu'], family: 'consonnes', sound: 'k', say: 'que',
    hint: 'Le u ne se dit pas.',
    examples: [{ word: '[qu]atre', emoji: '4️⃣' }, { word: 'co[qu]ille', emoji: '🐚' }] },
  { id: 'gu', graphemes: ['gu'], family: 'consonnes', sound: 'g', say: 'gue',
    hint: 'Devant e, i : le u ne se dit pas.',
    examples: [{ word: '[gu]itare', emoji: '🎸' }, { word: 'ba[gu]e', emoji: '💍' }] },

  // ——— Sons mouillés ———
  { id: 'ill', graphemes: ['ill', 'ille'], family: 'mouilles', sound: 'ill (iye)', say: 'ille',
    examples: [{ word: 'f[ille]', emoji: '👧' }, { word: 'pap[ill]on', emoji: '🦋' }] },
  { id: 'ail', graphemes: ['ail', 'aille'], family: 'mouilles', sound: 'aïe', say: 'aïe',
    examples: [{ word: 'trav[ail]', emoji: '🔨' }, { word: 'p[aille]', emoji: '🌾' }] },
  { id: 'eil', graphemes: ['eil', 'eille'], family: 'mouilles', sound: 'èye', say: 'eille',
    examples: [{ word: 'sol[eil]', emoji: '☀️' }, { word: 'ab[eille]', emoji: '🐝' }] },
  { id: 'euil', graphemes: ['euil', 'euille'], family: 'mouilles', sound: 'euye', say: 'euille',
    examples: [{ word: 'écur[euil]', emoji: '🐿️' }, { word: 'f[euille]', emoji: '🍃' }] },
  { id: 'ouil', graphemes: ['ouil', 'ouille'], family: 'mouilles', sound: 'ouye', say: 'ouille',
    examples: [{ word: 'gren[ouille]', emoji: '🐸' }, { word: 'citr[ouille]', emoji: '🎃' }] },

  // ——— Bonus ———
  { id: 'th', graphemes: ['th'], family: 'bonus', sound: 't', say: 'te',
    hint: 'Le h ne se dit pas.',
    examples: [{ word: '[th]é', emoji: '🍵' }, { word: '[th]on', emoji: '🐟' }] },
  { id: 'et', graphemes: ['et'], family: 'bonus', sound: 'è', say: 'ait',
    hint: 'À la fin du mot.',
    examples: [{ word: 'poul[et]', emoji: '🐔' }, { word: 'jou[et]', emoji: '🧸' }] },
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
