import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const isComingSoon = service.cta === 'Coming Soon';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="p-8 flex-1">
        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">{service.title}</h3>
        {service.price && <p className="text-brand-600 font-medium text-lg mb-4">{service.price}</p>}
        <p className="font-bold text-slate-900 mb-6 leading-relaxed">{service.description}</p>

        <ul className="space-y-3 mb-8">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold text-slate-900 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 bg-slate-50 border-t border-slate-100">
        <button
          onClick={() => {
            if (!isComingSoon) {
              window.location.hash = 'contact';
              window.scrollTo(0, 0);
            }
          }}
          disabled={isComingSoon}
          className={`w-full py-3 px-4 rounded-lg font-bold transition-colors ${isComingSoon
            ? 'bg-slate-200 text-slate-900 cursor-not-allowed'
            : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
        >
          {service.cta}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;