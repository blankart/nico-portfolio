# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site built with **Next.js 12 (Pages Router)** using MDX for content management. Not a monorepo.

## Commands

- `yarn dev` — Start dev server
- `yarn build` — Production build (auto-generates sitemap via postbuild)
- `yarn lint` — ESLint (next/core-web-vitals)

No test framework is configured.

## Architecture

**Routing (Pages Router):**
- `/` — Homepage (`pages/index.mdx`, an MDX file with `getStaticProps`)
- `/projects` — Projects list (`pages/projects.tsx`)
- `/stories` — Blog list (`pages/stories/index.tsx`)
- `/stories/[slug]` — Individual blog post (`pages/stories/[slug].tsx`)

**Content System:**
- MDX files live in `mdx/projects/` and `mdx/stories/` with YAML frontmatter
- Projects have `name`, `description`, `url`, `tags`, `category` ("personal" | "work-related"), optional `archived`, `source_code`, `thumbnail`
- Stories have `title`, `author`, `date` (format: "Aug 5, 2022"), `description`, optional `thumbnail`
- Content is read from filesystem via `fs/promises` and serialized with `next-mdx-remote`
- Dynamic routes use `getStaticPaths` + `getStaticProps`

**Data Fetching:**
- Homepage fetches GitHub contributions via GraphQL API (ISR with 1-day revalidate)
- Projects and stories pages are fully static (`revalidate: false`)

**Styling:**
- Tailwind CSS with class-based dark mode — dark mode is always on (`<html className="dark">` hardcoded in `_document.tsx`)
- Custom theme colors: `primary` (yellow-600), `secondary` (blue-700), `dark` (slate-900)
- `@tailwindcss/typography` for MDX prose styling

**MDX Setup:**
- `@next/mdx` plugin in `next.config.js` enables `.mdx` files as pages
- Custom MDX components (Pre, Img) provided via MDXProvider in `_app.tsx`
- Syntax highlighting via `react-syntax-highlighter` (lazy-loaded)

## Environment Variables

See `.env.sample`:
- `NEXT_PUBLIC_BASE_URL` — Site URL for SEO/sitemap
- `GITHUB_TOKEN` — GitHub GraphQL API (contributions calendar)
- `GITHUB_USERNAME` — GitHub username for contributions
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_KEY` — Google Search Console
