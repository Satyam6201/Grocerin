import React, { useEffect, useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {
    HiCube,
    HiPhone,
    HiArrowPath,
    HiMagnifyingGlass,
    HiClock,
    HiMapPin,
    HiXMark
} from 'react-icons/hi2';
import { FaMotorcycle } from 'react-icons/fa6';

const STATUS_OPTIONS = [
    "Order Placed",
    "Confirmed",
    "Packing",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
];

export default function Orders() {
    const { currency, axios } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [bikers, setBikers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [assigning, setAssigning] = useState({});

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const [ordersRes, statsRes, fleetRes] = await Promise.all([
                axios.get('/api/order/seller'),
                axios.get('/api/order/stats').catch(() => ({ data: { success: false } })),
                axios.get('/api/order/fleet').catch(() => ({ data: { success: false } }))
            ]);

            if (ordersRes.data.success) {
                setOrders(ordersRes.data.orders || []);
            } else {
                toast.error(ordersRes.data.message);
            }

            if (statsRes.data?.success) {
                setStats(statsRes.data.stats);
            }

            if (fleetRes.data?.success) {
                setBikers(fleetRes.data.bikers || []);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const { data } = await axios.post('/api/order/status', {
                orderId,
                status: newStatus
            });
            if (data.success) {
                toast.success(`Order marked as ${newStatus}`);
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleAssignBiker = async (orderId, bikerId) => {
        try {
            setAssigning(prev => ({ ...prev, [orderId]: true }));
            const { data } = await axios.post('/api/order/assign-biker', {
                orderId,
                bikerId
            });
            if (data.success) {
                toast.success(data.message || "Rider assigned");
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, bikerId, bikerName: data.order?.bikerName } : o));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setAssigning(prev => ({ ...prev, [orderId]: false }));
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesStatus = statusFilter === "all" || order.status === statusFilter;
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q || (
                order._id.toLowerCase().includes(q) ||
                (order.address?.firstName || "").toLowerCase().includes(q) ||
                (order.address?.lastName || "").toLowerCase().includes(q) ||
                (order.address?.phone || "").includes(q) ||
                (order.deliverySlot || "").toLowerCase().includes(q)
            );
            return matchesStatus && matchesSearch;
        });
    }, [orders, statusFilter, searchQuery]);

    const statusCounts = useMemo(() => {
        const counts = { all: orders.length };
        STATUS_OPTIONS.forEach(st => {
            counts[st] = orders.filter(o => o.status === st).length;
        });
        return counts;
    }, [orders]);

    return (
        <div className="p-3 sm:p-5 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-60px)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                        Order Fulfillment Management
                    </h1>
                    <p className="text-xs text-gray-500">
                        Live micro-warehouse dispatch pipeline and rider assignment
                    </p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="self-start sm:self-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                    <HiArrowPath className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    <span>Refresh Pipeline</span>
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-2xs">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                    <button
                        onClick={() => setStatusFilter("all")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                            statusFilter === "all"
                                ? "bg-emerald-700 text-white shadow-xs"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        All ({statusCounts.all || 0})
                    </button>
                    {STATUS_OPTIONS.map(st => (
                        <button
                            key={st}
                            onClick={() => setStatusFilter(st)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                                statusFilter === st
                                    ? "bg-emerald-700 text-white shadow-xs"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {st} ({statusCounts[st] || 0})
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-72">
                    <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Order ID, name, phone..."
                        className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl text-xs outline-none transition"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            <HiXMark className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="space-y-3 sm:space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-36 bg-white rounded-3xl border border-gray-100 p-6 animate-pulse" />
                    ))}
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mx-auto">
                        <HiCube className="w-6 h-6" />
                    </div>
                    <p className="text-gray-800 font-bold text-sm">No orders matching your filter.</p>
                    <p className="text-gray-500 text-xs">Try selecting a different status filter or clearing your search.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-xs hover:border-gray-200 transition space-y-4"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                                <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm font-black text-gray-900">
                                            #{order._id?.slice(-8).toUpperCase()}
                                        </span>
                                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                                            order.status === "Delivered" 
                                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                                                : "bg-amber-100 text-amber-800"
                                        }`}>
                                            {order.status || "Order Placed"}
                                        </span>
                                        {order.deliverySlot && (
                                            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                                <HiClock className="w-3 h-3 text-blue-600" />
                                                <span>{order.deliverySlot}</span>
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-gray-400">
                                        Received: {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold block">Total Amount</span>
                                        <span className="text-base font-black text-gray-900">{currency}{order.amount}</span>
                                    </div>
                                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-xl border ${
                                        order.isPaid ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"
                                    }`}>
                                        {order.isPaid ? "PAID ONLINE" : "COD / UNPAID"}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                <div className="bg-gray-50/80 rounded-2xl p-3.5 space-y-1.5 border border-gray-100">
                                    <div className="flex items-center justify-between font-bold text-gray-900">
                                        <span>Items in Basket</span>
                                        <span className="text-emerald-700">{order.items?.length || 0} SKUs</span>
                                    </div>
                                    <div className="max-h-24 overflow-y-auto space-y-1 text-gray-600 pr-1">
                                        {order.items?.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center">
                                                <span className="truncate max-w-[170px]">{item.product?.name || "Grocery Item"}</span>
                                                <span className="font-bold text-gray-900">x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-50/80 rounded-2xl p-3.5 space-y-1.5 border border-gray-100">
                                    <div className="flex items-center gap-1.5 font-bold text-gray-900">
                                        <HiMapPin className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Customer Address</span>
                                    </div>
                                    <p className="font-bold text-gray-800">{order.address?.firstName} {order.address?.lastName}</p>
                                    <p className="text-gray-500 leading-relaxed truncate">{order.address?.street}, {order.address?.city}</p>
                                    <p className="font-semibold text-emerald-800 flex items-center gap-1">
                                        <HiPhone className="w-3 h-3 text-emerald-600" />
                                        <span>{order.address?.phone}</span>
                                    </p>
                                </div>

                                <div className="bg-gray-50/80 rounded-2xl p-3.5 space-y-1.5 border border-gray-100">
                                    <div className="flex items-center justify-between font-bold text-gray-900">
                                        <span className="flex items-center gap-1">
                                            <FaMotorcycle className="w-3.5 h-3.5 text-emerald-600" />
                                            <span>Rider & OTP</span>
                                        </span>
                                        <span className="font-mono text-[11px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-black">
                                            OTP: {order.deliveryOtp || "4819"}
                                        </span>
                                    </div>
                                    <p className="font-bold text-gray-800">{order.bikerName || "Unassigned"}</p>
                                    <p className="text-gray-500 truncate">{order.bikerVehicle || "EV Hero Splendor"}</p>
                                    <p className="text-gray-500 font-mono">{order.bikerPhone || "+91 98351 22890"}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 font-bold shrink-0">Assign Rider:</span>
                                    <select
                                        value={order.bikerId || "BIKER-101"}
                                        disabled={assigning[order._id]}
                                        onChange={(e) => handleAssignBiker(order._id, e.target.value)}
                                        aria-label="Assign Delivery Rider"
                                        className="bg-gray-50 border border-gray-200 font-bold text-xs text-gray-900 rounded-xl px-2.5 py-1.5 outline-emerald-600 cursor-pointer hover:bg-white transition"
                                    >
                                        {bikers.map((b) => (
                                            <option key={b.bikerId} value={b.bikerId}>
                                                {b.name} ({b.vehicleNumber})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-2 justify-end">
                                    <span className="text-xs text-gray-500 font-bold shrink-0">Status:</span>
                                    <select
                                        value={order.status || "Order Placed"}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        aria-label="Change Order Status"
                                        className="bg-gray-50 border border-gray-200 font-bold text-xs text-gray-900 rounded-xl px-3 py-1.5 outline-emerald-600 cursor-pointer hover:bg-white transition"
                                    >
                                        {STATUS_OPTIONS.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
