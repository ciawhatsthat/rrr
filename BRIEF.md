# Red Rock Remodeling — Site Rebuild Brief

> **For Codex.** This is the spec for building the new red-rock-remodeling.net from scratch. Read this fully before generating any code. When in doubt, ask before assuming.

---

## The one-line goal

Build a clean, fast, SEO-optimized Astro site for a Berthoud, CO flooring contractor that ranks for "flooring contractor [city]" across the Colorado Front Range and looks meaningfully more professional than the Webador site it's replacing.

## The business (context, not copy)

**Red Rock Remodeling** — flooring contractor based in Berthoud, CO. Owner is Andrew. Phone: 720-429-9394. Domain: red-rock-remodeling.net.

Services include hardwood, engineered hardwood, laminate, luxury vinyl plank (LVP), sheet vinyl, ceramic/porcelain tile, carpet, stairs, and rubber flooring. They also do tear-out, subfloor repair, and trim/base work as part of installs. 30+ years of experience. Service area is the Front Range from Fort Collins down to Castle Rock.

Currently miscategorized on Google as "Remodeler" and presents itself online as a general remodeler. The site we're building leans hard into **flooring contractor** as the primary identity. Don't write copy that calls them a "remodeling company" or leads with kitchen/bath remodels — flooring is the lane.

---

## Tech stack

**Astro** with TypeScript, content collections, no UI framework dependency (vanilla components only). Reasons:
- Static output deploys cleanly to GitHub Pages
- Content collections give us typed schemas for services, locations, testimonials
- Zero JS shipped to client unless we explicitly opt in
- Adding location pages later (or now) is trivial via dynamic routing

Use the latest stable Astro. Use `@astrojs/sitemap` for sitemap generation. Use `@astrojs/image` or Astro's built-in `<Image />` for image optimization. No Tailwind unless you have a strong reason — I want scoped component CSS with a small global tokens file.

**Hard constraints:**
- No client-side JS frameworks (no React, Vue, Svelte islands)
- No CSS-in-JS, no styled-components — vanilla scoped styles via Astro's `<style>` blocks
- No analytics SDKs or third-party scripts in v1
- No service worker, no PWA scaffolding
- No fonts loaded from Google Fonts — use system font stack OR self-host a single woff2 file if a custom font is genuinely justified

**Output:** static site, deployable as a folder of HTML/CSS/JS to GitHub Pages.

---

## Page structure

```
/                       Home
/services/              Services overview
/services/hardwood/     Service detail (one per service)
/services/lvp/
/services/tile/
/services/carpet/
/services/stairs/
/portfolio/             Photo gallery, filterable by category
/contact/               Contact form + service area map
/areas/berthoud/        Location pages (placeholder content for v1)
/areas/longmont/
/areas/loveland/
/areas/boulder/
/areas/fort-collins/
```

Service detail pages and location pages should be generated from content collections so we're not maintaining 10 nearly-identical templates. Location pages in v1 can use a shared template with city-specific intro paragraphs (placeholder copy is fine — flag it clearly).

---

## SEO requirements — non-negotiable

Every page must have:

**Title tag pattern:**
- Home: `Flooring Contractor in Berthoud, CO | Red Rock Remodeling`
- Services overview: `Flooring Services — Hardwood, LVP, Tile, Carpet | Red Rock Remodeling`
- Service detail: `[Service] Installation in [Region] | Red Rock Remodeling` (e.g., "Hardwood Floor Installation in Northern Colorado")
- Location: `Flooring Contractor in [City], CO | Red Rock Remodeling`
- Portfolio: `Flooring Portfolio — Red Rock Remodeling`
- Contact: `Contact Red Rock Remodeling — Flooring Contractor in Berthoud, CO`

**Meta description:** Hand-written per page, 140-160 chars, includes the primary keyword and a benefit/CTA. Not generated boilerplate.

**Heading structure:** Exactly **one** H1 per page. Subsequent sections use H2, H3 in proper hierarchy. The current Webador site has FIVE H1s on the homepage — we are explicitly fixing this. If you find yourself wanting a second H1 for visual size, use H2 with custom styling instead.

**LocalBusiness schema (JSON-LD)** in `<head>` of every page:

```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://www.red-rock-remodeling.net/#business",
  "name": "Red Rock Remodeling",
  "image": "https://www.red-rock-remodeling.net/logo.png",
  "url": "https://www.red-rock-remodeling.net/",
  "telephone": "+17204299394",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Berthoud",
    "addressRegion": "CO",
    "postalCode": "80513",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Berthoud" },
    { "@type": "City", "name": "Longmont" },
    { "@type": "City", "name": "Loveland" },
    { "@type": "City", "name": "Boulder" },
    { "@type": "City", "name": "Fort Collins" }
    // ...full list from content collection
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.3083,
    "longitude": -105.0811
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "18:00"
  }]
}
```

