import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { HiBolt } from "react-icons/hi2";

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    if (!product) return null;

    const discountPercent = product.price && product.offerPrice && product.price > product.offerPrice
        ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
        : null;

    const currentQty = cartItems[product._id] || 0;

    return (
        <div 
            onClick={() => {
                navigate(`/products/${product.category.toLowerCase()}/${product._id}`); 
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative flex flex-col justify-between bg-white border border-gray-100 hover:border-gray-300 rounded-2xl p-3 md:p-3.5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
        >
            {/* Top Badges (Discount & Delivery ETA) */}
            <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                    <HiBolt className="text-amber-500 text-xs" />
                    <span>10 MINS</span>
                </div>
                {discountPercent && (
                    <span className="bg-emerald-500 text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                        {discountPercent}% OFF
                    </span>
                )}
            </div>

            {/* Product Image */}
            <div className="relative w-full aspect-square flex items-center justify-center bg-gray-50/60 rounded-xl p-2 overflow-hidden mb-2">
                <img 
                    src={product.image?.[0] || assets.logo} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-[11px] md:text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
                        {product.category}
                    </p>
                    <h3 className="text-gray-900 font-semibold text-sm md:text-base leading-snug line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        {product.weight || (product.name.match(/\d+\s*(kg|g|L|ml|pcs)/i)?.[0]) || "Standard"}
                    </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1.5">
                    <div className="flex items-center bg-emerald-50 text-emerald-700 text-[11px] font-bold px-1.5 py-0.5 rounded gap-0.5">
                        <span>4.3</span>
                        <img src={assets.star_icon} alt="rating" className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[11px] text-gray-400">(42)</span>
                </div>

                {/* Price & Add to Cart Action */}
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                            {currency}{product.offerPrice || product.price}
                        </span>
                        {product.price > product.offerPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                {currency}{product.price}
                            </span>
                        )}
                    </div>

                    {/* Quick Add CTA */}
                    <div onClick={(e) => e.stopPropagation()} className="relative">
                        {!product.inStock ? (
                            <button disabled className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
                                Sold Out
                            </button>
                        ) : currentQty === 0 ? (
                            <button
                                onClick={() => addToCart(product._id)}
                                className="group/btn flex items-center justify-center gap-1 bg-white hover:bg-emerald-50 text-emerald-700 border-1.5 border-emerald-600 hover:border-emerald-700 font-bold text-xs md:text-sm px-3.5 py-1.5 rounded-lg shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer"
                            >
                                <span>ADD</span>
                                <span className="text-base leading-none font-bold">+</span>
                            </button>
                        ) : (
                            <div className="flex items-center bg-emerald-700 text-white rounded-lg px-1 py-0.5 shadow-xs font-bold text-sm">
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="w-6 h-6 flex items-center justify-center hover:bg-emerald-800 rounded transition cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="w-5 text-center text-xs md:text-sm">{currentQty}</span>
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="w-6 h-6 flex items-center justify-center hover:bg-emerald-800 rounded transition cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;