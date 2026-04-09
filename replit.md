# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Tessa Hood – The Coop Finder (coop-finder)
- **Path**: `artifacts/coop-finder/`
- **Preview path**: `/` (root)
- **Type**: True static multi-page website — HTML, CSS, vanilla JS ONLY
- **Dev server**: `npx serve ./site -p $PORT --no-clipboard`
- **Static site root**: `artifacts/coop-finder/site/` — this is the ONLY folder that matters
- **STRICT RULE**: This site must ONLY ever be built with plain HTML5, CSS, and vanilla JS. No React, no Vue, no Svelte, no TypeScript, no build tools, no npm packages in the site itself. Any future change must follow this constraint. The React scaffolding (src/, dist/, vite.config.ts, etc.) has been permanently deleted.
- **Description**: Full 8-page real estate website for Oklahoma Realtor Tessa Hood (The Coop Finder / Knight Land Company)
- **Pages**: index.html, about.html, buyers.html, sellers.html, communities.html, featured-properties.html, around-the-coop.html, contact.html
- **Brand colors**: Gold #c99a45, Navy #1f3a4a, Warm white #f6f4f0, Burgundy/footer #6e3c4f, Terracotta #a46a4f, Olive #6d6a40
- **Forms**: All forms post to GoHighLevel via webhook. Set `data-webhook="YOUR_GHL_WEBHOOK_URL"` on each `<form>` to activate. 4 forms need real webhook URLs: buyers.html, contact.html, index.html (home lead), sellers.html.
- **SEO**: Full meta tags, canonical URLs, Open Graph, Twitter Card, unique JSON-LD on every page. GA4 snippet on all pages (placeholder G-XXXXXXXXXX — replace with real Measurement ID).
- **Social links**: Facebook → facebook.com/thecoopfinder | YouTube → youtube.com/@Thecoopfinder | TikTok → tiktok.com/@thecoopfinder
- **Key files**:
  - `site/css/style.css` — full brand design system (CSS custom properties, all components)
  - `site/js/script.js` — mobile nav, video lightbox, FAQ accordion, category filter, GHL form handler
  - `site/index.html` — Home page (section order: Featured Properties → Communities → Services → Why Tessa → Testimonials)
  - `site/around-the-coop.html` — Videos page (YouTube lightbox + category filter, 9 video cards)
  - `site/robots.txt`, `site/sitemap.xml` — SEO infrastructure (sitemap points to thecoopfinder.com)
- **Contact**: 405-913-4185 | TessaHood@TheCoopFinder.com | Knight Land Company | Realtor License #209628
- **Folder structure** (everything outside site/ is pnpm plumbing only):
  - `site/` — the entire website lives here
  - `package.json` — only contains the `dev` script (`serve ./site`)
  - `node_modules/` — only needed so `npx serve` works; not part of the site
