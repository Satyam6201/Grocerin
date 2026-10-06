import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  HiBolt, 
  HiClock, 
  HiMapPin, 
  HiShieldCheck, 
  HiBuildingStorefront, 
  HiTruck, 
  HiCheckCircle, 
  HiArrowRight,
  HiSignal,
  HiCurrencyRupee
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const SLA_STEPS = [
  {
    step: "01",
    time: "00:00 - 02:00 MINS",
    title: "AI Dark Store Picking",
    desc: "Automated warehouse racking routes workers directly to your fresh items in seconds.",
    icon: HiBuildingStorefront,
    accent: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    step: "02",
    time: "02:00 - 03:00 MINS",
    title: "Cold-Chain Thermal Seal",
    desc: "Dairy, produce, and frozen items sealed in sanitized, temperature-insulated eco-pouches.",
    icon: HiShieldCheck,
    accent: "bg-sky-50 text-sky-700 border-sky-200"
  },
  {
    step: "03",
    time: "03:00 - 08:00 MINS",
    title: "100% Electric EV Transit",
    desc: "Hyperlocal delivery partners navigate optimized traffic-free routes at safe 30 km/h speeds.",
    icon: FaMotorcycle,
    accent: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    step: "04",
    time: "08:00 - 10:00 MINS",
    title: "Doorstep OTP Hand-off",
    desc: "Safe, contactless verification at your door. Fresh groceries unpacked in 10 minutes flat.",
    icon: HiCheckCircle,
    accent: "bg-teal-50 text-teal-700 border-teal-200"
  }
];

const HUBS = [
  {
    name: "Hub #102 - Boring Road Micro-Store",
    locality: "Boring Canal Rd, Patna Central",
    radius: "3.5 km Express Zone",
    status: "Active • 99.8% On-Time",
    fleet: "18 EV Riders On Duty"
  },
  {
    name: "Hub #108 - Bailey Road Fulfillment Center",
    locality: "Bailey Road / Saguna More",
    radius: "4.0 km Express Zone",
    status: "Active • 99.6% On-Time",
    fleet: "22 EV Riders On Duty"
  },
  {
    name: "Hub #104 - Kankarbagh Dark Store",
    locality: "Kankarbagh Main Road",
    radius: "3.8 km Express Zone",
    status: "Active • 99.9% On-Time",
    fleet: "16 EV Riders On Duty"
  },
  {
    name: "Hub #106 - Rajendra Nagar Facility",
    locality: "Rajendra Nagar Terminal Area",
    radius: "3.2 km Express Zone",
    status: "Active • 99.7% On-Time",
    fleet: "14 EV Riders On Duty"
  }
];

export default function DeliveryInformation() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen py-4 sm:py-8 space-y-8 sm:space-y-12 animate-in fade-in duration-300">
      
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white p-6 sm:p-10 md:p-12 shadow-2xl border border-emerald-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-300/30 text-emerald-300 text-xs font-black tracking-wide uppercase">
            <HiBolt className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Guaranteed 10-Minute Service Level Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            How Grocerin Delivers <span className="text-emerald-400">In 10 Minutes</span>
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            Our secret is not fast driving - it is hyper-proximity. We operate network micro-fulfillment dark stores situated less than 2.5 kilometers from your neighborhood.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/tractOrder"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <HiSignal className="w-4 h-4 text-emerald-200" />
              <span>Track Live Delivery GPS</span>
            </Link>

            <Link
              to="/product"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition flex items-center gap-2 cursor-pointer"
            >
              <span>Order Groceries Now</span>
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2 justify-center sm:justify-start">
            <HiClock className="text-emerald-700" />
            <span>10-Minute Dispatch Breakdown</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Every second is engineered for speed, hygiene, and product integrity.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SLA_STEPS.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border border-gray-100 hover:border-emerald-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-emerald-800">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-900 text-amber-300 font-mono">
                      {step.time}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-2xl border ${step.accent} flex items-center justify-center text-xl mt-4 mb-3 shadow-2xs`}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-sm font-extrabold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <HiBuildingStorefront className="text-emerald-700" />
            <span>Operational Dark Store Hubs</span>
          </h2>
          <p className="text-xs text-gray-500">Live fulfillment pods serving 50+ local wards with average 8.4 minute delivery times.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HUBS.map((hub, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs hover:border-emerald-200 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center font-bold text-lg shrink-0">
                  <HiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900">{hub.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{hub.locality}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {hub.status}
                    </span>
                    <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                      {hub.radius}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="text-xs font-bold text-emerald-700 block">
                  {hub.fleet}
                </span>
                <span className="text-[10px] text-gray-400">Zero-Emission EV Fleet</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center">
            <HiShieldCheck className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-black text-gray-900">
            Strict Cold-Chain Packaging Standards
          </h3>

          <p className="text-xs text-gray-600 leading-relaxed">
            Perishable dairy, fresh meats, cut fruits, and frozen foods are stored in multi-temperature zoned chambers:
          </p>

          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
              <span><strong>Frozen Goods:</strong> Sealed at -18°C with dry chill packs.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span><strong>Fresh Milk & Paneer:</strong> Maintained at 3°C - 4°C.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span><strong>Farm Produce:</strong> Ambient ventilated packaging at 20°C - 22°C.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
            <HiCurrencyRupee className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-black text-gray-900">
            Transparent Delivery Pricing
          </h3>

          <p className="text-xs text-gray-600 leading-relaxed">
            We believe in honest, upfront pricing with no hidden surcharges or surge fees during rain or rush hours:
          </p>

          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span><strong>Orders ₹499 & Above:</strong> 100% Free 10-Minute Delivery.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400 shrink-0" />
              <span><strong>Orders Under ₹499:</strong> Standard flat fee of just ₹25.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span><strong>Minimum Order:</strong> None! Order even a single ₹10 lemon or milk pouch.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-black">Want to track an existing order right now?</h3>
          <p className="text-xs text-gray-400">Enter your order ID for live GPS biker telemetry and real-time arrival estimates.</p>
        </div>

        <button
          onClick={() => {
            navigate("/tractOrder");
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl transition cursor-pointer whitespace-nowrap shrink-0 shadow-md"
        >
          Track My Order
        </button>
      </div>

    </div>
  );
}
