import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  HiTag, 
  HiSparkles, 
  HiGift, 
  HiBolt, 
  HiClipboardDocumentCheck, 
  HiCheck, 
  HiArrowRight, 
  HiClock,
  HiShieldCheck,
  HiFire
} from "react-icons/hi2";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const COUPONS = [
  {
    code: "GROCER100",
    discount: "₹100 OFF",
    minOrder: "₹499",
    tag: "NEW USER WELCOME",
    desc: "Valid on your first grocery basket across all categories.",
    accent: "from-emerald-600 to-teal-700",
    border: "border-emerald-200"
  },
  {
    code: "GROCER250",
    discount: "₹250 OFF",
    minOrder: "₹1499",
    tag: "MONTHLY STAPLE SAVER",
    desc: "Mega discount on monthly pantry, rice, oil & atta essentials.",
    accent: "from-blue-600 to-indigo-700",
    border: "border-blue-200"
  },
  {
    code: "FRESH50",
    discount: "₹50 OFF",
    minOrder: "₹299",
    tag: "FARM FRESH PRODUCE",
    desc: "Direct farm harvest discount on organic fruits & green veggies.",
    accent: "from-amber-600 to-orange-700",
    border: "border-amber-200"
  },
  {
    code: "QUICKFREE",
    discount: "FREE DELIVERY",
    minOrder: "₹199",
    tag: "10-MIN VIP PASS",
    desc: "Zero delivery fees on all rush orders from dark store #102.",
    accent: "from-purple-600 to-pink-700",
    border: "border-purple-200"
  }
];

const CATEGORY_DEALS = [
  {
    category: "Fruits",
    title: "Fresh Farm Fruits",
    discount: "UP TO 40% OFF",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=700&auto=format&fit=crop&q=80",
    desc: "Apples, Shimla oranges, Alphonso mangoes, bananas & seedless grapes.",
    path: "/products/Fruits",
    badge: "Daily Fresh Harvest"
  },
  {
    category: "Vegetables",
    title: "Organic Vegetables",
    discount: "FLAT 30% OFF",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&auto=format&fit=crop&q=80",
    desc: "Farm fresh potatoes, red tomatoes, spinach, carrots & green chillies.",
    path: "/products/Vegetables",
    badge: "100% Pesticide Free"
  },
  {
    category: "Dairy",
    title: "Dairy, Paneer & Eggs",
    discount: "UP TO 25% OFF",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=700&auto=format&fit=crop&q=80",
    desc: "Amul Taaza Milk, fresh malai paneer, butter, cheese blocks & farm eggs.",
    path: "/products/Dairy",
    badge: "Chilled Cold Chain"
  },
  {
    category: "Drinks",
    title: "Cold Drinks & Juices",
    discount: "BUY 2 GET 10% OFF",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=700&auto=format&fit=crop&q=80",
    desc: "Coca-Cola, Pepsi, Sprite, Real fruit juices & cold brew cans.",
    path: "/products/Drinks",
    badge: "Ice Chilled"
  },
  {
    category: "Instant",
    title: "Instant Food & Munchies",
    discount: "COMBO PACKS @ ₹99",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=700&auto=format&fit=crop&q=80",
    desc: "Maggi 2-Min noodles, Top Ramen, instant soups, chips & crunchy snacks.",
    path: "/products/Instant",
    badge: "Midnight Cravings"
  },
  {
    category: "Bakery",
    title: "Fresh Bakery & Breads",
    discount: "FLAT 20% OFF",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80",
    desc: "Whole wheat bread, brown bread, butter croissants & chocolate muffins.",
    path: "/products/Bakery",
    badge: "Baked Today"
  }
];

export default function OffersDeals() {
  const navigate = useNavigate();
  const { setShowScratchCardModal } = useAppContext();
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied! Apply at checkout.`);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const filteredDeals = selectedFilter === "All" 
    ? CATEGORY_DEALS 
    : CATEGORY_DEALS.filter(d => d.category === selectedFilter);

  return (
    <div className="min-h-screen py-4 sm:py-8 space-y-8 sm:space-y-12 animate-in fade-in duration-300">
      
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white p-6 sm:p-10 md:p-12 shadow-2xl border border-emerald-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-black tracking-wide uppercase">
            <HiFire className="w-4 h-4 animate-bounce" />
            <span>Mega Grocery Flash Deals & Vouchers</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Maximum Savings on <span className="text-emerald-400">10-Minute Fresh Groceries</span>
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            Unlock exclusive dark-store coupons, seasonal price drops, and combo bundles. 
            All discounts apply instantly at checkout with guaranteed ultra-fast doorstep dispatch.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setShowScratchCardModal(true)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <HiGift className="w-5 h-5 text-slate-900 animate-bounce" />
              <span>Scratch & Win Lucky Coupon</span>
            </button>

            <button
              onClick={() => navigate("/product")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl transition flex items-center gap-2 cursor-pointer"
            >
              <span>Explore All Products</span>
              <HiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <HiTag className="text-emerald-700" />
              <span>Active Promo Codes</span>
            </h2>
            <p className="text-xs text-gray-500">Tap copy and paste during checkout for instant cart deductions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COUPONS.map((coupon, idx) => (
            <div 
              key={idx}
              className={`bg-white rounded-3xl p-5 border ${coupon.border} shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700">
                    {coupon.tag}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Min {coupon.minOrder}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-2xl font-black text-gray-900 tracking-tight block">
                    {coupon.discount}
                  </span>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {coupon.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-dashed border-gray-200 flex items-center justify-between gap-2">
                <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl font-mono font-black text-xs text-gray-800 tracking-wider">
                  {coupon.code}
                </div>

                <button
                  onClick={() => handleCopy(coupon.code)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                    copiedCode === coupon.code
                      ? "bg-emerald-700 text-white"
                      : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200"
                  }`}
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <HiCheck className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <HiClipboardDocumentCheck className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <HiSparkles className="text-amber-500" />
              <span>Category Deals & Discounts</span>
            </h2>
            <p className="text-xs text-gray-500">Curated special prices on fresh items direct from Boring Road Hub #102.</p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {["All", "Fruits", "Vegetables", "Dairy", "Drinks", "Instant", "Bakery"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap transition cursor-pointer ${
                  selectedFilter === cat
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat === "All" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDeals.map((deal, idx) => (
            <div
              key={idx}
              onClick={() => {
                navigate(deal.path);
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
                    {deal.discount}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-[11px] font-bold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                    {deal.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
                    <HiBolt className="w-3.5 h-3.5" />
                    <span>10 MINS</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {deal.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">Explore Catalog</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition shadow-2xs">
                    <HiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md shrink-0">
            <HiShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-gray-900">
              Free 10-Minute Delivery On Orders Above ₹499
            </h3>
            <p className="text-xs text-gray-600 mt-1 max-w-xl leading-relaxed">
              Combine your fresh produce, milk, snacks, and daily groceries to enjoy zero delivery fees and priority micro-warehouse dispatch.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            navigate("/product");
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md transition cursor-pointer whitespace-nowrap shrink-0"
        >
          Fill Your Basket
        </button>
      </div>

    </div>
  );
}
