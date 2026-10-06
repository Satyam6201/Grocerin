import React from 'react';
import { categories } from '../assets/assets';
import { useAppContext } from "../context/AppContext";
import { HiArrowRight } from 'react-icons/hi2';

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className='mt-8 sm:mt-12'>
      <div className="flex items-center justify-between">
        <div>
          <h2 className='text-xl sm:text-2xl font-black text-gray-900 tracking-tight'>
            Explore Categories
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Handpicked fresh groceries for daily needs</p>
        </div>
        <button 
          onClick={() => { navigate('/product'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xs font-black text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer transition"
        >
          <span>See All</span>
          <HiArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2.5 sm:gap-3 md:gap-4 mt-4 sm:mt-5'> 
        {categories.map((category, index) => (
          <div 
            key={index} 
            className='group cursor-pointer p-2.5 sm:p-3 rounded-2xl flex flex-col justify-between items-center text-center transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-md active:scale-95'
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center">
              <img 
                src={category.image} 
                alt={category.text} 
                className='group-hover:scale-110 transition-transform duration-300 max-h-full object-contain'
                loading="lazy"
              />
            </div>
            <p className='text-[10px] sm:text-[11px] md:text-xs font-bold text-gray-800 mt-1.5 sm:mt-2 line-clamp-1'>
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
