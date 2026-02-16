import { Product, TeamMember } from './types';

export const NAV_LINKS = [
  { label: 'Collection', href: '#collection' },
  { label: 'The Workshop', href: '#team' },
  { label: 'Care Engine', href: '#care-engine' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Nordic River',
    category: 'Coffee Tables',
    price: '$2,400',
    image: 'https://images.unsplash.com/photo-1605518216938-7f31b8af7880?q=80&w=800&auto=format&fit=crop', // Minimalist wood table
    description: 'Black walnut meet translucent sapphire resin.'
  },
  {
    id: '2',
    name: 'Highland Edge',
    category: 'Knives',
    price: '$450',
    image: 'https://images.unsplash.com/photo-1593112932311-667dc983296c?q=80&w=800&auto=format&fit=crop', // Chef knife on board
    description: 'Stabilized burl wood handle with damascus steel.'
  },
  {
    id: '3',
    name: 'Coastal Hex',
    category: 'Coasters',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1616428383216-5b430e32f05a?q=80&w=800&auto=format&fit=crop', // Abstract art/coasters vibe
    description: 'A set of 4 ocean-inspired hexagonal protectors.'
  },
  {
    id: '4',
    name: 'Alpine Slab',
    category: 'Coffee Tables',
    price: '$3,100',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1935?q=80&w=800&auto=format&fit=crop', // Raw wood table
    description: 'Live edge maple with a deep smokey quartz pour.'
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Elias Thorne",
    role: "Head of Curation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    name: "Sarah Vane",
    role: "Supplier Relations",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
  },
  {
    name: "Marcus Chen",
    role: "Logistics Lead",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
  },
  {
    name: "Elena Ross",
    role: "Digital Architect",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  }
];