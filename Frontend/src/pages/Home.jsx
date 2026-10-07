import React, { useEffect } from 'react';
import MainBanner from '../components/MainBanner';
import Categories from '../components/Categories';
import BestSeller from '../components/BestSeller';
import RecipeBundles from '../components/RecipeBundles';
import BottomBanner from '../components/BottomBanner';
import NewsLetter from '../components/NewsLetter';
import { useAppContext } from '../context/AppContext';
import {
    HiBolt,
    HiGift,
    HiShieldCheck,
    HiArrowRight
} from 'react-icons/hi2';

const Home = () => {
  const { setShowScratchCardModal } = useAppContext();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className='mt-4 sm:mt-8 space-y-8 sm:space-y-12'>
      <MainBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <HiBolt className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">10-Minute Fast Delivery</p>
              <p className="text-[11px] text-emerald-800 font-medium">From our nearest dark store</p>
            </div>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50/60 border border-sky-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <HiShieldCheck className="w-5 h-5 text-sky-100" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">100% Quality Guaranteed</p>
              <p className="text-[11px] text-sky-800 font-medium">Farm fresh & hygienic packing</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowScratchCardModal(true)}
          className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200 hover:border-amber-400 shadow-xs transition cursor-pointer group text-left flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <HiGift className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-950">Scratch & Win Discount</p>
              <p className="text-[11px] text-amber-800 font-medium">Reveal secret promo codes</p>
            </div>
          </div>
          <HiArrowRight className="text-amber-700 group-hover:translate-x-1 transition text-sm shrink-0" />
        </button>
      </div>

      <Categories />
      <RecipeBundles />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
