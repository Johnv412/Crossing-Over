import { Service, Testimonial, BlogPost } from './types';

export const SERVICES: Service[] = [
  {
    id: 'private-reading',
    title: 'Private Mediumship Reading',
    description: 'A deeply personal 1:1 session with Dez to connect with your departed loved ones, receive messages of validation, and find closure.',
    price: '$250 / session',
    features: ['60-minute Zoom session', 'Recording included', 'Pre-session energy clearing', 'Follow-up integration email'],
    cta: 'Book Your Session'
  },
  {
    id: 'coaching-program',
    title: 'Soul Connection Pathway',
    description: 'A comprehensive 3-month coaching program designed to help you navigate grief and unlock your own intuitive abilities.',
    price: '',
    features: ['Bi-weekly 1:1 coaching', 'Access to exclusive community', 'Guided meditation library', 'Personalized spiritual roadmap'],
    cta: 'Coming Soon'
  },
  {
    id: 'membership',
    title: 'Soul Connection Membership',
    description: 'Join our compassionate community for ongoing support, monthly group readings, and exclusive content.',
    price: '',
    features: ['Monthly Live Q&A with Dez', 'Private Community Forum', 'New Meditations Monthly', 'Discounts on Workshops'],
    cta: 'Coming Soon'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    location: 'Austin, TX',
    text: "I was skeptical at first, but Dez knew things no one else could possibly know. connecting with my father brought me a peace I haven't felt in years.",
    avatar: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: '2',
    name: 'James R.',
    location: 'London, UK',
    text: "The Soul Connection Pathway changed my life. I went from drowning in grief to feeling empowered and connected to my wife in a new way.",
    avatar: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: '3',
    name: 'Elena K.',
    location: 'Toronto, CA',
    text: "Dez has a gift that is truly otherworldly, yet she is so grounded and kind. Her guidance is pure light.",
    avatar: 'https://picsum.photos/100/100?random=3'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Signs Your Loved Ones Are Near',
    excerpt: 'Have you ever smelled a familiar perfume or seen a specific bird repeatedly? These might be messages from the other side.',
    date: 'Oct 12, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    category: 'Spirituality'
  },
  {
    id: '2',
    title: 'Navigating Grief During the Holidays',
    excerpt: 'The festive season can be incredibly difficult after a loss. Here are practical tools for honoring your grief while finding moments of peace.',
    date: 'Nov 05, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    category: 'Healing'
  },
  {
    id: '3',
    title: 'Awakening Your Intuition',
    excerpt: 'We are all born with a sixth sense. Learn three simple daily exercises to start trusting your inner guidance system.',
    date: 'Dec 01, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    category: 'Development'
  }
];