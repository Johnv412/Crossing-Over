
import React from 'react';
import { PageView } from '../types';

interface HeroProps {
  onCtaClick: () => void;
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, imageUrl }) => {
  return (
    <div className="relative overflow-hidden bg-transparent" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white/30 backdrop-blur-md sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white/30 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold mb-4 tracking-wide uppercase">
                Bridging Worlds
              </span>
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl font-serif">
                <span className="block xl:inline">Healing Hearts,</span>{' '}
                <span className="block text-brand-600 xl:inline">Guiding Souls.</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-light">
                Crossing Over with Dez is your sanctuary for connection. Whether you seek a message from a loved one, grief support, or to awaken your own intuition, you are welcome here.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={onCtaClick}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg transition-all"
                  >
                    Explore Services
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    disabled
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-slate-400 bg-slate-100 cursor-not-allowed md:py-4 md:text-lg transition-all"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;
