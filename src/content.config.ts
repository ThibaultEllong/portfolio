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
      // The first photo is used as the gallery cover.
      photos: z.array(z.object({ src: image(), alt: z.string() })).min(1),
    }),
});

export const collections = { galleries };
