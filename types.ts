export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageView {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  COMPANION = 'COMPANION',
  BLOG = 'BLOG',
  CONTACT = 'CONTACT'
}