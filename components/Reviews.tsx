
import React, { useState } from 'react';
import { Testimonial } from '../types';

interface ReviewsProps {
  testimonials: Testimonial[];
  onAddReview: (review: Omit<Testimonial, 'id'>) => void;
}

const Reviews: React.FC<ReviewsProps> = ({ testimonials, onAddReview }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    text: '',
    avatar: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;
    onAddReview(formData);
    setFormData({
      name: '',
      location: '',
      text: '',
      avatar: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`
    });
    setShowForm(false);
    alert("Thank you for sharing your story! It has been added to our community wall.");
  };

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">Community Wall</h2>
          <p className="mt-2 text-3xl leading-8 font-serif font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Healing & Connection Stories
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
            Real experiences from people who have found comfort and closure through our sanctuary.
          </p>
          <div className="mt-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 transition-all"
            >
              {showForm ? 'Cancel' : 'Share Your Story'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="max-w-xl mx-auto mb-16 bg-brand-50 p-8 rounded-2xl shadow-inner animate-fade-in">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-serif">Write Your Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Location (Optional)</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Your Experience</label>
                <textarea
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-between hover:scale-[1.02] transition-transform">
              <div className="relative">
                <svg className="absolute -top-4 -left-4 h-8 w-8 text-brand-100 transform -scale-x-100" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-slate-600 italic leading-relaxed relative z-10 mb-6">"{t.text}"</p>
              </div>
              <div className="flex items-center pt-6 border-t border-slate-50">
                <img className="h-12 w-12 rounded-full object-cover shadow-sm bg-slate-100" src={t.avatar} alt={t.name} />
                <div className="ml-4">
                  <p className="text-base font-bold text-slate-900">{t.name}</p>
                  <p className="text-sm text-brand-500 font-medium">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
