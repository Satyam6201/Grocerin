import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
    HiXMark, 
    HiBolt, 
    HiPhone, 
    HiChatBubbleLeftRight, 
    HiShieldCheck, 
    HiCheckCircle, 
    HiMapPin, 
    HiBuildingStorefront,
    HiSparkles,
    HiArrowPath
} from 'react-icons/hi2';
import { FaMotorcycle } from "react-icons/fa6";
import toast from 'react-hot-toast';

const TOTAL_DELIVERY_SECONDS = 540;

const LiveTelemetryModal = () => {
    const { 
        showLiveTrackingModal, 
        setShowLiveTrackingModal, 
        activeTrackingOrder,
        deliveryLocation 
    } = useAppContext();

    const [secondsLeft, setSecondsLeft] = useState(TOTAL_DELIVERY_SECONDS);
    const [coldTemp, setColdTemp] = useState(3.6);

    useEffect(() => {
        if (!showLiveTrackingModal) return;

        const interval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [showLiveTrackingModal]);

    if (!showLiveTrackingModal) return null;

    const isDelivered = secondsLeft <= 0;
    const progressPercent = isDelivered 
        ? 100 
        : Math.min(96, Math.max(6, ((TOTAL_DELIVERY_SECONDS - secondsLeft) / TOTAL_DELIVERY_SECONDS) * 100));

    const riderDistance = isDelivered ? 0 : Math.max(0.05, Number(((secondsLeft / 60) * 0.22).toFixed(2)));
    
    let riderSpeed = 32;
    if (isDelivered) {
        riderSpeed = 0;
    } else if (secondsLeft < 15) {
        riderSpeed = 6;
    } else if (secondsLeft < 60) {
        riderSpeed = 16;
    } else if (secondsLeft < 180) {
        riderSpeed = 24;
    }

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = isDelivered 
        ? "DELIVERED" 
        : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const boostSimulator = () => {
        if (secondsLeft <= 12) {
            setSecondsLeft(0);
            toast.success("Order Delivered at your doorstep!");
        } else {
            setSecondsLeft(10);
            toast.success("Fast-Forwarded: Rider is 10s away from doorstep!");
        }
    };

    const resetSimulation = () => {
        setSecondsLeft(TOTAL_DELIVERY_SECONDS);
        toast.success("Trip simulation reset to 9 minutes");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-250 flex flex-col max-h-[92vh] overflow-y-auto"
            >
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-4 sm:p-5 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-amber-300 shrink-0">
                            <FaMotorcycle className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-black text-sm sm:text-base tracking-tight">
                                    Live Rider GPS Telemetry
                                </h3>
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                    isDelivered 
                                        ? "bg-emerald-300 text-emerald-950 font-black" 
                                        : "bg-emerald-400 text-emerald-950 animate-pulse"
                                }`}>
                                    {isDelivered ? "ARRIVED" : "LIVE GPS"}
                                </span>
                            </div>
                            <p className="text-[11px] text-emerald-100/80 truncate max-w-[200px] sm:max-w-xs">
                                Dark Store Hub #102 → {deliveryLocation.city || "Patna"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowLiveTrackingModal(false)}
                        className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
                        aria-label="Close modal"
                    >
                        <HiXMark className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 sm:p-5 bg-gradient-to-b from-emerald-50/70 via-white to-white border-b border-emerald-100/60 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="text-center sm:text-left">
                        <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                            {isDelivered ? "Status Update" : "Estimated Arrival In"}
                        </span>
                        <div className="text-2xl sm:text-4xl font-black text-emerald-950 font-mono tracking-tight flex items-baseline justify-center sm:justify-start gap-2">
                            <span>{formattedTime}</span>
                            {!isDelivered && (
                                <span className="text-xs font-sans text-emerald-700 font-bold">MINS</span>
                            )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                            Order {activeTrackingOrder ? `#${activeTrackingOrder._id?.slice(-6).toUpperCase()}` : '#GRC-9201'}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {!isDelivered ? (
                            <button
                                onClick={boostSimulator}
                                className="bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-extrabold px-3.5 py-2 rounded-2xl shadow-md transition flex items-center gap-1.5 cursor-pointer shrink-0"
                            >
                                <HiBolt className="text-amber-300 text-sm" />
                                <span>Fast-Forward Rider</span>
                            </button>
                        ) : (
                            <button
                                onClick={resetSimulation}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-extrabold px-3.5 py-2 rounded-2xl transition flex items-center gap-1.5 cursor-pointer"
                            >
                                <HiArrowPath className="text-xs" />
                                <span>Replay Dispatch</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-4 sm:p-5 space-y-4">
                    <div className="relative bg-slate-900 rounded-3xl p-4 sm:p-5 text-white overflow-hidden shadow-inner border border-slate-800">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                        <div className="flex justify-between items-center text-[11px] font-mono mb-6 text-slate-400">
                            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                                <span className={`w-2 h-2 rounded-full ${isDelivered ? "bg-emerald-400" : "bg-emerald-400 animate-ping"}`} />
                                <span>{isDelivered ? "Trip Completed" : "Rider On EV Transit"}</span>
                            </span>
                            <span>Speed: <strong className="text-white">{riderSpeed} km/h</strong></span>
                        </div>

                        <div className="relative py-6 px-3">
                            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden relative">
                                <div 
                                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-1000 ease-linear rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>

                            <div className="absolute left-2 -top-1 flex flex-col items-center z-10">
                                <div className="w-8 h-8 rounded-xl bg-emerald-700 border-2 border-slate-900 flex items-center justify-center text-white shadow-md">
                                    <HiBuildingStorefront className="w-4 h-4" />
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 mt-1 font-mono">Hub #102</span>
                            </div>

                            <div 
                                className="absolute -top-3.5 transition-all duration-1000 ease-linear flex flex-col items-center z-20 pointer-events-none"
                                style={{ 
                                    left: `${progressPercent}%`,
                                    transform: 'translateX(-50%)'
                                }}
                            >
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xl border-2 transition-all ${
                                    isDelivered 
                                        ? "bg-emerald-500 border-white text-white scale-110 ring-4 ring-emerald-400/40" 
                                        : "bg-amber-400 border-slate-900 text-slate-950 animate-bounce"
                                }`}>
                                    {isDelivered ? <HiCheckCircle className="w-6 h-6" /> : <FaMotorcycle className="w-5 h-5" />}
                                </div>
                                <span className="text-[10px] font-black text-amber-300 mt-1 font-mono whitespace-nowrap bg-slate-950/80 px-1.5 py-0.5 rounded-md border border-slate-800">
                                    {isDelivered ? "At Doorstep" : `${riderDistance} km`}
                                </span>
                            </div>

                            <div className="absolute right-2 -top-1 flex flex-col items-center z-10">
                                <div className={`w-8 h-8 rounded-xl border-2 border-slate-900 flex items-center justify-center text-white shadow-md transition-colors ${
                                    isDelivered ? "bg-emerald-500" : "bg-teal-500"
                                }`}>
                                    <HiMapPin className="w-4 h-4" />
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 mt-1 font-mono">You</span>
                            </div>
                        </div>

                        {isDelivered ? (
                            <div className="mt-6 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center gap-2.5 text-emerald-300 text-xs font-bold animate-in fade-in">
                                <HiSparkles className="w-5 h-5 text-amber-300 shrink-0 animate-bounce" />
                                <span>Delivered! Please provide OTP to rider for safe hand-off.</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-800 text-center font-mono text-xs">
                                <div className="bg-slate-800/60 rounded-xl p-2 border border-slate-700/50">
                                    <span className="text-[9px] text-slate-400 block">COLD CHAIN</span>
                                    <span className="text-sky-300 font-bold">{coldTemp}°C Sealed</span>
                                </div>
                                <div className="bg-slate-800/60 rounded-xl p-2 border border-slate-700/50">
                                    <span className="text-[9px] text-slate-400 block">DISTANCE</span>
                                    <span className="text-emerald-300 font-bold">{riderDistance} km</span>
                                </div>
                                <div className="bg-slate-800/60 rounded-xl p-2 border border-slate-700/50">
                                    <span className="text-[9px] text-slate-400 block">FLEET</span>
                                    <span className="text-amber-300 font-bold">EV Splendor</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0">
                                VR
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 truncate">Vikram Rathore</h4>
                                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded shrink-0">
                                        Rating: 4.9
                                    </span>
                                </div>
                                <p className="text-[11px] text-gray-500 truncate">Grocerin EV Express Rider</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <a
                                href="tel:+919835122890"
                                className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-emerald-700 hover:bg-emerald-50 flex items-center justify-center transition shadow-2xs cursor-pointer"
                                title="Call Delivery Partner"
                            >
                                <HiPhone className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => toast.success("Connected to Hub Dispatcher!")}
                                className="w-9 h-9 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 flex items-center justify-center transition shadow-2xs cursor-pointer"
                                title="Chat with Hub"
                            >
                                <HiChatBubbleLeftRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-3.5 sm:p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium flex items-center gap-1.5 text-[11px] sm:text-xs">
                        <HiShieldCheck className="text-emerald-700 text-base shrink-0" />
                        <span>100% Sanitized Delivery</span>
                    </span>
                    <button
                        onClick={() => setShowLiveTrackingModal(false)}
                        className="bg-gray-900 hover:bg-black text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer text-xs"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveTelemetryModal;