Build this as a reusable Astro component that takes optional `aggregateRating` once we have enough reviews to justify including it. Don't include `aggregateRating` in v1 — we only have 3 reviews and that's too few.

**Other meta:**
- Open Graph tags on every page (og:title, og:description, og:image, og:url, og:type)
- Twitter card tags (summary_large_image)
- `<link rel="canonical">` on every page
- robots.txt allowing everything except `/admin*` (defensive — we don't have admin but don't want to forget later)
- sitemap.xml generated by `@astrojs/sitemap`

---

## Visual direction

**Modern contractor aesthetic.** Reference points: think Houzz top-rated profiles, the better Squarespace contractor templates, NOT the WordPress contractor template aesthetic with stock-photo hero sliders and gradient buttons.

**Brand:**
- Primary color: deep red from existing logo (`#A82822` or close — sample from logo file)
- Neutrals: warm whites, soft greys, near-black for text (not pure black)
- Accent: a single warm beige or terracotta tone if needed for variety

**Type:**
- Headings: a single serif or modern grotesque sans (something with character; not Inter or system-ui — those read as "tech startup")
- Body: clean sans-serif. System font stack is fine. Aim for ~17-18px body size, 1.6 line-height.
- Self-host one woff2 for the heading face if used. Don't load Google Fonts.

**Layout principles:**
- Photos are the hero. Big, edge-to-edge or near-edge-to-edge on the home page. Trust the work to sell itself.
- Generous whitespace. Sections should breathe. No dense paragraphs of marketing copy.
- One clear CTA per section. Phone number prominent everywhere; contact form on contact page only.
- Mobile-first. ~60% of his traffic will be mobile homeowners on Google.

**Specifically avoid:**
- Hero sliders / carousels
- "Why choose us" sections with generic icons (clipboard, handshake, clock)
- Pop-ups or chat widgets in v1
- Testimonial sliders — use a static quote, beautifully typeset
- Stock photography of any kind

---

## Content requirements

### Home page

Sections, in order:

