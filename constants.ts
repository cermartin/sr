import { Product, TeamMember } from './types';

// Product images
import coffeeTable2Img from './images/coffe-table-2.jpeg';
import knifeImg from './images/knife.png';
import coastersImg from './images/coasters.png';
import cuttingBoardImg from './images/cutting-board.png';

// Team member images
import orrinImg from './images/orrin-edmonds.jpeg';
import abayImg from './images/abay-amangali.jpeg';
import martinImg from './images/martin-cernohorsky.jpeg';
import aayanImg from './images/aayan.jpeg';
import frankieImg from './images/frankie-carroll.jpeg';
import willImg from './images/will-plessis.jpg';

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
    image: coffeeTable2Img,
    description: 'Black walnut meets translucent sapphire resin in a modern living centrepiece.'
  },
  {
    id: '2',
    name: 'Highland Edge',
    category: 'Knives',
    price: '$450',
    image: knifeImg,
    description: 'Stabilized burl wood handle with damascus steel blade.'
  },
  {
    id: '3',
    name: 'Coastal Hex',
    category: 'Coasters',
    price: '$120',
    image: coastersImg,
    description: 'A set of 3 ocean-inspired bamboo and resin protectors.'
  },
  {
    id: '4',
    name: "River's Edge",
    category: 'Cutting Boards',
    price: '$350',
    image: cuttingBoardImg,
    description: 'Live edge walnut with a deep sapphire resin river pour.'
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
