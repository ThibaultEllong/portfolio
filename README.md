# Photography portfolio

Static site built with [Astro](https://astro.build) and published to GitHub Pages.

## Commands

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start the local server at `localhost:4321` |
| `npm run build`   | Type-check and build the site into `dist/` |
| `npm run preview` | Serve the built site locally               |
| `npm run format`  | Format all files with Prettier             |

## Adding a gallery

1. Create a folder in `src/content/galleries/`, e.g. `iceland-2025/`. The folder name becomes the URL (`/work/iceland-2025/`).
2. Put the photos in it, exported at about 2500–3000px on the long side.
3. Add an `index.md`:

```yaml
---
title: Iceland
date: 2025-09-12
description: One line used on cards and in search results.
featured: true # shown on the home page
tags: [landscape]
photos: # in display order; the first one is the cover
  - src: ./01.jpg
    alt: Black sand beach at dawn
---
Optional text about the shoot.
```

The build fails with a clear message if a field is missing or a photo path is wrong.

## Where things live

- `src/site.ts` — site name, menu, email and social links
- `src/styles/tokens.css` — colors, fonts, spacing and animation timings
- `src/components/islands/` — future React components (add React with `npx astro add react`)
- `astro.config.mjs` — site URL and base path for GitHub Pages

## Deploying

Every push to `main` builds and publishes the site through `.github/workflows/deploy.yml`.
In the repository settings, set **Pages → Source** to **GitHub Actions**.
