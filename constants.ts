
import { Service, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'private-reading',
    title: 'Private Mediumship Reading',
    description: 'A deeply personal 1:1 session with Dez to connect with your departed loved ones, receive messages of validation, and find closure.',
    price: '',
    features: ['60-minute in-person session', 'Pre-session energy clearing', 'Follow-up integration email'],
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
    name: 'Olivia',
    location: 'PA',
    text: 'This was the first time I have ever had a reading since I lost my dad a year ago. I was absolutely blown away from my reading with Desiree. She was so sweet and made this an unforgettable experience for me. She hit everything right on point. I was taken back by how much came through during this reading and how accurate it was to my situation and my life. I recommend Desiree to anybody. She was amazing and so comforting. Thank you Dez!!!!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia'
  },
  {
    id: '2',
    name: 'Alexandra',
    location: 'PA',
    text: 'My reading with Desiree was the most healing thing that has happened to me... one year ago I lost my mom very tragically. I spent everyday wondering the unknown, until I had a reading with Dez. She made my heart heal from the tragic loss of my mom. Desiree welcomed me with open arms and made me feel so comfortable. Dez does NOT judge and I was able to just be completely opened with her. She gave me the best reading I have ever had and if I could tell the whole world to go and get a reading from her.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra'
  },
  {
    id: '3',
    name: 'Gitana',
    location: 'PA',
    text: 'Dez was right on point with everything! She was able to say very precise details that no one new! And was so sweet to get connected with my father! I had very warm feelings and fantastic memories by her reading. I received great updates what to look forward and what to hope for in the future!!! Great job Dez!!!',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gitana'
  }
];



