import React, { useState, useEffect } from "react";
import {
    Link,
    useSearchParams
} from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from "react-hot-toast";
import {
    HiMagnifyingGlass,
    HiCube,
    HiCheckCircle,
    HiClock,
    HiArrowRight,
    HiPhone,
    HiMapPin,
    HiKey,
    HiShieldCheck,
    HiSignal
} from 'react-icons/hi2';
import { FaMotorcycle } from 'react-icons/fa6';

export default function TrackOrder() {
    const [searchParams] = useSearchParams();
    const queryOrderId = searchParams.get("id") || "";
    const [orderQuery, setOrderQuery] = useState(queryOrderId);
    const { user, axios, currency, setShowLiveTrackingModal, setActiveTrackingOrder } = useAppContext();
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    const fetchOrderTracking = async (idToFetch) => {
        const targetId = idToFetch || orderQuery.trim();
        if (!targetId) {
            toast.error("Please enter a valid Order ID");
            return;
        }

        try {
            setLoading(true);
            setSearched(true);
            const { data } = await axios.get(`/api/order/track/${targetId}`);
            if (data.success) {
                setTrackingData(data);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            } else {
                toast.error(data.message || "Order not found");
                setTrackingData(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Order not found. Check Order ID.");
            setTrackingData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (queryOrderId) {
            fetchOrderTracking(queryOrderId);
        } else {
            axios.get('/api/order/user').then(({ data }) => {
                if (data.success && data.orders?.length > 0) {
                    const latest = data.orders[0];
                    setOrderQuery(latest._id);
                    fetchOrderTracking(latest._id);
                }
            }).catch(() => {});
        }
    }, [queryOrderId]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchOrderTracking(orderQuery);
    };

    const order = trackingData?.order;
    const telemetry = trackingData?.telemetry;

    const stages = [
        { label: "Order Placed", desc: "Payment & inventory verified", key: "Order Placed" },
        { label: "Dark Store Packing", desc: "Item inspection at Boring Rd #102", key: "Packing" },
        { label: "Out for Delivery", desc: "Rider on EV bike in transit", key: "Out for Delivery" },
        { label: "Delivered", desc: "Handed over at doorstep", key: "Delivered" }
    ];

    const getStageIndex = (status) => {
        if (status === "Order Placed" || status === "Confirmed") return 0;
        if (status === "Packing") return 1;
        if (status === "Out for Delivery") return 2;
        if (status === "Delivered") return 3;
        return 0;
    };

    const currentStageIdx = order ? getStageIndex(order.status) : 0;

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20">
            <section className="bg-linear-to-r from-emerald-900 via-slate-900 to-teal-950 py-14 px-4 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                
                <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                    <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
                        <FaMotorcycle className="w-6 h-6" />
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                        Live Grocery Delivery Radar
                    </h1>

                    <p className="text-emerald-100 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                        Track your 10-minute grocery dispatch live with assigned delivery biker telemetry & OTP verification.
                    </p>

                    <form onSubmit={handleSearchSubmit} className="mt-6 max-w-lg mx-auto flex items-center shadow-2xl rounded-2xl overflow-hidden bg-slate-900 p-1.5 border border-emerald-500/30">
                        <input
                            type="text"
                            value={orderQuery}
                            onChange={(e) => setOrderQuery(e.target.value)}
                            placeholder="Enter Order ID (e.g. 67a1...)"
                            className="flex-1 px-4 py-3 text-xs md:text-sm text-white bg-transparent outline-none placeholder-gray-500"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-md shadow-emerald-950/40"
                        >
                            <span>{loading ? "Locating..." : "Track Live"}</span>
                            <HiMagnifyingGlass className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 -mt-6">
                {loading ? (
                    <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl space-y-4 text-center">
                        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs font-bold text-gray-500">Connecting to Dark Store GPS & Rider Telemetry...</p>
                    </div>
                ) : order ? (
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8 space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                            Order ID: #{order._id?.slice(-8).toUpperCase()}
                                        </span>
                                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                                            order.status === "Delivered" 
                                                ? "bg-emerald-500/10 text-emerald-700 border border-emerald-200" 
                                                : "bg-amber-100 text-amber-800 animate-pulse"
                                        }`}>
                                            {order.status}
                                        </span>
                                        {order.deliverySlot && (
                                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                                                <HiClock className="w-3 h-3" />
                                                <span>{order.deliverySlot}</span>
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-2">
                                        {order.status === "Delivered" 
                                            ? "Order Delivered Successfully!" 
                                            : `Arriving in ~${telemetry?.etaMinutes || 6} Minutes`}
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Dispatched from: {telemetry?.hubName || "Boring Road Dark Store #102"}
                                    </p>
                                </div>

                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center sm:text-right shrink-0">
                                    <div className="flex items-center justify-center sm:justify-end gap-1.5 text-emerald-800 font-extrabold text-xs">
                                        <HiKey className="w-4 h-4 text-emerald-600" />
                                        <span>Delivery OTP Code</span>
                                    </div>
                                    <span className="font-mono text-2xl font-black text-emerald-950 tracking-widest block mt-1">
                                        {telemetry?.deliveryOtp || order.deliveryOtp || "4819"}
                                    </span>
                                    <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
                                        Share with biker at doorstep
                                    </span>
                                </div>
                            </div>

                            <div className="relative py-4">
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2">
                                    {stages.map((stage, idx) => {
                                        const isCompleted = idx <= currentStageIdx;
                                        const isCurrent = idx === currentStageIdx;

                                        return (
                                            <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-3">
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                                                    isCurrent
                                                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-700/30 scale-110 ring-4 ring-emerald-100"
                                                        : isCompleted
                                                            ? "bg-emerald-700 text-white"
                                                            : "bg-gray-100 text-gray-400"
                                                }`}>
                                                    {isCompleted ? <HiCheckCircle className="w-5 h-5" /> : idx + 1}
                                                </div>
                                                <div>
                                                    <h4 className={`text-xs font-bold ${isCurrent ? "text-emerald-800 font-black" : isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                                                        {stage.label}
                                                    </h4>
                                                    <p className="text-[11px] text-gray-400 mt-0.5">
                                                        {stage.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-slate-950 text-gray-200 rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                                        <FaMotorcycle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-extrabold text-white text-sm">
                                                {telemetry?.riderName || order.bikerName || "Vikram Rathore"}
                                            </span>
                                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                                                4.9 Super Rider
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 font-mono mt-0.5">
                                            {telemetry?.vehicleType || order.bikerVehicle || "EV Hero Splendor #BR-01-EA-9021"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    {(telemetry?.riderPhone || order.bikerPhone) && (
                                        <a
                                            href={`tel:${telemetry?.riderPhone || order.bikerPhone}`}
                                            className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-950/50"
                                        >
                                            <HiPhone className="w-3.5 h-3.5" />
                                            <span>Call Rider</span>
                                        </a>
                                    )}
                                    <button
                                        onClick={() => {
                                            setActiveTrackingOrder(order);
                                            setShowLiveTrackingModal(true);
                                        }}
                                        className="flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <HiSignal className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>Open Live Map Radar</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                                        <HiMapPin className="w-4 h-4 text-emerald-600" />
                                        <span>Delivery Destination</span>
                                    </div>
                                    <div className="text-xs text-gray-600 pl-6 space-y-0.5">
                                        <p className="font-bold text-gray-900">{order.address?.firstName} {order.address?.lastName}</p>
                                        <p>{order.address?.street}, {order.address?.city}</p>
                                        <p>{order.address?.state} - {order.address?.zipcode}</p>
                                        <p className="font-semibold text-emerald-800 pt-1">{order.address?.phone}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2">
                                    <div className="flex items-center justify-between text-xs font-bold text-gray-900">
                                        <span className="flex items-center gap-2">
                                            <HiCube className="w-4 h-4 text-emerald-600" />
                                            <span>Order Items ({order.items?.length || 0})</span>
                                        </span>
                                        <span className="font-extrabold text-emerald-800">
                                            {currency}{order.amount} ({order.paymentType})
                                        </span>
                                    </div>
                                    <div className="max-h-24 overflow-y-auto space-y-1 pl-6 text-xs text-gray-600 pr-1">
                                        {order.items?.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center">
                                                <span className="truncate max-w-[180px]">{item.product?.name || "Grocery SKU"}</span>
                                                <span className="font-bold text-gray-900">x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : searched ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-lg space-y-4">
                        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                            <HiCube className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">No active order found</h3>
                        <p className="text-xs text-gray-500 max-w-sm mx-auto">
                            Please check the Order ID or place a new quick-commerce order to track live delivery.
                        </p>
                        <Link
                            to="/my-orders"
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition"
                        >
                            <span>Go to My Orders</span>
                            <HiArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-lg space-y-3">
                        <p className="text-xs text-gray-500">Enter your order ID above to track delivery status.</p>
                    </div>
                )}
            </section>

            <section className="max-w-4xl mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs text-center space-y-1.5">
                        <HiClock className="text-emerald-600 mx-auto w-6 h-6" />
                        <h3 className="font-bold text-xs text-gray-900">10-Minute Dark Store SLA</h3>
                        <p className="text-gray-500 text-[11px]">Sub-3 minute hub dispatch window</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs text-center space-y-1.5">
                        <FaMotorcycle className="text-blue-600 mx-auto w-6 h-6" />
                        <h3 className="font-bold text-xs text-gray-900">100% Electric EV Fleet</h3>
                        <p className="text-gray-500 text-[11px]">Zero emission eco-friendly dispatch</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs text-center space-y-1.5">
                        <HiShieldCheck className="text-purple-600 mx-auto w-6 h-6" />
                        <h3 className="font-bold text-xs text-gray-900">OTP Handover Security</h3>
                        <p className="text-gray-500 text-[11px]">Guaranteed safe delivery handoff</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
