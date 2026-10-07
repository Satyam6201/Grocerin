import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
    HiMagnifyingGlass,
    HiQuestionMarkCircle,
    HiChevronDown,
    HiChevronUp,
    HiBolt,
    HiShieldCheck,
    HiCreditCard,
    HiShoppingBag,
    HiUserCircle,
    HiChatBubbleLeftRight
} from 'react-icons/hi2';

const FAQ_CATEGORIES = [
  { id: "All", label: "All Questions", icon: HiQuestionMarkCircle },
  { id: "Delivery", label: "10-Min Delivery", icon: HiBolt },
  { id: "Orders", label: "Orders & Cart", icon: HiShoppingBag },
  { id: "Payments", label: "Payments & Refunds", icon: HiCreditCard },
  { id: "Quality", label: "Freshness & Storage", icon: HiShieldCheck },
  { id: "Account", label: "Account & Login", icon: HiUserCircle }
];

const FAQS = [
  {
    category: "Delivery",
    question: "How does Grocerin deliver fresh groceries in under 10 minutes?",
    answer: "We operate local micro-fulfillment dark stores situated within a 3 km radius of your neighborhood (e.g., Boring Road Hub #102). Orders are packed by dedicated pickers in under 2 minutes and dispatched on 100% electric delivery bikes."
  },
  {
    category: "Delivery",
    question: "What are your delivery hours and service days?",
    answer: "Grocerin operates 365 days a year from 6:00 AM to 11:30 PM. We do not stop deliveries on weekends or public holidays."
  },
  {
    category: "Delivery",
    question: "What are the delivery charges?",
    answer: "All orders above ₹499 receive 100% Free 10-Minute Delivery automatically. For smaller baskets, a flat delivery fee of ₹25 applies. There is no minimum order restriction."
  },
  {
    category: "Delivery",
    question: "How does GPS location detection work?",
    answer: "Grocerin features dual-layer GPS reverse-geocoding that automatically pinpoints your street locality and precise 6-digit postal PIN code with 1 click from your device."
  },
  {
    category: "Orders",
    question: "How do I place an order?",
    answer: "Select your desired items or recipe bundles, click 'ADD', review your items in the cart drawer or checkout page, confirm your delivery address, and proceed to pay via Stripe card or Cash on Delivery."
  },
  {
    category: "Orders",
    question: "Can I cancel my order after placing it?",
    answer: "Yes. You can cancel any order from the 'My Orders' section while it is in the 'Order Placed' status before our micro-warehouse packing team starts bagging the items."
  },
  {
    category: "Orders",
    question: "How do I track my active delivery?",
    answer: "Visit the 'Track Order' page or click 'Live Telemetry' on your active order in 'My Orders'. You will see live rider GPS position, vehicle speed, and estimated arrival countdown."
  },
  {
    category: "Payments",
    question: "Which payment methods are accepted?",
    answer: "We accept Stripe credit and debit cards (Visa, Mastercard, RuPay, Maestro), all UPI apps (Google Pay, PhonePe, Paytm, BHIM, Cred), Net Banking across major banks, and Cash on Delivery (COD)."
  },
  {
    category: "Payments",
    question: "Is online payment safe and secure?",
    answer: "Yes, 100%. All card transactions are encrypted with 256-bit SSL security through Stripe PCI-DSS Level 1 certified infrastructure. We never store your CVV or card PINs."
  },
  {
    category: "Payments",
    question: "How long does a refund take if I cancel an order or report a damaged item?",
    answer: "UPI refunds are processed instantly within 15-120 minutes. Credit/Debit card refunds reflect in 3-5 business days depending on your issuing bank. COD refunds are transferred directly via UPI or NEFT."
  },
  {
    category: "Quality",
    question: "How do you guarantee produce freshness and hygiene?",
    answer: "Our fruits and vegetables are sourced directly from verified regional farms daily. Perishables undergo multi-point quality checks and are packed in breathable, eco-friendly, sanitized bags."
  },
  {
    category: "Quality",
    question: "What is the 100% Freshness Guarantee policy?",
    answer: "If any item arrives bruised, sour, leaking, or unsatisfactory, report it within 24 hours via My Orders for an instant free 10-minute redelivery or immediate money refund."
  },
  {
    category: "Account",
    question: "How do I reset my password if I forget it?",
    answer: "Click 'Sign In' at the top right, select 'Forgot password?', enter your registered email to receive an instant 6-digit OTP code, and set a new secure password with live strength verification."
  },
  {
    category: "Account",
    question: "How do I save multiple delivery addresses?",
    answer: "Go to 'Add Address' in your profile menu. You can save Home, Office, or Other delivery locations with full landmark and GPS coordinates."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const filteredFaqs = FAQS.filter(item => {
    const matchesCategory = activeTab === "All" || item.category === activeTab;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.question.toLowerCase().includes(query) || 
      item.answer.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-4 sm:py-8 space-y-8 sm:space-y-12 animate-in fade-in duration-300">
      
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white p-6 sm:p-10 md:p-12 shadow-2xl border border-emerald-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-300/30 text-emerald-300 text-xs font-black tracking-wide uppercase">
            <HiQuestionMarkCircle className="w-4 h-4 text-amber-300" />
            <span>Help Center & Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Frequently Asked <span className="text-emerald-400">Questions</span>
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            Find immediate answers regarding our 10-minute delivery SLA, order payments, produce freshness, returns, and account security.
          </p>

          <div className="relative max-w-lg mt-4">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. delivery, coupon, refund, cancel)..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 focus:border-emerald-400 rounded-2xl text-xs sm:text-sm text-white placeholder-emerald-100/60 outline-none transition shadow-inner"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {FAQ_CATEGORIES.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-emerald-700 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <IconComponent className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-gray-500"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-gray-500">
            Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? "answer" : "answers"}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
            >
              Clear search filter
            </button>
          )}
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-3xl border border-gray-100 text-gray-500 space-y-3">
            <HiQuestionMarkCircle className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="text-sm font-bold text-gray-800">No matching answers found for "{searchQuery}"</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Try searching with different terms or reach out to our 24/7 customer support team.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:border-emerald-200 transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition shrink-0 ${
                    isOpen ? "bg-emerald-700 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {isOpen ? <HiChevronUp className="w-4 h-4" /> : <HiChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 animate-in fade-in duration-200">
                    <p className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md shrink-0">
            <HiChatBubbleLeftRight className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-900">
              Still have questions or need instant help?
            </h3>
            <p className="text-xs text-gray-600 mt-1 max-w-xl leading-relaxed">
              Our Grocerin AI Shopping Assistant is available 24/7 in the bottom-right corner, or you can speak with our human dispatch team directly.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/contact"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition cursor-pointer whitespace-nowrap"
          >
            Contact Support Team
          </Link>
        </div>
      </div>

    </div>
  );
}
