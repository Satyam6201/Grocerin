import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { 
    HiDocumentText, 
    HiCheck, 
    HiCube, 
    HiTruck, 
    HiSparkles, 
    HiArrowPath, 
    HiShoppingBag, 
    HiMapPin 
} from 'react-icons/hi2';

const ORDER_STAGES = [
    { key: "Order Placed", label: "Placed", icon: HiDocumentText },
    { key: "Confirmed", label: "Confirmed", icon: HiCheck },
    { key: "Packing", label: "Packing", icon: HiCube },
    { key: "Out for Delivery", label: "On the Way", icon: HiTruck },
    { key: "Delivered", label: "Delivered", icon: HiSparkles }
];

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currency, axios, user } = useAppContext();

    const fetchMyOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/order/user');
            if (data.success) {
                setMyOrders(data.orders || []);
            }
        } catch (error) {
            console.error("Fetch orders error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyOrders();
        }
    }, [user]);

    const getStageIndex = (status) => {
        const index = ORDER_STAGES.findIndex(s => s.key.toLowerCase() === (status || '').toLowerCase().trim());
        return index !== -1 ? index : 0;
    };

    return (
        <div className="py-8 max-w-4xl mx-auto min-h-screen">
            
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Order History
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                        Track live status and view past quick grocery orders
                    </p>
                </div>
                <button
                    onClick={fetchMyOrders}
                    className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl transition cursor-pointer"
                >
                    <HiArrowPath className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                </button>
            </div>

            {loading ? (
                <div className="py-16 space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 space-y-4">
                            <div className="w-48 h-5 bg-gray-200 rounded shimmer-wrapper" />
                            <div className="w-full h-12 bg-gray-100 rounded-xl shimmer-wrapper" />
                            <div className="w-3/4 h-8 bg-gray-100 rounded shimmer-wrapper" />
                        </div>
                    ))}
                </div>
            ) : myOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center text-3xl mb-3">
                        <HiShoppingBag className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">No orders placed yet</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs">
                        Your fresh groceries arrive in under 10 minutes. Place your first order today!
                    </p>
                    <Link
                        to="/product"
                        className="mt-5 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6 mt-6">
                    {myOrders.map((order) => {
                        const currentStageIdx = getStageIndex(order.status);
                        const isDelivered = order.status?.toLowerCase().includes("delivered");

                        return (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-xs hover:shadow-sm transition"
                            >
                                
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-900">
                                                Order #{order._id?.slice(-8).toUpperCase()}
                                            </span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                isDelivered 
                                                    ? "bg-emerald-100 text-emerald-800"
                                                    : "bg-amber-100 text-amber-800 animate-pulse"
                                            }`}>
                                                {order.status || "Order Placed"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs font-semibold">
                                        <div className="text-right">
                                            <span className="text-gray-400 block text-[10px] uppercase font-bold">Total Paid</span>
                                            <span className="text-sm md:text-base font-extrabold text-gray-900">
                                                {currency}{order.amount}
                                            </span>
                                        </div>
                                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                                            {order.paymentType}
                                        </span>
                                    </div>
                                </div>

                                
                                <div className="py-6 px-2">
                                    <div className="relative flex items-center justify-between">
                                        
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 w-full z-0" />
                                        <div 
                                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-600 transition-all duration-500 z-0"
                                            style={{ width: `${(currentStageIdx / (ORDER_STAGES.length - 1)) * 100}%` }}
                                        />

                                        {ORDER_STAGES.map((stage, idx) => {
                                            const isDone = idx <= currentStageIdx;
                                            const isCurrent = idx === currentStageIdx;
                                            const StageIcon = stage.icon;

                                            return (
                                                <div key={idx} className="relative z-10 flex flex-col items-center">
                                                    <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                                        isCurrent
                                                            ? "bg-emerald-700 text-white ring-4 ring-emerald-100 scale-110 shadow-md"
                                                            : isDone
                                                            ? "bg-emerald-600 text-white shadow-xs"
                                                            : "bg-white border-2 border-gray-300 text-gray-400"
                                                    }`}>
                                                        {isDone ? <StageIcon className="w-4 h-4" /> : idx + 1}
                                                    </div>
                                                    <span className={`text-[10px] md:text-xs mt-2 font-semibold whitespace-nowrap ${
                                                        isCurrent ? "text-emerald-800 font-extrabold" : isDone ? "text-gray-800" : "text-gray-400"
                                                    }`}>
                                                        {stage.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                
                                <div className="divide-y divide-gray-100 pt-2 border-t border-gray-100">
                                    {order.items?.map((item, idx) => {
                                        const product = item.product || {};
                                        return (
                                            <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 p-1 shrink-0 flex items-center justify-center">
                                                        {product.image?.[0] ? (
                                                            <img src={product.image[0]} alt="" className="w-full h-full object-contain" />
                                                        ) : (
                                                            <HiCube className="w-6 h-6 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 line-clamp-1">{product.name || "Grocery Item"}</h4>
                                                        <p className="text-[11px] text-gray-500 mt-0.5">
                                                            Qty: <span className="font-semibold text-gray-700">{item.quantity}</span> • {currency}{product.offerPrice || product.price} each
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-gray-900 text-sm">
                                                    {currency}{(product.offerPrice || product.price || 0) * item.quantity}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                
                                {order.address && (
                                    <div className="mt-4 bg-gray-50 rounded-xl p-3 text-xs text-gray-600 flex items-start gap-2 border border-gray-100">
                                        <HiMapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-gray-800">Delivered to: </span>
                                            <span>
                                                {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipcode}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
