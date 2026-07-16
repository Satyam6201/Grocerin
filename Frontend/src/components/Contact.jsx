import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  
} from "lucide-react";
import FAQ from "./FAQ";

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Contact Grocerin
          </h1>

          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about
            products, orders, delivery, or partnerships, our team is always
            ready to help.
          </p>
        </div>
      </section>

      {/* Contact Cards */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 text-center">

            <Phone className="mx-auto text-green-600" size={36} />

            <h3 className="font-bold mt-4">Phone</h3>

            <p className="text-gray-500 mt-2">
              +91 62019 XXXXX
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 text-center">

            <Mail className="mx-auto text-green-600" size={36} />

            <h3 className="font-bold mt-4">
              Email
            </h3>

            <p className="text-gray-500 mt-2">
              support@grocerin.com
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 text-center">

            <MapPin className="mx-auto text-green-600" size={36} />

            <h3 className="font-bold mt-4">
              Office
            </h3>

            <p className="text-gray-500 mt-2">
              Delhi
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 text-center">

            <Clock className="mx-auto text-green-600" size={36} />

            <h3 className="font-bold mt-4">
              Working Hours
            </h3>

            <p className="text-gray-500 mt-2">
              Mon - Sun <br />
              8:00 AM - 10:00 PM
            </p>

          </div>

        </div>
      </section>

      {/* Contact Form */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left */}

          <div className="bg-white p-8 rounded-3xl shadow-lg">

            <h2 className="text-3xl font-bold mb-2">
              Send us a Message
            </h2>

            <p className="text-gray-500 mb-8">
              Fill out the form and our support team will contact you shortly.
            </p>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8 py-3 flex items-center gap-2 transition"
              >
                Send Message
                <Send size={18} />
              </button>

            </form>

          </div>

          {/* Right */}

          <div className="space-y-8">

            <div className="bg-green-600 text-white rounded-3xl p-8">

              <h2 className="text-3xl font-bold">
                Need Instant Help?
              </h2>

              <p className="mt-4 text-green-100">
                Our customer support team is available every day to assist you
                with orders, refunds, deliveries, and account-related issues.
              </p>

              <div className="mt-8 space-y-5">

                <div className="flex items-center gap-4">
                  <Phone />
                  <span>+91 62019 XXXXX</span>
                </div>

                <div className="flex items-center gap-4">
                  <Mail />
                  <span>support@grocerin.com</span>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin />
                  <span>Delhi</span>
                </div>

              </div>

         </div>

            {/* Google Map */}

            <div className="overflow-hidden rounded-3xl shadow-lg">

              <iframe
                title="map"
                className="w-full h-[350px]"
                loading="lazy"
                src="https://maps.google.com/maps?q=Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              ></iframe>

            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}

     <FAQ />

    </div>
  );
}