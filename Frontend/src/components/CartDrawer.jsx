import React from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { 
    HiXMark, 
    HiBolt, 
    HiSparkles, 
    HiShoppingBag, 
    HiInformationCircle, 
    HiArrowRight 
} from 'react-icons/hi2';

const CartDrawer = () => {
    const {
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        cartItems,
        products,
        currency,
        addToCart,
        removeFromCart,
        getCartAmount,
        getCartCount,
        navigate
    } = useAppContext();

    if (!isCartDrawerOpen) return null;

    const cartArray = [];
    for (const id in cartItems) {
        if (cartItems[id] > 0) {
            const product = products.find(p => p._id === id);
            if (product) {
                cartArray.push({
                    ...product,
                    quantity: cartItems[id]
                });
            }
        }
    }

    const itemTotal = getCartAmount();
    const freeDeliveryThreshold = 199;
    const isFreeDelivery = itemTotal >= freeDeliveryThreshold;
    const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - itemTotal);
    const deliveryFee = isFreeDelivery || itemTotal === 0 ? 0 : 25;
    const handlingTax = Math.round(itemTotal * 0.02);
    const grandTotal = itemTotal + deliveryFee + handlingTax;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            
            <div 
                onClick={() => setIsCartDrawerOpen(false)}
                className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-gray-50 flex flex-col shadow-2xl">
                    
                    <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-gray-900">My Cart</span>
                            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                                {getCartCount()} items
                            </span>
                        </div>
                        <button 
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition cursor-pointer"
                        >
                            <HiXMark className="text-xl" />
                        </button>
                    </div>

                    
                    <div className="bg-emerald-50 border-b border-emerald-100 p-3 px-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            <HiBolt className="text-base text-amber-300" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                                Delivery in 9-11 minutes
                            </p>
                            <p className="text-xs text-emerald-700">
                                Fresh items directly from your nearest store
                            </p>
                        </div>
                    </div>

                    
                    <div className="bg-white p-3 border-b border-gray-100">
                        <div className="flex justify-between text-xs font-medium text-gray-700 mb-1.5">
                            <span className="flex items-center gap-1">
                                {isFreeDelivery && <HiSparkles className="text-amber-500" />}
                                <span>
                                    {isFreeDelivery ? "You've unlocked FREE Delivery!" : `Add ${currency}${amountNeededForFreeDelivery} more for FREE Delivery`}
                                </span>
                            </span>
                            <span className="font-bold text-emerald-700">
                                {isFreeDelivery ? "FREE" : `${currency}${deliveryFee}`}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div 
                                className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(100, (itemTotal / freeDeliveryThreshold) * 100)}%` }}
                            />
                        </div>
                    </div>

                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {cartArray.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-3xl mb-3 text-emerald-700">
                                    <HiShoppingBag className="text-4xl text-emerald-600" />
                                </div>
                                <h3 className="text-base font-semibold text-gray-800">Your cart is empty</h3>
                                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                                    Browse our fresh grocery categories and add items to your cart!
                                </p>
                                <button
                                    onClick={() => {
                                        setIsCartDrawerOpen(false);
                                        navigate('/product');
                                    }}
                                    className="mt-4 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-semibold transition cursor-pointer"
                                >
                                    Browse Products
                                </button>
                            </div>
                        ) : (
                            <>
                                
                                <div className="bg-white rounded-xl p-3 border border-gray-100 divide-y divide-gray-100">
                                    {cartArray.map((product) => (
                                        <div key={product._id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gray-50 p-1 shrink-0 border border-gray-100">
                                                <img 
                                                    src={product.image?.[0] || assets.logo} 
                                                    alt={product.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-semibold text-gray-900 truncate">
                                                    {product.name}
                                                </h4>
                                                <p className="text-[11px] text-gray-500 mt-0.5">
                                                    {currency}{product.offerPrice || product.price}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                
                                                <div className="flex items-center bg-emerald-700 text-white rounded-md px-1 py-0.5 font-bold text-xs">
                                                    <button 
                                                        onClick={() => removeFromCart(product._id)}
                                                        className="w-5 h-5 flex items-center justify-center hover:bg-emerald-800 rounded transition cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-5 text-center text-xs">{product.quantity}</span>
                                                    <button 
                                                        onClick={() => addToCart(product._id)}
                                                        className="w-5 h-5 flex items-center justify-center hover:bg-emerald-800 rounded transition cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className="text-xs font-bold text-gray-900 w-12 text-right">
                                                    {currency}{(product.offerPrice || product.price) * product.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                
                                <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-2 text-xs">
                                    <h4 className="font-bold text-gray-900 text-sm mb-2">Bill Details</h4>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Items Total</span>
                                        <span className="font-semibold text-gray-900">{currency}{itemTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Fee</span>
                                        <span className={deliveryFee === 0 ? "text-emerald-700 font-semibold" : "font-semibold text-gray-900"}>
                                            {deliveryFee === 0 ? "FREE" : `${currency}${deliveryFee}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Handling & Tax (2%)</span>
                                        <span className="font-semibold text-gray-900">{currency}{handlingTax}</span>
                                    </div>
                                    <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between text-sm font-bold text-gray-900">
                                        <span>To Pay</span>
                                        <span className="text-emerald-700 text-base">{currency}{grandTotal}</span>
                                    </div>
                                </div>

                                
                                <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-2.5 text-[11px] text-amber-800 flex items-start gap-2">
                                    <HiInformationCircle className="text-base text-amber-700 shrink-0 mt-0.5" />
                                    <span>Orders once dispatched cannot be cancelled. Fast 10-minute delivery in progress.</span>
                                </div>
                            </>
                        )}
                    </div>

                    
                    {cartArray.length > 0 && (
                        <div className="p-4 bg-white border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setIsCartDrawerOpen(false);
                                    navigate('/cart');
                                }}
                                className="w-full flex items-center justify-between bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white p-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
                            >
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-normal opacity-90">{getCartCount()} items</span>
                                    <span className="text-base leading-tight font-extrabold">{currency}{grandTotal}</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-bold">
                                    <span>Proceed to Checkout</span>
                                    <HiArrowRight className="text-base" />
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
