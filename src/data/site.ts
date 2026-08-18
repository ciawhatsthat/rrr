export const site = {
  name: 'Red Rock Remodeling',
  owner: 'Andrew',
  phoneDisplay: '720-429-9394',
  phoneHref: 'tel:+17204299394',
  phoneE164: '+17204299394',
  email: 'ajwillenbring@gmail.com',
  logoPath: '/logo.png',
  ogImagePath: '/og-default.png',
  priceRange: '$$',
  address: {
    locality: 'Berthoud',
    region: 'CO',
    postalCode: '80513',
    country: 'US'
  },
  geo: {
    latitude: 40.3083,
    longitude: -105.0811
  },
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
    display: 'Monday-Friday, 8:00 AM-6:00 PM'
  },
  social: {
    facebook: 'https://facebook.com/redrockremodelingllc',
    instagram: 'https://instagram.com/redrockremodelingllc'
  },
  owners: 'Andrew and Trevor Willenbring',
  yearsExperience: 30,
  primaryAreaLinks: [
    { city: 'Berthoud', href: '/areas/berthoud/' },
    { city: 'Longmont', href: '/areas/longmont/' },
    { city: 'Loveland', href: '/areas/loveland/' },
    { city: 'Boulder', href: '/areas/boulder/' },
    { city: 'Fort Collins', href: '/areas/fort-collins/' },
    { city: 'Denver', href: '/areas/denver/' },
    { city: 'Aurora', href: '/areas/aurora/' }
  ],
  serviceAreaCities: [
    'Arvada',
    'Aurora',
    'Berthoud',
    'Boulder',
    'Brighton',
    'Broomfield',
    'Castle Rock',
    'Centennial',
    'Denver',
    'Erie',
    'Fort Collins',
    'Golden',
    'Gunbarrel',
    'Johnstown',
    'Lafayette',
    'Littleton',
    'Longmont',
    'Louisville',
    'Loveland',
    'Lyons',
    'Mead',
    'Northglenn',
    'Parker',
    'Thornton',
    'Westminster',
    'Wheat Ridge'
  ],
  services: ['Luxury Vinyl Plank', 'Hardwood', 'Laminate', 'Tile', 'Stairs', 'Rubber Flooring', 'Subfloor Repair'],
  alsoOnRequest: ['Carpet', 'Sheet vinyl'],
  faq: [
    { q: 'Are you licensed and insured?', a: 'Yes.' },
    { q: 'Do you offer financing?', a: 'No. We keep it simple: a written bid, then the work.' },
    { q: 'How long does a job take?', a: 'A single room is usually one day. A whole 2,000 sq ft house with tear-out takes about a week.' },
    { q: 'Do you do the tear-out and subfloor work too?', a: 'Yes, and it is in the bid. Tear-out, haul-away, leveling, vapor barrier, rotten subfloor cut out and replaced. It is the part that makes the new floor last.' },
    { q: 'Do you sand and refinish existing hardwood?', a: 'No. We install new floors. If your old hardwood is worn, we will tell you honestly whether replacing it makes sense.' },
    { q: 'What area do you cover?', a: 'The Front Range from Fort Collins down through Denver to Castle Rock. Based in Berthoud, 30 years of jobs across the Denver metro. Do not see your town? Call.' }
  ]
} as const;

/** Site origin and base path come from astro.config.mjs (site / base). */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // '' at root, '/rrr' on GitHub project pages

/** Prefix a root-relative path ('/services/') with the deploy base path. Use for every internal href/src. */
export function withBase(path: string) {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Absolute URL for canonical / OG / JSON-LD. */
export function absoluteUrl(path = '/') {
  return new URL(withBase(path), import.meta.env.SITE).toString();
}
