import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { HiBolt, HiPlus, HiMinus } from "react-icons/hi2";

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
            className="group relative flex flex-col justify-between bg-white border border-gray-100 hover:border-emerald-300/80 rounded-2xl p-2.5 sm:p-3.5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
        >
            <div className="flex items-center justify-between gap-1 mb-1.5 sm:mb-2">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-[9px] sm:text-[11px] font-black px-1.5 sm:px-2 py-0.5 rounded-md border border-amber-200">
                    <HiBolt className="text-amber-500 text-xs animate-pulse" />
                    <span>10 MINS</span>
                </div>
                {discountPercent && (
                    <span className="bg-emerald-600 text-white text-[9px] sm:text-[11px] font-black px-1.5 py-0.5 rounded-md shadow-2xs">
                        {discountPercent}% OFF
                    </span>
                )}
            </div>

            <div className="relative w-full aspect-square flex items-center justify-center bg-gray-50/70 rounded-xl p-1.5 sm:p-2 overflow-hidden mb-2">
                <img 
                    src={product.image?.[0] || assets.logo} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                {!product.inStock && (
                    <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px] flex items-center justify-center p-1">
                        <span className="bg-rose-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider truncate">
                        {product.category}
                    </p>
                    <h3 className="text-gray-900 font-bold text-xs sm:text-sm leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] mt-0.5">
                        {product.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 truncate">
                        {product.weight || (product.name.match(/\d+\s*(kg|g|L|ml|pcs)/i)?.[0]) || "Standard"}
                    </p>
                </div>

                <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center bg-emerald-50 text-emerald-800 text-[10px] sm:text-[11px] font-black px-1.5 py-0.5 rounded gap-0.5">
                        <span>4.4</span>
                        <img src={assets.star_icon} alt="rating" className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium">(48)</span>
                </div>

                <div className="flex items-center justify-between pt-2.5 sm:pt-3 mt-2 border-t border-gray-100 gap-1">
                    <div className="flex flex-col min-w-0">
                        <span className="text-sm sm:text-base md:text-lg font-black text-gray-900 leading-tight truncate">
                            {currency}{product.offerPrice || product.price}
                        </span>
                        {product.price > product.offerPrice && (
                            <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                                {currency}{product.price}
                            </span>
                        )}
                    </div>

                    <div onClick={(e) => e.stopPropagation()} className="relative shrink-0">
                        {!product.inStock ? (
                            <button disabled className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">
                                Sold Out
                            </button>
                        ) : currentQty === 0 ? (
                            <button
                                onClick={() => addToCart(product._id)}
                                aria-label={`Add ${product.name} to cart`}
                                className="group/btn flex items-center justify-center gap-1 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white border-1.5 border-emerald-600 font-black text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-xl shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer min-h-[34px]"
                            >
                                <span>ADD</span>
                                <HiPlus className="w-3.5 h-3.5 text-sm" />
                            </button>
                        ) : (
                            <div className="flex items-center bg-emerald-700 text-white rounded-xl px-1 py-0.5 shadow-xs font-black text-xs sm:text-sm min-h-[34px]">
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    aria-label="Decrease quantity"
                                    className="w-6 h-7 flex items-center justify-center hover:bg-emerald-800 rounded-lg transition cursor-pointer active:scale-90"
                                >
                                    <HiMinus className="w-3 h-3" />
                                </button>
                                <span className="w-5 text-center text-xs sm:text-sm font-black">{currentQty}</span>
                                <button
                                    onClick={() => addToCart(product._id)}
                                    aria-label="Increase quantity"
                                    className="w-6 h-7 flex items-center justify-center hover:bg-emerald-800 rounded-lg transition cursor-pointer active:scale-90"
                                >
                                    <HiPlus className="w-3 h-3" />
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
