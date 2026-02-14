import React, { useState } from 'react';
import { BlogPost, Testimonial } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  heroImageUrl: string;
  setHeroImageUrl: (url: string) => void;
  blogPosts: BlogPost[];
  updateBlogPostImage: (id: string, url: string) => void;
  testimonials: Testimonial[];
  updateTestimonialAvatar: (id: string, url: string) => void;
  onAddTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  onDeleteTestimonial: (id: string) => void;
  onReset: () => void;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  heroImageUrl,
  setHeroImageUrl,
  blogPosts,
  updateBlogPostImage,
  testimonials,
  updateTestimonialAvatar,
  onAddTestimonial,
  onDeleteTestimonial,
  onReset,
  geminiApiKey,
  setGeminiApiKey
}) => {
  const [newReview, setNewReview] = useState({ name: '', location: '', text: '', avatar: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  if (!isOpen) return null;

  // Reset authentication when modal closes
  const handleClose = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    onClose();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'Dez') {
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      alert("Incorrect password.");
      setPasswordInput('');
    }
  };

  const handleAddNewReview = () => {
    if (!newReview.name || !newReview.text) {
      alert("Name and Message are required.");
      return;
    }
    onAddTestimonial({
      ...newReview,
      avatar: newReview.avatar || `https://picsum.photos/100/100?random=${Date.now()}`
    });
    setNewReview({ name: '', location: '', text: '', avatar: '' });
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={handleClose}>
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-6 pt-6 pb-4 sm:p-8 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif font-bold text-slate-900">Site Settings</h3>
              <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {!isAuthenticated ? (
              <div className="py-8">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Enter Admin Password</label>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="Password..."
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors"
                  >
                    Unlock Settings
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
                {/* Gemini API Key Section */}
                <section className="bg-brand-50 p-5 rounded-xl border border-brand-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-brand-600 rounded-lg text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-brand-800 uppercase tracking-wider">Gemini API Configuration</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="password"
                        value={geminiApiKey}
                        onChange={(e) => setGeminiApiKey(e.target.value)}
                        placeholder="Paste your Gemini API Key here..."
                        className="w-full px-4 py-3 text-sm border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
                      />
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg border border-brand-100">
                      <p className="text-[11px] font-bold text-brand-700 uppercase mb-2 tracking-tighter flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Model Intelligence Information
                      </p>
                      <ul className="text-[10px] text-brand-600 space-y-1">
                        <li>• <strong>Voice API:</strong> Uses <code className="bg-brand-100 px-1 rounded">gemini-2.5-flash-native-audio-preview-12-2025</code></li>
                        <li>• <strong>Text API:</strong> Uses <code className="bg-brand-100 px-1 rounded">gemini-3-flash-preview</code></li>
                        <li>• <strong>Encryption:</strong> Saved locally in your browser for secure access.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Hero Section */}
                <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">Hero Image</h4>
                  <div className="flex gap-4 items-center">
                    <img src={heroImageUrl} className="w-16 h-16 rounded-lg object-cover bg-white shadow-sm" alt="Preview" />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={heroImageUrl}
                        onChange={(e) => setHeroImageUrl(e.target.value)}
                        placeholder="Image URL..."
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-brand-500 focus:border-brand-500"
                      />
                    </div>
                  </div>
                </section>

                {/* Reviews Section */}
                <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-4">Add New Review</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="Reviewer Name"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                    />
                    <input
                      type="text"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      placeholder="Location (e.g. Austin, TX)"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                    />
                    <input
                      type="text"
                      value={newReview.avatar}
                      onChange={(e) => setNewReview({ ...newReview, avatar: e.target.value })}
                      placeholder="Avatar Image URL (Optional)"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                    />
                    <textarea
                      value={newReview.text}
                      onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                      placeholder="Their Message..."
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                      rows={2}
                    />
                    <button
                      onClick={handleAddNewReview}
                      className="w-full bg-brand-600 text-white py-2 rounded-md text-sm font-bold hover:bg-brand-700 transition-colors"
                    >
                      Add This Review
                    </button>
                  </div>
                </section>

                {/* Manage Reviews Section */}
                <section className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Manage Existing Reviews ({testimonials.length})</h4>
                  <div className="space-y-4">
                    {testimonials.map((t) => (
                      <div key={t.id} className="flex gap-4 items-start p-3 bg-slate-50 rounded-lg group border border-transparent hover:border-brand-200 transition-colors">
                        <img src={t.avatar} className="w-10 h-10 rounded-full object-cover bg-white shadow-sm" alt={t.name} />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="text-xs font-bold text-slate-900 truncate">{t.name}</p>
                            <button
                              onClick={() => onDeleteTestimonial(t.id)}
                              className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-500 mb-1">{t.location}</p>
                          <input
                            type="text"
                            value={t.avatar}
                            onChange={(e) => updateTestimonialAvatar(t.id, e.target.value)}
                            placeholder="Update Avatar URL..."
                            className="w-full px-2 py-1 text-[10px] border border-slate-200 rounded bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Blog Posts Section */}
                <section className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Blog Post Images</h4>
                  <div className="space-y-4">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="flex gap-4 items-center">
                        <img src={post.imageUrl} className="w-16 h-12 rounded-md object-cover bg-white shadow-sm" alt={post.title} />
                        <div className="flex-1">
                          <label className="text-xs text-slate-500 mb-1 block truncate">{post.title}</label>
                          <input
                            type="text"
                            value={post.imageUrl}
                            onChange={(e) => updateBlogPostImage(post.id, e.target.value)}
                            placeholder="Image URL..."
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-brand-500 focus:border-brand-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>

          {!isAuthenticated && (
            <div className="bg-slate-50 px-6 py-4 sm:px-8 border-t border-slate-200">
              <button
                onClick={handleClose}
                className="w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          )}

          {isAuthenticated && (
            <div className="bg-slate-50 px-6 py-4 sm:px-8 flex flex-col sm:flex-row gap-3 justify-between items-center border-t border-slate-200">
              <button
                onClick={onReset}
                className="text-sm text-slate-500 hover:text-brand-600 font-medium transition-colors"
              >
                Reset to Defaults
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-brand-600 text-base font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:text-sm"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
