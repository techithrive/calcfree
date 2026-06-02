# CalcFree.online

A fast, crawlable, indexable calculator and tools website built with **Astro** (static output) and **Decap CMS** at `/admin`.

Goals: fast, crawlable, indexable, editable, AdSense-ready, SEO/AEO/GEO-structured, human-looking, easy to scale. No fake ranking promises — quality and time decide rankings.

---

## Requirements

- **Node.js 18.20+** (LTS recommended)
- npm (ships with Node)
- A GitHub repository for the project (the CMS commits to it)

---

## Install

```bash
npm install
```

## Local development

```bash
npm run dev
```

Open the URL Astro prints (usually `http://localhost:4321`).

## Type-check + build

```bash
npm run build      # runs astro check, then builds to dist/
npm run build:fast # builds without the type check (quicker)
npm run preview    # serve the built site locally to sanity-check
```

The production site is the static `dist/` folder.

---

## CMS editing guide (`/admin`)

The CMS is **Decap CMS**, loaded from `public/admin/`. It edits the markdown/JSON
files in `src/content/` and commits changes to GitHub, which triggers a rebuild.

### One-time setup

1. In `public/admin/config.yml`, set `backend.repo` to your `owner/repo`.
2. Set up a GitHub OAuth app so editors can log in to `/admin`:
   - The simplest path is an OAuth provider compatible with Decap's GitHub
     backend (e.g. a small OAuth relay you deploy once, or a host that provides
     Git Gateway). See the Decap docs section "GitHub backend".
   - Add the OAuth client ID/secret to that provider, and point the CMS at it.
3. Deploy the site (see below). Visit `https://calcfree.online/admin` and log in.

> Until OAuth is configured you can still run the CMS locally with
> `npx decap-server` and add `local_backend: true` to `config.yml` for testing.

### What you can edit without touching code

- **Tools** — every field: inputs, formula notes, result text, FAQs, schema
  type, related tools/blogs, images, CTA, SEO title, meta description, ad slots.
- **Blog posts** — body, excerpt, FAQs, related tools/posts, images, SEO.
- **Categories** — title, intro copy, order, featured tools, SEO.
- **Homepage sections** — hero, featured tools/categories, trust points, featured blogs.
- **Pages** — About, Contact, Privacy, Terms, Disclaimer.
- **Authors** — name, role, credentials, photo, links (used for E-E-A-T + schema).
- **Settings** — footer credit, AdSense publisher ID, organisation schema fields.

---

## How to add a new tool

1. In `/admin`, open **Tools → New Tool** (or add a markdown file in
   `src/content/tools/`).
2. Fill in: title, category, target keyword, intent, hero heading/sub-copy,
   the **inputs** list, a **calculator_id**, assumptions (+ source), body,
   FAQs, related tools/blogs, author, last reviewed date.
3. The `calculator_id` must match a logic file at
   `src/lib/calculators/<calculator_id>.ts`. (Calculation logic lives in code so
   it can be unit-tested; the CMS controls labels, inputs, copy and SEO.)
4. Set **draft: false** only when the page is complete (no thin/placeholder pages).
5. Add the new tool to its **category** and to at least one **related_tools**
   list on a sibling tool so it isn't an orphan.

## How to add a blog post

1. **Blog → New Post** in `/admin`.
2. Write the body, add an excerpt, link 2–4 **related tools** in-body and via
   the related_tools field, set author + published date.
3. Publish (draft: false) when finished.

## How to update SEO

- Per page: edit `seo_title` and `meta_description`.
- Site-wide org/social: **Settings**.
- Titles ≤ ~60 chars, descriptions ≤ ~155 chars (the CMS hints at this).

## How to update tax rates / prices

- All rates and unit prices live in `src/data/*.json` (added in a later batch).
- Update the values for the new tax year, set the tool's `last_reviewed` date,
  and rebuild. Calculator logic reads these files, so no code change is needed.

---

## Footer credit rule (build-blocking)

The footer credit must read **exactly**:

```
Developed by Techithrive.com
```

Never `Techlthrive`, `TechIThrive`, or `Techithrive` without `.com`. A build-time
guard (added with the SEO/schema batch) fails the build if the string is wrong.

---

## Deploy (Hostinger static hosting)

1. Run `npm run build`.
2. Upload the **contents of `dist/`** to your Hostinger `public_html` (or connect
   the GitHub repo if your plan supports Git deploys / CI).
3. Ensure HTTPS is on and a single canonical host is enforced (www vs non-www).
4. Confirm `https://calcfree.online/robots.txt` and
   `https://calcfree.online/sitemap-index.xml` load.

(Full step-by-step deploy + Search Console + AdSense timing is covered in the
final batch.)

---

## Verify before publishing

- [ ] `npm run build` passes (type check + build, no errors)
- [ ] Footer reads exactly `Developed by Techithrive.com`
- [ ] No draft/placeholder pages are set to publish
- [ ] Every page has a unique title + meta description
- [ ] `robots.txt` and sitemap resolve; no stray `noindex`
- [ ] Each tool/blog has ≥2 internal links pointing to it (no orphans)
- [ ] Primary content is visible with JavaScript disabled
- [ ] Mobile layout has no horizontal scroll

---

## Project structure (high level)

```
public/            static assets + /admin (Decap CMS)
src/content/       CMS-managed content (tools, blog, categories, pages, authors)
src/data/          editable rate/price tables (added later)
src/lib/           calculator logic, schema + formatting helpers (added later)
src/components/     layout, cards, sections, ads, seo (added later)
src/layouts/        page layouts (added later)
src/pages/          routes (added later)
src/styles/         global.css design system
```

Developed by Techithrive.com
