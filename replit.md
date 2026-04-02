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
- **Type**: React + Vite (frontend-only, no backend)
- **Stack**: React 19, Vite, Tailwind CSS v4, Framer Motion, wouter, shadcn/ui, lucide-react, react-icons
- **Description**: Full 8-page real estate website for Oklahoma Realtor Tessa Hood (The Coop Finder / Knight Land Company)
- **Pages**: Home, About, Buyers, Sellers, Communities, Featured Properties, Around the Coop, Contact
- **Brand**: Warm off-white/cream backgrounds, muted slate blue primary, warm tan/gold secondary, Playfair Display serif headings + Inter body
- **Forms**: All forms use react-hook-form + zod validation. Comments in code mark where GoHighLevel webhook integrations will be added.
- **SEO**: Each page sets unique title/description via usePageMeta hook. Schema.org and Open Graph placeholder comments included.
- **Fair Housing**: All community and property descriptions are neutral and compliant. Equal Housing Opportunity in footer.
- **Images**: All placeholder images are warm tan divs with labeled alt text for future custom photo replacement.
- **Key files**:
  - `src/App.tsx` — router setup
  - `src/index.css` — theme/design tokens
  - `src/components/Header.tsx` — global nav with mobile hamburger
  - `src/components/Footer.tsx` — global footer with contact info, legal
  - `src/pages/` — one file per page
  - `src/hooks/usePageMeta.ts` — SEO title/description hook
