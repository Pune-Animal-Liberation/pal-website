# AGENTS.md

## Purpose of this repository

This repository contains the website for Pune Animal Liberation, an animal rights activist group based in Pune, India.

Goals of the website:

1. Explain animal rights and veganism
2. Share outreach activities
3. Publish blog posts and resources
4. Promote upcoming events
5. Help people get involved


## Tech stack

- Astro
- Markdown content collections
- GitHub Pages hosting
- PagesCMS for editing content
- No server backend


## Project structure

```
src/pages         Static pages and routes
src/content/blog  Markdown blog posts
src/content/events  Markdown event posts
src/components    Reusable Astro components
src/layouts       Page layout templates
src/styles        Global CSS
public/images     Uploaded images
```


## Content rules

Blog posts:
- Markdown files in `src/content/blog/`
- Frontmatter fields:
  - `title` (string, required)
  - `date` (date, required)

Events:
- Markdown files in `src/content/events/`
- Frontmatter fields:
  - `title` (string, required)
  - `date` (date, required)
  - `location` (string, optional)


## Design goals

- Clean
- Activist style
- Mobile-first
- Fast loading
- Accessible


## Important constraints

- No heavy frameworks
- Avoid unnecessary JS
- Prefer Astro components
- Keep CSS simple
- Ensure pages work statically
- Use the existing blog routing implementation.
- Do not rewrite the content collection system.


## Agent instructions

When modifying the project:

1. Preserve Astro static architecture
2. Do not introduce servers or databases
3. Use Markdown content for blog/events
4. Keep components reusable
5. Ensure responsive design
6. Prefer simple CSS over frameworks
7. Avoid adding dependencies unless necessary
