import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { toolHref, blogHref, categoryHref } from '../lib/internal-links';

/**
 * Static search index, generated at build time as /search-index.json.
 * Lightweight (title + summary + type + url) so client search stays fast even
 * at 100+ tools and 50+ posts. Drafts excluded.
 */
export const GET: APIRoute = async () => {
  const [tools, posts, cats] = await Promise.all([
    getCollection('tools', ({ data }) => !data.draft),
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('categories'),
  ]);

  const activeCatIds = new Set(tools.map((t) => t.data.category?.id).filter(Boolean));

  const index = [
    ...tools.map((t) => ({
      type: 'Tool',
      title: t.data.title,
      summary: t.data.hero_subcopy ?? t.data.meta_description ?? '',
      keywords: t.data.target_keyword ?? '',
      url: toolHref(t),
    })),
    ...posts.map((p) => ({
      type: 'Guide',
      title: p.data.title,
      summary: p.data.excerpt ?? p.data.meta_description ?? '',
      keywords: '',
      url: blogHref(p),
    })),
    // Only active categories (with tools) are searchable, matching site nav.
    ...cats
      .filter((c) => activeCatIds.has(c.id))
      .map((c) => ({
        type: 'Category',
        title: c.data.title,
        summary: c.data.meta_description ?? '',
        keywords: '',
        url: categoryHref(c),
      })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
