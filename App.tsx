import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { SERVICES, BLOG_POSTS, TESTIMONIALS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GriefCompanion from './components/GriefCompanion';
import ServiceCard from './components/ServiceCard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>(PageView.HOME);

  // Hash router simulation for simple SPA nav without server config
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1).toUpperCase();
      if (hash && hash in PageView) {
        setCurrentView(PageView[hash as keyof typeof PageView]);
      } else {
        setCurrentView(PageView.HOME);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Init

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: PageView) => {
    window.location.hash = view.toLowerCase();
    setCurrentView(view);
    window.scrollTo(0,0);
  };

  const renderContent = () => {
    switch (currentView) {
      case PageView.COMPANION:
        return (
          <div className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ethereal-gradient min-h-screen">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-serif font-bold text-slate-900 sm:text-4xl">Grief Companion AI</h1>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-500 sm:mt-4">
                A safe, judgment-free space to process your emotions.
              </p>
            </div>
            <GriefCompanion />
          </div>
        );
      
      case PageView.SERVICES:
        return (
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">Offerings</h2>
                <p className="mt-2 text-3xl leading-8 font-serif font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Connect, Heal, and Grow
                </p>
                <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
                  Choose the path that resonates with your soul's current journey.
                </p>
              </div>
              <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
                {SERVICES.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </div>
        );

      case PageView.BLOG:
        return (
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-3xl font-serif font-bold text-slate-900">Soul Whispers Blog</h1>
                <p className="mt-4 text-xl text-slate-500">Insights, channelings, and guidance from Dez.</p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {BLOG_POSTS.map(post => (
                  <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-shrink-0">
                      <img className="h-48 w-full object-cover" src={post.imageUrl} alt={post.title} />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-brand-600">
                          {post.category}
                        </p>
                        <a href="#" className="block mt-2">
                          <p className="text-xl font-semibold text-slate-900">{post.title}</p>
                          <p className="mt-3 text-base text-slate-500">{post.excerpt}</p>
                        </a>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="text-sm text-slate-500">
                          <time dateTime={post.date}>{post.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case PageView.CONTACT:
        return (
            <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
            <div className="relative max-w-xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-serif font-extrabold tracking-tight text-slate-900 sm:text-4xl">Get in touch</h2>
                <p className="mt-4 text-lg leading-6 text-slate-500">
                  Questions about a reading? Want to share your story? We'd love to hear from you.
                </p>
              </div>
              <div className="mt-12">
                <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                    <div className="mt-1">
                      <input type="text" name="name" id="name" className="py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border-slate-300 rounded-md border" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                    <div className="mt-1">
                      <input type="email" name="email" id="email" className="py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border-slate-300 rounded-md border" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                    <div className="mt-1">
                      <textarea id="message" name="message" rows={4} className="py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border border-slate-300 rounded-md"></textarea>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );

      case PageView.HOME:
      default:
        return (
          <>
            <Hero onCtaClick={() => navigateTo(PageView.SERVICES)} />
            
            {/* Value Props Section */}
            <div className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                  <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">Why Choose Dez</h2>
                  <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl font-serif">
                    A Modern Approach to Ancient Wisdom
                  </p>
                  <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
                    We blend authentic mediumship with practical grief tools and community support.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials Preview */}
            <div className="bg-brand-50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-3xl font-serif font-bold text-slate-900 mb-12">Healing Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-white p-6 rounded-lg shadow-sm">
                      <p className="text-slate-600 italic mb-4">"{t.text}"</p>
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src={t.avatar} alt={t.name} />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-slate-900">{t.name}</p>
                          <p className="text-sm text-slate-500">{t.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-brand-700">
              <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl font-serif">
                  <span className="block">Ready to connect?</span>
                  <span className="block">Start your journey today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-brand-100">
                  Whether you need a listening ear or a sign from above, we are here for you.
                </p>
                <button
                  onClick={() => navigateTo(PageView.COMPANION)}
                  className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-brand-50 sm:w-auto"
                >
                  Try Grief Companion AI
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-200 selection:text-brand-900">
      <Navbar currentView={currentView} setView={navigateTo} />
      {renderContent()}
      
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <button onClick={() => navigateTo(PageView.HOME)} className="text-base text-slate-500 hover:text-slate-900">
                Home
              </button>
            </div>
            <div className="px-5 py-2">
              <button onClick={() => navigateTo(PageView.SERVICES)} className="text-base text-slate-500 hover:text-slate-900">
                Services
              </button>
            </div>
            <div className="px-5 py-2">
              <button onClick={() => navigateTo(PageView.BLOG)} className="text-base text-slate-500 hover:text-slate-900">
                Blog
              </button>
            </div>
            <div className="px-5 py-2">
              <button onClick={() => navigateTo(PageView.CONTACT)} className="text-base text-slate-500 hover:text-slate-900">
                Contact
              </button>
            </div>
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
             <span className="text-slate-400">
                &copy; 2024 Crossing Over with Dez. All rights reserved.
             </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;