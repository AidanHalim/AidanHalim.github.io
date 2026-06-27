# Video Editing Portfolio

A dark, minimal portfolio site showcasing my video editing work, built as a fast static site with [Astro](https://astro.build) and deployed to GitHub Pages.

**Live site:** [aidanhalim.github.io](https://aidanhalim.github.io)

## About

I'm Aidan Halim, a video editor and computer science student. This site collects my editing work and experience in one place. Videos are organized by category (commentary, montages, infographics, and more) and embedded from YouTube with click-to-load players so the pages stay fast.

The site is also a small engineering project in its own right: a multi-page Astro build with shared layout components, lazy-loaded video embeds, Open Graph metadata for clean link previews, and automated deployment.

## Stack

- **[Astro](https://astro.build)** for the static site and component-based pages
- **HTML / CSS** for a dark, minimal design (no heavy UI framework)
- **GitHub Pages** for free hosting
- **GitHub Actions** for automatic build and deploy on every push

## Structure

- **Home** featured showreel and intro
- **Experience** past roles and what I did in them
- **Work** editing projects grouped by category, embedded from YouTube

Shared navigation and footer live in a single layout component, so site-wide changes happen in one place.

## Running it locally

You'll need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install      # install dependencies
npm run dev      # start the local dev server
npm run build    # build the production site
npm run preview  # preview the production build locally
```

The dev server runs at `http://localhost:4321` by default.

## Deployment

Pushing to the `main` branch triggers a GitHub Actions workflow that builds the site and publishes it to GitHub Pages. No manual deploy step.

## Contact

Reach me at aidanhalim290@gmail.com or find a list of all my work on [Notion](https://aidan-halim-editing.notion.site/1d0f2d89f70a800cb3dcc75b4bf356dd?v=1d0f2d89f70a8010b8d6000c387e59fb).
