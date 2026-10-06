import React from 'react';
import { assets, features } from '../assets/assets';
import { HiSparkles, HiCheckCircle } from 'react-icons/hi2';

const BottomBanner = () => {
  return (
    <div className='relative mt-12 sm:mt-20 rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white'>
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 lg:p-12 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <HiSparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Guaranteed Quick Commerce</span>
          </div>

          <h2 className='text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight'>
            Why Choose Grocerin for Daily Needs?
          </h2>

          <div className="space-y-4 pt-1">
            {features.map((feature, index) => (
              <div key={index} className='flex items-start gap-3.5 group'>
                <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-emerald-100 flex items-center justify-center shrink-0 p-2 group-hover:scale-105 transition-transform">
                  <img src={feature.icon} alt={feature.title} className='w-full h-full object-contain' />
                </div>
                <div>
                  <h3 className='text-sm sm:text-base font-bold text-gray-900'>{feature.title}</h3>
                  <p className='text-gray-500 text-xs sm:text-sm mt-0.5 leading-relaxed'>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 relative flex items-center justify-center p-4 sm:p-6 lg:p-0">
          <img 
            src={assets.bottom_banner_image} 
            alt="Grocerin Quality Freshness" 
            className='w-full max-w-md lg:max-w-none h-auto object-cover rounded-2xl lg:rounded-none'
          />
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