1. **Hero** — full-width photo (placeholder), site title, one-sentence positioning, phone number CTA, "See our work" link to portfolio
2. **Services grid** — 4-6 cards: Hardwood, LVP, Tile, Carpet, Stairs, (maybe Rubber). Each card: photo placeholder + service name + 1-sentence description + "Learn more" link
3. **About / trust** — short paragraph: 30+ years experience, Berthoud-based, family-owned. Include a real fact or two from the existing site copy.
4. **Featured project / before-after** — pull the bathroom subfloor story (it's compelling). Photo placeholder, brief narrative.
5. **Service area** — list of cities with a simple map or stylized graphic. Don't embed Google Maps in v1 (loads heavy iframe).
6. **Single testimonial** — Emily Johnson quote from existing site, beautifully presented.
7. **Contact CTA** — phone, "Schedule a free consultation," link to contact page.

### Services overview page

Grid of service cards (same as home but more of them, with longer descriptions). Each links to a service detail page.

### Service detail pages

Template:
- H1: "[Service Name] Installation in Northern Colorado"
- Lead paragraph: what the service is, who it's for, what makes their work good at it
- Material options (for hardwood: oak, hickory, maple, etc.; for LVP: explain WPC vs SPC briefly)
- 4-6 photos of that service category (placeholders)
- Typical project info: timeline, what's included, what to expect
- CTA: phone + contact link

Content can be ~300-500 words per service page. Pull factual content from existing site where applicable; write fresh where not. Flag placeholder sections clearly with `<!-- TODO: get specifics from AJ -->`.

### Portfolio page

- Filterable grid (vanilla JS only — no framework). Categories: All / Hardwood / LVP / Tile / Stairs / Before-After
- Each item is a photo card with optional caption
- Click expands to lightbox (build minimal, no library — or use the native dialog element)
- Roughly 20-30 photo slots, all placeholders for now
- Don't use a heavy lightbox library (lightgallery, fancybox). Native `<dialog>` element or a 30-line vanilla JS modal is enough.

### Contact page

- Phone number (huge, tappable)
- Email (placeholder — Andrew currently uses Gmail but Phase 2 might add a domain email)
- Contact form: Name, Email, Phone, Project type (select), Message
- Service area (text list)
- Hours
- "Don't see your city? Call us." — keeps the existing language, it's friendly

Form should submit to a placeholder endpoint (Formspree, Netlify Forms, or just a `mailto:` fallback). Don't build a backend.

### Location pages (v1 placeholder versions)

Template per location:
- H1: "Flooring Contractor in [City], CO"
- Intro paragraph: "Red Rock Remodeling has been installing floors for [City] homeowners for over 30 years. [TODO: 2-3 sentences specific to this city — neighborhoods we work in, types of homes we've done, anything local]"
- Services we offer (link to service pages)
- Selected portfolio photos that were jobs in that city (placeholder)
- Testimonial if available
- Same CTA pattern

Flag the TODO sections clearly. We'll fill in real local content in a later round.

---

## Photo handling

Photos are not yet selected — Andrew is picking his own. For all photo slots, use placeholder elements with this structure:

```astro
<figure class="photo-placeholder" data-replace="HARDWOOD: hero, finished install, landscape">
  <div class="placeholder-content">
    <span>HARDWOOD HERO</span>
    <small>Finished install, landscape orientation</small>
  </div>
</figure>
```

Style placeholders so they look intentional during dev (subtle grey, centered label, proper aspect ratio reserved) — not broken `<img>` tags with red X marks.

When real photos come in, they'll go in `src/assets/photos/` and get loaded via Astro's `<Image />` component for automatic optimization. Build the components ready for this swap — don't hardcode photo handling in a way that'll need rewriting later.

`grep "data-replace"` in the source tree should produce a complete list of unfilled photo slots. Make sure every placeholder has this attribute with a descriptive value.

---

## Components to build

Minimum component set:
- `<Layout>` — base layout with `<head>`, header, footer
- `<Header>` — logo, nav, phone CTA
- `<Footer>` — quick links, NAP info, service area highlights, copyright
- `<SchemaLocalBusiness>` — the JSON-LD component (props: optional rating)
- `<MetaTags>` — title, description, OG, Twitter, canonical
- `<ServiceCard>` — used on home + services pages
- `<PhotoPlaceholder>` — the dev placeholder described above
- `<PortfolioGrid>` — the filterable gallery
- `<ContactForm>` — the form component
- `<Testimonial>` — styled quote block

Content collections:
- `services` — one entry per service (hardwood, lvp, tile, carpet, stairs)
- `locations` — one entry per city (start with the 5 listed above)
- `testimonials` — start with one entry (Emily Johnson)

Each collection should have a typed Zod schema.

---

## Accessibility

- Semantic HTML (article, section, nav, footer used appropriately)
- All images get descriptive alt text (for placeholders: alt should describe what photo *will* go there)
- Color contrast: minimum WCAG AA (4.5:1 for body, 3:1 for large text). Test the red on white especially — `#A82822` should pass on white.
- Focus styles visible — don't suppress the default outline without replacing it
- Form labels properly associated with inputs
- Skip-to-content link in the header
- `<html lang="en">`

---

## Performance targets

- Lighthouse Performance: 95+ on mobile
- Lighthouse SEO: 100
- Lighthouse Accessibility: 95+
- Total page weight per page: under 500KB (excluding photos, which will be optimized via Astro's `<Image />`)
- LCP under 2.0s on a 4G simulation
- Zero blocking JS on initial render
- No layout shift on image load (always reserve aspect ratio)

---

## What I want you to do first

Before generating any code:

1. **Restate this brief back to me in your own words** — especially the structural decisions, SEO requirements, and what's out of scope. Helps catch misreads.
2. **Ask any clarifying questions** about ambiguous points. Specifically: I have not specified the exact services list count, the exact location list, or whether the contact form should use Formspree or Netlify. Ask.
3. **Propose a file/folder structure** for the Astro project before scaffolding it.

Then we'll iterate from there.

## What's NOT in scope

These will come up but are explicitly Phase 2 or later:

- Blog / articles
- Project case studies with long-form narratives
- Real photo selection and placement (Andrew is picking his own; we're building with placeholders)
- Custom domain email or any email infrastructure
- Migration from Webador (handled at DNS cutover, not in code)
- Booking / scheduling integration
- Reviews integration / live GBP reviews on site
- Multi-language support
- Dark mode

If you find yourself wanting to add scope, ask first.

---

## Repository / deployment notes

- Repo will live on GitHub, deployed via GitHub Pages from the `gh-pages` branch (or `main`/docs/ — your call, but document it)
- Custom domain: red-rock-remodeling.net via CNAME file in the output
- HTTPS via GitHub Pages' built-in Let's Encrypt
- No build secrets needed for v1 (no Formspree key yet, no analytics)
- Commit messages: conventional commits if you want, but not required. Just be descriptive.
- Don't commit `node_modules`, `dist`, or `.env` files. Include a sensible `.gitignore`.

---

## Tone for any copy you write

The owner is a 30+ year veteran tradesman, not a marketing professional. Copy should sound like that:

- Direct, plainspoken, not salesy
- No "Welcome to" anything. Ever.
- No "we are committed to providing exceptional [whatever]" — that's the dead language of bad contractor sites
- Specific over vague: "We installed white oak hardwood in this 1,200 sqft Loveland home" beats "We deliver high-quality craftsmanship to our valued clients"
- First-person plural is fine ("We tear out the old, prep the subfloor, and install your new floor with care.")
- Avoid hyperbole ("the best," "the finest," "unmatched"). Show, don't claim.

If you're not sure whether copy is on-tone, ask me. Bad copy is worse than placeholder copy.