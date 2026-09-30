import React from 'react';
import { assets } from '../assets/assets';
import { Link } from "react-router-dom";
import { HiBolt, HiArrowRight } from 'react-icons/hi2';

const MainBanner = () => {
  return (
    <div className='relative rounded-3xl overflow-hidden shadow-xs mt-4'>
      <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block object-cover' />
      <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden object-cover' />
      
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-12 md:pb-0 px-6 md:pl-16 lg:pl-20 bg-linear-to-t md:bg-linear-to-r from-black/60 md:from-black/40 to-transparent'>
        
        <div className="flex items-center gap-1.5 bg-amber-400 text-gray-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-md">
          <HiBolt className="text-sm" />
          <span>10-Minute Grocery Delivery</span>
        </div>

        <h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-center md:text-left text-white max-w-sm md:max-w-md lg:max-w-xl leading-tight drop-shadow-md'>
          Freshness You Can Trust, Savings You Will Love!
        </h1>
        <p className="hidden md:block text-white/90 text-sm mt-2 max-w-md">
          Farm-fresh fruits, crispy vegetables, dairy, cold drinks, and daily essentials delivered right to your doorstep.
        </p>

        <div className='flex items-center gap-4 mt-5 font-bold'>
          <Link 
            to={"/product"} 
            className='group flex items-center gap-2 px-6 md:px-8 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all rounded-xl text-white text-xs md:text-sm shadow-lg cursor-pointer'
          >
            <span>Shop Now</span>
            <img src={assets.white_arrow_icon} alt="arrow" className='transition group-hover:translate-x-1 w-3.5 h-3.5' />
          </Link>

          <Link 
            to={"/offer"} 
            className='group flex items-center gap-2 px-6 md:px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all rounded-xl text-white text-xs md:text-sm border border-white/30 cursor-pointer'
          >
            <span>Today's Offers</span>
            <HiArrowRight className="group-hover:translate-x-1 transition-transform text-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
