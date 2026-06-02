# CalcFree — Deployment & Operations Guide

This guide takes CalcFree from your computer to a live site at **calcfree.online**, and explains how a non-technical owner edits it afterwards. Read the "Important decision" box first — it determines how the CMS will work.

---

## ⚠️ Important decision: how will `/admin` (the CMS) authenticate?

CalcFree uses **Decap CMS** with a **GitHub backend**. Decap saves your edits as commits to your GitHub repository, and a rebuild publishes them. To let you log in at `calcfree.online/admin`, GitHub needs an **OAuth handshake** — and **plain Hostinger static hosting does not provide one**. You have three realistic options:

1. **Recommended for non-technical owners — host the site on Netlify (free tier) instead of Hostinger, keep the domain.**
   Netlify provides Decap login out of the box (Git Gateway / Netlify Identity), auto-builds on every commit, and you point your `calcfree.online` domain at it. You still own the domain at your registrar. This is the smoothest "edit at /admin, it just publishes" experience.

2. **Stay on Hostinger + deploy a tiny OAuth helper.**
   Keep the static site on Hostinger, but deploy a small GitHub OAuth provider (a free Cloudflare Worker or a tiny Render/Netlify function) so `/admin` can log in. More moving parts; needs a one-time technical setup.

3. **Stay on Hostinger, edit locally.**
   The owner (or you) edits content with the CMS running **locally** (`npx decap-server` + `local_backend: true`), commits to GitHub, and the site rebuilds/uploads. No public `/admin` login. Fine if one person manages content from one computer.

> The guides below cover **GitHub setup** (needed for all options), **Hostinger deployment** (options 2–3), and a note on the **Netlify path** (option 1). Pick your option, then follow the relevant sections.

---

## 1. GitHub setup guide

You only do this once.

1. Create a free account at github.com if you don't have one.
2. Create a new **private** repository, e.g. `your-name/calcfree`.
3. On your computer, in the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial CalcFree project"
   git branch -M main
   git remote add origin https://github.com/your-name/calcfree.git
   git push -u origin main
   ```
4. Open `public/admin/config.yml` and set the backend repo to match:
   ```yaml
   backend:
     name: github
     repo: your-name/calcfree   # <-- your owner/repo
     branch: main
   ```
   Commit and push that change.

`.gitignore` already excludes `node_modules/`, `dist/` and `.astro/`, so only source is committed. That's correct — the host builds `dist/` for you (or you upload it).

---

## 2. Hostinger deployment guide (static upload)

Hostinger serves static files, so we upload the built `dist/` folder.

1. Build the site locally:
   ```bash
   npm install
   npm run build
   ```
   This produces a `dist/` folder containing the whole static site.
2. Log in to Hostinger → **hPanel → Files → File Manager** (or use FTP).
3. Go to `public_html/`. **Delete the default placeholder** files if present.
4. Upload **the contents of `dist/`** (not the `dist` folder itself) into `public_html/`. The structure should be `public_html/index.html`, `public_html/tools/...`, `public_html/admin/...`, `public_html/sitemap-index.xml`, `public_html/robots.txt`, etc.
5. In hPanel, ensure **SSL/HTTPS is enabled** for calcfree.online (Hostinger provides free SSL — turn it on and force HTTPS).
6. Pick **one canonical host**: redirect `www.calcfree.online` → `calcfree.online` (or vice-versa) in hPanel so you don't split the site across two hostnames.
7. Visit `https://calcfree.online`, `…/robots.txt` and `…/sitemap-index.xml` to confirm they load.

**Re-deploying after a change:** rebuild (`npm run build`) and re-upload the changed files (or the whole `dist/`). With Hostinger you do this manually unless your plan supports Git deploys.

