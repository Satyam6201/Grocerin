import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';

const MobileCartBar = () => {
    const { getCartCount, getCartAmount, currency, setIsCartDrawerOpen } = useAppContext();
    const location = useLocation();

    const count = getCartCount();
    const isCartOrSeller = location.pathname.includes('/cart') || location.pathname.includes('/seller');

    if (count === 0 || isCartOrSeller) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden animate-in slide-in-from-bottom-4 duration-300">
            <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="w-full bg-emerald-700 active:bg-emerald-800 text-white rounded-2xl p-3.5 px-5 shadow-2xl flex items-center justify-between cursor-pointer border border-emerald-600"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-xs">
                        {count}
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-semibold">
                            Total Cart
                        </span>
                        <span className="text-base font-extrabold leading-tight">
                            {currency}{getCartAmount()}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 font-bold text-sm bg-white/10 py-1.5 px-3 rounded-xl backdrop-blur-xs">
                    <span>View Cart</span>
                    <HiArrowRight className="text-sm" />
                </div>
            </button>
        </div>
    );
};

export default MobileCartBar;
