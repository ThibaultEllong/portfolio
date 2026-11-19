import { getCollection, type CollectionEntry } from 'astro:content';

export type Gallery = CollectionEntry<'galleries'>;
export type Medium = 'film' | 'digital' | 'other';

// A gallery's medium comes from the end of its folder name: "norway-2026-film" is film,
// "norway-2025-num" (numérique) is digital. Any other ending lands under "other". The names
// shown for each are in src/i18n.ts.
export const MEDIA = [
  { key: 'film', suffix: '-film' },
  { key: 'digital', suffix: '-num' },
] as const;

export const mediumOf = (gallery: Gallery): Medium =>
  MEDIA.find((medium) => gallery.id.endsWith(medium.suffix))?.key ?? 'other';

// All galleries grouped by medium (film, then digital), newest first within each group.
export async function galleriesByMedium() {
  const all = (await getCollection('galleries')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const keys: Medium[] = [...MEDIA.map((medium) => medium.key), 'other'];
  return keys
    .map((medium) => ({ medium, galleries: all.filter((gallery) => mediumOf(gallery) === medium) }))
    .filter((group) => group.galleries.length > 0);
}
