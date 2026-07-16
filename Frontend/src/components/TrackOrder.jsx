import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Home,
  Clock,
} from "lucide-react";

export default function TrackOrder() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}

      <section className="bg-gradient-to-r from-green-600 to-green-500 py-20 text-white">

        <div className="max-w-5xl mx-auto text-center px-6">

          <Package size={60} className="mx-auto mb-5"/>

          <h1 className="text-5xl font-bold">
            Track Your Order
          </h1>

          <p className="text-green-100 mt-4">
            Enter your Order ID to check live delivery status.
          </p>

          <div className="mt-10 flex">

            <input
              placeholder="Enter Order ID..."
              className="flex-1 rounded-l-xl p-4 text-gray-700 outline-none"
            />

            <button className="bg-black px-8 rounded-r-xl">
              <Search/>
            </button>

          </div>

        </div>

      </section>

      {/* Order Card */}

      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex justify-between flex-wrap">

            <div>

              <h2 className="text-3xl font-bold">
                Order #GRN458726
              </h2>

              <p className="text-gray-500">
                Ordered on 14 July 2026
              </p>

            </div>

            <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">
              Out for Delivery
            </span>

          </div>

          {/* Timeline */}

          <div className="mt-12">

            <div className="flex items-center gap-6">

              <CheckCircle className="text-green-600"/>

              <div>

                <h3 className="font-semibold">
                  Order Confirmed
                </h3>

                <p className="text-gray-500">
                  09:20 AM
                </p>

              </div>

            </div>

            <div className="h-12 border-l ml-3 border-green-500"/>

            <div className="flex items-center gap-6">

              <Package className="text-green-600"/>

              <div>

                <h3 className="font-semibold">
                  Packed
                </h3>

                <p className="text-gray-500">
                  09:45 AM
                </p>

              </div>

            </div>

            <div className="h-12 border-l ml-3 border-green-500"/>

            <div className="flex items-center gap-6">

              <Truck className="text-green-600"/>

              <div>

                <h3 className="font-semibold">
                  Out for Delivery
                </h3>

                <p className="text-gray-500">
                  Delivery Partner: Rahul Kumar
                </p>

              </div>

            </div>

            <div className="h-12 border-l ml-3 border-gray-300"/>

            <div className="flex items-center gap-6 opacity-50">

              <Home/>

              <div>

                <h3 className="font-semibold">
                  Delivered
                </h3>

                <p>Expected in 18 Minutes</p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Summary */}

      <section className="max-w-5xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">

            <Clock className="text-green-600 mb-4"/>

            <h3 className="font-bold">
              Estimated Delivery
            </h3>

            <p className="text-gray-500 mt-2">
              18 Minutes
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <Truck className="text-green-600 mb-4"/>

            <h3 className="font-bold">
              Delivery Partner
            </h3>

            <p className="text-gray-500 mt-2">
              Rahul Kumar
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <Home className="text-green-600 mb-4"/>

            <h3 className="font-bold">
              Delivery Address
            </h3>

            <p className="text-gray-500 mt-2">
              Kamla Nagar, Bhopal, Madhya Pradesh
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}