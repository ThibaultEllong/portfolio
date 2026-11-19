import { z } from 'astro/zod';
import { url } from './site';

// The site is in French at the root (/portfolio/...) and in English under /en/
// (/portfolio/en/...). Every page file serves both: see `langPaths` below.
export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'fr';

// Interface text in each language.
const STRINGS = {
  fr: {
    tagline: 'Photographie',
    description: 'Portfolio photographique de Thibault Ellong.',
    work: 'Travaux',
    about: 'À propos',
    contact: 'Contact',
    contactLead: 'Pour une commande, un tirage ou simplement dire bonjour :',
    email: 'E-mail',
    all: 'Tout',
    allDescription: 'Toutes les galeries sur une seule page.',
    workDescription: 'Toutes les galeries photo.',
    galleries: 'Galeries',
    galleriesCount: (galleries: number, photos: number) => `${galleries} galeries · ${photos} photos`,
    mainMenu: 'Menu principal',
    backToWork: 'Retour aux travaux',
    back: 'Retour',
    previousPhoto: 'Photo précédente',
    nextPhoto: 'Photo suivante',
    photo: 'Photo',
    photos: 'Photos',
    aboutAndContact: 'À propos et contact',
    darkMode: 'Mode sombre',
    language: 'Langue',
    media: { film: 'Argentique', digital: 'Numérique', other: 'Autre' },
    tags: {
      travel: 'voyage',
      music: 'musique',
      street: 'rue',
      portrait: 'portrait',
      architecture: 'architecture',
    } as Record<string, string>,
  },
  en: {
    tagline: 'Photography',
    description: 'Photography portfolio of Thibault Ellong.',
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    contactLead: 'For commissions, prints or just to say hello:',
    email: 'Email',
    all: 'All',
    allDescription: 'Every gallery on one page.',
    workDescription: 'All photography galleries.',
    galleries: 'Galleries',
    galleriesCount: (galleries: number, photos: number) => `${galleries} galleries · ${photos} photos`,
    mainMenu: 'Main',
    backToWork: 'Back to Work',
    back: 'Back',
    previousPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    photo: 'Photo',
    photos: 'Photos',
    aboutAndContact: 'About and contact',
    darkMode: 'Dark mode',
    language: 'Language',
    media: { film: 'Film', digital: 'Digital', other: 'Other' },
    tags: {} as Record<string, string>,
  },
} satisfies Record<Lang, unknown>;

export const t = (lang: Lang) => STRINGS[lang];

// A tag as written in the galleries (in English), in the page's language.
export const tagLabel = (lang: Lang, tag: string) => STRINGS[lang].tags[tag.toLowerCase()] ?? tag;

// Text in the content files can be written once for both languages, or once per language:
//   title: Villa Cavrois
//   title: { fr: Norvège, en: Norway }
export const text = z.union([z.string(), z.object({ fr: z.string(), en: z.string() })]);
export type Text = z.infer<typeof text>;
export const pick = (lang: Lang, value: Text) => (typeof value === 'string' ? value : value[lang]);

// A site path ("/work/") in a language, with the GitHub Pages base path.
export const link = (lang: Lang, path: string) =>
  url(lang === DEFAULT_LANG ? path : `/${lang}${path}`);

// The site path of the current page, without the base path or language: "/work/all/".
export const pagePath = (pathname: string) => {
  const path = pathname.slice(url('').length) || '/';
  const match = path.match(/^\/(en)(\/.*|$)/);
  return match ? match[2] || '/' : path;
};

// For a page file at src/pages/[...lang]/...: one page per language, French without a prefix.
export const langPaths = () =>
  LANGS.map((lang) => ({
    params: { lang: lang === DEFAULT_LANG ? undefined : lang },
    props: { lang },
  }));
