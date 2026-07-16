import { RotateCcw, Wallet, ShieldCheck } from "lucide-react";

export default function ReturnRefund() {
  return (
    <div className="bg-gray-50 min-h-screen">

      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Return & Refund Policy</h1>
        <p className="mt-4 text-green-100">
          Your satisfaction is our priority.
        </p>
      </section>

      <div className="max-w-5xl mx-auto py-16 px-6 space-y-8">

        <div className="bg-white rounded-2xl shadow p-8">
          <RotateCcw className="text-green-600 mb-4" size={36}/>
          <h2 className="text-2xl font-bold">Returns</h2>

          <ul className="mt-4 list-disc pl-6 text-gray-600 space-y-3">
            <li>Damaged or expired products are eligible for replacement.</li>
            <li>Return requests must be submitted within 24 hours.</li>
            <li>Products should remain unused and in original packaging.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-8">
          <Wallet className="text-green-600 mb-4" size={36}/>
          <h2 className="text-2xl font-bold">Refunds</h2>

          <ul className="mt-4 list-disc pl-6 text-gray-600 space-y-3">
            <li>Approved refunds are processed within 5–7 business days.</li>
            <li>Refunds are credited to the original payment method.</li>
            <li>COD refunds are transferred directly to your bank account.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-8">
          <ShieldCheck className="text-green-600 mb-4" size={36}/>
          <h2 className="text-2xl font-bold">Non-Returnable Items</h2>

          <ul className="mt-4 list-disc pl-6 text-gray-600 space-y-3">
            <li>Opened food packages.</li>
            <li>Perishable products after delivery acceptance.</li>
            <li>Gift cards and promotional items.</li>
          </ul>
        </div>

      </div>

    </div>
  );
}