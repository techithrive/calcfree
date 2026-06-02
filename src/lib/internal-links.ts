/**
 * Internal-linking helpers.
 *
 * - Build canonical hrefs for tools / blog / categories.
 * - Resolve content references (related_tools / related_blogs) into card data.
 * - Count inbound internal links so later batches can flag near-orphan pages.
 *
 * These are intentionally tolerant: with no content yet, resolvers return empty
 * arrays and the orphan check returns an empty list rather than throwing.
 */
import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export interface ToolLink {
  title: string;
  href: string;
  summary?: string;
  tag?: string;
}

export interface BlogLink {
  title: string;
  href: string;
  excerpt?: string;
  date?: Date;
  author?: string;
}

type ToolEntry = CollectionEntry<'tools'>;
type BlogEntry = CollectionEntry<'blog'>;
type CategoryEntry = CollectionEntry<'categories'>;

/** A reference value (we only need the id). Astro's reference() data is compatible. */
type Ref = { id: string };

const slugOf = (entry: { id: string; data: { slug?: string } }) => entry.data.slug ?? entry.id;

export function toolHref(entry: ToolEntry): string {
  return `/tools/${slugOf(entry)}/`;
}
export function blogHref(entry: BlogEntry): string {
  return `/blog/${slugOf(entry)}/`;
}
export function categoryHref(entry: CategoryEntry): string {
  return `/category/${slugOf(entry)}/`;
}

/** Turn a tool entry into card data. */
export function toolToLink(entry: ToolEntry, tag?: string): ToolLink {
  return {
    title: entry.data.title,
    href: toolHref(entry),
    summary: entry.data.hero_subcopy,
    tag,
  };
}

/** Turn a blog entry into card data. */
export function blogToLink(entry: BlogEntry, authorName?: string): BlogLink {
  return {
    title: entry.data.title,
    href: blogHref(entry),
    excerpt: entry.data.excerpt,
    date: entry.data.updated_date ?? entry.data.published_date,
    author: authorName,
  };
}

/** Resolve an array of tool references into card data (skips anything missing). */
export async function resolveToolRefs(refs: Ref[] | undefined): Promise<ToolLink[]> {
  if (!refs?.length) return [];
  const out: ToolLink[] = [];
  for (const ref of refs) {
    const entry = (await getEntry('tools', ref.id)) as ToolEntry | undefined;
    if (entry && !entry.data.draft) out.push(toolToLink(entry));
  }
  return out;
}

/** Resolve an array of blog references into card data (skips anything missing). */
export async function resolveBlogRefs(refs: Ref[] | undefined): Promise<BlogLink[]> {
  if (!refs?.length) return [];
  const out: BlogLink[] = [];
  for (const ref of refs) {
    const entry = (await getEntry('blog', ref.id)) as BlogEntry | undefined;
    if (entry && !entry.data.draft) out.push(blogToLink(entry));
  }
  return out;
}

/** All published tools in a category, as card data. */
export async function toolsInCategory(categoryId: string): Promise<ToolLink[]> {
  const tools = await getCollection('tools', (t) => !t.data.draft);
  return tools
    .filter((t) => t.data.category?.id === categoryId)
    .map((t) => toolToLink(t));
}

/** Count of published tools in a category. */
export async function categoryToolCount(categoryId: string): Promise<number> {
  const tools = await getCollection('tools', (t) => !t.data.draft);
  return tools.filter((t) => t.data.category?.id === categoryId).length;
}

/**
 * Active categories = those with at least `min` published tools. Used to keep
 * empty categories out of the homepage, footer, listings and sitemap so the
 * site never exposes a thin, tool-less category page.
 */
export async function activeCategories(min = 1): Promise<CategoryEntry[]> {
  const [cats, tools] = await Promise.all([
    getCollection('categories'),
    getCollection('tools', (t) => !t.data.draft),
  ]);
  const counts = new Map<string, number>();
  for (const t of tools) {
    const id = t.data.category?.id;
    if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return cats
    .filter((c) => (counts.get(c.id) ?? 0) >= min)
    .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

/** Is a single category active (has >= min published tools)? */
export async function isCategoryActive(categoryId: string, min = 1): Promise<boolean> {
  return (await categoryToolCount(categoryId)) >= min;
}

/** Slugs of active categories — handy for sitemap filtering. */
export async function activeCategorySlugs(min = 1): Promise<string[]> {
  return (await activeCategories(min)).map((c) => c.data.slug ?? c.id);
}

export interface OrphanReport {
  underlinked: { type: 'tool' | 'blog'; id: string; inbound: number }[];
  threshold: number;
}

/**
 * Count inbound internal links per tool/blog and list those below `threshold`.
 * Inbound sources counted: other tools' related_tools, blogs' related_tools,
 * other blogs' related_blogs, and category membership (a category page links
 * every tool in it). Does not throw; returns an empty list when there's no
 * content yet. Wire this into a build assertion in a later batch.
 */
export async function getOrphanReport(threshold = 2): Promise<OrphanReport> {
  const [tools, blogs] = await Promise.all([
    getCollection('tools', (t) => !t.data.draft),
    getCollection('blog', (b) => !b.data.draft),
  ]);

  const toolInbound = new Map<string, number>();
  const blogInbound = new Map<string, number>();
  for (const t of tools) toolInbound.set(t.id, 0);
  for (const b of blogs) blogInbound.set(b.id, 0);

  const bump = (map: Map<string, number>, id: string) => {
    if (map.has(id)) map.set(id, (map.get(id) ?? 0) + 1);
  };

  // Category membership: each tool is linked from its category page.
  for (const t of tools) bump(toolInbound, t.id);

  // Tool -> related tools/blogs
  for (const t of tools) {
    for (const r of (t.data.related_tools ?? []) as Ref[]) bump(toolInbound, r.id);
    for (const r of (t.data.related_blogs ?? []) as Ref[]) bump(blogInbound, r.id);
  }
  // Blog -> related tools/blogs
  for (const b of blogs) {
    for (const r of (b.data.related_tools ?? []) as Ref[]) bump(toolInbound, r.id);
    for (const r of (b.data.related_blogs ?? []) as Ref[]) bump(blogInbound, r.id);
  }

  const underlinked: OrphanReport['underlinked'] = [];
  for (const [id, n] of toolInbound) if (n < threshold) underlinked.push({ type: 'tool', id, inbound: n });
  for (const [id, n] of blogInbound) if (n < threshold) underlinked.push({ type: 'blog', id, inbound: n });

  return { underlinked, threshold };
}
