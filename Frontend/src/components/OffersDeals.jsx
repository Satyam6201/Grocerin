import { BadgePercent, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const offers = [
  {
    title: "Fresh Fruits",
    discount: "40% OFF",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=700",
    desc: "Fresh fruits directly from farms.",
  },
  {
    title: "Vegetables",
    discount: "30% OFF",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700",
    desc: "Healthy & organic vegetables.",
  },
  {
    title: "Dairy Products",
    discount: "25% OFF",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=700",
    desc: "Milk, Cheese & Butter.",
  },
  {
    title: "Snacks",
    discount: "Buy 1 Get 1",
    image:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=700",
    desc: "Limited time offer.",
  },
];

export default function OffersDeals() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <BadgePercent size={60} className="mx-auto mb-5" />

          <h1 className="text-5xl font-bold">Offers & Deals</h1>

          <p className="mt-5 text-green-100 max-w-2xl mx-auto">
            Save more on every grocery purchase with exclusive discounts,
            exciting cashback offers, and limited-time deals.
          </p>
        </div>
      </section>

      {/* Coupon Banner */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-10 text-white flex flex-col md:flex-row justify-between items-center shadow-lg">
          <div>
            <h2 className="text-4xl font-bold">🎉 FLAT ₹250 OFF</h2>

            <p className="mt-3 text-green-100">
              On orders above <strong>₹1499</strong>
            </p>
          </div>

          <button
            className="mt-6 md:mt-0 bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-100 transition"
            onClick={() => navigate("/products")}
          >
            Use Code: GROCER250
          </button>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {offer.discount}
                </span>

                <h3 className="text-2xl font-bold mt-4">
                  {offer.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  {offer.desc}
                </p>

                <button
                  onClick={() => navigate("/product")}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex justify-center items-center gap-2 transition"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}