// Interface text in French and English is in src/i18n.ts.
export const SITE = {
  name: 'Thibault Ellong',
  email: 'thibaultellong59@gmail.com',
  social: [{ label: 'Instagram', href: 'https://www.instagram.com/thibault_ellong' }],
};

// The main menu: labels from src/i18n.ts.
export const NAV = [
  { key: 'work', href: '/work/' },
  { key: 'about', href: '/about/' },
] as const;

// Prefixes internal links with the GitHub Pages base path (e.g. /portfolio).
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
