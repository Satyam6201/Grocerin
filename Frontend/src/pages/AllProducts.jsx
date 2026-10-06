import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { categories } from '../assets/assets';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const AllProducts = () => {
    const { products, searchQuery, loadingProducts } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [onlyInStock, setOnlyInStock] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        if (searchQuery && typeof searchQuery === 'string' && searchQuery.trim().length > 0) {
            const term = searchQuery.toLowerCase().trim();
            result = result.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.category.toLowerCase().includes(term)
            );
        }

        if (selectedCategory !== "all") {
            result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        if (onlyInStock) {
            result = result.filter(p => p.inStock);
        }

        if (sortBy === "price_asc") {
            result.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
        } else if (sortBy === "price_desc") {
            result.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
        } else if (sortBy === "discount") {
            result.sort((a, b) => {
                const discA = a.price - (a.offerPrice || a.price);
                const discB = b.price - (b.offerPrice || b.price);
                return discB - discA;
            });
        }

        return result;
    }, [products, searchQuery, selectedCategory, sortBy, onlyInStock]);

    return (
        <div className="py-6 min-h-screen">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Groceries & Essentials
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                        Showing <span className="font-bold text-gray-900">{filteredAndSortedProducts.length}</span> fresh products • Delivery in 10 mins
                    </p>
                </div>

                
                <div className="flex flex-wrap items-center gap-3">
                    
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl cursor-pointer select-none hover:bg-gray-100 transition">
                        <input
                            type="checkbox"
                            checked={onlyInStock}
                            onChange={(e) => setOnlyInStock(e.target.checked)}
                            className="rounded text-emerald-700 focus:ring-emerald-500"
                        />
                        <span>In Stock Only</span>
                    </label>

                    
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                        <span>Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent outline-none font-bold text-gray-900 cursor-pointer"
                        >
                            <option value="default">Relevance</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="discount">Biggest Discount</option>
                        </select>
                    </div>
                </div>
            </div>

            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 border-b border-gray-100">
                <button
                    onClick={() => setSelectedCategory("all")}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                        selectedCategory === "all"
                            ? "bg-emerald-700 text-white shadow-xs"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                    All Items
                </button>
                {categories.map((cat, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedCategory(cat.path.toLowerCase())}
                        className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                            selectedCategory === cat.path.toLowerCase()
                                ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        <span>{cat.text}</span>
                    </button>
                ))}
            </div>

            
            {loadingProducts ? (
                <ProductSkeleton count={10} />
            ) : filteredAndSortedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <HiMagnifyingGlass className="text-3xl text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">No matching groceries found</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-sm">
                        Try clearing your search query or choosing another category filter.
                    </p>
                    <button
                        onClick={() => {
                            setSelectedCategory("all");
                            setOnlyInStock(false);
                        }}
                        className="mt-4 px-4 py-2 bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
                    >
                        Reset Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 mt-6">
                    {filteredAndSortedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProducts;
