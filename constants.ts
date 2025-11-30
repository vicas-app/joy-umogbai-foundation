import { TeamMember, Program, Testimonial, Metric, GalleryItem, HeroImage } from './types';
import { 
  Heart, 
  BookOpen, 
  Home, 
  Activity, 
  Users, 
  Lightbulb, 
  Shield 
} from 'lucide-react';

export const COMPANY_INFO = {
  name: "Joy Umogbai Foundation",
  parentOrg: "Safe Haven Community",
  tagline: "Lighting the Path for Every Woman and Girl",
  bibleVerse: "Matthew 11:28",
  email: "joyumogbai1@gmail.com",
  phone1: "0705 441 8932",
  address: "Plot 365, Cadastral Zone B02, Durumi District, Area 1, Garki, Abuja",
  instagram: "@joyumogbaifoundation"
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Team', path: '/team' },
  { label: 'Impact', path: '/impact' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export const TEAM_MEMBERS: TeamMember[] = [];

export const PROGRAMS: Program[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Beneficiary',
    role: 'Durumi IDP Camp',
    quote: "Before meeting this foundation, I had no direction. The encouragement I received helped me believe in myself again."
  },
  {
    id: 't2',
    name: 'Volunteer',
    role: 'SafeHaven Community',
    quote: "Volunteering with the Joy Umogbai Foundation changed my perspective. Seeing lives transformed reminds me that service is purpose."
  },
  {
    id: 't4',
    name: 'Student',
    role: 'Mpape Junior Secondary School',
    quote: "When SafeHaven came to our school and gave us sanitary pads, I learned that being a girl is something to be proud of. I felt confident and valued."
  }
];

export const IMPACT_METRICS: Metric[] = [];

export const GALLERY_ITEMS: GalleryItem[] = [];

export const DEFAULT_HERO_IMAGES: HeroImage[] = [];