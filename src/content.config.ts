import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { text } from './i18n';

const galleries = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/galleries' }),
  schema: ({ image }) =>
    z.object({
      // Text can be the same in both languages (`title: Villa Cavrois`) or one per language
      // (`title: { fr: Norvège, en: Norway }`): see src/i18n.ts.
      title: text,
      date: z.coerce.date(),
      description: text,
      featured: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      // The first photo is used as the gallery cover. The caption, if any, is shown under the
      // photo on the gallery page.
      photos: z
        .array(z.object({ src: image(), alt: text, caption: text.optional() }))
        .min(1),
    }),
});

const home = defineCollection({
  loader: glob({ pattern: 'photos.yaml', base: './src/assets/home' }),
  schema: ({ image }) =>
    z.object({
      photos: z
        .array(
          z.object({
            src: image(),
            title: text,
            alt: text,
            location: text.optional(),
            year: z.number().optional(),
          }),
        )
        .min(1),
    }),
});

export const collections = { galleries, home };
