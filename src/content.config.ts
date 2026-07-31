import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().optional(),
    thumbnail: z.string().optional(),
    image: z.string().optional(),
    thumbnailAlt: z.string().optional(),
    imageAlt: z.string().optional(),
    slug: z.string().optional(),
  })
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    status: z.enum(['draft', 'upcoming', 'concluded', 'cancelled', 'postponed']).default('upcoming'),
    location: z.string().optional(),
    time: z.string().optional(),
    mapLink: z.string().url().optional(),
    contactPerson: z.string().optional(),
    registrationUrl: z.string().url().optional(),
    coverImage: z.string().optional(),
    coverImageAlt: z.string().optional(),
    recapSummary: z.string().optional(),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).default([]),
    outcomes: z.array(z.string()).default([]),
    relatedLinks: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).default([]),
    slug: z.string().optional(),
  })
});

export const collections = { blog, events };
