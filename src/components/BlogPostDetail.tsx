
import React from 'react';
import { BlogPost } from '../types';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const shareLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2]',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#000000]',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-[#0077b5]',
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    }
  ];

  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <button
        onClick={onBack}
        className="flex items-center text-brand-600 hover:text-brand-700 font-medium mb-8 transition-colors group"
      >
        <svg className="h-5 w-5 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </button>

      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider">
            {post.category}
          </span>
          <time className="text-slate-500 text-sm" dateTime={post.date}>
            {post.date}
          </time>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
          {post.title}
        </h1>
        
        {/* Social Share Section */}
        <div className="flex items-center gap-4 py-6 border-y border-slate-100 mb-10">
          <span className="text-sm font-medium text-slate-500">Share this post:</span>
          <div className="flex gap-2">
            {shareLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleShare(link.url)}
                className={`${link.color} text-white p-2 rounded-full hover:opacity-90 transition-opacity shadow-sm`}
                title={`Share on ${link.name}`}
              >
                {link.icon}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      <div className="prose prose-lg prose-slate max-w-none">
        <p className="text-xl text-slate-600 leading-relaxed mb-8 italic">
          {post.excerpt}
        </p>
        <div className="text-slate-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-slate-100">
        <div className="bg-brand-50 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-2xl font-serif font-bold">
            D
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900 mb-1">About the Author</h4>
            <p className="text-slate-600">
              Dez is a spiritual medium and grief guide dedicated to helping others find peace, connection, and spiritual clarity through their most difficult transitions.
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogPostDetail;
