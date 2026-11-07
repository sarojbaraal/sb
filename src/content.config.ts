import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    client_type: z.string(),
    year: z.number(),
    services: z.array(z.string()),
    tools: z.array(z.string()),
    result_metrics: z.array(z.string()),
    sample_file: z.string().optional(),
    cover: z.string(),
    confidential: z.boolean().default(true),
    order: z.number(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, notes };

