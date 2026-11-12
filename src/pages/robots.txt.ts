import type { APIRoute } from 'astro';

// Built from `site` in astro.config.mjs so the sitemap URL can't drift
// from what @astrojs/sitemap actually generates.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site);

  const body = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${sitemapUrl.href}

# Block common non-content paths
Disallow: /api/
Disallow: /admin/
Disallow: /.well-known/
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
