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
    HiTruck, 
    HiBuildingStorefront,
    HiSparkles,
    HiArrowPath
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

const LiveTelemetryModal = () => {
    const { 
        showLiveTrackingModal, 
        setShowLiveTrackingModal, 
        activeTrackingOrder,
        deliveryLocation 
    } = useAppContext();

    const [secondsLeft, setSecondsLeft] = useState(540);
    const [riderSpeed, setRiderSpeed] = useState(28);
    const [riderDistance, setRiderDistance] = useState(1.2);
    const [coldTemp, setColdTemp] = useState(3.6);
    const [simulatedProgress, setSimulatedProgress] = useState(35);

    useEffect(() => {
        if (!showLiveTrackingModal) return;

        const interval = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) return 0;
                return prev - 1;
            });
            setSimulatedProgress(prev => Math.min(100, prev + 0.2));
            setRiderDistance(prev => Math.max(0.1, Number((prev - 0.005).toFixed(2))));
        }, 1000);

        return () => clearInterval(interval);
    }, [showLiveTrackingModal]);

    if (!showLiveTrackingModal) return null;

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const boostSimulator = () => {
        setSecondsLeft(prev => Math.max(30, prev - 120));
        setSimulatedProgress(prev => Math.min(90, prev + 25));
        setRiderDistance(prev => Math.max(0.2, Number((prev - 0.4).toFixed(2))));
        setRiderSpeed(34);
        toast.success("Fast-Forwarded Rider Dispatch Simulation!", { icon: '⚡' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-250 flex flex-col max-h-[92vh] overflow-y-auto"
            >
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-amber-300">
                            <HiBolt className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-black text-sm sm:text-base tracking-tight">
                                    Live 10-Minute Dispatch Telemetry
                                </h3>
                                <span className="bg-emerald-400 text-emerald-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                                    LIVE GPS
                                </span>
                            </div>
                            <p className="text-xs text-emerald-100/80">
                                Boring Road Dark Store Hub #102 → {deliveryLocation.city || "Patna"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowLiveTrackingModal(false)}
                        className="p-1.5 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    >
                        <HiXMark className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-5 bg-gradient-to-b from-emerald-50/70 to-white border-b border-emerald-100/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                            Estimated Delivery In
                        </span>
                        <div className="text-3xl sm:text-4xl font-black text-emerald-950 font-mono tracking-tight flex items-baseline gap-2">
                            <span>{formattedTime}</span>
                            <span className="text-xs font-sans text-emerald-700 font-bold">MINS</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Order {activeTrackingOrder ? `#${activeTrackingOrder._id?.slice(-6).toUpperCase()}` : 'Live Active'}
                        </p>
                    </div>

                    <button
                        onClick={boostSimulator}
                        className="bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-extrabold px-4 py-2.5 rounded-2xl shadow-md transition flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                        <HiBolt className="text-amber-300 text-sm" />
                        <span>Fast-Forward Rider</span>
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div className="relative bg-slate-900 rounded-3xl p-5 text-white overflow-hidden shadow-inner border border-slate-800">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                        <div className="flex justify-between items-center text-xs font-mono mb-4 text-slate-400">
                            <span className="flex items-center gap-1.5 text-emerald-400">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                <span>Rider Telemetry Active</span>
                            </span>
                            <span>Speed: <strong className="text-white">{riderSpeed} km/h</strong></span>
                        </div>

                        <div className="relative py-4">
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 rounded-full"
                                    style={{ width: `${simulatedProgress}%` }}
                                />
                            </div>

                            <div className="absolute left-0 -top-1 flex flex-col items-center">
                                <div className="w-8 h-8 rounded-xl bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-md">
                                    <HiBuildingStorefront className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-300 mt-1 font-mono">Hub #102</span>
                            </div>

                            <div 
                                className="absolute -top-2 transition-all duration-700 flex flex-col items-center"
                                style={{ left: `calc(${Math.min(88, Math.max(10, simulatedProgress))}% - 16px)` }}
                            >
                                <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-white flex items-center justify-center text-slate-950 shadow-xl animate-bounce">
                                    <HiTruck className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-extrabold text-amber-300 mt-0.5 font-mono whitespace-nowrap">
                                    {riderDistance} km
                                </span>
                            </div>

                            <div className="absolute right-0 -top-1 flex flex-col items-center">
                                <div className="w-8 h-8 rounded-xl bg-teal-500 border-2 border-white flex items-center justify-center text-white shadow-md">
                                    <HiMapPin className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-300 mt-1 font-mono">You</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-800 text-center font-mono text-xs">
                            <div className="bg-slate-800/60 rounded-xl p-2 border border-slate-700/50">
                                <span className="text-[10px] text-slate-400 block">COLD CHAIN</span>
                                <span className="text-sky-300 font-bold">{coldTemp}°C Sealed</span>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-2 border border-slate-700/50">
                                <span className="text-[10px] text-slate-400 block">REMAINING</span>
                                <span className="text-emerald-300 font-bold">{riderDistance} km</span>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-2 border border-slate-700/50">
                                <span className="text-[10px] text-slate-400 block">VEHICLE</span>
                                <span className="text-amber-300 font-bold">EV Scooter</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                                VR
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h4 className="font-extrabold text-sm text-gray-900">Vikram Rathore</h4>
                                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                                        ★ 4.9 (1,240 orders)
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">Grocerin Express Delivery Partner</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <a
                                href="tel:+919835122890"
                                className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-emerald-700 hover:bg-emerald-50 flex items-center justify-center transition shadow-2xs cursor-pointer"
                                title="Call Delivery Partner"
                            >
                                <HiPhone className="w-4 h-4" />
                            </a>
                            <button
                                onClick={() => toast.success("Connected to Hub Dispatcher!", { icon: '💬' })}
                                className="w-9 h-9 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 flex items-center justify-center transition shadow-2xs cursor-pointer"
                                title="Chat with Hub"
                            >
                                <HiChatBubbleLeftRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium flex items-center gap-1.5">
                        <HiShieldCheck className="text-emerald-700 text-base" />
                        <span>100% Contactless & Sanitized Hand-off</span>
                    </span>
                    <button
                        onClick={() => setShowLiveTrackingModal(false)}
                        className="bg-gray-900 hover:bg-black text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                    >
                        Close Telemetry
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveTelemetryModal;
