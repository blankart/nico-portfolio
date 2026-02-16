# Design System — Nico Portfolio

## Direction

Notion dark mode. A single-column document where the interface disappears and you're just reading. No chrome, no containers, no sidebar. Typography and whitespace do all the structural work.

**Feel:** Like a well-formatted markdown document rendered in dark mode.

## Palette

| Token | Value | Role |
|---|---|---|
| `page` | `#1a1a1a` | Page background — warm dark, not cold slate |
| `page-hover` | `#222` | Code blocks, subtle hover states |
| `ink` | `#e8e8e8` | Primary text, headings, emphasis |
| `ink-secondary` | `#a0a0a0` | Body text, descriptions |
| `ink-tertiary` | `#707070` | Metadata, dates, inactive nav |
| `ink-faint` | `#4a4a4a` | Tags, least important text |
| `accent` | `#7c9bb5` | Links — muted blue, quiet |
| `accent-hover` | `#9bb5cc` | Link hover state |
| `rule` | `rgba(255,255,255,0.07)` | Dividers, list separators |
| `rule-heavy` | `rgba(255,255,255,0.12)` | Blockquote borders |

## Depth Strategy

**None.** No shadows, no bordered containers, no elevation. Whitespace and `<hr>` dividers are the only structural tools. The page is the only surface.

## Typography

- **Typeface:** Inter only. Proportional everywhere. Monospace reserved for actual `<code>`.
- **Headings:** `text-3xl font-bold text-ink` — large, bold, no other decoration
- **Section labels:** `text-sm font-medium text-ink-secondary` — quiet, not shouty
- **Body:** `text-ink-secondary leading-relaxed` — comfortable reading
- **Metadata:** `text-xs text-ink-faint` or `text-sm text-ink-tertiary`

## Spacing

- Base unit: 4px (Tailwind default)
- Section separation: `mb-10` to `mb-12` — generous vertical rhythm
- Within sections: `mb-3` to `mb-4`
- Page padding: `px-5 py-12 md:py-20`

## Layout

- **Max width:** 640px, centered (`max-w-[640px] mx-auto`)
- **Navigation:** Inline top links with `gap-6`, no sidebar. Active = `text-ink`, inactive = `text-ink-tertiary`.
- **No mobile hamburger.** Nav is simple enough to always show.

## Component Patterns

### Lists (Projects, Stories)
- Use `divide-y divide-rule` for separation — no cards, no backgrounds
- Each item: title (linked, `text-ink font-medium`), description below (`text-sm text-ink-secondary`), metadata last (`text-xs text-ink-faint`)
- Tags rendered as plain text joined with ` · `

### Story Detail
- Title as `text-3xl font-bold`, author + date below in `text-sm text-ink-tertiary`
- Single `<hr>` before body content
- No breadcrumbs — nav handles wayfinding

### Homepage
- Name as heading, bio paragraph, social icons inline, then `<hr>`-separated sections
- Social icons: `text-ink-tertiary hover:text-ink-secondary`, 18px

## What NOT to Do

- No card containers or bordered boxes around content
- No sidebar navigation
- No monospace for non-code text
- No gradient text or colored highlights — `text-ink font-medium` for emphasis
- No animated arrows on links — just underline on hover
- No multiple accent colors — one muted blue only
