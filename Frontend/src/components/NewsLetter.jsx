import React from 'react';
import { Link } from 'react-router-dom';
import {
    HiArrowRight,
    HiSparkles
} from 'react-icons/hi2';

const NewsLetter = () => {
    return (
        <div className="mt-16 mb-8 bg-linear-to-r from-emerald-900 via-teal-900 to-slate-950 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-xl border border-emerald-500/20">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-xs font-bold tracking-wide">
                    <HiSparkles className="w-3.5 h-3.5" />
                    <span>The Grocerin Advantage</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    Instant Supermarket at Your Doorstep in 10 Minutes
                </h2>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl mx-auto">
                    Experience hyper-local quick commerce with over 5,000+ handpicked products, fresh farm vegetables, chilled dairy, and snacks ready for instant dispatch.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        to="/product"
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <span>Start Grocery Shopping</span>
                        <HiArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        to="/offer"
                        className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <span>View Exclusive Deals</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;
