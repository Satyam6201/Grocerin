import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { 
    HiBolt, 
    HiPhone, 
    HiArrowPath
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const FleetBikers = () => {
    const { axios, currency } = useAppContext();
    const [bikers, setBikers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState({});

    const fetchFleetData = async () => {
        try {
            setLoading(true);
            const [fleetRes, ordersRes] = await Promise.all([
                axios.get("/api/order/fleet"),
                axios.get("/api/order/seller")
            ]);

            if (fleetRes.data?.success) {
                setBikers(fleetRes.data.bikers || []);
            }
            if (ordersRes.data?.success) {
                setOrders(ordersRes.data.orders || []);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFleetData();
    }, []);

    const handleAssignBiker = async (orderId, bikerId) => {
        try {
            setAssigning(prev => ({ ...prev, [orderId]: true }));
            const { data } = await axios.post("/api/order/assign-biker", {
                orderId,
                bikerId
            });
            if (data.success) {
                toast.success(data.message || "Rider assigned successfully");
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

    const activeOrders = orders.filter(o => o.status !== "Delivered" && o.status !== "Cancelled");

    return (
        <div className="p-3 sm:p-5 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-60px)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                        Delivery Fleet & Rider Dispatch
                    </h1>
                    <p className="text-xs text-gray-500">
                        Manage active delivery bikers, battery levels, and assign live grocery trips
                    </p>
                </div>
                <button
                    onClick={fetchFleetData}
                    className="self-start sm:self-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                    <HiArrowPath className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    <span>Refresh Fleet</span>
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-2xs">
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase">Total Fleet</span>
                    <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">{bikers.length}</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">100% Electric</span>
                </div>
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-2xs">
                    <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 uppercase">On Duty</span>
                    <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
                        {bikers.filter(b => b.status !== "Offline").length}
                    </p>
                    <span className="text-[10px] text-gray-400 font-semibold">Boring Road Hub</span>
                </div>
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-2xs">
                    <span className="text-[10px] sm:text-xs font-semibold text-amber-600 uppercase">Active Trips</span>
                    <p className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{activeOrders.length}</p>
                    <span className="text-[10px] text-amber-700 font-semibold">&lt; 10m SLA</span>
                </div>
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-2xs">
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-600 uppercase">Avg SLA</span>
                    <p className="text-xl sm:text-2xl font-black text-blue-600 mt-1">7.8 min</p>
                    <span className="text-[10px] text-blue-600 font-semibold">99.8% On-Time</span>
                </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
                <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wider">
                    Active Delivery Fleet Roster
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {bikers.map((biker) => (
                        <div
                            key={biker.bikerId}
                            className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xs hover:border-emerald-200 transition space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                                    <FaMotorcycle className="w-5 h-5" />
                                </div>
                                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                                    biker.status === "On Delivery"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-emerald-100 text-emerald-800"
                                }`}>
                                    {biker.status || "Available"}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-900">{biker.name}</h3>
                                <p className="text-[11px] text-gray-400">{biker.vehicleType || "Electric Bike"}</p>
                                <p className="text-[11px] font-mono text-gray-600 font-bold">{biker.vehicleNumber}</p>
                            </div>

                            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                                <span className="flex items-center gap-1 text-gray-600 font-medium">
                                    <HiBolt className="w-3.5 h-3.5 text-amber-500" />
                                    <span>{biker.batteryLevel}% EV Bat</span>
                                </span>
                                <span className="font-bold text-gray-900">
                                    ★ {biker.rating || 4.9}
                                </span>
                            </div>

                            <a
                                href={`tel:${biker.phone}`}
                                className="w-full py-2 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border border-gray-200 hover:border-emerald-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                            >
                                <HiPhone className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{biker.phone}</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-2">
                <h2 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wider">
                    Live Dispatch & Rider Order Assignments
                </h2>

                {activeOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-gray-100">
                        <p className="text-xs text-gray-500 font-semibold">All customer orders have been dispatched and delivered!</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 overflow-hidden shadow-xs">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs min-w-[620px]">
                                <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3">Order ID</th>
                                        <th className="px-4 py-3">Customer & Address</th>
                                        <th className="px-4 py-3">Amount</th>
                                        <th className="px-4 py-3">Stage</th>
                                        <th className="px-4 py-3">Assigned Rider</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 font-medium">
                                    {activeOrders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50/50 transition">
                                            <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">
                                                #{order._id?.slice(-8).toUpperCase()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="font-bold text-gray-900">
                                                    {order.address?.firstName} {order.address?.lastName}
                                                </p>
                                                <p className="text-gray-400 text-[11px] truncate max-w-[180px]">
                                                    {order.address?.street}, {order.address?.city}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className="font-extrabold text-gray-900">{currency}{order.amount}</span>
                                                <span className="block text-[10px] text-gray-400 uppercase font-semibold">
                                                    {order.paymentType}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <select
                                                    value={order.bikerId || "BIKER-101"}
                                                    disabled={assigning[order._id]}
                                                    onChange={(e) => handleAssignBiker(order._id, e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 font-bold text-xs text-gray-900 rounded-xl px-2.5 py-1.5 outline-emerald-600 cursor-pointer hover:bg-white transition"
                                                >
                                                    {bikers.map((b) => (
                                                        <option key={b.bikerId} value={b.bikerId}>
                                                            {b.name} ({b.vehicleNumber})
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FleetBikers;
