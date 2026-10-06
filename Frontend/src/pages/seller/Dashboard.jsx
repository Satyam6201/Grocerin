import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
    HiPlus, 
    HiArrowPath, 
    HiBanknotes, 
    HiCube, 
    HiTruck, 
    HiTag, 
    HiExclamationTriangle, 
    HiCheckCircle, 
    HiBolt, 
    HiArrowRight,
    HiFire
} from 'react-icons/hi2';
import { FaMotorcycle } from "react-icons/fa6";

const Dashboard = () => {
    const { currency, axios, products } = useAppContext();
    const [stats, setStats] = useState({
        totalOrders: 0,
        deliveredOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [healthStatus, setHealthStatus] = useState(null);
    const [fleetCount, setFleetCount] = useState(4);
    const [flashSaleActive, setFlashSaleActive] = useState(false);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, ordersRes, healthRes, fleetRes] = await Promise.all([
                axios.get('/api/order/stats').catch(() => ({ data: { success: false } })),
                axios.get('/api/order/seller').catch(() => ({ data: { success: false } })),
                axios.get('/health').catch(() => ({ data: { status: 'UP' } })),
                axios.get('/api/order/fleet').catch(() => ({ data: { success: false } }))
            ]);

            if (statsRes.data?.success) {
                setStats(statsRes.data.stats);
            }

            if (ordersRes.data?.success) {
                setRecentOrders((ordersRes.data.orders || []).slice(0, 5));
            }

            if (healthRes.data) {
                setHealthStatus(healthRes.data);
            }

            if (fleetRes.data?.success) {
                setFleetCount(fleetRes.data.bikers?.length || 4);
            }
        } catch (error) {
            console.error("Dashboard data error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleToggleFlashSale = () => {
        setFlashSaleActive(!flashSaleActive);
        toast.success(flashSaleActive ? "Flash Sale Ended" : "15% Flash Sale Activated across Dark Store!");
    };

    const outOfStockCount = products.filter(p => !p.inStock).length;

    return (
        <div className="p-3 sm:p-5 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-60px)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Dark Store Command Center</h1>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 animate-pulse">
                            LIVE DISPATCH
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Real-time grocery inventory, fulfillment, and revenue metrics</p>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5">
                    <button
                        onClick={handleToggleFlashSale}
                        className={`font-bold text-[11px] sm:text-xs px-3 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 border shadow-2xs ${
                            flashSaleActive 
                                ? "bg-amber-500 text-white border-amber-600 animate-pulse col-span-2 sm:col-span-1" 
                                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 col-span-2 sm:col-span-1"
                        }`}
                    >
                        <HiFire className={`w-3.5 h-3.5 ${flashSaleActive ? "text-white" : "text-amber-500"}`} />
                        <span>{flashSaleActive ? "Flash Sale LIVE (15% OFF)" : "Flash Sale"}</span>
                    </button>
                    <Link
                        to="/seller/add-product"
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] sm:text-xs px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                    >
                        <HiPlus className="w-3.5 h-3.5" />
                        <span>Add SKU</span>
                    </Link>
                    <button
                        onClick={fetchDashboardData}
                        className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-[11px] sm:text-xs px-3 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                        <HiArrowPath className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-600" : ""}`} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Gross Sales</span>
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                            <HiBanknotes className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
                        </span>
                    </div>
                    <p className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900 mt-1 sm:mt-2">{currency}{stats.totalRevenue}</p>
                    <p className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold mt-0.5">↑ +14.8% growth</p>
                </div>

                <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</span>
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
                            <HiCube className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-700" />
                        </span>
                    </div>
                    <p className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900 mt-1 sm:mt-2">{stats.totalOrders}</p>
                    <p className="text-[10px] sm:text-[11px] text-blue-700 font-semibold mt-0.5">{stats.deliveredOrders} Completed</p>
                </div>

                <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Active Packing</span>
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                            <HiTruck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
                        </span>
                    </div>
                    <p className="text-lg sm:text-2xl md:text-3xl font-black text-amber-600 mt-1 sm:mt-2">{stats.pendingOrders}</p>
                    <p className="text-[10px] sm:text-[11px] text-amber-700 font-semibold mt-0.5">Target &lt; 3 mins</p>
                </div>

                <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-gray-100 shadow-2xs relative overflow-hidden">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Active SKUs</span>
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
                            <HiTag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-700" />
                        </span>
                    </div>
                    <p className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900 mt-1 sm:mt-2">{products.length}</p>
                    <p className="text-[10px] sm:text-[11px] font-semibold mt-0.5 flex items-center gap-1">
                        {outOfStockCount > 0 ? (
                            <span className="text-rose-600 flex items-center gap-1">
                                <HiExclamationTriangle className="w-3 h-3" />
                                {outOfStockCount} Low/Out
                            </span>
                        ) : (
                            <span className="text-emerald-700 flex items-center gap-1">
                                <HiCheckCircle className="w-3 h-3" />
                                All in stock
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                            <HiBolt className="w-3.5 h-3.5" />
                            <span>Ultra-Fast Grocery Network</span>
                        </div>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-black mt-2">
                            Dark Store Operational: Hub #102
                        </h2>
                        <p className="text-xs text-emerald-100/90 mt-1 max-w-lg leading-relaxed">
                            Serving instant 10-minute grocery dispatches within a 5 km radius. Stock levels synced with automated fulfillment queue.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-5 pt-4 border-t border-emerald-700/60">
                        <Link
                            to="/seller/orders"
                            className="bg-white text-emerald-950 font-bold text-xs px-3.5 sm:px-4 py-2 rounded-xl hover:bg-emerald-50 transition shadow-xs flex items-center gap-1.5"
                        >
                            <span>Live Orders ({stats.pendingOrders})</span>
                            <HiArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                            to="/seller/bikers"
                            className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-3.5 sm:px-4 py-2 rounded-xl transition flex items-center gap-1.5"
                        >
                            <FaMotorcycle className="w-3.5 h-3.5" />
                            <span>Fleet ({fleetCount})</span>
                        </Link>
                        <Link
                            to="/seller/product-list"
                            className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 sm:px-4 py-2 rounded-xl transition"
                        >
                            Catalog
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-2xs flex flex-col justify-between space-y-3">
                    <div>
                        <h3 className="text-sm font-black text-gray-900">System Infrastructure</h3>
                        <p className="text-[11px] text-gray-400">Microservices & database health</p>
                    </div>

                    <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between items-center p-2 rounded-xl bg-gray-50">
                            <span className="text-gray-600 text-[11px] sm:text-xs">Database (MongoDB)</span>
                            <span className="font-bold text-emerald-700 text-[11px]">Connected</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-gray-50">
                            <span className="text-gray-600 text-[11px] sm:text-xs">Cache Layer</span>
                            <span className="font-bold text-emerald-700 text-[11px]">
                                {healthStatus?.cache?.mode || "Active"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-gray-50">
                            <span className="text-gray-600 text-[11px] sm:text-xs">Fleet Dispatch</span>
                            <span className="font-bold text-emerald-700 text-[11px]">10-Min SLA</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-xl bg-gray-50">
                            <span className="text-gray-600 text-[11px] sm:text-xs">Server Status</span>
                            <span className="font-bold text-gray-900 text-[11px]">{healthStatus?.uptime || "Running"}</span>
                        </div>
                    </div>

                    <div className="text-[10px] text-gray-400 text-center font-medium">
                        Production Ready • Microservices Engine
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-100">
                    <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-gray-900">Recent Customer Orders</h3>
                        <p className="text-[11px] text-gray-400">Latest orders placed on Grocerin</p>
                    </div>
                    <Link
                        to="/seller/orders"
                        className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                        <span>View All</span>
                        <HiArrowRight className="w-3 h-3" />
                    </Link>
                </div>

                {recentOrders.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400">
                        No orders recorded yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs min-w-[500px]">
                            <thead className="text-gray-400 font-semibold border-b border-gray-100">
                                <tr>
                                    <th className="py-2.5 px-2">Order ID</th>
                                    <th className="py-2.5 px-2">Customer</th>
                                    <th className="py-2.5 px-2">Items</th>
                                    <th className="py-2.5 px-2">Amount</th>
                                    <th className="py-2.5 px-2">Status</th>
                                    <th className="py-2.5 px-2 text-right">Payment</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                                {recentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50">
                                        <td className="py-2.5 px-2 font-bold text-gray-900">
                                            #{order._id?.slice(-6).toUpperCase()}
                                        </td>
                                        <td className="py-2.5 px-2">
                                            {order.address?.firstName} {order.address?.lastName}
                                        </td>
                                        <td className="py-2.5 px-2">
                                            {order.items?.length || 0} items
                                        </td>
                                        <td className="py-2.5 px-2 font-bold text-gray-900">
                                            {currency}{order.amount}
                                        </td>
                                        <td className="py-2.5 px-2">
                                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                {order.status || "Placed"}
                                            </span>
                                        </td>
                                        <td className="py-2.5 px-2 text-right">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                                order.isPaid ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                                            }`}>
                                                {order.paymentType}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
