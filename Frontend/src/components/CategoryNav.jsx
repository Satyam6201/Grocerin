import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { categories } from '../assets/assets';
import { HiBolt } from 'react-icons/hi2';

const CategoryNav = () => {
    const location = useLocation();

    return (
        <div className="bg-white border-b border-gray-100 shadow-2xs sticky top-[72px] z-30">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5 px-4 md:px-16 lg:px-20 xl:px-28">
                <NavLink
                    to="/product"
                    end
                    className={({ isActive }) =>
                        `shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                            isActive && !location.pathname.includes('/products/')
                                ? "bg-emerald-700 text-white shadow-xs"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`
                    }
                >
                    <HiBolt className="text-amber-400 text-xs" />
                    <span>All Products</span>
                </NavLink>

                {categories.map((cat, idx) => {
                    const path = `/products/${cat.path.toLowerCase()}`;
                    const isActive = location.pathname.toLowerCase() === path.toLowerCase();

                    return (
                        <NavLink
                            key={idx}
                            to={path}
                            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer border ${
                                isActive
                                    ? "bg-emerald-700 text-white border-emerald-700 font-semibold shadow-xs"
                                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                        >
                            <img src={cat.image} alt={cat.text} className="w-4 h-4 object-contain rounded-full" />
                            <span>{cat.text}</span>
                        </NavLink>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryNav;