import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * CalcFree content collections.
 *
 * These schemas are the single source of truth for what the CMS can edit and
 * what every page can render. Keep field names in sync with public/admin/config.yml.
 *
 * Notes:
 * - `reference()` creates typed relations (related tools/blogs, category, author)
 *   which the internal-link helper uses to guarantee no orphan pages.
 * - Singletons (homepage, settings) are loaded with the `glob` loader pointed at a
 *   single JSON file, so each file is exactly one entry (id = filename). This is
 *   compatible with Decap's "file" (single-object) output, unlike the `file`
 *   loader, which would treat each top-level key as a separate entry.
 * - Image fields are stored as path strings (e.g. "/images/uploads/x.png") to
 *   match Decap's public-folder uploads. The Astro `image()` helper only accepts
 *   importable assets under src/, so it is intentionally not used here.
 */

// ---- Reusable field shapes ---------------------------------------------------

const seo = {
  seo_title: z.string().max(70).optional(),
  meta_description: z.string().max(170).optional(),
};

const faqItem = z.object({
  question: z.string(),
  answer: z.string(),
});

const calculatorInput = z.object({
  label: z.string(),
  field_id: z.string(),
  type: z.enum(['number', 'currency', 'percent', 'select', 'toggle', 'text']),
  unit: z.string().optional(),
  default: z.union([z.string(), z.number(), z.boolean()]).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  required: z.boolean().default(false),
  optional: z.boolean().default(false),
  advanced: z.boolean().default(false),
  help_text: z.string().optional(),
  // For select inputs only:
  options: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
});

const resultSection = z.object({
  heading: z.string(),
  result_template: z.string(),
  explanation: z.string().optional(),
});

// ---- Collections -------------------------------------------------------------

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(), // falls back to filename
    draft: z.boolean().default(false),
    category: reference('categories'),
    target_keyword: z.string(),
    search_intent: z.enum([
      'transactional',
      'commercial',
      'informational',
      'mixed',
    ]),
    ...seo,
    hero_heading: z.string(),
    hero_subcopy: z.string(),
    // The direct, quotable answer near the top (AEO/GEO).
    quick_answer: z.string().optional(),
    // Short, scannable, AI-quotable bullet summary (AEO/GEO).
    key_takeaways: z.array(z.string()).optional(),
    inputs: z.array(calculatorInput).min(1),
    calculator_id: z.string(), // links to src/lib/calculators/<id>.ts
    formula_notes: z.string().optional(),
    result_sections: z.array(resultSection).optional(),
    assumptions: z.string(), // human explanation + official source link
    source_label: z.string().optional(), // e.g. "HMRC"
    source_url: z.string().url().optional(),
    faqs: z.array(faqItem).optional(),
    enable_faq_schema: z.boolean().default(false),
    schema_type: z
      .enum(['WebApplication', 'SoftwareApplication'])
      .default('WebApplication'),
    related_tools: z.array(reference('tools')).optional(),
    related_blogs: z.array(reference('blog')).optional(),
    ad_slots: z
      .array(z.enum(['after-intro', 'after-result', 'mid-content', 'none']))
      .default(['after-intro', 'after-result']),
    cta_text: z.string().optional(),
    image: z.string().optional(),
    og_image: z.string().optional(),
    author: reference('authors'),
    last_reviewed: z.coerce.date(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    draft: z.boolean().default(false),
    category: reference('categories').optional(),
    ...seo,
    excerpt: z.string(),
    quick_answer: z.string().optional(),
    key_takeaways: z.array(z.string()).optional(),
    faqs: z.array(faqItem).optional(),
    enable_faq_schema: z.boolean().default(false),
    related_tools: z.array(reference('tools')).optional(),
    related_blogs: z.array(reference('blog')).optional(),
    featured_image: z.string().optional(),
    og_image: z.string().optional(),
    author: reference('authors'),
    published_date: z.coerce.date(),
    updated_date: z.coerce.date().optional(),
  }),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    ...seo,
    intro_copy: z.string(), // unique 150–300 words
    icon: z.string().optional(), // svg id or short token
    order: z.number().default(0),
    featured_tool_slugs: z.array(z.string()).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    ...seo,
    last_updated: z.coerce.date().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    role: z.string().optional(),
    credentials: z.string().optional(),
    photo: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .optional(),
  }),
});

// Singleton: homepage content. One JSON file = one entry (id = "homepage").
const homepage = defineCollection({
  loader: glob({ pattern: 'homepage.json', base: './src/content' }),
  schema: z.object({
    id: z.string().optional(),
    ...seo,
    hero_heading: z.string(),
    hero_subcopy: z.string(),
    hero_cta_text: z.string(),
    value_proposition: z.string().optional(),
    featured_tools: z.array(reference('tools')).optional(),
    featured_categories: z.array(reference('categories')).optional(),
    trust_points: z
      .array(
        z.object({
          icon: z.string().optional(),
          heading: z.string(),
          text: z.string(),
        })
      )
      .optional(),
    methodology_section: z
      .object({ heading: z.string(), text: z.string(), link_text: z.string(), link_href: z.string() })
      .optional(),
    editorial_section: z
      .object({ heading: z.string(), text: z.string(), link_text: z.string(), link_href: z.string() })
      .optional(),
    featured_blogs: z.array(reference('blog')).optional(),
  }),
});

// Singleton: site-wide settings. One JSON file = one entry (id = "settings").
const settings = defineCollection({
  loader: glob({ pattern: 'settings.json', base: './src/content' }),
  schema: z.object({
    id: z.string().optional(),
    // Locked guidance: must read exactly "Developed by Techithrive.com".
    footer_credit: z.string().default('Developed by Techithrive.com'),
    adsense_publisher_id: z.string().optional(),
    organization_name: z.string().default('CalcFree'),
    organization_logo: z.string().default('/logo.svg'),
    organization_sameas: z.array(z.string().url()).optional(),
    default_og_image: z.string().default('/og-default.png'),
  }),
});

export const collections = {
  tools,
  blog,
  categories,
  pages,
  authors,
  homepage,
  settings,
};
