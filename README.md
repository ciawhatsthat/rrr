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
Custom domain is set by [public/CNAME](public/CNAME) (`red-rock-remodeling.net`);
point the domain's DNS at GitHub Pages and enable "Enforce HTTPS" once the cert issues.
Canonical URLs use `https://www.red-rock-remodeling.net` (see `astro.config.mjs` and
`src/data/site.ts`) — GitHub Pages redirects apex ↔ www automatically when both DNS
records exist.

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
