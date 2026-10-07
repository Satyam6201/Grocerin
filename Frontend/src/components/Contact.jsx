import React, { useState, useEffect } from "react";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send
} from 'lucide-react';
import FAQ from "./FAQ";
import toast from "react-hot-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you! Your inquiry has been sent to our customer care team.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 600);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
            Contact Grocerin Support
          </h1>
          <p className="text-sm md:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Have questions regarding orders, deliveries, refunds, or vendor partnerships?
            Our dedicated hyper-local customer care team is here to assist 24/7.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition p-6 text-center">
            <Phone className="mx-auto text-emerald-600" size={32} />
            <h3 className="font-bold text-gray-900 mt-3 text-sm">Customer Care</h3>
            <p className="text-gray-500 text-xs mt-1">+91 1800-419-7890</p>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
              Toll Free
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition p-6 text-center">
            <Mail className="mx-auto text-emerald-600" size={32} />
            <h3 className="font-bold text-gray-900 mt-3 text-sm">Email Inquiries</h3>
            <p className="text-gray-500 text-xs mt-1">support@grocerin.com</p>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
              Avg 15m Response
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition p-6 text-center">
            <MapPin className="mx-auto text-emerald-600" size={32} />
            <h3 className="font-bold text-gray-900 mt-3 text-sm">Dark Store Central</h3>
            <p className="text-gray-500 text-xs mt-1">Boring Road Hub, Patna</p>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
              10-Min Fast Dispatch
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition p-6 text-center">
            <Clock className="mx-auto text-emerald-600" size={32} />
            <h3 className="font-bold text-gray-900 mt-3 text-sm">Operating Hours</h3>
            <p className="text-gray-500 text-xs mt-1">Mon - Sun: 6:00 AM - 11:30 PM</p>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 inline-block">
              Open 365 Days
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Send us a Direct Message
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Fill in your details below and a senior support associate will reach out to you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Satyam Sharma"
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Order Delivery Inquery"
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-emerald-600 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Message</label>
                <textarea
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry or order issue..."
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-emerald-600 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl px-6 py-3 flex items-center gap-2 transition cursor-pointer shadow-xs disabled:opacity-70"
              >
                <span>{isSubmitting ? "Sending..." : "Submit Message"}</span>
                <Send size={15} />
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-linear-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
              <h2 className="text-2xl font-black tracking-tight">Need Instant Help?</h2>
              <p className="mt-2 text-xs text-emerald-100/90 leading-relaxed">
                For active orders currently out for delivery, our live dispatch team provides instant updates with real-time ETA tracking.
              </p>

              <div className="mt-6 space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-emerald-300" />
                  <span className="font-semibold">+91 1800-419-7890 (Toll Free)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-emerald-300" />
                  <span className="font-semibold">support@grocerin.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-emerald-300" />
                  <span className="font-semibold">Boring Road Dark Store, Patna, Bihar</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-xs">
              <iframe
                title="map"
                className="w-full h-[280px]"
                loading="lazy"
                src="https://maps.google.com/maps?q=Boring%20Road,%20Patna&t=&z=13&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
