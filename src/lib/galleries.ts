import { getCollection, type CollectionEntry } from 'astro:content';

export type Gallery = CollectionEntry<'galleries'>;

// A gallery's medium comes from the end of its folder name: "norway-2026-film" is film,
// "norway-2025-num" (numérique) is digital. Any other ending lands under "Other".
export const MEDIA = [
  { label: 'Film', suffix: '-film' },
  { label: 'Digital', suffix: '-num' },
] as const;

export const mediumOf = (gallery: Gallery) =>
  MEDIA.find((medium) => gallery.id.endsWith(medium.suffix))?.label ?? 'Other';

// All galleries grouped by medium (Film, then Digital), newest first within each group.
export async function galleriesByMedium() {
  const all = (await getCollection('galleries')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const labels = [...MEDIA.map((medium) => medium.label), 'Other'];
  return labels
    .map((label) => ({ label, galleries: all.filter((gallery) => mediumOf(gallery) === label) }))
    .filter((group) => group.galleries.length > 0);
}
