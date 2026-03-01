import React, { useState } from 'react';
import { Testimonial } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  heroImageUrl: string;
  setHeroImageUrl: (url: string) => void;
  testimonials: Testimonial[];
  pendingReviews: Testimonial[];
  updateTestimonialAvatar: (id: string, url: string) => void;
  onAddTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  onDeleteTestimonial: (id: string) => void;
  onApproveTestimonial: (id: string) => void;
  onRejectTestimonial: (id: string) => void;
  onReset: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  heroImageUrl,
  setHeroImageUrl,
  testimonials,
  pendingReviews,
  updateTestimonialAvatar,
  onAddTestimonial,
  onDeleteTestimonial,
  onApproveTestimonial,
  onRejectTestimonial,
  onReset
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

                {/* Pending Reviews Section */}
                {pendingReviews.length > 0 && (
                  <section className="p-4 bg-orange-50 border border-orange-200 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1 px-2 uppercase tracking-wide text-[10px] font-bold bg-orange-200 text-orange-800 rounded-md">Action Required</div>
                      <h4 className="text-sm font-semibold text-orange-800 uppercase tracking-wider">Pending Reviews ({pendingReviews.length})</h4>
                    </div>
                    <div className="space-y-4">
                      {pendingReviews.map((t) => (
                        <div key={t.id} className="p-3 bg-white rounded-lg border border-orange-100 shadow-sm relative">
                          <p className="text-xs text-slate-800 italic mb-2">"{t.text}"</p>
                          <div className="flex items-center text-[11px] text-slate-500 mb-3">
                            <span className="font-bold text-slate-700 mr-1">{t.name}</span>
                            {t.location && <span> • {t.location}</span>}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => onApproveTestimonial(t.id)}
                              className="flex-1 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded text-xs font-bold transition-colors"
                            >
                              Approve & Publish
                            </button>
                            <button
                              onClick={() => onRejectTestimonial(t.id)}
                              className="flex-1 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded text-xs font-bold transition-colors"
                            >
                              Reject & Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

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
