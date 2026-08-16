export const site = {
  name: 'Red Rock Remodeling',
  owner: 'Andrew',
  baseUrl: 'https://www.red-rock-remodeling.net',
  domain: 'red-rock-remodeling.net',
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
  primaryAreaLinks: [
    { city: 'Berthoud', href: '/areas/berthoud/' },
    { city: 'Longmont', href: '/areas/longmont/' },
    { city: 'Loveland', href: '/areas/loveland/' },
    { city: 'Boulder', href: '/areas/boulder/' },
    { city: 'Fort Collins', href: '/areas/fort-collins/' }
  ],
  serviceAreaCities: [
    'Arvada',
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
  services: ['Hardwood', 'Luxury Vinyl Plank', 'Tile', 'Carpet', 'Stairs']
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, site.baseUrl).toString();
}
