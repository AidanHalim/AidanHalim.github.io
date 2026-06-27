# CLAUDE.md

Context for future sessions working on this repo: Aidan Halim's video editing portfolio, built with Astro and deployed to GitHub Pages.

## Design goals

Dark, minimal, clean — no UI framework, no web fonts, no visual clutter. Specifics:

- **Palette** (`src/styles/global.css` `:root`): background `#0b0c0e`, surface `#15171a`, border `#26282c`, text `#e8e9eb`, muted text `#9a9ca1`, single accent `#5ee0c4` (soft teal). Only one accent color is used anywhere on the site — resist adding a second.
- **Typography**: system font stack only (`-apple-system, Segoe UI, Roboto, ...`). Deliberate choice to avoid a web-font network request; the content (video thumbnails) carries the visual weight, not the chrome.
- **Styling approach**: shared tokens live once in `src/styles/global.css` as CSS custom properties; each component (`Nav.astro`, `Footer.astro`, `YouTubeEmbed.astro`, `VideoCard.astro`, `VideoLightbox.astro`) has its own scoped `<style>` block for layout specifics. Don't introduce Tailwind or a CSS-in-JS library — this split is intentional and sufficient for a site this size.

## Page structure

Every page is wrapped in `src/layouts/BaseLayout.astro`, which renders `<Nav />` and `<Footer />` (from `src/components/`) around a `<slot />`, plus the `<head>` (title, meta description, canonical link, Open Graph + Twitter card tags using `Astro.site` to produce absolute URLs). **Nav and footer changes only ever need to happen in those two component files** — never duplicate nav/footer markup into a page.

Routes:
- `/` (`src/pages/index.astro`) — text-led hero (name, role, muted positioning line, "View work" button linking to `/work`) + a two-group skills section (Technical / Creative & Production, equal-weight columns via `.skills__groups { grid-template-columns: 1fr 1fr }`, stacking on mobile). No video on this page — the showreel placeholder was removed entirely rather than filled in.
- `/experience` (`src/pages/experience.astro`) — two real past roles (PowerSwing Jakarta, CISSA), each with title/place/dates/optional type badge/bullets.
- `/work` (`src/pages/work.astro`) — categorized editing portfolio with real content, see below.

Site title is set per-page as `"Aidan Halim, Video Editor"` (home) / `"Aidan Halim, Video Editor — Experience"` / `"— Work"`. `astro.config.mjs` sets `site: 'https://aidanhalim.github.io'` with no `base` (repo is `AidanHalim.github.io`, deploys at the domain root).

## Tier & category system (Work page)

`src/data/work.ts` exports `tiers: Tier[]`. Each `Tier` has a `slug`, `name`, and `categories: Category[]`; each `Category` has a `slug`, `name`, and `videos: Video[]` (`{ id, title, caption }`, `id` is the YouTube video ID, `caption` is the descriptive blurb shown beneath the embed). `src/pages/work.astro` only ever iterates `tiers` → `category` → `videos` — no tier or category name is hardcoded anywhere in the template.

Current structure: two tiers, three categories each.
- **Professional Work**: Cinematics, Performance Films, Event & Promotional.
- **Personal & Creative Work**: Narrative Film, Video Essays, Trailers.

**To add a category** to an existing tier: append one object to that tier's `categories` array. **To add a new tier**: append one object to the top-level `tiers` array. Neither requires touching `work.astro` or any component.

All videos in `work.ts` are real (CISSA event work, performance edits, narrative shorts, video essays, fan trailers) — this file is no longer placeholder content.

## YouTube embeds (click-to-load lightbox)

`src/components/YouTubeEmbed.astro` is pure presentation: a thumbnail (`img.youtube.com/vi/{id}/hqdefault.jpg`) behind a play button, no iframe and no script of its own.

`src/components/VideoCard.astro` wraps it and stamps the surrounding `<figure class="video-card">` with `data-video-id` / `data-title` / `data-caption` — that's the data the lightbox reads. It also renders `title` and `caption` as visible heading/paragraph beneath the thumbnail. This is the component pages should use whenever a video needs visible context. As of the text-led homepage hero, `/work` is the only page that uses it.

`src/components/VideoLightbox.astro` is rendered exactly once, from `BaseLayout.astro`, so every page gets one overlay regardless of how many videos it has. Its script listens for clicks on `.yt-embed__trigger` via delegation on `document` (catches every `VideoCard` on the page, however many there are), builds the navigable video list from every `.video-card` on the page in DOM order, and opens the clicked video full-size over a blurred backdrop with title/caption, a close button, and Prev/Next arrows (also wired to ←/→ and Escape). The iframe is only created when the lightbox opens and is fully torn down (`replaceChildren()`) on close or when navigating, so playback always stops and nothing loads until a thumbnail is actually clicked.

Because there's only ever one `VideoLightbox` instance per page, none of this depends on Astro's inline-script dedup behavior (unlike the old in-place iframe-swap this replaced) — it's a single component with a single script, guarded by the same `dataset.wired` idempotency pattern used elsewhere on the site.

## Deployment

`.github/workflows/deploy.yml` builds with Node 22 and deploys to GitHub Pages via `actions/configure-pages` → `actions/upload-pages-artifact` → `actions/deploy-pages`, triggered on every push to `main`.

**One-time manual step required** (not done by the workflow): in the repo's GitHub Settings → Pages, set **Source** to "GitHub Actions" (it defaults to "Deploy from a branch"). Until that's changed, the workflow will fail at the deploy step.

## Known placeholders to replace

- `public/og-image.svg` — a simple placeholder graphic. Works for Open Graph previews now, but some older crawlers (notably Facebook/LinkedIn) handle SVG `og:image` less reliably than PNG/JPG — consider swapping in a real screenshot or designed graphic later.

`src/data/work.ts`, `src/pages/experience.astro`, and `src/pages/index.astro` are no longer placeholder — they hold real content.
