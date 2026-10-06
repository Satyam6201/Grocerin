import React from 'react';
import { assets } from '../assets/assets';
import { Link } from "react-router-dom";
import { HiBolt, HiArrowRight } from 'react-icons/hi2';

const MainBanner = () => {
  return (
    <div className='relative rounded-3xl overflow-hidden shadow-xs mt-2 sm:mt-4'>
      <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block object-cover min-h-[280px] lg:min-h-[340px]' />
      <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden object-cover min-h-[300px]' />
      
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-center pb-4 md:pb-0 px-4 sm:px-6 md:pl-14 lg:pl-20 bg-linear-to-t md:bg-linear-to-r from-black/75 via-black/40 md:via-black/30 to-transparent'>
        
        <div className="flex items-center gap-1.5 bg-amber-400 text-gray-950 font-extrabold text-[11px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2.5 sm:mb-3 shadow-md">
          <HiBolt className="text-sm" />
          <span>10-Minute Grocery Delivery</span>
        </div>

        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center md:text-left text-white max-w-sm md:max-w-md lg:max-w-xl leading-tight drop-shadow-md'>
          Freshness You Can Trust, Savings You Will Love!
        </h1>
        <p className="hidden md:block text-white/90 text-xs sm:text-sm mt-2 max-w-md leading-relaxed">
          Farm-fresh fruits, crispy vegetables, dairy, cold drinks, and daily essentials delivered right to your doorstep.
        </p>

        <div className='flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-4 mt-4 sm:mt-5 font-bold'>
          <Link 
            to={"/product"} 
            className='group flex items-center gap-2 px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all rounded-xl text-white text-xs sm:text-sm shadow-lg cursor-pointer'
          >
            <span>Shop Now</span>
            <img src={assets.white_arrow_icon} alt="arrow" className='transition group-hover:translate-x-1 w-3 h-3 sm:w-3.5 sm:h-3.5' />
          </Link>

          <Link 
            to={"/offer"} 
            className='group flex items-center gap-2 px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-md transition-all rounded-xl text-white text-xs sm:text-sm border border-white/30 cursor-pointer'
          >
            <span>Today's Offers</span>
            <HiArrowRight className="group-hover:translate-x-1 transition-transform text-xs sm:text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
