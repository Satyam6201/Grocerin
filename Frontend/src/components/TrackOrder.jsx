import React, { useState } from "react";
import { Search, Package, Truck, CheckCircle, Home, Clock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function TrackOrder() {
  const [orderQuery, setOrderQuery] = useState("");
  const { user } = useAppContext();
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) {
      toast.error("Please enter a valid Order ID");
      return;
    }
    navigate('/my-orders');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-xs">
            <Package size={32} className="text-emerald-300" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Track Live Grocery Delivery
          </h1>

          <p className="text-emerald-100 text-xs sm:text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Real-time fulfillment tracking from your neighborhood dark store hub straight to your doorstep.
          </p>

          <form onSubmit={handleTrack} className="mt-8 max-w-lg mx-auto flex items-center shadow-lg rounded-2xl overflow-hidden bg-white p-1 border border-emerald-500/20">
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. 64FA9B12)..."
              className="flex-1 px-4 py-3 text-xs md:text-sm text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
            >
              <span>Track Live</span>
              <Search size={15} />
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                10-Minute Dark Store Dispatch
              </span>
              <h2 className="text-xl font-black text-gray-900 mt-2">
                Live Fulfillment Pipeline
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Every grocery bag undergoes 4-step quality packing
              </p>
            </div>

            <Link
              to="/my-orders"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              <span>View Your Order History</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="py-8 grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="flex sm:flex-col items-center gap-3 text-left sm:text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Order Placed</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Payment confirmed</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center gap-3 text-left sm:text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Packing at Hub</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Item quality inspection</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center gap-3 text-left sm:text-center">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 animate-pulse">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-700">Out for Delivery</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Rider on bike &lt; 5 mins</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center gap-3 text-left sm:text-center opacity-60">
              <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0">
                4
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-700">Delivered</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Handed over safely</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs text-center">
            <Clock className="text-emerald-600 mx-auto mb-2" size={24} />
            <h3 className="font-bold text-xs text-gray-900">Target Delivery SLA</h3>
            <p className="text-gray-500 text-[11px] mt-1">Average 8.4 mins to doorstep</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs text-center">
            <Truck className="text-blue-600 mx-auto mb-2" size={24} />
            <h3 className="font-bold text-xs text-gray-900">Dedicated Fleet</h3>
            <p className="text-gray-500 text-[11px] mt-1">Local electric bike couriers</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs text-center">
            <Home className="text-purple-600 mx-auto mb-2" size={24} />
            <h3 className="font-bold text-xs text-gray-900">Contactless Drop</h3>
            <p className="text-gray-500 text-[11px] mt-1">Secure porch & doorstep handoff</p>
          </div>
        </div>
      </section>
    </div>
  );
}
