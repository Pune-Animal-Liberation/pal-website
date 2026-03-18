import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().optional(),
    image: z.string().optional(),
    slug: z.string().optional(),
  })
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    location: z.string().optional(),
    time: z.string().optional(),
    mapLink: z.string().url().optional(),
    contactPerson: z.string().optional(),
    slug: z.string().optional(),
  })
});

export const collections = { blog, events };