export const SITE = {
  name: 'Thibault Ellong',
  tagline: 'Photography',
  description: 'Photography portfolio of Thibault Ellong.',
  email: 'hello@example.com',
  social: [{ label: 'Instagram', href: 'https://www.instagram.com/' }],
};

export const NAV = [
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
];

// Prefixes internal links with the GitHub Pages base path (e.g. /portfolio).
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
