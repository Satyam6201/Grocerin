import React from 'react';
import MainBanner from '../components/MainBanner';
import Categories from '../components/Categories';
import BestSeller from '../components/BestSeller';
import RecipeBundles from '../components/RecipeBundles';
import BottomBanner from '../components/BottomBanner';
import NewsLetter from '../components/NewsLetter';
import { useAppContext } from '../context/AppContext';
import { HiCpuChip, HiBolt, HiGift, HiShieldCheck, HiArrowRight } from 'react-icons/hi2';

const Home = () => {
  const { setShowSdeModal, setShowScratchCardModal, setShowLiveTrackingModal } = useAppContext();

  return (
    <div className='mt-4 sm:mt-8 space-y-8 sm:space-y-12'>
      <MainBanner />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setShowSdeModal(true)}
          className="p-3.5 sm:p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between border border-slate-800 hover:border-emerald-500/50 shadow-md transition cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <HiCpuChip className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-emerald-400">SDE Architecture</p>
              <p className="text-[11px] text-slate-300">Redis, RAG & Pool Telemetry</p>
            </div>
          </div>
          <HiArrowRight className="text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition text-sm shrink-0" />
        </button>

        <button
          onClick={() => setShowLiveTrackingModal(true)}
          className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between border border-emerald-700 shadow-md transition cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 text-amber-300 flex items-center justify-center font-bold shrink-0">
              <HiBolt className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Live 10-Min Telemetry</p>
              <p className="text-[11px] text-emerald-100">Biker GPS & Cold Chain</p>
            </div>
          </div>
          <HiArrowRight className="text-emerald-200 group-hover:text-white group-hover:translate-x-1 transition text-sm shrink-0" />
        </button>

        <button
          onClick={() => setShowScratchCardModal(true)}
          className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 text-amber-950 flex items-center justify-between border border-amber-200 hover:border-amber-400 shadow-md transition cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center font-bold shrink-0">
              <HiGift className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-900">Scratch & Win Discount</p>
              <p className="text-[11px] text-amber-700">Reveal Secret Promo Codes</p>
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
