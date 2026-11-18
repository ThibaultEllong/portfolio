import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const galleries = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/galleries' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      featured: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      // The first photo is used as the gallery cover. The caption, if any, is shown under the
      // photo on the gallery page.
      photos: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
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
            title: z.string(),
            alt: z.string(),
            location: z.string().optional(),
            year: z.number().optional(),
          }),
        )
        .min(1),
    }),
});

export const collections = { galleries, home };
