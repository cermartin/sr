import { Product, TeamMember } from './types';

// Product images
import coffeeTable1Img from './images/coffe-table-1.jpeg';
import coffeeTable2Img from './images/coffe-table-2.jpeg';
import coffeeTable3Img from './images/cpffe-table-3.jpeg';
import coastersImg from './images/coasters.png';

// Team member images
import orrinImg from './images/orrin-edmonds.jpeg';
import abayImg from './images/abay-amangali.jpeg';
import martinImg from './images/martin-cernohorsky.jpeg';
import aayanImg from './images/aayan.jpeg';
import frankieImg from './images/frankie-carroll.jpeg';
import willImg from './images/will-plessis.jpg';

export const NAV_LINKS = [
  { label: 'Collection',    href: '#collection'  },
  { label: 'Book Breakfast', href: '#booking'    },
  { label: 'The Workshop',  href: '#team'        },
  { label: 'Care Engine',   href: '#care-engine' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Nordic River',
    category: 'Coffee Tables',
    price: '£200',
    image: coffeeTable1Img,
    description: 'Black walnut meets translucent sapphire resin in a modern living centrepiece.',
    details: 'Hand-crafted from sustainably sourced black walnut, each Nordic River table features a unique resin river pour that captures the beauty of flowing water frozen in time. The high-clarity, non-yellowing epoxy is mixed with premium pigments and poured by hand, ensuring no two tables are ever alike. Finished with a satin-smooth topcoat for everyday durability.',
    dimensions: '120cm × 60cm × 45cm',
    variants: [
      { id: 'natural-walnut', name: 'Natural Walnut', color: '#8B6914', image: coffeeTable1Img },
      { id: 'deep-ocean', name: 'Deep Ocean', color: '#1B4D6E', image: coffeeTable2Img },
      { id: 'midnight', name: 'Midnight', color: '#2C2C3A', image: coffeeTable3Img },
    ],
  },
  {
    id: '2',
    name: 'Coastal Hex',
    category: 'Coasters — Set of 4',
    price: '£40',
    image: coastersImg,
    description: 'Ocean-inspired bamboo and resin coasters that protect your surfaces in style.',
    details: 'Each set of four hexagonal coasters is individually cast from bamboo offcuts and swirled ocean-blue resin. Cork-backed to protect your furniture, heat-resistant up to 100°C, and sealed with a food-safe matte finish. The perfect complement to any Serrano Rivers table — or a standalone statement piece.',
    dimensions: '10cm × 10cm × 1cm',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Orrin Edmonds",
    role: "Head Artisan & Founder",
    image: orrinImg,
    description: "Founding visionary with an eye for consumer trends and the structural craft behind every piece."
  },
  {
    name: "Abay Amangali",
    role: "Keeper of the Ledger",
    image: abayImg,
    description: "Balances the books with the same precision our artisans pour resin — learned the trade keeping his family's craft business thriving."
  },
  {
    name: "Martin Černohorský",
    role: "Digital Craftsman",
    image: martinImg,
    description: "Bridges the digital and physical workshop — from product design to data, he shapes how our craft meets the world."
  },
  {
    name: "Aayan",
    role: "Supply & Materials Curator",
    image: aayanImg,
    description: "Sources the finest timbers and resins with hands-on industry experience in direct-to-collector supply."
  },
  {
    name: "Frankie Carroll",
    role: "Brand Storyteller",
    image: frankieImg,
    description: "A quick study with a keen eye for pattern — weaves our brand narrative across every touchpoint."
  },
  {
    name: "Will Plessis",
    role: "Community Voice",
    image: willImg,
    description: "Brings authenticity to our community, knowing that genuine connection is the heartbeat of lasting craft."
  }
];
