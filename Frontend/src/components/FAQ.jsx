import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Phone,
  Mail,
} from "lucide-react";

const faqs = [
  {
    category: "Orders",
    question: "How can I place an order?",
    answer:
      "Browse products, add items to your cart, proceed to checkout, choose your delivery address, and complete payment using Stripe or Cash on Delivery.",
  },
  {
    category: "Orders",
    question: "Can I cancel my order?",
    answer:
      "Yes. Orders can be cancelled before they are dispatched. Once dispatched, cancellation is no longer available.",
  },
  {
    category: "Delivery",
    question: "How long does delivery take?",
    answer:
      "Most deliveries arrive within 15–30 minutes depending on your location and product availability.",
  },
  {
    category: "Delivery",
    question: "Can I schedule my delivery?",
    answer:
      "Yes. During checkout, you can choose an available delivery slot that works best for you.",
  },
  {
    category: "Payments",
    question: "Which payment methods do you accept?",
    answer:
      "We support Stripe, Debit/Credit Cards, UPI, Net Banking, Wallets, and Cash on Delivery.",
  },
  {
    category: "Payments",
    question: "Is online payment secure?",
    answer:
      "Absolutely. All online payments are processed securely through Stripe using encrypted transactions.",
  },
  {
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "Go to the Login page, click 'Forgot Password', and follow the instructions sent to your registered email.",
  },
  {
    category: "Account",
    question: "Can I manage multiple addresses?",
    answer:
      "Yes. You can add, edit, or delete multiple delivery addresses from your profile settings.",
  },
  {
    category: "Returns",
    question: "What if I receive damaged or expired products?",
    answer:
      "Contact our support team within 24 hours with your order details and product photos. We'll arrange a replacement or refund.",
  },
  {
    category: "Seller",
    question: "Can I become a seller on Grocerin?",
    answer:
      "Yes. Register as a seller, complete verification, and start listing your grocery products through the Seller Dashboard.",
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
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}

      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <HelpCircle className="mx-auto mb-4" size={60} />

          <h1 className="text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>

          <p className="text-green-100 max-w-2xl mx-auto">
            Find quick answers to common questions about orders, payments,
            delivery, accounts, and more.
          </p>

          <div className="relative max-w-xl mx-auto mt-10">

            <Search
              className="absolute left-4 top-4 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search your question..."
              className="w-full rounded-full py-4 pl-12 pr-5 text-gray-700 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

      </section>

      {/* Categories */}

      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex flex-wrap justify-center gap-3">

          {[
            "Orders",
            "Delivery",
            "Payments",
            "Account",
            "Returns",
            "Seller",
          ].map((cat) => (
            <span
              key={cat}
              className="px-5 py-2 bg-white rounded-full shadow text-gray-700 font-medium"
            >
              {cat}
            </span>
          ))}

        </div>

      </section>

      {/* FAQ */}

      <section className="max-w-4xl mx-auto px-6 pb-20">

        <div className="space-y-5">

          {filteredFAQs.map((faq, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >

                <div>

                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {faq.category}
                  </span>

                  <h3 className="font-semibold text-lg mt-2">
                    {faq.question}
                  </h3>

                </div>

                {open === index ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-green-600" />
                )}

              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-600 leading-7">
                  {faq.answer}
                </div>
              )}

            </div>

          ))}

        </div>

      </section>

      {/* Contact */}

      <section className="bg-green-600 text-white py-16">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">
            Still Need Help?
          </h2>

          <p className="mt-4 text-green-100">
            Our support team is available every day to assist you with your
            orders and account.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-10">

            <div className="bg-white text-gray-800 px-8 py-5 rounded-2xl shadow-lg flex items-center gap-4">
              <Phone className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Call Us</p>
                <h3 className="font-semibold">+91 62019 XXXXX</h3>
              </div>
            </div>

            <div className="bg-white text-gray-800 px-8 py-5 rounded-2xl shadow-lg flex items-center gap-4">
              <Mail className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <h3 className="font-semibold">support@grocerin.com</h3>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}