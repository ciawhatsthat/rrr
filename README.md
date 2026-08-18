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

Real photos live in `src/assets/photos/` (web-sized, semantically named; `_manifest.json` maps each
back to its original in `old-site/`) and are referenced from content collections via Astro's
`image()` schema helper, rendered through `src/components/Photo.astro` (Astro `<Image>`,
responsive widths, lazy, aspect reserved). No placeholders remain.

Originals: `old-site/images/` (scraped from the Webador site) and
`old-site/images/andrew-2026-08-18/` (emailed by Andrew). Both gitignored.

## Open TODOs

- Contact form: set `formAccessKey` in `src/data/site.ts` to the Web3Forms key (get one at web3forms.com with the
  email that should receive leads). Until then it falls back to `mailto:`. Submissions redirect to `/thanks/`.
- Location pages: Berthoud, Loveland, Boulder, Fort Collins still have `localNote` TODOs (no local job story yet).
  Longmont, Denver, Aurora have real ones.
- Andrew's inline email images (Pine 1000002330/32/33, Aurora 1000002048/51-53, Longmont 1000001169-1197)
  were not in the attachment zips; grab if wanted.
- Real reviews → `src/content/testimonials/` (none yet; the old site's quote was fabricated and removed).
- Custom domain cutover (see Deploy).
