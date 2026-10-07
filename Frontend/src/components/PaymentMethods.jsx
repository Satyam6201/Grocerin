import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import {
    HiCreditCard,
    HiShieldCheck,
    HiCurrencyRupee,
    HiBuildingLibrary,
    HiDevicePhoneMobile,
    HiLockClosed,
    HiArrowRight
} from 'react-icons/hi2';

const PAYMENT_OPTIONS = [
  {
    icon: HiCreditCard,
    title: "Credit & Debit Cards",
    desc: "Visa, Mastercard, RuPay, Maestro & American Express with 3D-Secure OTP verification.",
    accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badge: "Stripe 256-Bit SSL"
  },
  {
    icon: HiDevicePhoneMobile,
    title: "UPI Instant Payments",
    desc: "1-Click checkout via Google Pay, PhonePe, Paytm, BHIM, Cred & any bank UPI app.",
    accent: "bg-sky-50 text-sky-700 border-sky-200",
    badge: "0% Surcharge"
  },
  {
    icon: HiBuildingLibrary,
    title: "Net Banking",
    desc: "Direct access across 50+ Indian banks including SBI, HDFC, ICICI, Axis & Kotak.",
    accent: "bg-purple-50 text-purple-700 border-purple-200",
    badge: "Direct Bank Link"
  },
  {
    icon: HiCurrencyRupee,
    title: "Cash on Delivery (COD)",
    desc: "Pay in cash or scan rider's dynamic UPI QR code upon doorstep delivery.",
    accent: "bg-amber-50 text-amber-700 border-amber-200",
    badge: "Available in Patna"
  }
];

export default function PaymentMethods() {
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
            <HiLockClosed className="w-4 h-4 text-amber-300" />
            <span>PCI-DSS Level 1 Certified Checkout</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Safe & Flexible <span className="text-emerald-400">Payment Methods</span>
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            Choose your preferred payment method with absolute peace of mind. Every transaction is encrypted with military-grade SSL protocols.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/product"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Start Shopping</span>
              <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <HiCreditCard className="text-emerald-700" />
            <span>Supported Payment Options</span>
          </h2>
          <p className="text-xs text-gray-500">Zero extra fees, instant payment reconciliation, and quick refunds.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PAYMENT_OPTIONS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-gray-100 hover:border-emerald-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl border ${item.accent} flex items-center justify-center text-xl shadow-2xs`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-gray-900 mt-4">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
            <HiShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">
              Bank-Grade Security Architecture
            </h3>
            <p className="text-xs text-gray-500">How your card and account data is shielded during every checkout.</p>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          All card transactions are processed directly through Stripe's certified Level 1 PCI-DSS payment infrastructure. 
          Grocerin never stores, views, or logs your sensitive CVV codes or passwords. For Cash on Delivery, our riders carry 
          tamper-evident cash envelopes and encrypted mobile UPI QR terminals for dynamic instant verification.
        </p>

        <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <span className="text-xs font-extrabold text-gray-900 block">256-Bit SSL</span>
            <span className="text-[10px] text-gray-500">End-to-End Encryption</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <span className="text-xs font-extrabold text-gray-900 block">PCI-DSS Compliant</span>
            <span className="text-[10px] text-gray-500">Global Security Standard</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <span className="text-xs font-extrabold text-gray-900 block">Instant Refunds</span>
            <span className="text-[10px] text-gray-500">Direct to UPI / Bank</span>
          </div>
        </div>
      </div>

    </div>
  );
}
