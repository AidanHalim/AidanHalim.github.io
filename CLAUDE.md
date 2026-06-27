# CLAUDE.md

Context for future sessions working on this repo: Aidan Halim's video editing portfolio, built with Astro and deployed to GitHub Pages.

## Design goals

Dark, minimal, clean — no UI framework, no web fonts, no visual clutter. Specifics:

- **Palette** (`src/styles/global.css` `:root`): background `#0b0c0e`, surface `#15171a`, border `#26282c`, text `#e8e9eb`, muted text `#9a9ca1`, single accent `#5ee0c4` (soft teal). Only one accent color is used anywhere on the site — resist adding a second.
- **Typography**: system font stack only (`-apple-system, Segoe UI, Roboto, ...`). Deliberate choice to avoid a web-font network request; the content (video thumbnails) carries the visual weight, not the chrome.
- **Styling approach**: shared tokens live once in `src/styles/global.css` as CSS custom properties; each component (`Nav.astro`, `Footer.astro`, `YouTubeEmbed.astro`, `VideoCard.astro`) has its own scoped `<style>` block for layout specifics. Don't introduce Tailwind or a CSS-in-JS library — this split is intentional and sufficient for a site this size.

## Page structure

Every page is wrapped in `src/layouts/BaseLayout.astro`, which renders `<Nav />` and `<Footer />` (from `src/components/`) around a `<slot />`, plus the `<head>` (title, meta description, canonical link, Open Graph + Twitter card tags using `Astro.site` to produce absolute URLs). **Nav and footer changes only ever need to happen in those two component files** — never duplicate nav/footer markup into a page.

Routes:
- `/` (`src/pages/index.astro`) — featured showreel (`VideoCard`) + short intro paragraph. Showreel is still a placeholder.
- `/experience` (`src/pages/experience.astro`) — two past roles, each with title/place/dates/bullets. Currently placeholder content with literal `TODO:` markers — replace before shipping.
- `/work` (`src/pages/work.astro`) — categorized editing portfolio with real content, see below.

Site title is set per-page as `"Aidan Halim, Video Editor"` (home) / `"Aidan Halim, Video Editor — Experience"` / `"— Work"`. `astro.config.mjs` sets `site: 'https://aidanhalim.github.io'` with no `base` (repo is `AidanHalim.github.io`, deploys at the domain root).

## Tier & category system (Work page)

`src/data/work.ts` exports `tiers: Tier[]`. Each `Tier` has a `slug`, `name`, and `categories: Category[]`; each `Category` has a `slug`, `name`, and `videos: Video[]` (`{ id, title, caption }`, `id` is the YouTube video ID, `caption` is the descriptive blurb shown beneath the embed). `src/pages/work.astro` only ever iterates `tiers` → `category` → `videos` — no tier or category name is hardcoded anywhere in the template.

Current structure: two tiers, three categories each.
- **Professional Work**: Cinematics, Performance Films, Event & Promotional.
- **Personal & Creative Work**: Narrative Film, Video Essays, Trailers.

**To add a category** to an existing tier: append one object to that tier's `categories` array. **To add a new tier**: append one object to the top-level `tiers` array. Neither requires touching `work.astro` or any component.

All videos in `work.ts` are real (CISSA event work, performance edits, narrative shorts, video essays, fan trailers) — this file is no longer placeholder content.

## YouTube embeds (click-to-load)

`src/components/YouTubeEmbed.astro` renders a thumbnail (`img.youtube.com/vi/{id}/hqdefault.jpg`) behind a play button and only creates the real `<iframe>` (`youtube-nocookie.com`) on click, so pages never pay for the YouTube player on load. It has no built-in caption — it's a pure media component.

`src/components/VideoCard.astro` wraps `YouTubeEmbed` and renders the video's `title` (as a heading) and `caption` (as a paragraph) beneath it. This is the component pages should use whenever a video needs visible context — used for every video on `/work` and for the homepage showreel, so there's no separate "hero video" component.

The click-handling `<script>` inside `YouTubeEmbed.astro` is plain, has no per-instance values baked in, and is byte-identical across every instance. Astro deduplicates identical inline scripts across multiple uses of the same component on one page, so this one script runs exactly once per page regardless of how many videos are embedded (verified: the built `/work` page has 12 `.yt-embed` instances across six categories but only one `<script type="module">` tag). **Do not add `is:inline` or `define:vars`** to this script — either would break the dedup and either duplicate the script per instance or stop it from running generically.

## Deployment

`.github/workflows/deploy.yml` builds with Node 22 and deploys to GitHub Pages via `actions/configure-pages` → `actions/upload-pages-artifact` → `actions/deploy-pages`, triggered on every push to `main`.

**One-time manual step required** (not done by the workflow): in the repo's GitHub Settings → Pages, set **Source** to "GitHub Actions" (it defaults to "Deploy from a branch"). Until that's changed, the workflow will fail at the deploy step.

## Known placeholders to replace

- The showreel video in `src/pages/index.astro`.
- Both role entries in `src/pages/experience.astro` (titles, org name, dates, bullet specifics — all marked with literal `TODO:` text).
- `public/og-image.svg` — a simple placeholder graphic. Works for Open Graph previews now, but some older crawlers (notably Facebook/LinkedIn) handle SVG `og:image` less reliably than PNG/JPG — consider swapping in a real screenshot or designed graphic later.

`src/data/work.ts` is no longer placeholder — it holds real portfolio content.
