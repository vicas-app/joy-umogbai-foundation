export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  iconName: string; 
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface Metric {
  id?: string;
  label: string;
  value: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  images?: string[]; // Array of image URLs for slideshow
}

export interface ContentItem {
  id: string;
  text: string;
}

export interface AppSettings {
  logoUrl?: string;
  homeMissionImageUrl?: string;
}

export interface HeroImage {
  id: string;
  imageUrl: string;
}