import React, { useEffect, useState } from "react";
import { useAppContext } from '../context/AppContext';
import toast from "react-hot-toast";
import {
    HiBolt,
    HiCheckCircle,
    HiMapPin,
    HiPhone,
    HiTruck,
    HiSparkles,
    HiShieldCheck,
    HiArrowPath,
    HiCube,
    HiKey,
    HiSignal,
    HiClock,
    HiCheck,
    HiBanknotes,
    HiExclamationTriangle,
    HiCurrencyRupee
} from 'react-icons/hi2';
import {
    FaMotorcycle,
    FaRoute,
    FaTemperatureHalf
} from 'react-icons/fa6';
import { TbBatteryCharging } from 'react-icons/tb';

const BIKER_FLEET = [
    {
        bikerId: "BIKER-101",
        name: "Vikram Rathore",
        phone: "+91 98351 22890",
        vehicleType: "Electric Scooter (Zero Emission)",
        vehicleNumber: "BR-01-EA-9021",
        batteryLevel: 92,
        rating: 4.9,
        hubId: "PATNA-HUB-102",
        todayEarnings: 1440,
        todayDeliveries: 18,
        basePay: 1080,
        bonusPay: 280,
        tips: 80,
        coldChainTemp: "3.5°C"
    },
    {
        bikerId: "BIKER-102",
        name: "Amit Kumar",
        phone: "+91 94310 88219",
        vehicleType: "Ather 450X EV",
        vehicleNumber: "BR-01-ET-4432",
        batteryLevel: 85,
        rating: 4.8,
        hubId: "PATNA-HUB-102",
        todayEarnings: 1120,
        todayDeliveries: 14,
        basePay: 840,
        bonusPay: 220,
        tips: 60,
        coldChainTemp: "3.8°C"
    },
    {
        bikerId: "BIKER-103",
        name: "Priya Singh",
        phone: "+91 91223 55041",
        vehicleType: "Ola S1 Pro",
        vehicleNumber: "BR-01-EV-6710",
        batteryLevel: 78,
        rating: 5.0,
        hubId: "PATNA-HUB-102",
        todayEarnings: 1760,
        todayDeliveries: 22,
        basePay: 1320,
        bonusPay: 340,
        tips: 100,
        coldChainTemp: "3.2°C"
    },
    {
        bikerId: "BIKER-104",
        name: "Aryan Verma",
        phone: "+91 88771 99342",
        vehicleType: "TVS iQube Electric",
        vehicleNumber: "BR-01-EQ-1980",
        batteryLevel: 96,
        rating: 4.7,
        hubId: "PATNA-HUB-102",
        todayEarnings: 880,
        todayDeliveries: 11,
        basePay: 660,
        bonusPay: 180,
        tips: 40,
        coldChainTemp: "3.6°C"
    }
];

