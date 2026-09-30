import React from "react";
import { Truck, Clock, MapPin, Package, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function DeliveryInformation() {
  const deliveryInfo = [
    {
      icon: <Zap className="text-amber-500" size={28} />,
      title: "10-Minute Instant Delivery",
      description:
        "Hyperlocal dark stores dispatch groceries immediately so your order reaches your door in under 10 minutes.",
    },
    {
      icon: <Clock className="text-emerald-600" size={28} />,
      title: "Extended Operating Hours",
      description:
        "Serving early morning to late night essentials every day from 6:00 AM to 11:30 PM across 365 days.",
    },
    {
      icon: <MapPin className="text-blue-600" size={28} />,
      title: "GPS & PIN Code Precision",
      description:
        "Dual-engine reverse geocoding pinpoints your exact locality and 6-digit postal PIN code automatically.",
    },
    {
      icon: <ShieldCheck className="text-purple-600" size={28} />,
      title: "Temperature Controlled Packaging",
      description:
        "Dairy, frozen goods, and farm produce are sealed in insulated, hygienic, and eco-friendly packagings.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            10-Minute Delivery SLA & Logistics
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Learn how Grocerin powers ultra-fast quick grocery fulfillment through specialized micro-warehouses and dark store hubs.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 gap-5">
        {deliveryInfo.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
              {item.icon}
            </div>
            <h2 className="text-base font-bold text-gray-900 mt-4">{item.title}</h2>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Guidelines & Standards</h2>

          <ul className="space-y-3 text-xs text-gray-600 list-disc pl-5 leading-relaxed">
            <li>Zero minimum order restrictions; free delivery unlocked automatically on orders above ₹499.</li>
            <li>Real-time pipeline tracking: live visual updates as your order passes from Placed to Packing to Delivered.</li>
            <li>No-contact delivery available on all pre-paid card and UPI payments.</li>
            <li>Deliveries are carried out by verified rider partners equipped with insulated delivery bags.</li>
            <li>If a product is out of stock at your local hub, you will be notified prior to dispatch.</li>
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-500 font-medium">Ready to receive your fresh groceries?</span>
            <Link
              to="/product"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Start Grocery Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
