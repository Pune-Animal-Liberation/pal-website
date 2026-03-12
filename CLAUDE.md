# CLAUDE.md

This file contains guidance specifically for Claude Code when working on this repository.

See @AGENTS.md for full project context, tech stack, content rules, and constraints.


## Working style

Claude should prefer:

- Multi-file edits
- Incremental improvements
- Clear component structure


## When adding UI features

Use Astro components in `src/components/`:

```
Hero.astro
Nav.astro
Footer.astro
EventCard.astro
BlogCard.astro
```


## Styling rules

Use the single CSS file: `src/styles/site.css`

Avoid large CSS frameworks.


## Content rendering

Blog pages automatically render from `src/content/blog/`.

Events render from `src/content/events/`.

The base layout is `src/layouts/Layout.astro` — all pages should use it.


## Preferred development workflow

1. Modify components
2. Run dev server (`npm run dev`)
3. Ensure mobile layout works
4. Keep layout simple


## When generating code

Claude should:

- Avoid duplicating layouts — use `Layout.astro`
- Use shared components from `src/components/`
- Prefer semantic HTML
- Keep accessibility in mind (alt tags, aria labels, skip links)
- Use `post.id` (not `post.slug`) for blog/event URL routing
