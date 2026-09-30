import React from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { HiBolt } from 'react-icons/hi2';

const BestSeller = () => {
    const { products, loadingProducts } = useAppContext();

    const bestSellers = products.filter((product) => product.inStock).slice(0, 10);

    return (
        <div className='mt-14'>
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className='text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight'>
                            Best Sellers
                        </h2>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                            <HiBolt className="text-xs text-amber-600" />
                            <span>FAST DELIVERY</span>
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Most loved household items by our customers</p>
                </div>
                <Link 
                    to="/product" 
                    className="text-xs font-bold text-emerald-800 hover:underline"
                >
                    View All &rarr;
                </Link>
            </div>

            {loadingProducts ? (
                <ProductSkeleton count={5} />
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 mt-5'>
                    {bestSellers.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BestSeller;
