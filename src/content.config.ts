import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const photoSlot = z.object({
  label: z.string(),
  'data-replace': z.string(),
  alt: z.string(),
  aspect: z.string().optional()
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    serviceName: z.string(),
    seoTitle: z.string(),
    metaDescription: z.string().min(140).max(160),
    shortDescription: z.string(),
    'card-data-replace': z.string(),
    cardAlt: z.string(),
    lead: z.array(z.string()),
    materialOptions: z.array(z.string()),
    included: z.array(z.string()),
    projectInfo: z.array(z.string()),
    photoSlots: z.array(photoSlot)
  })
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: z.object({
    order: z.number(),
    city: z.string(),
    seoTitle: z.string(),
    metaDescription: z.string().min(140).max(160),
    intro: z.string(),
    localNote: z.string(),
    photoSlots: z.array(photoSlot)
  })
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    author: z.string(),
    quote: z.string(),
    context: z.string().optional()
  })
});

export const collections = { services, locations, testimonials };
