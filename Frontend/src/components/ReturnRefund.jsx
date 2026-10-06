import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  HiShieldCheck, 
  HiArrowPath, 
  HiCreditCard, 
  HiClock, 
  HiCheckCircle, 
  HiXCircle, 
  HiChatBubbleLeftRight, 
  HiPhone,
  HiArrowRight,
  HiSparkles
} from "react-icons/hi2";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Report Within 24 Hours",
    desc: "Navigate to 'My Orders' or contact support directly with your Order ID if any grocery item is damaged or missing.",
    icon: HiClock,
    accent: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    step: "02",
    title: "Instant AI / Agent Review",
    desc: "Submit a photo of the item. Our customer satisfaction system evaluates requests in under 2 minutes.",
    icon: HiShieldCheck,
    accent: "bg-sky-50 text-sky-700 border-sky-200"
  },
  {
    step: "03",
    title: "10-Min Redelivery or Refund",
    desc: "Choose between an immediate free replacement dispatched from your local dark store or a full instant money refund.",
    icon: HiArrowPath,
    accent: "bg-teal-50 text-teal-700 border-teal-200"
  }
];

const REFUND_TIMELINES = [
  {
    method: "UPI (Google Pay, PhonePe, Paytm, BHIM)",
    time: "Instant (Within 15 - 120 Minutes)",
    status: "Directly credited to linked VPA / UPI ID",
    accent: "text-emerald-700 bg-emerald-50"
  },
  {
    method: "Credit / Debit Cards (Visa, Mastercard, RuPay)",
    time: "3 to 5 Business Days",
    status: "Processed via Stripe PCI-DSS banking network",
    accent: "text-blue-700 bg-blue-50"
  },
  {
    method: "Net Banking (SBI, HDFC, ICICI, Axis, etc.)",
    time: "2 to 4 Business Days",
    status: "Credited directly to source bank account",
    accent: "text-purple-700 bg-purple-50"
  },
  {
    method: "Cash on Delivery (COD)",
    time: "Instant via Customer UPI ID / Bank Transfer",
    status: "Customer care securely verifies account details",
    accent: "text-amber-700 bg-amber-50"
  }
];

const ELIGIBILITY = [
  {
    title: "Farm Fresh Fruits & Vegetables",
    eligible: true,
    condition: "Spoiled, bruised, overripe, or unsatisfactory on arrival. Report within 24 hours."
  },
  {
    title: "Milk, Paneer, Curd & Dairy",
    eligible: true,
    condition: "Leaking pouch, sour taste, expired date, or broken seal."
  },
  {
    title: "Packaged Staples, Oil & Atta",
    eligible: true,
    condition: "Torn bag, manufacturing defect, or wrong item received."
  },
  {
    title: "Frozen Foods & Ice Creams",
    eligible: true,
    condition: "Melted on arrival due to cold-chain breach."
  },
  {
    title: "Opened Perishable Items (Accepted in Good Condition)",
    eligible: false,
    condition: "Perishables consumed or kept past 24 hours cannot be returned once approved."
  },
  {
    title: "Promotional Gift Items & Sample Vouchers",
    eligible: false,
    condition: "Non-redeemable for cash refunds."
  }
];

export default function ReturnRefund() {
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
            <HiShieldCheck className="w-4 h-4 text-amber-300" />
            <span>100% Satisfaction & Freshness Guarantee</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Hassle-Free <span className="text-emerald-400">Return & Refund Policy</span>
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            We inspect every item before dispatch. But if something is not right, we guarantee no-questions-asked refunds or instant 10-minute redelivery.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/my-orders"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>View My Orders</span>
              <HiArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition flex items-center gap-2 cursor-pointer"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2 justify-center sm:justify-start">
            <HiArrowPath className="text-emerald-700" />
            <span>3-Step Instant Resolution Process</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Quick, fair, and frictionless resolution in just 3 steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROCESS_STEPS.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-gray-100 hover:border-emerald-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-emerald-800">
                      {step.step}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-2xl border ${step.accent} flex items-center justify-center text-xl mt-4 mb-3 shadow-2xs`}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-extrabold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
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
            <HiShieldCheck className="text-emerald-700" />
            <span>Item Return & Replacement Matrix</span>
          </h2>
          <p className="text-xs text-gray-500">Transparent guidelines for perishable and non-perishable categories.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ELIGIBILITY.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl border transition flex items-start gap-3.5 ${
                item.eligible 
                  ? "bg-white border-gray-100 shadow-xs" 
                  : "bg-rose-50/40 border-rose-100"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.eligible ? (
                  <HiCheckCircle className="w-6 h-6 text-emerald-600" />
                ) : (
                  <HiXCircle className="w-6 h-6 text-rose-500" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-extrabold text-gray-900">{item.title}</h4>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                    item.eligible 
                      ? "bg-emerald-100 text-emerald-800" 
                      : "bg-rose-100 text-rose-800"
                  }`}>
                    {item.eligible ? "Eligible" : "Non-Returnable"}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {item.condition}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <HiCreditCard className="text-emerald-700" />
            <span>Refund Timelines by Payment Method</span>
          </h2>
          <p className="text-xs text-gray-500">How quickly your funds are returned based on your original payment mode.</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="divide-y divide-gray-100">
            {REFUND_TIMELINES.map((row, idx) => (
              <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/60 transition">
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-gray-900">{row.method}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{row.status}</p>
                </div>
                <span className={`text-xs font-black px-3 py-1.5 rounded-xl self-start sm:self-auto shrink-0 ${row.accent}`}>
                  {row.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md shrink-0">
            <HiChatBubbleLeftRight className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-900">
              Need assistance with an existing order?
            </h3>
            <p className="text-xs text-gray-600 mt-1 max-w-xl leading-relaxed">
              Our 24/7 customer support team and Grocerin AI assistant are always available to resolve your issues in under 5 minutes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/contact"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition cursor-pointer whitespace-nowrap"
          >
            Contact Customer Support
          </Link>
        </div>
      </div>

    </div>
  );
}
