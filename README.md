# Red Rock Remodeling — red-rock-remodeling.net

Static Astro site for Red Rock Remodeling, a flooring contractor in Berthoud, CO.
See [BRIEF.md](BRIEF.md) for the full spec.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run check    # astro check (types + a11y hints)
```

## Deploy

Deployed to GitHub Pages by [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
on every push to `main` (build → upload `dist/` → deploy-pages). No `gh-pages` branch.

One-time setup in the GitHub repo: **Settings → Pages → Source: GitHub Actions**.

**Current target: `https://ciawhatsthat.github.io/rrr/`** (project page, base path `/rrr`).
`site` and `base` are set in `astro.config.mjs`; every internal link goes through
`withBase()` from `src/data/site.ts`, so the base path is applied in one place.

**Switching to the custom domain later** (red-rock-remodeling.net):
1. In `astro.config.mjs` change the defaults to `SITE_URL = 'https://www.red-rock-remodeling.net'`
   and `SITE_BASE = '/'` (or set those env vars in the workflow).
2. Restore `public/CNAME` containing `red-rock-remodeling.net`.
3. Update the `Sitemap:` line in `public/robots.txt`.
4. Point DNS at GitHub Pages, set the custom domain in Settings → Pages, enable "Enforce HTTPS".

## Photo review app (for Andrew)

`review-app/` is a separate zero-dependency Node app, kept **out of git** (gitignored) and pushed
by hand to a DigitalOcean droplet for a one-time review. See `review-app/README.md` locally.

## Content

- `src/content/services/*.md` — one per service (drives `/services/<slug>/`)
- `src/content/locations/*.md` — one per city (drives `/areas/<slug>/`)
- `src/content/testimonials/*.md`
- `src/data/site.ts` — NAP, hours, service-area city list, social links
- `src/data/portfolio.ts` — portfolio grid items

## Photos

All photo slots are placeholders. `grep -r "data-replace" src` lists every unfilled slot.
Real photos go in `src/assets/photos/` and get wired through Astro's `<Image />`.

## Open TODOs

- Contact form posts via `mailto:` — swap for Formspree/Netlify when chosen (`src/components/ContactForm.astro`)
- Location pages have `TODO: get specifics from AJ` notes for local copy
- Real photo selection (Andrew)