export default function BikerMode() {
    const { axios, currency } = useAppContext();
    const [selectedBiker, setSelectedBiker] = useState(BIKER_FLEET[0]);
    const [isOnDuty, setIsOnDuty] = useState(true);
    const [activeTab, setActiveTab] = useState("trips");
    const [tripFilter, setTripFilter] = useState("all");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [otpModalOrder, setOtpModalOrder] = useState(null);
    const [enteredOtp, setEnteredOtp] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [withdrawing, setWithdrawing] = useState(false);

    const fetchBikerOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/order/biker/active?bikerId=${selectedBiker.bikerId}`);
            if (data.success) {
                setOrders(data.orders || []);
            } else {
                toast.error(data.message || "Failed to fetch assigned deliveries");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBikerOrders();
    }, [selectedBiker]);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const { data } = await axios.post("/api/order/biker/status", {
                orderId,
                status: newStatus,
                bikerId: selectedBiker.bikerId
            });
            if (data.success) {
                toast.success(`Delivery status updated to ${newStatus}`);
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!enteredOtp || enteredOtp.trim().length !== 4) {
            toast.error("Please enter a valid 4-digit OTP");
            return;
        }

        try {
            setVerifying(true);
            const { data } = await axios.post("/api/order/biker/verify-otp", {
                orderId: otpModalOrder._id,
                otp: enteredOtp.trim()
            });

            if (data.success) {
                toast.success("Delivery verified and package handed over successfully!");
                setOrders(prev => prev.map(o => o._id === otpModalOrder._id ? { ...o, status: "Delivered", isPaid: true } : o));
                setOtpModalOrder(null);
                setEnteredOtp("");
            } else {
                toast.error(data.message || "Invalid OTP code");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setVerifying(false);
        }
    };

    const toggleItemCheck = (orderId, itemIdx) => {
        const key = `${orderId}-${itemIdx}`;
        setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleInstantWithdraw = () => {
        setWithdrawing(true);
        setTimeout(() => {
            setWithdrawing(false);
            toast.success(`₹${selectedBiker.todayEarnings} transferred to registered UPI handle!`);
        }, 1200);
    };

    const filteredOrders = orders.filter(o => {
        if (tripFilter === "active") return o.status !== "Delivered" && o.status !== "Cancelled";
        if (tripFilter === "delivered") return o.status === "Delivered";
        return true;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-gray-100 py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-5 pb-24 sm:pb-12">
            
            <header className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-950/60 shrink-0">
                        <FaMotorcycle className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                                Rider Fleet App
                            </h1>
                            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                                10-Min SLA Radar
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                            <span>Hub: Boring Road Dark Store #102</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                <FaTemperatureHalf className="w-3.5 h-3.5" />
                                {selectedBiker.coldChainTemp} Cold Bag
                            </span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl px-3 py-1.5 flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-semibold">Rider:</span>
                        <select
                            value={selectedBiker.bikerId}
                            onChange={(e) => {
                                const found = BIKER_FLEET.find(b => b.bikerId === e.target.value);
                                if (found) setSelectedBiker(found);
                            }}
                            aria-label="Select Rider Profile"
                            className="bg-transparent text-xs font-bold text-emerald-400 outline-none cursor-pointer"
                        >
                            {BIKER_FLEET.map(b => (
                                <option key={b.bikerId} value={b.bikerId} className="bg-slate-900 text-white">
                                    {b.name} ({b.bikerId})
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() => setIsOnDuty(!isOnDuty)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold text-xs transition cursor-pointer border ${
                            isOnDuty 
                                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30" 
                                : "bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/30"
                        }`}
                    >
                        <span className={`w-2 h-2 rounded-full ${isOnDuty ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
                        <span>{isOnDuty ? "On Duty" : "On Break"}</span>
                    </button>

                    <button
                        onClick={fetchBikerOrders}
                        className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-300 hover:text-white transition cursor-pointer"
                        aria-label="Refresh Trips"
                    >
                        <HiArrowPath className={`w-4 h-4 ${loading ? "animate-spin text-emerald-400" : ""}`} />
                    </button>
                </div>
            </header>

            <nav className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
                <button
                    onClick={() => setActiveTab("trips")}
                    className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                        activeTab === "trips"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
                            : "text-gray-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                >
                    <HiTruck className="w-4 h-4" />
                    <span>Active Deliveries ({orders.filter(o => o.status !== "Delivered").length})</span>
                </button>

                <button
                    onClick={() => setActiveTab("wallet")}
                    className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                        activeTab === "wallet"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
                            : "text-gray-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                >
                    <HiBanknotes className="w-4 h-4" />
                    <span>Earnings & Wallet</span>
                </button>

                <button
                    onClick={() => setActiveTab("telemetry")}
                    className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                        activeTab === "telemetry"
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
                            : "text-gray-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                >
                    <TbBatteryCharging className="w-4 h-4" />
                    <span>EV Fleet Telemetry</span>
                </button>
            </nav>

            {activeTab === "trips" && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3.5 sm:p-4 shadow-sm">
                            <div className="flex items-center justify-between text-gray-400 text-xs">
                                <span>Today's Earnings</span>
                                <HiSparkles className="w-4 h-4 text-emerald-400" />
                            </div>
                            <p className="text-xl sm:text-2xl font-black text-white mt-1">₹{selectedBiker.todayEarnings}</p>
                            <span className="text-[10px] text-emerald-400 font-semibold">+₹80 per 10m SLA</span>
                        </div>

                        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3.5 sm:p-4 shadow-sm">
                            <div className="flex items-center justify-between text-gray-400 text-xs">
                                <span>Trips Completed</span>
                                <HiCheckCircle className="w-4 h-4 text-blue-400" />
                            </div>
                            <p className="text-xl sm:text-2xl font-black text-white mt-1">{selectedBiker.todayDeliveries}</p>
                            <span className="text-[10px] text-gray-400 font-semibold">100% on-time SLA</span>
                        </div>

                        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3.5 sm:p-4 shadow-sm">
                            <div className="flex items-center justify-between text-gray-400 text-xs">
                                <span>EV Battery</span>
                                <HiBolt className="w-4 h-4 text-amber-400" />
                            </div>
                            <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{selectedBiker.batteryLevel}%</p>
                            <span className="text-[10px] text-gray-400 font-semibold">Fast Dock Port A2</span>
                        </div>

                        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-3.5 sm:p-4 shadow-sm">
                            <div className="flex items-center justify-between text-gray-400 text-xs">
                                <span>Rider Rating</span>
                                <HiShieldCheck className="w-4 h-4 text-purple-400" />
                            </div>
                            <p className="text-xl sm:text-2xl font-black text-white mt-1">{selectedBiker.rating}</p>
                            <span className="text-[10px] text-purple-300 font-semibold">Super Rider Tier</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2">
                        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                            <button
                                onClick={() => setTripFilter("all")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                    tripFilter === "all" ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                All ({orders.length})
                            </button>
                            <button
                                onClick={() => setTripFilter("active")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                    tripFilter === "active" ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Active ({orders.filter(o => o.status !== "Delivered").length})
                            </button>
                            <button
                                onClick={() => setTripFilter("delivered")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                    tripFilter === "delivered" ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Delivered ({orders.filter(o => o.status === "Delivered").length})
                            </button>
                        </div>

                        <span className="text-xs text-gray-400 hidden sm:inline-block">
                            Fulfillment SLA Target: 10 Mins
                        </span>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="h-44 bg-slate-900 rounded-3xl border border-slate-800 animate-pulse" />
                            ))}
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 mx-auto">
                                <HiTruck className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-bold text-gray-300">No trips matching "{tripFilter}" right now.</p>
                            <p className="text-xs text-gray-500">Dark store packing queue is up to date.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => {
                                const isDelivered = order.status === "Delivered";
                                const isOutForDelivery = order.status === "Out for Delivery";
                                const isPacking = order.status === "Packing" || order.status === "Confirmed" || order.status === "Order Placed";
                                const addressQuery = encodeURIComponent(`${order.address?.street || ""}, ${order.address?.city || ""}, ${order.address?.zipcode || ""}`);

                                return (
                                    <div
                                        key={order._id}
                                        className={`bg-slate-900 border rounded-3xl p-4 sm:p-6 transition-all duration-300 shadow-xl ${
                                            isDelivered 
                                                ? "border-slate-800 opacity-60" 
                                                : isOutForDelivery 
                                                    ? "border-emerald-500/50 shadow-emerald-950/40 ring-1 ring-emerald-500/30" 
                                                    : "border-slate-800 hover:border-slate-700"
                                        }`}
                                    >
                                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-xs shrink-0 ${
                                                    isDelivered ? "bg-slate-800 text-gray-400" : "bg-emerald-600 shadow-md shadow-emerald-900/40"
                                                }`}>
                                                    <HiCube className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-sm font-extrabold text-white">
                                                            Trip #{order._id?.slice(-6).toUpperCase()}
                                                        </span>
                                                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                                            isDelivered 
                                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                                                : isOutForDelivery
                                                                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse"
                                                                    : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                        {order.deliverySlot && (
                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                                                                <HiClock className="w-3 h-3" />
                                                                <span>{order.deliverySlot}</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-gray-400 mt-0.5">
                                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Dark Store Hub #102
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Bill Amount</span>
                                                    <span className="text-base font-black text-white">{currency}{order.amount}</span>
                                                </div>
                                                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-xl border ${
                                                    order.isPaid 
                                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                                                        : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                                }`}>
                                                    {order.isPaid ? "PAID ONLINE" : "COLLECT CASH (COD)"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                            <div className="space-y-2.5">
                                                <div className="flex items-start gap-2.5">
                                                    <HiMapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                                    <div className="text-xs">
                                                        <p className="font-bold text-white">
                                                            {order.address?.firstName} {order.address?.lastName}
                                                        </p>
                                                        <p className="text-gray-400 leading-relaxed mt-0.5">
                                                            {order.address?.street}, {order.address?.city}, {order.address?.state} - {order.address?.zipcode}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 pt-1">
                                                    {order.address?.phone && (
                                                        <a
                                                            href={`tel:${order.address.phone}`}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 transition"
                                                        >
                                                            <HiPhone className="w-3.5 h-3.5" />
                                                            <span>Call Customer</span>
                                                        </a>
                                                    )}
                                                    <a
                                                        href={`https://www.google.com/maps/search/?api=1&query=${addressQuery}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-sm shadow-emerald-950/40"
                                                    >
                                                        <FaRoute className="w-3 h-3" />
                                                        <span>Google Maps GPS</span>
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3.5 space-y-2">
                                                <div className="flex items-center justify-between text-xs text-gray-400 font-semibold">
                                                    <span className="flex items-center gap-1.5">
                                                        <HiCheck className="w-3.5 h-3.5 text-emerald-400" />
                                                        <span>Bag Packing Checklist</span>
                                                    </span>
                                                    <span>{order.items?.length || 0} SKUs</span>
                                                </div>
                                                <div className="max-h-28 overflow-y-auto space-y-1.5 pr-1 text-xs">
                                                    {order.items?.map((item, idx) => {
                                                        const isChecked = !!checkedItems[`${order._id}-${idx}`];
                                                        return (
                                                            <div 
                                                                key={idx} 
                                                                onClick={() => toggleItemCheck(order._id, idx)}
                                                                className={`flex items-center justify-between p-1.5 rounded-lg cursor-pointer transition ${
                                                                    isChecked ? "bg-emerald-950/30 text-emerald-300" : "hover:bg-slate-900 text-gray-300"
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-2 truncate max-w-[200px]">
                                                                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                                                                        isChecked ? "bg-emerald-600 border-emerald-500 text-white" : "border-gray-600"
                                                                    }`}>
                                                                        {isChecked && <HiCheck className="w-3 h-3" />}
                                                                    </div>
                                                                    <span className={isChecked ? "line-through opacity-70" : ""}>{item.product?.name || "Grocery SKU"}</span>
                                                                </div>
                                                                <span className="font-bold text-emerald-400">x{item.quantity}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {!isDelivered && (
                                            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <HiSignal className="w-4 h-4 text-emerald-400 animate-pulse" />
                                                    <span>Live Telemetry Broadcast Active</span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2">
                                                    {isPacking && (
                                                        <button
                                                            onClick={() => handleUpdateStatus(order._id, "Out for Delivery")}
                                                            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition cursor-pointer flex items-center gap-1.5"
                                                        >
                                                            <FaMotorcycle className="w-3.5 h-3.5" />
                                                            <span>Pick Up & Start Trip</span>
                                                        </button>
                                                    )}

                                                    {isOutForDelivery && (
                                                        <button
                                                            onClick={() => setOtpModalOrder(order)}
                                                            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-950/50 transition cursor-pointer flex items-center gap-1.5"
                                                        >
                                                            <HiKey className="w-4 h-4" />
                                                            <span>Verify Customer OTP & Hand Over</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {activeTab === "wallet" && (
                <div className="space-y-5">
                    <div className="bg-gradient-to-br from-emerald-900 to-slate-900 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider block">
                                Withdrawable Fleet Wallet
                            </span>
                            <div className="flex items-baseline gap-2 mt-2">
                                <span className="text-4xl sm:text-5xl font-black tracking-tight">
                                    ₹{selectedBiker.todayEarnings}
                                </span>
                                <span className="text-xs text-emerald-300 font-semibold">Today's Total</span>
                            </div>
                            <p className="text-xs text-emerald-100/70 mt-1">
                                Instant automated settlement to verified rider UPI ID ({selectedBiker.phone.replace(/\s+/g, '')}@upi)
                            </p>
                        </div>

                        <button
                            onClick={handleInstantWithdraw}
                            disabled={withdrawing}
                            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl transition cursor-pointer flex items-center gap-2"
                        >
                            <HiCurrencyRupee className="w-5 h-5" />
                            <span>{withdrawing ? "Processing UPI Settlement..." : "Instant Cashout to UPI"}</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
                            <span className="text-xs text-gray-400 font-semibold">Base Delivery Pay</span>
                            <p className="text-2xl font-black text-white">₹{selectedBiker.basePay}</p>
                            <span className="text-[11px] text-gray-500">₹60 flat per completed trip</span>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
                            <span className="text-xs text-gray-400 font-semibold">SLA Rush Incentive</span>
                            <p className="text-2xl font-black text-emerald-400">+₹{selectedBiker.bonusPay}</p>
                            <span className="text-[11px] text-emerald-400/80">Sub-10 min completion bonus</span>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
                            <span className="text-xs text-gray-400 font-semibold">Direct Customer Tips</span>
                            <p className="text-2xl font-black text-amber-400">₹{selectedBiker.tips}</p>
                            <span className="text-[11px] text-amber-400/80">100% passed to rider partner</span>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-extrabold text-white">Daily Incentive Milestone Tier</h3>
                            <span className="text-xs font-bold text-emerald-400">₹1,440 / ₹2,000 Target</span>
                        </div>
                        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: "72%" }} />
                        </div>
                        <p className="text-xs text-gray-400">
                            Complete 4 more 10-minute trips before 11:00 PM to unlock flat ₹350 daily booster reward!
                        </p>
                    </div>
                </div>
            )}

            {activeTab === "telemetry" && (
                <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <h3 className="text-sm font-extrabold text-white">EV Smart Vehicle Diagnostics</h3>
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                    Eco Fleet Certified
                                </span>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                                    <span className="text-gray-400">Model & Spec</span>
                                    <span className="font-bold text-white">{selectedBiker.vehicleType}</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                                    <span className="text-gray-400">Registration Plate</span>
                                    <span className="font-mono font-bold text-emerald-400">{selectedBiker.vehicleNumber}</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                                    <span className="text-gray-400">Current Battery Level</span>
                                    <span className="font-bold text-amber-400">{selectedBiker.batteryLevel}% (Est. 48 km range)</span>
                                </div>
                                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                                    <span className="text-gray-400">Assigned Fast Dock</span>
                                    <span className="font-bold text-white">Patna Boring Rd Hub - Port #2</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="text-gray-400">Cold Chain Bag Temperature</span>
                                    <span className="font-bold text-emerald-400">{selectedBiker.coldChainTemp} (Optimal Veggie Freshness)</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <h3 className="text-sm font-extrabold text-white">Partner Safety & Support</h3>
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                    24x7 Help Desk
                                </span>
                            </div>

                            <p className="text-xs text-gray-400 leading-relaxed">
                                Dark Store dispatch coordinators are online 24x7 to assist with customer address verification, vehicle swaps, or emergency assistance.
                            </p>

                            <div className="space-y-2.5 pt-2">
                                <a
                                    href="tel:+919835122890"
                                    className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 font-bold text-xs rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
                                >
                                    <HiPhone className="w-4 h-4" />
                                    <span>Call Hub Dispatch Manager</span>
                                </a>

                                <button
                                    onClick={() => toast.success("SOS Alert dispatched to Hub Control Center. Response unit notified.")}
                                    className="w-full py-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <HiExclamationTriangle className="w-4 h-4 text-rose-400" />
                                    <span>Emergency Roadside Assistance (SOS)</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {otpModalOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                                <HiKey className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tight">
                                Verify Customer Delivery OTP
                            </h3>
                            <p className="text-xs text-gray-400">
                                Ask the customer for their 4-digit code displayed on their live tracking screen.
                            </p>
                        </div>

                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    maxLength={4}
                                    value={enteredOtp}
                                    onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ""))}
                                    placeholder="0000"
                                    aria-label="Enter 4-digit OTP"
                                    className="w-full text-center tracking-[0.5em] text-2xl font-black py-3 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-2xl text-white outline-none"
                                    autoFocus
                                />
                                <span className="text-[11px] text-gray-500 block text-center mt-1">
                                    Customer sees this OTP on their Track Order screen
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOtpModalOrder(null);
                                        setEnteredOtp("");
                                    }}
                                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-300 font-bold text-xs transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={verifying}
                                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition cursor-pointer shadow-lg shadow-emerald-950/40 disabled:opacity-50"
                                >
                                    {verifying ? "Verifying..." : "Confirm Delivery"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
