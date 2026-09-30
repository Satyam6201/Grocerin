import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    category: "Orders",
    question: "How can I place an order?",
    answer:
      "Browse grocery items, add products to your cart, proceed to checkout, select your saved or GPS-detected address, and choose Stripe Online Payment or Cash on Delivery.",
  },
  {
    category: "Orders",
    question: "Can I cancel my order?",
    answer:
      "Yes. Orders can be cancelled from the My Orders dashboard while in 'Order Placed' status before our packing team prepares the dispatch box.",
  },
  {
    category: "Delivery",
    question: "How long does delivery take?",
    answer:
      "Our ultra-fast hyper-local dark stores dispatch groceries immediately. Most orders arrive at your doorstep in under 10 minutes within our active service radius.",
  },
  {
    category: "Delivery",
    question: "How is my delivery location determined?",
    answer:
      "Grocerin features dual-layer GPS reverse-geocoding that automatically detects your street locality and precise 6-digit postal PIN code with 1 click.",
  },
  {
    category: "Payments",
    question: "Which payment methods are accepted?",
    answer:
      "We accept Stripe credit/debit cards (Visa, Mastercard, RuPay), UPI apps, NetBanking, and Cash on Delivery (COD).",
  },
  {
    category: "Payments",
    question: "Is online payment secure?",
    answer:
      "All card transactions are encrypted with 256-bit SSL security through Stripe PCI-DSS Level 1 compliant infrastructure. We never store payment credentials.",
  },
  {
    category: "Account",
    question: "How do I customize my password after forgetting it?",
    answer:
      "Click 'Forgot password?' on the Sign In modal, enter your registered email to receive a 6-digit verification code, and customize your new password directly with live strength validation.",
  },
  {
    category: "Returns",
    question: "What if I receive damaged or incorrect items?",
    answer:
      "Our 100% Freshness Guarantee ensures instant replacement or refund. Report the issue to customer care within 24 hours for immediate resolution.",
  },
  {
    category: "Seller",
    question: "How can I access the Dark Store Command Center?",
    answer:
      "Authorized dark store hub managers can sign in via the Seller Portal to manage SKU stock levels, view live dispatch metrics, and update order statuses.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState("");

  const filteredFAQs = faqs.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <HelpCircle size={28} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto">
            Everything you need to know about our 10-minute grocery delivery service and account features.
          </p>

          <div className="relative max-w-md mx-auto mt-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, question, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs outline-none focus:border-emerald-600 transition shadow-xs"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFAQs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-gray-100 text-xs text-gray-400">
              No matching answers found for "{search}". Contact support for assistance.
            </div>
          ) : (
            filteredFAQs.map((faq, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xs transition"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                        {faq.category}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="mt-8 p-5 bg-white rounded-2xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-xs font-bold text-gray-900">Still have questions?</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Can't find the answer you're looking for? Chat with our customer support team.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
