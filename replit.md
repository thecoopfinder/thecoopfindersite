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
- **Type**: True static multi-page HTML/CSS/vanilla JS (served via `serve ./site`)
- **Stack**: Plain HTML5, CSS custom properties, vanilla JS — no framework dependencies for maximum SEO
- **Description**: Full 8-page real estate website for Oklahoma Realtor Tessa Hood (The Coop Finder / Knight Land Company)
- **Pages**: index.html, about.html, buyers.html, sellers.html, communities.html, featured-properties.html, around-the-coop.html, contact.html
- **Static site root**: `artifacts/coop-finder/site/`
- **Brand colors**: Gold #c99a45, Navy #1f3a4a, Warm white #f6f4f0, Burgundy #6e3c4f, Terracotta #a46a4f, Olive #6d6a40
- **Forms**: All forms post to GoHighLevel via webhook. Set `data-webhook="YOUR_GHL_WEBHOOK_URL"` on each `<form>` to activate. Forms show a friendly message until configured.
- **SEO**: Full meta tags, canonical URLs, Open Graph, Twitter Card, unique JSON-LD on every page.
- **Dev server**: `npx serve ./site -p $PORT --no-clipboard` (clean URLs: `/about` serves `about.html`)
- **Key files**:
  - `site/css/style.css` — full brand design system (CSS custom properties, all components)
  - `site/js/script.js` — mobile nav, video lightbox, FAQ accordion, category filter, GHL form handler
  - `site/index.html` — Home page
  - `site/around-the-coop.html` — Videos page (YouTube lightbox + category filter)
  - `site/contact.html` — Contact page with GHL form
  - `site/robots.txt`, `site/sitemap.xml` — SEO infrastructure
  - `vercel.json` — `outputDirectory: site, cleanUrls: true` for deployment
- **Legacy React source**: `src/` preserved alongside — do not delete until Tessa confirms
- **Contact**: 405-913-4185 | TessaHood@TheCoopFinder.com | Knight Land Company
