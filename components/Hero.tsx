
import React from 'react';
import { PageView } from '../types';

interface HeroProps {
  onCtaClick: () => void;
  imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, imageUrl }) => {
  return (
    <div className="relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32 w-full">


          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold mb-4 tracking-wide uppercase">
                Bridging Worlds
              </span>
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl font-serif">
                <span className="block xl:inline">Healing Hearts,</span>{' '}
                <span className="block text-white xl:inline">Guiding Souls.</span>
              </h1>
              <p className="mt-3 text-base font-bold text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
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

              </div>
            </div>
          </main>
        </div>
      </div>

    </div>
  );
};

export default Hero;
