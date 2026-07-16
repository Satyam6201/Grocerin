import {
  CreditCard,
  Wallet,
  Landmark,
  Smartphone,
  ShieldCheck,
} from "lucide-react";

export default function PaymentMethods() {

  const methods = [
    {
      icon: <CreditCard size={34} className="text-green-600" />,
      title: "Credit / Debit Cards",
      desc: "Visa, Mastercard, RuPay and American Express cards are accepted.",
    },
    {
      icon: <Smartphone size={34} className="text-green-600" />,
      title: "UPI Payments",
      desc: "Pay instantly using Google Pay, PhonePe, BHIM, Paytm and more.",
    },
    {
      icon: <Wallet size={34} className="text-green-600" />,
      title: "Digital Wallets",
      desc: "Fast and secure wallet payments.",
    },
    {
      icon: <Landmark size={34} className="text-green-600" />,
      title: "Net Banking",
      desc: "Pay directly through your preferred bank.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      <section className="bg-gradient-to-r from-green-600 to-green-500 py-20 text-white text-center">

        <h1 className="text-5xl font-bold">
          Payment Methods
        </h1>

        <p className="mt-4 text-green-100">
          Secure and convenient payment options for every customer.
        </p>

      </section>

      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-8">

        {methods.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
          >

            {item.icon}

            <h2 className="text-2xl font-semibold mt-5">
              {item.title}
            </h2>

            <p className="text-gray-600 mt-3">
              {item.desc}
            </p>

          </div>

        ))}

      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-green-600" />
            <h2 className="text-3xl font-bold">
              Payment Security
            </h2>
          </div>

          <p className="text-gray-600 leading-8">
            All transactions on Grocerin are secured using SSL encryption and
            processed through trusted payment gateways such as Stripe. We never
            store your card details on our servers, ensuring complete security
            and privacy for every transaction.
          </p>

          <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-semibold text-xl mb-2">
              Accepted Payment Options
            </h3>

            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>UPI</li>
              <li>Credit Cards</li>
              <li>Debit Cards</li>
              <li>Net Banking</li>
              <li>Digital Wallets</li>
              <li>Cash on Delivery (Available in selected locations)</li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}