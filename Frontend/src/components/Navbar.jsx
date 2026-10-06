import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { 
    HiBolt, 
    HiMapPin, 
    HiChevronDown, 
    HiBuildingStorefront, 
    HiShoppingBag, 
    HiCube, 
    HiArrowRightOnRectangle,
    HiXMark,
    HiArrowRight,
    HiCpuChip,
    HiGift,
    HiSparkles
} from 'react-icons/hi2';
import { TbLoader2 } from 'react-icons/tb';
import VoiceSearch from './VoiceSearch';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const searchRef = useRef(null);

    const {
        user,
        setuser,
        setShowUserLogin,
        navigate,
        searchQuery,
        setSearchQuery,
        getCartCount,
        getCartAmount,
        currency,
        axios,
        isSeller,
        products,
        addToCart,
        setIsCartDrawerOpen,
        setShowLocationModal,
        deliveryLocation,
        detectCurrentLocation,
        isDetectingLocation,
        setShowSdeModal,
        setShowLiveTrackingModal,
        setShowScratchCardModal
    } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout');
            if (data.success) {
                toast.success(data.message);
                setuser(null);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const searchResults = React.useMemo(() => {
        if (!searchQuery || typeof searchQuery !== 'string' || searchQuery.trim().length === 0) {
            return [];
        }
        const term = searchQuery.toLowerCase().trim();
        return products.filter(p => 
            p.name.toLowerCase().includes(term) || 
            p.category.toLowerCase().includes(term)
        ).slice(0, 5);
    }, [searchQuery, products]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const cartCount = getCartCount();
    const cartAmount = getCartAmount();

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
            <div className="flex items-center justify-between px-4 md:px-12 lg:px-20 xl:px-28 py-3 gap-3 md:gap-8">
                
                
                <div className="flex items-center gap-3 lg:gap-5 shrink-0">
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <img className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-102" src={assets.nav_logo} alt="Grocerin" />
                    </NavLink>

                    
                    <div className="hidden sm:flex items-center bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/70 rounded-2xl p-1 pr-2 transition">
                        <button
                            onClick={() => setShowLocationModal(true)}
                            className="flex flex-col text-left px-2.5 py-1 cursor-pointer"
                        >
                            <div className="flex items-center gap-1.5 text-xs font-black text-gray-900 uppercase tracking-wider">
                                <HiBolt className="text-amber-500 text-sm animate-pulse" />
                                <span>Delivery in {deliveryLocation.eta || "9 MINS"}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-gray-600 font-medium truncate max-w-[140px] lg:max-w-[180px]">
                                <span className="truncate">{deliveryLocation.city}</span>
                                {deliveryLocation.pincode && (
                                    <span className="text-[10px] text-gray-400">({deliveryLocation.pincode})</span>
                                )}
                                <HiChevronDown className="text-[11px] text-gray-400 shrink-0" />
                            </div>
                        </button>

                        
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                detectCurrentLocation();
                            }}
                            title="Auto-detect current GPS location & PIN code"
                            disabled={isDetectingLocation}
                            className="flex items-center gap-1 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:border-emerald-600 text-[11px] font-bold py-1.5 px-2.5 rounded-xl shadow-2xs transition active:scale-95 cursor-pointer ml-1"
                        >
                            {isDetectingLocation ? (
                                <TbLoader2 className="animate-spin text-sm text-emerald-700" />
                            ) : (
                                <HiMapPin className="text-sm text-emerald-700" />
                            )}
                            <span className="hidden xl:inline">{isDetectingLocation ? "Detecting..." : "GPS"}</span>
                        </button>
                    </div>
                </div>

                
                <div ref={searchRef} className="relative flex-1 max-w-2xl">
                    <div className="relative flex items-center bg-gray-100 focus-within:bg-white border border-transparent focus-within:border-emerald-600 rounded-xl px-3 py-1.5 transition-all shadow-inner focus-within:shadow-xs gap-1.5">
                        <img src={assets.search_icon} alt="search" className="w-4 h-4 text-gray-400 opacity-60 mr-1 shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onFocus={() => setSearchFocused(true)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setSearchFocused(false);
                                    navigate('/product');
                                }
                            }}
                            placeholder='Search "milk", "fresh potato", "bread", "maggi"...'
                            className="w-full bg-transparent text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-xs text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                            >
                                <HiXMark className="text-sm" />
                            </button>
                        )}
                        <VoiceSearch onVoiceResult={(txt) => {
                            setSearchQuery(txt);
                            navigate('/product');
                        }} />
                    </div>

                    
                    {searchFocused && searchQuery.trim().length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 divide-y divide-gray-100 animate-in fade-in-50 duration-150">
                            {searchResults.length === 0 ? (
                                <div className="p-4 text-center text-xs text-gray-500">
                                    No groceries found matching "<span className="font-semibold text-gray-700">{searchQuery}</span>"
                                </div>
                            ) : (
                                searchResults.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() => {
                                            setSearchFocused(false);
                                            navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                        }}
                                        className="p-3 hover:bg-emerald-50/40 flex items-center justify-between gap-3 cursor-pointer transition"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-50 p-1 border border-gray-100 shrink-0">
                                                <img src={product.image?.[0]} alt={product.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-gray-900 line-clamp-1">{product.name}</p>
                                                <p className="text-[11px] text-gray-500">{product.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-gray-900">
                                                {currency}{product.offerPrice || product.price}
                                            </span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product._id);
                                                }}
                                                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1 rounded-lg transition cursor-pointer"
                                            >
                                                + ADD
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div
                                onClick={() => {
                                    setSearchFocused(false);
                                    navigate('/product');
                                }}
                                className="p-2.5 bg-gray-50 text-center text-xs font-bold text-emerald-800 hover:bg-emerald-50 cursor-pointer flex items-center justify-center gap-1.5"
                            >
                                <span>See all matching products</span>
                                <HiArrowRight className="text-xs" />
                            </div>
                        </div>
                    )}
                </div>

                
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
                    {/* SDE Architecture Modal Trigger */}
                    <button
                        onClick={() => setShowSdeModal(true)}
                        title="View Full SDE Architecture, Redis Telemetry & System Metrics"
                        className="hidden md:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-mono font-bold px-3 py-1.5 rounded-full border border-slate-700 shadow-xs cursor-pointer transition hover:scale-102"
                    >
                        <HiCpuChip className="text-emerald-400 w-3.5 h-3.5 animate-pulse" />
                        <span>SDE Telemetry</span>
                    </button>

                    {/* Lucky Scratch Card Button */}
                    <button
                        onClick={() => setShowScratchCardModal(true)}
                        title="Scratch & Win Discount Coupons"
                        className="hidden lg:flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold px-3 py-1.5 rounded-full border border-amber-200 transition cursor-pointer"
                    >
                        <HiGift className="text-amber-600 text-sm animate-bounce" />
                        <span>Scratch & Win</span>
                    </button>

                    <NavLink
                        to="/seller"
                        className="hidden xl:flex items-center gap-1.5 border border-gray-200 hover:border-emerald-600 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:text-emerald-700 transition"
                    >
                        <HiBuildingStorefront className="text-emerald-700 text-sm" />
                        <span>Seller Portal</span>
                    </NavLink>

                    
                    {!user ? (
                        <button
                            onClick={() => setShowUserLogin(true)}
                            className="text-xs md:text-sm font-bold text-gray-800 hover:text-emerald-700 px-3 py-2 rounded-xl transition cursor-pointer"
                        >
                            Login
                        </button>
                    ) : (
                        <div className="relative group">
                            <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
                                <img src={assets.profile_icon} alt="profile" className="w-8 h-8 rounded-full border border-gray-200" />
                                <span className="hidden md:inline text-xs font-bold text-gray-800 truncate max-w-[90px]">
                                    {user.name?.split(' ')[0] || "Account"}
                                </span>
                            </button>
                            
                            <div className="hidden group-hover:block absolute right-0 top-full pt-1 w-44 z-50">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 text-xs text-gray-700 divide-y divide-gray-100">
                                    <div className="px-3 py-2">
                                        <p className="font-bold text-gray-900">{user.name}</p>
                                        <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                                    </div>
                                    <div className="py-1">
                                        <button
                                            onClick={() => navigate('/my-orders')}
                                            className="w-full text-left px-3 py-2 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2 cursor-pointer font-medium"
                                        >
                                            <HiCube className="text-emerald-700 text-sm" />
                                            <span>My Orders</span>
                                        </button>
                                        <button
                                            onClick={() => navigate('/add-address')}
                                            className="w-full text-left px-3 py-2 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2 cursor-pointer font-medium"
                                        >
                                            <HiMapPin className="text-emerald-700 text-sm" />
                                            <span>Saved Addresses</span>
                                        </button>
                                    </div>
                                    <div className="pt-1">
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer font-medium"
                                        >
                                            <HiArrowRightOnRectangle className="text-rose-600 text-sm" />
                                            <span>Log Out</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    
                    <button
                        onClick={() => setIsCartDrawerOpen(true)}
                        className={`flex items-center gap-2.5 px-3.5 md:px-4 py-2.5 rounded-xl font-bold transition-all shadow-xs cursor-pointer ${
                            cartCount > 0
                                ? "bg-emerald-700 hover:bg-emerald-800 text-white animate-in zoom-in-95"
                                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                    >
                        <HiShoppingBag className="text-base" />
                        <div className="flex flex-col text-left leading-none">
                            <span className="text-[10px] uppercase font-bold opacity-80">
                                {cartCount > 0 ? `${cartCount} items` : "My Cart"}
                            </span>
                            {cartCount > 0 ? (
                                <span className="text-xs font-black tracking-tight">{currency}{cartAmount}</span>
                            ) : (
                                <span className="text-xs font-semibold">Empty</span>
                            )}
                        </div>
                    </button>

                    
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="sm:hidden p-1.5 text-gray-600 hover:text-gray-900 rounded-lg cursor-pointer"
                    >
                        <img src={assets.menu_icon} alt="menu" className="w-5 h-5" />
                    </button>
                </div>
            </div>

            
            <div className="sm:hidden bg-amber-50/90 px-4 py-2 border-t border-amber-100 flex items-center justify-between text-xs text-amber-950">
                <div 
                    onClick={() => setShowLocationModal(true)}
                    className="flex items-center gap-1.5 font-semibold truncate cursor-pointer flex-1 mr-2"
                >
                    <HiBolt className="text-amber-600 text-sm shrink-0" />
                    <span>9 MINS to:</span>
                    <span className="text-gray-800 truncate font-normal">
                        {deliveryLocation.city} {deliveryLocation.pincode ? `(${deliveryLocation.pincode})` : ''}
                    </span>
                </div>
                
                <button
                    onClick={detectCurrentLocation}
                    disabled={isDetectingLocation}
                    className="flex items-center gap-1 bg-white border border-amber-300 text-amber-900 text-[10px] font-bold px-2 py-1 rounded-lg shrink-0 cursor-pointer shadow-2xs"
                >
                    {isDetectingLocation ? (
                        <TbLoader2 className="animate-spin text-xs" />
                    ) : (
                        <HiMapPin className="text-xs" />
                    )}
                    <span>{isDetectingLocation ? "Detecting" : "Current"}</span>
                </button>
            </div>

            
            {mobileMenuOpen && (
                <div className="sm:hidden bg-white border-b border-gray-200 p-4 space-y-2 text-sm font-semibold text-gray-700 animate-in slide-in-from-top-2">
                    <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Home</NavLink>
                    <NavLink to="/product" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">All Products</NavLink>
                    {user && (
                        <NavLink to="/my-orders" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">My Orders</NavLink>
                    )}
                    <NavLink to="/seller" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-emerald-700">Seller Dashboard</NavLink>
                    <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Contact Us</NavLink>
                </div>
            )}
        </header>
    );
};

export default Navbar;
