
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
    content: 'The journey of grief is often accompanied by a deep longing for one more sign, one more word, or one more moment of connection. In my years as a medium, I have seen countless ways the spirit world reaches out to us. \n\nSigns are rarely a booming voice from the sky. More often, they are whispers in the physical world. Perhaps it is a song that plays on the radio exactly when you were thinking of them, or a butterfly that lingers longer than usual. These are not coincidences; they are "soul-incidences." \n\nLearning to trust these signs is the first step in healing the rift that physical loss creates. Your loved ones are not gone; they have simply changed form, and they are eager to let you know that love never dies.',
    date: 'Oct 12, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    category: 'Spirituality'
  },
  {
    id: '2',
    title: 'Navigating Grief During the Holidays',
    excerpt: 'The festive season can be incredibly difficult after a loss. Here are practical tools for honoring your grief while finding moments of peace.',
    content: 'When the world is decorated in lights and filled with the sound of laughter, the silence left behind by a loved one can feel deafening. Grief doesn’t take a holiday; in fact, it often intensifies during these times. \n\nMy advice to those navigating this difficult season is to give yourself permission to feel exactly as you do. You do not owe anyone a "happy" version of yourself. \n\nConsider creating a new tradition to honor your loved one. Light a special candle at the dinner table, or donate to a cause they were passionate about. By inviting their memory into your present, you bridge the gap between "what was" and "what is," allowing love to be the common thread.',
    date: 'Nov 05, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    category: 'Healing'
  },
  {
    id: '3',
    title: 'Awakening Your Intuition',
    excerpt: 'We are all born with a sixth sense. Learn three simple daily exercises to start trusting your inner guidance system.',
    content: 'Intuition is not a gift reserved for the few; it is a spiritual muscle we all possess. We often ignore that "gut feeling" or quiet inner voice in favor of logic, but your soul speaks in whispers that can guide you through life’s toughest transitions. \n\nTo begin awakening your intuition, start with silence. Even five minutes of quiet contemplation daily can clear the "static" of modern life. \n\nSecond, pay attention to your physical reactions. Your body often knows the truth before your mind does. Finally, keep an intuition journal. Write down your hunches and see how often they come true. Over time, you will develop a profound trust in your own inner compass.',
    date: 'Dec 01, 2023',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    category: 'Development'
  }
];
