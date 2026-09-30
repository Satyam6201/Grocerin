import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { HiCube, HiPhone } from 'react-icons/hi2';

const STATUS_OPTIONS = [
    "Order Placed",
    "Confirmed",
    "Packing",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
];

const Orders = () => {
    const { currency, axios } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const [ordersRes, statsRes] = await Promise.all([
                axios.get('/api/order/seller'),
                axios.get('/api/order/stats').catch(() => ({ data: { success: false } }))
            ]);

            if (ordersRes.data.success) {
                setOrders(ordersRes.data.orders || []);
            } else {
                toast.error(ordersRes.data.message);
            }

            if (statsRes.data?.success) {
                setStats(statsRes.data.stats);
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

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="flex-1 p-4 md:p-8 space-y-6 overflow-y-auto max-h-[92vh]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Order Management</h1>
                    <p className="text-xs text-gray-500">Live grocery dispatch and fulfillment dashboard</p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="self-start sm:self-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-xs"
                >
                    Refresh Orders
                </button>
            </div>

            
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
                        <span className="text-xs font-semibold text-gray-400 uppercase">Total Orders</span>
                        <p className="text-2xl font-black text-gray-900 mt-1">{stats.totalOrders}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
                        <span className="text-xs font-semibold text-amber-600 uppercase">Pending Fulfillment</span>
                        <p className="text-2xl font-black text-amber-600 mt-1">{stats.pendingOrders}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
                        <span className="text-xs font-semibold text-emerald-600 uppercase">Delivered</span>
                        <p className="text-2xl font-black text-emerald-600 mt-1">{stats.deliveredOrders}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
                        <span className="text-xs font-semibold text-blue-600 uppercase">Total Sales</span>
                        <p className="text-2xl font-black text-blue-600 mt-1">{currency}{stats.totalRevenue}</p>
                    </div>
                </div>
            )}

            
            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100 p-5 shimmer-wrapper" />
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                    <p className="text-gray-500 font-semibold text-sm">No customer orders received yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:border-gray-200 transition"
                        >
                            
                            <div className="flex gap-4 max-w-sm">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                                    <HiCube className="w-6 h-6 text-emerald-700" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-900">
                                        ID: #{order._id?.slice(-8).toUpperCase()}
                                    </p>
                                    <div className="space-y-0.5">
                                        {order.items?.map((item, i) => (
                                             <p key={i} className="text-xs text-gray-700">
                                                 <span className="font-semibold">{item.product?.name || "Product"}</span>
                                                 <span className="text-emerald-700 font-bold ml-1">x{item.quantity}</span>
                                             </p>
                                         ))}
                                     </div>
                                     <p className="text-[11px] text-gray-400">
                                         {new Date(order.createdAt).toLocaleString()}
                                     </p>
                                 </div>
                             </div>

                             
                             <div className="text-xs text-gray-600 space-y-0.5 max-w-xs">
                                 <p className="font-bold text-gray-900 text-sm">
                                     {order.address?.firstName} {order.address?.lastName}
                                 </p>
                                 <p>{order.address?.street}, {order.address?.city}</p>
                                 <p>{order.address?.state} - {order.address?.zipcode}</p>
                                 <p className="font-semibold text-emerald-800 flex items-center gap-1.5 pt-0.5">
                                     <HiPhone className="w-3.5 h-3.5 text-emerald-700" />
                                     <span>{order.address?.phone}</span>
                                 </p>
                             </div>

                            
                            <div className="flex flex-col text-xs space-y-1">
                                <span className="font-extrabold text-base text-gray-900">{currency}{order.amount}</span>
                                <span className="text-gray-500">Method: <strong className="text-gray-800">{order.paymentType}</strong></span>
                                <span className={`inline-block w-max px-2 py-0.5 rounded text-[10px] font-bold ${
                                    order.isPaid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                                }`}>
                                    {order.isPaid ? "PAID ONLINE" : "COD / UNPAID"}
                                </span>
                            </div>

                            
                            <div className="flex flex-col gap-1.5 self-start lg:self-center">
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    Update Pipeline Status
                                </span>
                                <select
                                    value={order.status || "Order Placed"}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className="bg-gray-50 border border-gray-300 font-bold text-xs text-gray-900 rounded-xl px-3 py-2 outline-emerald-600 cursor-pointer hover:bg-white transition"
                                >
                                    {STATUS_OPTIONS.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
