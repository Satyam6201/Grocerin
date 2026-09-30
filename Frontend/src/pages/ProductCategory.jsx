import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { HiShoppingBag } from 'react-icons/hi2';

const ProductCategory = () => {
    const { products, loadingProducts } = useAppContext();
    const { category } = useParams();
    const [sortBy, setSortBy] = useState("default");

    const matchedCategory = categories.find(
        (item) => item.path.toLowerCase() === category?.toLowerCase()
    );

    const filteredCategoryProducts = useMemo(() => {
        let result = products.filter(
            (product) => product.category.toLowerCase() === category?.toLowerCase()
        );

        if (sortBy === "price_asc") {
            result.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
        } else if (sortBy === "price_desc") {
            result.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
        }

        return result;
    }, [products, category, sortBy]);

    return (
        <div className="py-6 min-h-screen">
            
            <div className="flex flex-col gap-2 pb-4 border-b border-gray-100">
                <div className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Link to="/" className="hover:text-emerald-700">Home</Link>
                    <span>/</span>
                    <Link to="/product" className="hover:text-emerald-700">Products</Link>
                    <span>/</span>
                    <span className="font-semibold text-gray-700">{matchedCategory?.text || category}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
                    <div className="flex items-center gap-3">
                        {matchedCategory?.image && (
                            <img src={matchedCategory.image} alt="" className="w-10 h-10 object-contain p-1 rounded-xl bg-gray-50 border border-gray-100" />
                        )}
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                                {matchedCategory ? matchedCategory.text : category}
                            </h1>
                            <p className="text-xs text-gray-500">
                                {filteredCategoryProducts.length} items available in your area
                            </p>
                        </div>
                    </div>

                    
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                        <span>Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent outline-none font-bold text-gray-900 cursor-pointer"
                        >
                            <option value="default">Relevance</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>

            
            {loadingProducts ? (
                <ProductSkeleton count={8} />
            ) : filteredCategoryProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 mt-6">
                    {filteredCategoryProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
                        <HiShoppingBag className="text-3xl text-emerald-700" />
                    </div>
                    <h3 className="text-base font-bold text-gray-800">No products found in this category</h3>
                    <p className="text-xs text-gray-500 mt-1">
                        We are restocking this section for your delivery zone. Check back shortly!
                    </p>
                    <Link
                        to="/product"
                        className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition"
                    >
                        Browse All Groceries
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ProductCategory;
