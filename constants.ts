
import { Service, Testimonial } from './types';

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

export const TESTIMONIALS: Testimonial[] = [];


