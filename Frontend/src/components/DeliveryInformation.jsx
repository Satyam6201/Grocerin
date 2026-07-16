import { Truck, Clock, MapPin, Package } from "lucide-react";

export default function DeliveryInformation() {
  const deliveryInfo = [
    {
      icon: <Truck className="text-green-600" size={32} />,
      title: "Fast Delivery",
      description:
        "We deliver fresh groceries within 15–30 minutes in eligible service areas.",
    },
    {
      icon: <Clock className="text-green-600" size={32} />,
      title: "Delivery Hours",
      description:
        "Orders are delivered every day from 8:00 AM to 10:00 PM.",
    },
    {
      icon: <MapPin className="text-green-600" size={32} />,
      title: "Delivery Locations",
      description:
        "Currently available in selected cities. Enter your PIN code to check availability.",
    },
    {
      icon: <Package className="text-green-600" size={32} />,
      title: "Packaging",
      description:
        "Products are packed securely using eco-friendly and hygienic packaging materials.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Delivery Information</h1>
        <p className="mt-4 text-green-100 max-w-2xl mx-auto">
          Learn about our delivery process, timings, locations, and packaging standards.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        {deliveryInfo.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 shadow hover:shadow-xl transition"
          >
            {item.icon}
            <h2 className="text-2xl font-semibold mt-4">{item.title}</h2>
            <p className="text-gray-600 mt-3">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Delivery Guidelines</h2>

          <ul className="space-y-4 text-gray-600 list-disc pl-6">
            <li>Free delivery on eligible orders above ₹499.</li>
            <li>Delivery charges may vary based on location.</li>
            <li>Customers must provide an accurate delivery address.</li>
            <li>If no one is available, our delivery partner will contact you.</li>
            <li>Orders may be delayed due to weather or unforeseen circumstances.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}