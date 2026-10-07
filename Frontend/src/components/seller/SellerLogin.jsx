import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
    HiBuildingStorefront,
    HiEnvelope,
    HiLockClosed,
    HiEye,
    HiEyeSlash,
    HiArrowRight,
    HiShieldCheck
} from 'react-icons/hi2';
import { TbLoader2 } from 'react-icons/tb';

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate, axios } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isUnlocked = showPassword || password.length >= 6;

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            setIsSubmitting(true);
            const { data } = await axios.post('/api/seller/login', { email, password });
            if (data.success) {
                setIsSeller(true);
                toast.success("Welcome back to Seller Hub!");
                navigate('/seller');
            } else {
                toast.error(data.message || "Invalid credentials");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Login failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);

    return !isSeller && (
        <div className="min-h-[85vh] flex items-center justify-center p-3 sm:p-6 md:p-8">
            <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-linear-to-b from-emerald-50 via-emerald-50/40 to-white pt-8 sm:pt-10 pb-4 px-6 text-center flex flex-col items-center">
                    <div 
                        onClick={() => setShowPassword(!showPassword)}
                        title="Click to toggle security lock"
                        className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer select-none group mb-2"
                    >
                        <div 
                            className={`absolute top-0 w-7 sm:w-8 h-8 sm:h-9 border-4 border-amber-500 rounded-t-full transition-all duration-500 origin-bottom-left ${
                                isUnlocked 
                                    ? "-rotate-40 -translate-y-2 -translate-x-1 border-emerald-600 shadow-xs" 
                                    : "rotate-0 translate-y-0.5 border-amber-600"
                            }`}
                        />
                        <div className={`relative z-10 w-10 sm:w-11 h-8.5 sm:h-9.5 rounded-xl shadow-md flex items-center justify-center transition-all duration-300 border ${
                            isUnlocked
                                ? "bg-linear-to-b from-emerald-500 to-emerald-600 border-emerald-700 shadow-emerald-200"
                                : "bg-linear-to-b from-amber-400 to-amber-500 border-amber-600 shadow-amber-200"
                        }`}>
                            <div className="flex flex-col items-center">
                                <div className="w-2.5 h-2.5 bg-gray-900 rounded-full" />
                                <div className="w-1.5 h-2 bg-gray-900 -mt-0.5 rounded-b-xs" />
                            </div>
                        </div>

                        <div className={`absolute -bottom-1 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest px-1.5 py-0.2 rounded-full transition-all duration-300 ${
                            isUnlocked ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                            {isUnlocked ? "AUTHORIZED" : "SECURED"}
                        </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                        Grocerin Seller Portal
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 font-medium flex items-center gap-1.5">
                        <HiBuildingStorefront className="text-emerald-700" />
                        <span>Manage Inventory, Fulfillment & Orders</span>
                    </p>
                </div>

                <form onSubmit={onSubmitHandler} className="p-4 sm:p-6 md:p-8 pt-2 space-y-4">
                    <div className="space-y-1">
                        <label className="block text-xs font-bold text-gray-700">
                            Seller Email Address
                        </label>
                        <div className="relative flex items-center">
                            <HiEnvelope className="absolute left-3.5 text-gray-400 text-base" />
                            <input
                                type="email"
                                required
                                inputMode="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seller@grocerin.com"
                                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-bold text-gray-700">
                            Seller Password
                        </label>
                        <div className="relative flex items-center">
                            <HiLockClosed className="absolute left-3.5 text-gray-400 text-base" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter seller password"
                                className="w-full text-xs sm:text-sm pl-10 pr-16 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-gray-500 hover:text-gray-800 text-xs font-semibold p-1 cursor-pointer flex items-center gap-1"
                            >
                                {showPassword ? (
                                    <>
                                        <HiEyeSlash className="text-sm" />
                                        <span className="text-[11px]">Hide</span>
                                    </>
                                ) : (
                                    <>
                                        <HiEye className="text-sm" />
                                        <span className="text-[11px]">Show</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 min-h-[44px]"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <TbLoader2 className="animate-spin text-base" />
                                <span>Verifying Portal Authorization...</span>
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5">
                                <span>Access Seller Dashboard</span>
                                <HiArrowRight className="text-sm" />
                            </span>
                        )}
                    </button>

                    <div className="text-center pt-2">
                        <Link to="/" className="text-xs font-bold text-emerald-700 hover:underline">
                            &larr; Back to Grocerin Store
                        </Link>
                    </div>
                </form>

                <div className="bg-gray-50 border-t border-gray-100 p-3.5 text-center text-[10px] sm:text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
                    <HiShieldCheck className="text-emerald-700 text-sm" />
                    <span>Protected by Enterprise 256-Bit SSL Dark Store Authentication</span>
                </div>
            </div>
        </div>
    );
};

export default SellerLogin;