> **Connecting the domain** (if it's registered elsewhere): in your domain registrar, point the nameservers to Hostinger, or set an A record to your Hostinger server IP (shown in hPanel). DNS can take a few hours to propagate.

### Netlify path (option 1, recommended for self-serve CMS)
1. Push the repo to GitHub (section 1).
2. In Netlify: **Add new site → Import from GitHub →** pick the repo. Build command `npm run build`, publish directory `dist`.
3. Enable **Identity** + **Git Gateway** in Netlify site settings (this is what lets `/admin` log in without extra infrastructure).
4. Add `calcfree.online` as a custom domain in Netlify and update DNS at your registrar.
5. Every commit (including CMS edits) now auto-builds and publishes.

---

## 3. CMS setup guide (`/admin`)

- The CMS files are already in `public/admin/` and deploy automatically.
- **Local testing (no login needed):** in `public/admin/config.yml` uncomment `local_backend: true`, then run the dev server and a Decap server together:
  ```bash
  npm run dev
  # in a second terminal:
  npx decap-server
  ```
  Open `http://localhost:4321/admin`. Edits write to your local files. **Re-comment `local_backend: true` before deploying.**
- **Live login:** depends on your hosting option above. On Netlify (option 1) it works once Identity + Git Gateway are on. On Hostinger you need the OAuth helper (option 2) or you edit locally (option 3).

The `media_folder` is `public/images/uploads`, so anything you upload through the CMS lands there and ships with the next build.

---

## 4. Content update guide (for a non-technical owner)

All editing happens at `/admin` (or locally). You never touch code. Click **Save** to draft; with the editorial workflow, you then **Publish**, which commits to GitHub and triggers a rebuild.

### Editing a tool
**Tools → pick a tool.** You can change the title, the intro, the quick answer, key takeaways, FAQs, assumptions, related tools/blogs, the SEO title and meta description, the ad slots, and the body text. The **calculator inputs** and the **calculator ID** are editable too, but the actual maths lives in code — changing the ID only works if a developer has built logic with that ID. For wording, examples and SEO, edit freely.

### Editing a blog post
**Blog → New Post** (or pick an existing one). Write the title, excerpt, quick answer, key takeaways, body, FAQs, and choose related tools/posts and an author. Set **Draft off** only when it's finished — drafts never appear on the live site.

### Editing the homepage
**Homepage → Homepage content.** Edit the hero heading and sub-copy, the value proposition, the methodology and editorial section text, and choose which tools/categories/posts are featured. Empty categories are hidden automatically, so you can't accidentally feature an empty one.

### Updating categories
**Categories → pick one.** Edit the title, intro copy and SEO fields. A category only appears on the site once it has **at least one published tool** — this is automatic, so a category with no tools stays hidden until you add one.

### Updating SEO titles & descriptions
Every tool, blog post, category and page has **SEO title** and **meta description** fields. Keep titles under ~60 characters and descriptions under ~155. Save and publish.

### Uploading images
In any image field (tool image, blog featured image, author photo), click to upload. The file is stored in `public/images/uploads` and included automatically. Use descriptive filenames and reasonably sized images (under ~200 KB where possible) for fast loading.

### Updating tax rates / prices each year
This one **isn't** in the CMS — the figures live in `src/data/*.json` (e.g. `rates-uk-tax.json`, `hmrc-penalties.json`, `prices-materials.json`). A developer updates the value for the new tax year, sets the tool's `last_reviewed` date, and rebuilds. No calculator code changes. (Reminder: **dividend tax rates rise from April 2026** — update `rates-uk-tax.json` accordingly when relevant.)

---

## 5. Backup guide

Your GitHub repository **is** your primary backup — every edit is a versioned commit. On top of that:

- **Periodic full backup:** download a ZIP of the repo from GitHub (Code → Download ZIP) or keep a local clone you `git pull` regularly.
- **Media:** uploaded images live in the repo under `public/images/uploads`, so they're backed up with everything else.
- **Hostinger:** if you're on Hostinger, enable its account backups too, but treat GitHub as the source of truth.
- **Before any big change:** make sure the working version is committed and pushed, so you can always return to it.

---

## 6. Rollback guide

Because every change is a commit, undoing is straightforward.

- **Undo the last change (keep history):**
  ```bash
  git revert HEAD
  git push
  ```
  This creates a new commit that reverses the previous one. The site rebuilds to the earlier state.
- **Go back to a specific known-good version:** find its commit on GitHub (or `git log`), then:
  ```bash
  git revert <commit-hash>   # safe: reverses just that change
  ```
- **Emergency: restore the whole site to a previous commit:**
  ```bash
  git checkout <good-commit-hash> -- .
  git commit -m "Roll back to known-good state"
  git push
  ```
- **On Netlify**, you can also one-click "Publish deploy" on any previous successful build under **Deploys** — the fastest rollback of all.

After any rollback, rebuild and re-upload (Hostinger) or let the host auto-build (Netlify).

---

## 7. Pre-deploy checklist

- [ ] `npm install` then `npm run build` completes with no errors
- [ ] `public/admin/config.yml` → `backend.repo` set to your real GitHub repo
- [ ] `local_backend: true` is commented out
- [ ] Footer reads exactly **Developed by Techithrive.com**
- [ ] `robots.txt` and `sitemap-index.xml` load on the live URL
- [ ] HTTPS on; single canonical host (www vs non-www) enforced
- [ ] `og-default.png` loads (link previews work)
- [ ] Decap login works on your chosen hosting option (or local editing is set up)
- [ ] After go-live: add the site to Google Search Console and submit the sitemap; do **not** apply to AdSense until pages are indexed
