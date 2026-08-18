import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * A real photo. `src` is resolved by Astro's image() helper (relative to the .md file,
 * e.g. ../../assets/photos/lvp-grey-kitchen.jpg) and optimized at build time.
 */
const photo = ({ image }: SchemaContext) =>
  z.object({
    src: image(),
    alt: z.string(),
    caption: z.string().optional(),
    stage: z.enum(['before', 'during', 'after']).optional()
  });

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      title: z.string(),
      serviceName: z.string(),
      seoTitle: z.string(),
      metaDescription: z.string().min(140).max(160),
      shortDescription: z.string(),
      cardImage: image(),
      cardAlt: z.string(),
      lead: z.array(z.string()),
      materialOptions: z.array(z.string()),
      included: z.array(z.string()),
      projectInfo: z.array(z.string()),
      photos: z.array(photo({ image })),
      relatedProjects: z.array(z.string()).default([])
    })
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/locations' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      city: z.string(),
      seoTitle: z.string(),
      metaDescription: z.string().min(140).max(160),
      intro: z.string(),
      local: z.array(z.string()).default([]), // real local paragraphs, if we have them
      localNote: z.string().optional(), // dev TODO, rendered as an HTML comment only
      photos: z.array(photo({ image })),
      relatedProjects: z.array(z.string()).default([])
    })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      title: z.string(),
      city: z.string(),
      category: z.enum(['lvp', 'hardwood', 'tile', 'stairs', 'rubber', 'prep']),
      summary: z.string(),
      story: z.array(z.string()),
      photos: z.array(photo({ image })).min(1),
      featured: z.boolean().default(false)
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

export const collections = { services, locations, projects, testimonials };
