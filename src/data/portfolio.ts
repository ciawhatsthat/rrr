export type PortfolioCategory = 'Hardwood' | 'LVP' | 'Tile' | 'Carpet' | 'Stairs' | 'Before-After';

export interface PortfolioItem {
  title: string;
  category: PortfolioCategory;
  'data-replace': string;
  alt: string;
  aspect?: string;
  caption: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    title: 'White oak living room',
    category: 'Hardwood',
    'data-replace': 'HARDWOOD: white oak living room, finished install, landscape',
    alt: 'Finished white oak hardwood floor in a living room',
    aspect: '4 / 3',
    caption: 'Finished hardwood floor with clean transitions and base trim.'
  },
  {
    title: 'Hardwood hallway tie-in',
    category: 'Hardwood',
    'data-replace': 'HARDWOOD: hallway tie-in, finished install, portrait',
    alt: 'Hardwood flooring tied into a hallway',
    aspect: '3 / 4',
    caption: 'Hardwood run through a hall with tight seams and even layout.'
  },
  {
    title: 'Engineered wood main level',
    category: 'Hardwood',
    'data-replace': 'ENGINEERED HARDWOOD: main level, finished install, landscape',
    alt: 'Engineered hardwood flooring across a main level',
    aspect: '4 / 3',
    caption: 'Engineered wood option for a Colorado main-floor install.'
  },
  {
    title: 'LVP kitchen floor',
    category: 'LVP',
    'data-replace': 'LVP: kitchen install, finished floor, landscape',
    alt: 'Luxury vinyl plank flooring installed in a kitchen',
    aspect: '4 / 3',
    caption: 'Durable LVP installation for a kitchen and dining area.'
  },
  {
    title: 'LVP basement',
    category: 'LVP',
    'data-replace': 'LVP: basement install over prepared subfloor, landscape',
    alt: 'Luxury vinyl plank flooring in a basement',
    aspect: '4 / 3',
    caption: 'Basement LVP with subfloor prep before installation.'
  },
  {
    title: 'Bathroom LVP repair',
    category: 'Before-After',
    'data-replace': 'BEFORE-AFTER: bathroom rotten subfloor repair and new LVP',
    alt: 'Bathroom floor before and after subfloor repair and LVP installation',
    aspect: '4 / 3',
    caption: 'Tile and toilet removed, rotten subfloor replaced, new LVP and wood base installed.'
  },
  {
    title: 'Porcelain tile bath',
    category: 'Tile',
    'data-replace': 'TILE: porcelain bathroom floor, finished install, portrait',
    alt: 'Porcelain tile bathroom floor installation',
    aspect: '3 / 4',
    caption: 'Bathroom tile with level layout and clean cuts.'
  },
  {
    title: 'Ceramic tile entry',
    category: 'Tile',
    'data-replace': 'TILE: ceramic entry floor, finished install, landscape',
    alt: 'Ceramic tile flooring in an entryway',
    aspect: '4 / 3',
    caption: 'Entry tile built for heavy daily traffic.'
  },
  {
    title: 'Tile laundry room',
    category: 'Tile',
    'data-replace': 'TILE: laundry room floor, finished install, landscape',
    alt: 'Tile floor in a laundry room',
    aspect: '4 / 3',
    caption: 'Tile floor installed after proper prep for a utility space.'
  },
  {
    title: 'Carpet bedroom',
    category: 'Carpet',
    'data-replace': 'CARPET: bedroom install, finished room, landscape',
    alt: 'Fresh carpet installed in a bedroom',
    aspect: '4 / 3',
    caption: 'Bedroom carpet installed with careful stretching and trim work.'
  },
  {
    title: 'Carpet stairs',
    category: 'Carpet',
    'data-replace': 'CARPET: stair carpet install, finished stairs, portrait',
    alt: 'Carpet installed on stairs',
    aspect: '3 / 4',
    caption: 'Carpeted stairs with clean edges and tight fit.'
  },
  {
    title: 'Basement carpet',
    category: 'Carpet',
    'data-replace': 'CARPET: basement room, finished install, landscape',
    alt: 'Carpet installed in a basement room',
    aspect: '4 / 3',
    caption: 'Comfortable basement carpet installation.'
  },
  {
    title: 'Wood stair treads',
    category: 'Stairs',
    'data-replace': 'STAIRS: hardwood treads and risers, finished install, portrait',
    alt: 'Hardwood stair treads and risers',
    aspect: '3 / 4',
    caption: 'Stair flooring work with tight nosing and trim details.'
  },
  {
    title: 'Stair landing transition',
    category: 'Stairs',
    'data-replace': 'STAIRS: landing transition to hallway floor, landscape',
    alt: 'Stair landing with floor transition',
    aspect: '4 / 3',
    caption: 'Landing transition planned with the hallway floor layout.'
  },
  {
    title: 'LVP stair update',
    category: 'Stairs',
    'data-replace': 'STAIRS: LVP stair update, finished install, portrait',
    alt: 'LVP flooring installed on stairs',
    aspect: '3 / 4',
    caption: 'Stair update using durable plank material.'
  },
  {
    title: 'Weight room rubber floor',
    category: 'Before-After',
    'data-replace': 'BEFORE-AFTER: rubber flooring over concrete in weight room',
    alt: 'Weight room before and after rubber flooring installation',
    aspect: '4 / 3',
    caption: 'Rubber flooring installed over concrete for a home weight room.'
  },
  {
    title: 'Old floor tear-out',
    category: 'Before-After',
    'data-replace': 'BEFORE-AFTER: old floor tear-out before new installation',
    alt: 'Old flooring removed before a new floor installation',
    aspect: '4 / 3',
    caption: 'Tear-out and prep before the new floor goes down.'
  },
  {
    title: 'Subfloor prep',
    category: 'Before-After',
    'data-replace': 'BEFORE-AFTER: subfloor prep and repair, in progress',
    alt: 'Subfloor prepared and repaired before floor installation',
    aspect: '4 / 3',
    caption: 'Subfloor work that keeps the finished floor flat and solid.'
  },
  {
    title: 'Wide plank hardwood',
    category: 'Hardwood',
    'data-replace': 'HARDWOOD: wide plank floor, finished install, landscape',
    alt: 'Wide plank hardwood floor installation',
    aspect: '4 / 3',
    caption: 'Wide plank hardwood layout in a finished living space.'
  },
  {
    title: 'LVP whole-room install',
    category: 'LVP',
    'data-replace': 'LVP: whole-room finished install, landscape',
    alt: 'Luxury vinyl plank installed across a whole room',
    aspect: '4 / 3',
    caption: 'Whole-room LVP with reserved expansion and clean trim.'
  },
  {
    title: 'Sheet vinyl utility area',
    category: 'LVP',
    'data-replace': 'SHEET VINYL: utility area finished install, landscape',
    alt: 'Sheet vinyl flooring in a utility area',
    aspect: '4 / 3',
    caption: 'Sheet vinyl option for utility and practical spaces.'
  },
  {
    title: 'Tile shower approach',
    category: 'Tile',
    'data-replace': 'TILE: bathroom floor at shower approach, portrait',
    alt: 'Tile floor at a bathroom shower approach',
    aspect: '3 / 4',
    caption: 'Tile work around bathroom fixtures and transitions.'
  },
  {
    title: 'Laminate family room',
    category: 'LVP',
    'data-replace': 'LAMINATE: family room finished install, landscape',
    alt: 'Laminate flooring installed in a family room',
    aspect: '4 / 3',
    caption: 'Laminate flooring noted as a related floating-floor option.'
  },
  {
    title: 'Stair detail closeup',
    category: 'Stairs',
    'data-replace': 'STAIRS: tread nosing detail, closeup',
    alt: 'Closeup of a stair tread nosing detail',
    aspect: '4 / 3',
    caption: 'Stair detail showing the kind of finish work homeowners notice.'
  }
];

export const portfolioCategories: PortfolioCategory[] = [
  'Hardwood',
  'LVP',
  'Tile',
  'Carpet',
  'Stairs',
  'Before-After'
];
