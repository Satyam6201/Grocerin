import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { 
    HiBolt, 
    HiPhone, 
    HiArrowPath,
    HiPlus,
    HiXMark,
    HiCheckCircle,
    HiShieldCheck,
    HiUserPlus
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";
import { TbBatteryCharging } from "react-icons/tb";

export default function FleetBikers() {
    const { axios, currency } = useAppContext();
    const [bikers, setBikers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [newBiker, setNewBiker] = useState({
        name: "",
        phone: "",
        vehicleType: "Electric Scooter EV",
        vehicleNumber: "",
        batteryLevel: 95
    });
    const [savingBiker, setSavingBiker] = useState(false);

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

    const handleCreateBiker = async (e) => {
        e.preventDefault();
        if (!newBiker.name || !newBiker.phone || !newBiker.vehicleNumber) {
            toast.error("Please fill all required rider details");
            return;
        }

        try {
            setSavingBiker(true);
            const { data } = await axios.post("/api/order/fleet/add", newBiker);
            if (data.success) {
                toast.success(data.message || "New rider registered to fleet!");
                setShowAddModal(false);
                setNewBiker({
                    name: "",
                    phone: "",
                    vehicleType: "Electric Scooter EV",
                    vehicleNumber: "",
                    batteryLevel: 95
                });
                fetchFleetData();
            } else {
                toast.error(data.message || "Failed to register rider");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setSavingBiker(false);
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
                        Manage EV delivery partners, smart battery telemetries, and live trip dispatches
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                        <HiUserPlus className="w-4 h-4" />
                        <span>Add Rider Partner</span>
                    </button>

                    <button
                        onClick={fetchFleetData}
                        className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                        <HiArrowPath className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-600" : ""}`} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-2xs">
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase">Total Fleet</span>
                    <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">{bikers.length}</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">100% Electric EV</span>
                </div>
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-2xs">
                    <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 uppercase">On Duty</span>
                    <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
                        {bikers.filter(b => b.status !== "Offline").length} Active
                    </p>
                    <span className="text-[10px] text-gray-400 font-semibold">Boring Road Dark Store</span>
                </div>
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-2xs">
                    <span className="text-[10px] sm:text-xs font-semibold text-amber-600 uppercase">Active Trips</span>
                    <p className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{activeOrders.length}</p>
                    <span className="text-[10px] text-amber-700 font-semibold">&lt; 10m SLA Delivery</span>
                </div>
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-2xs">
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-600 uppercase">Avg Delivery SLA</span>
                    <p className="text-xl sm:text-2xl font-black text-blue-600 mt-1">7.8 min</p>
                    <span className="text-[10px] text-blue-600 font-semibold">99.8% On-Time SLA</span>
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
                                <p className="text-[11px] font-mono text-emerald-700 font-bold">{biker.vehicleNumber}</p>
                            </div>

                            <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1 text-gray-600 font-medium">
                                        <HiBolt className="w-3.5 h-3.5 text-amber-500" />
                                        <span>{biker.batteryLevel}% EV Bat</span>
                                    </span>
                                    <span className="font-bold text-gray-900">
                                        ★ {biker.rating || 4.9}
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${
                                            biker.batteryLevel > 75 
                                                ? "bg-emerald-500" 
                                                : biker.batteryLevel > 40 
                                                    ? "bg-amber-500" 
                                                    : "bg-rose-500"
                                        }`}
                                        style={{ width: `${biker.batteryLevel}%` }}
                                    />
                                </div>
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
                    <div className="bg-white rounded-3xl p-8 text-center border border-gray-100">
                        <p className="text-xs text-gray-500 font-semibold">All customer orders have been dispatched and delivered!</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs min-w-[620px]">
                                <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-wider border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3">Order ID</th>
                                        <th className="px-4 py-3">Customer & Address</th>
                                        <th className="px-4 py-3">Slot</th>
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
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                                                    {order.deliverySlot || "Instant 10-Min Rush"}
                                                </span>
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

            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-100 relative">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                                    <HiUserPlus className="w-4 h-4" />
                                </div>
                                <h3 className="text-base font-extrabold text-gray-900">Register EV Rider Partner</h3>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <HiXMark className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateBiker} className="space-y-3 text-xs">
                            <div>
                                <label className="font-bold text-gray-700 block mb-1">Rider Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newBiker.name}
                                    onChange={(e) => setNewBiker({ ...newBiker, name: e.target.value })}
                                    placeholder="e.g. Rahul Sharma"
                                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-emerald-600 font-medium"
                                />
                            </div>

                            <div>
                                <label className="font-bold text-gray-700 block mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    required
                                    value={newBiker.phone}
                                    onChange={(e) => setNewBiker({ ...newBiker, phone: e.target.value })}
                                    placeholder="+91 98765 43210"
                                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-emerald-600 font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="font-bold text-gray-700 block mb-1">EV Vehicle Model</label>
                                    <select
                                        value={newBiker.vehicleType}
                                        onChange={(e) => setNewBiker({ ...newBiker, vehicleType: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-emerald-600 font-medium"
                                    >
                                        <option value="Ather 450X EV">Ather 450X EV</option>
                                        <option value="Ola S1 Pro">Ola S1 Pro</option>
                                        <option value="TVS iQube Electric">TVS iQube Electric</option>
                                        <option value="Hero Splendor EV">Hero Splendor EV</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="font-bold text-gray-700 block mb-1">Vehicle Reg Plate</label>
                                    <input
                                        type="text"
                                        required
                                        value={newBiker.vehicleNumber}
                                        onChange={(e) => setNewBiker({ ...newBiker, vehicleNumber: e.target.value.toUpperCase() })}
                                        placeholder="BR-01-XX-0000"
                                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-emerald-600 font-mono font-bold"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={savingBiker}
                                    className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold transition cursor-pointer shadow-xs disabled:opacity-50"
                                >
                                    {savingBiker ? "Adding..." : "Register Rider"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
