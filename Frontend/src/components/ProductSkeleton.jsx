import React from 'react';

const ProductSkeleton = ({ count = 10 }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 mt-4">
            {Array.from({ length: count }).map((_, index) => (
                <div 
                    key={index} 
                    className="border border-gray-100 rounded-2xl p-3 bg-white flex flex-col justify-between space-y-3"
                >
                    <div className="flex justify-between">
                        <div className="w-16 h-4 bg-gray-200 rounded-full shimmer-wrapper" />
                        <div className="w-12 h-4 bg-gray-200 rounded-full shimmer-wrapper" />
                    </div>
                    <div className="w-full aspect-square bg-gray-100 rounded-xl shimmer-wrapper" />
                    <div className="space-y-2">
                        <div className="w-16 h-3 bg-gray-200 rounded shimmer-wrapper" />
                        <div className="w-full h-4 bg-gray-200 rounded shimmer-wrapper" />
                        <div className="w-2/3 h-3 bg-gray-200 rounded shimmer-wrapper" />
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="w-14 h-5 bg-gray-200 rounded shimmer-wrapper" />
                        <div className="w-16 h-7 bg-gray-200 rounded-lg shimmer-wrapper" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductSkeleton;