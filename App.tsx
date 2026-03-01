
import React, { useState, useEffect } from 'react';
import { PageView, BlogPost, Testimonial } from './types';
import { SERVICES, BLOG_POSTS, TESTIMONIALS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GriefCompanion from './components/GriefCompanion';
import ServiceCard from './components/ServiceCard';
import BlogPostDetail from './components/BlogPostDetail';
import SettingsModal from './components/SettingsModal';
import Reviews from './components/Reviews';
import FloatingDez from './components/FloatingDez';

const DEFAULT_HERO_IMAGE = "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1600";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>(PageView.HOME);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Managed content state for settings
  const [heroImageUrl, setHeroImageUrl] = useState(DEFAULT_HERO_IMAGE);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pendingReviews, setPendingReviews] = useState<Testimonial[]>([]);
  const [geminiApiKey, setGeminiApiKey] = useState(localStorage.getItem('dez_gemini_api_key') || '');

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load state from localStorage / JSONBin on mount
  useEffect(() => {
    const savedHero = localStorage.getItem('dez_hero_image');
    if (savedHero) setHeroImageUrl(savedHero);

    const savedBlogPosts = localStorage.getItem('dez_blog_posts');
    if (savedBlogPosts) setBlogPosts(JSON.parse(savedBlogPosts));

    // Fetch live and pending reviews from JSONBin
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/69a39e88d0ea881f40e36f89', {
          headers: {
            'X-Master-Key': import.meta.env.VITE_JSONBIN_API_KEY || ''
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.record) {
            setTestimonials(data.record.testimonials || []);
            setPendingReviews(data.record.pendingReviews || []);
          }
        } else {
          console.error("JSONBin GET failed with status:", response.status);
          setTestimonials(TESTIMONIALS); // Fallback to defaults only if cloud is unreachable/unauthorized so the wall isn't permanently blank
        }
      } catch (err) {
        console.error("Failed to fetch reviews from JSONBin", err);
        setTestimonials(TESTIMONIALS);
      }
    };
    fetchReviews();

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1).toUpperCase();
      if (hash && hash in PageView) {
        setCurrentView(PageView[hash as keyof typeof PageView]);
        if (hash !== 'BLOG_POST') setSelectedPost(null);
      } else {
        setCurrentView(PageView.HOME);
        setSelectedPost(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('dez_hero_image', heroImageUrl);
  }, [heroImageUrl]);

  useEffect(() => {
    localStorage.setItem('dez_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  // Sync to JSONBin whenever reviews change
  const syncToJSONBin = async (newTestimonials: Testimonial[], newPending: Testimonial[]) => {
    try {
      const response = await fetch('https://api.jsonbin.io/v3/b/69a39e88d0ea881f40e36f89', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': import.meta.env.VITE_JSONBIN_API_KEY || ''
        },
        body: JSON.stringify({
          testimonials: newTestimonials,
          pendingReviews: newPending
        })
      });

      if (!response.ok) {
        alert("Warning: Could not save to cloud! Your Hostinger VITE_JSONBIN_API_KEY might be missing or invalid. Status: " + response.status);
      }
    } catch (err) {
      console.error("Failed to sync reviews to JSONBin", err);
      alert("Warning: Could not save to cloud! Check your network connection.");
    }
  };

  useEffect(() => {
    localStorage.setItem('dez_gemini_api_key', geminiApiKey);
  }, [geminiApiKey]);

  const navigateTo = (view: PageView) => {
    window.location.hash = view.toLowerCase();
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    navigateTo(PageView.BLOG_POST);
  };

  const updateBlogPostImage = (id: string, url: string) => {
    setBlogPosts(prev => prev.map(post => post.id === id ? { ...post, imageUrl: url } : post));
    if (selectedPost?.id === id) {
      setSelectedPost(prev => prev ? { ...prev, imageUrl: url } : null);
    }
  };

  const updateTestimonialAvatar = (id: string, url: string) => {
    const updated = testimonials.map(t => t.id === id ? { ...t, avatar: url } : t);
    setTestimonials(updated);
    syncToJSONBin(updated, pendingReviews);
  };

  const addTestimonial = (review: Omit<Testimonial, 'id'>) => {
    const newT: Testimonial = { ...review, id: Date.now().toString() };
    const updated = [newT, ...testimonials];
    setTestimonials(updated);
    syncToJSONBin(updated, pendingReviews);
  };

  const addPendingTestimonial = (review: Omit<Testimonial, 'id'>) => {
    const newT: Testimonial = { ...review, id: Date.now().toString() };
    const updatedPending = [newT, ...pendingReviews];
    setPendingReviews(updatedPending);
    syncToJSONBin(testimonials, updatedPending);
  };

  const approveTestimonial = (id: string) => {
    const review = pendingReviews.find(r => r.id === id);
    if (review) {
      const updatedT = [review, ...testimonials];
      const updatedP = pendingReviews.filter(r => r.id !== id);
      setTestimonials(updatedT);
      setPendingReviews(updatedP);
      syncToJSONBin(updatedT, updatedP);
    }
  };

  const rejectTestimonial = (id: string) => {
    if (window.confirm("Are you sure you want to reject and delete this pending review?")) {
      const updatedP = pendingReviews.filter(r => r.id !== id);
      setPendingReviews(updatedP);
      syncToJSONBin(testimonials, updatedP);
    }
  };

  const deleteTestimonial = (id: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const updatedT = testimonials.filter(t => t.id !== id);
      setTestimonials(updatedT);
      syncToJSONBin(updatedT, pendingReviews);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm("Are you sure you want to reset all images and content to defaults?")) {
      setHeroImageUrl(DEFAULT_HERO_IMAGE);
      setBlogPosts(BLOG_POSTS);
      setTestimonials(TESTIMONIALS);
      setPendingReviews([]);
      setGeminiApiKey('');
      localStorage.removeItem('dez_hero_image');
      localStorage.removeItem('dez_blog_posts');
      localStorage.removeItem('dez_gemini_api_key');
      syncToJSONBin(TESTIMONIALS, []);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'd1e34c5d-5e49-4b5c-93fe-9ef0b76f7840', // User needs to add their Web3Forms key
          subject: 'New Contact Form Submission',
          from_name: 'Crossing Over Website',
          ...contactForm
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setContactForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case PageView.REVIEWS:
        return <Reviews testimonials={testimonials} onAddReview={addPendingTestimonial} />;

      case PageView.COMPANION:
        return (
          <div className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-serif font-bold text-slate-900 sm:text-4xl">Crossing Over Live</h1>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-500 sm:mt-4">
                A safe, judgment-free space to process your emotions.
              </p>
            </div>
            <GriefCompanion />
          </div>
        );

      case PageView.SERVICES:
        return (
          <div className="py-16 bg-white/90 backdrop-blur-sm">
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
          <div className="py-16 bg-white/90 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h1 className="text-3xl font-serif font-bold text-slate-900">Soul Whispers Blog</h1>
                <p className="mt-4 text-xl text-slate-500">Insights, channelings, and guidance from Dez.</p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map(post => (
                  <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden group">
                    <div className="flex-shrink-0 relative overflow-hidden bg-slate-100">
                      <img className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" src={post.imageUrl} alt={post.title} />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => handlePostClick(post)}
                          className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium shadow-lg"
                        >
                          Read Article
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-brand-600">
                          {post.category}
                        </p>
                        <button onClick={() => handlePostClick(post)} className="block mt-2 text-left">
                          <p className="text-xl font-semibold text-slate-900 hover:text-brand-600 transition-colors">{post.title}</p>
                          <p className="mt-3 text-base text-slate-500 line-clamp-3">{post.excerpt}</p>
                        </button>
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

      case PageView.BLOG_POST:
        if (!selectedPost) {
          navigateTo(PageView.BLOG);
          return null;
        }
        return <BlogPostDetail post={selectedPost} onBack={() => navigateTo(PageView.BLOG)} />;

      case PageView.CONTACT:
        return (
          <div className="bg-white/90 backdrop-blur-sm py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
            <div className="relative max-w-xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-serif font-extrabold tracking-tight text-slate-900 sm:text-4xl">Get in touch</h2>
                <p className="mt-4 text-lg leading-6 text-slate-500">
                  Questions about a reading? Want to share your story? We'd love to hear from you.
                </p>
              </div>
              <div className="mt-12">
                {submitStatus === 'success' ? (
                  <div className="rounded-md bg-green-50 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Message sent successfully</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Thank you for reaching out. Dez will get back to you shortly.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {submitStatus === 'error' ? (
                  <div className="rounded-md bg-red-50 p-4 mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error sending message</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>There was a problem sending your message. Please try again later.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <form onSubmit={handleContactSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                    <div className="mt-1">
                      <input required type="text" name="name" id="name" value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} className="py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border-slate-300 rounded-md border" />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                    <div className="mt-1">
                      <input required type="email" name="email" id="email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} className="py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border-slate-300 rounded-md border" />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone</label>
                    <div className="mt-1">
                      <input type="tel" name="phone" id="phone" value={contactForm.phone} onChange={e => setContactForm({ ...contactForm, phone: e.target.value })} className="py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border-slate-300 rounded-md border" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                    <div className="mt-1">
                      <textarea required id="message" name="message" rows={4} value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} className="py-3 px-4 block w-full shadow-sm focus:ring-brand-500 focus:border-brand-500 border border-slate-300 rounded-md"></textarea>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
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
            <Hero onCtaClick={() => navigateTo(PageView.SERVICES)} imageUrl={heroImageUrl} />

            {/* Value Props Section */}
            <div className="py-12 bg-white/90 backdrop-blur-sm">
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
            <div className="bg-brand-50/90 backdrop-blur-sm py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                  <h2 className="text-3xl font-serif font-bold text-slate-900">Healing Stories</h2>
                  <button
                    onClick={() => navigateTo(PageView.REVIEWS)}
                    className="text-brand-600 font-bold hover:text-brand-700 transition-colors flex items-center"
                  >
                    View All Reviews
                    <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.slice(0, 3).map((t) => (
                    <div key={t.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-slate-600 italic mb-4">"{t.text}"</p>
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover bg-slate-100" src={t.avatar} alt={t.name} />
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
                  Try Crossing Over Live
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-200 selection:text-brand-900 bg-[url('/heavenly-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <Navbar
        currentView={currentView}
        setView={navigateTo}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      {renderContent()}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        heroImageUrl={heroImageUrl}
        setHeroImageUrl={setHeroImageUrl}
        blogPosts={blogPosts}
        updateBlogPostImage={updateBlogPostImage}
        testimonials={testimonials}
        pendingReviews={pendingReviews}
        updateTestimonialAvatar={updateTestimonialAvatar}
        onAddTestimonial={addTestimonial}
        onDeleteTestimonial={deleteTestimonial}
        onApproveTestimonial={approveTestimonial}
        onRejectTestimonial={rejectTestimonial}
        onReset={handleResetSettings}
        geminiApiKey={geminiApiKey}
        setGeminiApiKey={setGeminiApiKey}
      />

      <FloatingDez />

      <footer className="bg-white/90 backdrop-blur-sm border-t border-slate-200 mt-auto">
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
