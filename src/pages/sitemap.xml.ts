import type { APIRoute } from 'astro';
import { episodePath, episodes, site } from '../data/podcast';

const staticPaths = ['/', '/episodes/', '/about/'];

function entry(path: string, lastmod?: string) {
  const url = new URL(path, site.url).toString();
  const lastModified = lastmod ? `<lastmod>${lastmod.slice(0, 10)}</lastmod>` : '';
  return `<url><loc>${url}</loc>${lastModified}</url>`;
}

export const GET: APIRoute = () => {
  const urls = [
    ...staticPaths.map((path) => entry(path, episodes[0]?.publishedAt)),
    ...episodes.map((episode) => entry(episodePath(episode), episode.publishedAt)),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
