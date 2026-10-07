import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { 
    HiBolt, 
    HiMagnifyingGlass, 
    HiAdjustmentsHorizontal, 
    HiSparkles, 
    HiShoppingBag, 
    HiArrowRight,
    HiXMark,
    HiCheck
} from 'react-icons/hi2';

const SUBCATEGORIES = {
    Vegetables: ["All Veggies", "Potatoes & Onions", "Tomatoes & Carrots", "Spinach & Leafy", "Exotic & Organic"],
    Fruits: ["All Fruits", "Apples & Pears", "Bananas & Mangoes", "Citrus & Oranges", "Grapes & Berries"],
    Drinks: ["All Drinks", "Soft Drinks & Cola", "Fruit Juices", "Cold Coffee & Tea", "Energy & Soda"],
    Instant: ["All Instant Foods", "Maggi & Noodles", "Soups & Ramen", "Chips & Munchies", "Ready to Eat"],
    Dairy: ["All Dairy", "Milk & Pouches", "Paneer & Tofu", "Butter & Dahi", "Cheese & Farm Eggs"],
    Bakery: ["All Bakery", "Whole Wheat Bread", "Brown & Multigrain", "Croissants & Buns", "Cakes & Muffins"],
    Grains: ["All Grains", "Basmati & Rice", "Wheat Atta & Flour", "Pulses & Dal", "Quinoa & Oats"],
    CookingEssentials: ["All Essentials", "Edible Oils & Ghee", "Salt & Sugar", "Spices & Masala", "Sauces & Spreads"],
    BeautyCare: ["All Personal Care", "Soaps & Body Wash", "Face Wash & Skincare", "Haircare & Shampoo", "Oral Hygiene"]
};

export default function Categories() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { products, loadingProducts } = useAppContext();

    const activeCategoryParam = searchParams.get('cat') || categories[0].path;
    const [selectedCategory, setSelectedCategory] = useState(activeCategoryParam);
    const [selectedSubcategory, setSelectedSubcategory] = useState("All");
    const [internalSearch, setInternalSearch] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [onlyInStock, setOnlyInStock] = useState(false);

    useEffect(() => {
        const cat = searchParams.get('cat');
        if (cat) {
            setSelectedCategory(cat);
            setSelectedSubcategory("All");
        }
    }, [searchParams]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [selectedCategory, selectedSubcategory]);

    const handleSelectCategory = (catPath) => {
        setSelectedCategory(catPath);
        setSelectedSubcategory("All");
        setInternalSearch("");
        setSearchParams({ cat: catPath });
    };

    const currentCategoryObj = categories.find(
        (c) => c.path.toLowerCase() === selectedCategory.toLowerCase()
    ) || categories[0];

    const currentSubcategories = SUBCATEGORIES[selectedCategory] || ["All"];

    const categoryProducts = useMemo(() => {
        let list = products.filter(
            (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

        if (internalSearch.trim()) {
            const query = internalSearch.toLowerCase().trim();
            list = list.filter((p) => p.name.toLowerCase().includes(query));
        } else if (selectedSubcategory && !selectedSubcategory.startsWith("All")) {
            const token = selectedSubcategory.toLowerCase().split('&')[0].trim();
            list = list.filter((p) => 
                p.name.toLowerCase().includes(token) || 
                (p.tags && p.tags.some(t => t.toLowerCase().includes(token)))
            );
        }

        if (onlyInStock) {
            list = list.filter((p) => p.inStock);
        }

        if (sortBy === "price_asc") {
            list.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
        } else if (sortBy === "price_desc") {
            list.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
        } else if (sortBy === "discount") {
            list.sort((a, b) => {
                const discA = a.price - (a.offerPrice || a.price);
                const discB = b.price - (b.offerPrice || b.price);
                return discB - discA;
            });
        }

        return list;
    }, [products, selectedCategory, selectedSubcategory, internalSearch, onlyInStock, sortBy]);

    return (
        <div className="min-h-screen py-3 sm:py-6">
            
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 px-1">
                <Link to="/" className="hover:text-emerald-700">Home</Link>
                <span>/</span>
                <span className="text-gray-700 font-bold">Categories Explorer</span>
                <span>/</span>
                <span className="text-emerald-700 font-bold">{currentCategoryObj.text}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
                
                <aside className="w-full lg:w-64 lg:shrink-0 bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden lg:sticky lg:top-[84px]">
                    <div className="p-3.5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <HiShoppingBag className="w-4 h-4 text-emerald-300" />
                            <h2 className="text-xs font-black uppercase tracking-wider">All Categories</h2>
                        </div>
                        <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                            {categories.length} Departments
                        </span>
                    </div>

                    <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto no-scrollbar max-h-[75vh] p-2 gap-1.5 divide-y divide-gray-50 lg:divide-y-0">
                        {categories.map((cat, idx) => {
                            const isSelected = selectedCategory.toLowerCase() === cat.path.toLowerCase();
                            const count = products.filter(p => p.category.toLowerCase() === cat.path.toLowerCase()).length;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelectCategory(cat.path)}
                                    className={`flex items-center justify-between p-2.5 rounded-2xl transition cursor-pointer text-left shrink-0 lg:shrink w-auto lg:w-full gap-3 ${
                                        isSelected
                                            ? "bg-emerald-700 text-white font-black shadow-xs ring-1 ring-emerald-600"
                                            : "hover:bg-gray-50 text-gray-700 font-semibold"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className={`w-8 h-8 rounded-xl p-1 flex items-center justify-center shrink-0 border ${
                                            isSelected ? "bg-white/20 border-white/30" : "bg-gray-50 border-gray-100"
                                        }`}>
                                            <img src={cat.image} alt={cat.text} className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-xs truncate">{cat.text}</span>
                                    </div>

                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full hidden sm:inline-block ${
                                        isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                <main className="flex-1 w-full space-y-4">
                    
                    <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center shrink-0">
                                <img src={currentCategoryObj.image} alt={currentCategoryObj.text} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-lg sm:text-2xl font-black tracking-tight">{currentCategoryObj.text}</h1>
                                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 flex items-center gap-1">
                                        <HiBolt className="text-xs" />
                                        <span>10 MINS</span>
                                    </span>
                                </div>
                                <p className="text-xs text-emerald-100/80 mt-0.5">
                                    Showing {categoryProducts.length} fresh items ready for instant micro-warehouse dispatch.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <label className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition">
                                <input
                                    type="checkbox"
                                    checked={onlyInStock}
                                    onChange={(e) => setOnlyInStock(e.target.checked)}
                                    className="accent-emerald-400 w-3.5 h-3.5 cursor-pointer"
                                />
                                <span>In-Stock Only</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs p-3 space-y-3 sticky top-[72px] z-20 backdrop-blur-md bg-white/95">
                        
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                            {currentSubcategories.map((sub, idx) => {
                                const isSubActive = selectedSubcategory === sub;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setSelectedSubcategory(sub);
                                            setInternalSearch("");
                                        }}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                                            isSubActive
                                                ? "bg-emerald-700 text-white shadow-xs"
                                                : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                                        }`}
                                    >
                                        {sub}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-gray-100">
                            <div className="relative w-full sm:w-72">
                                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={internalSearch}
                                    onChange={(e) => setInternalSearch(e.target.value)}
                                    placeholder={`Search in ${currentCategoryObj.text}...`}
                                    className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl text-xs outline-none transition"
                                />
                                {internalSearch && (
                                    <button
                                        onClick={() => setInternalSearch("")}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                        <HiXMark className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <span className="text-xs text-gray-400 font-bold shrink-0">Sort By:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    aria-label="Sort products"
                                    className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 rounded-xl px-3 py-2 outline-none focus:border-emerald-600 transition cursor-pointer"
                                >
                                    <option value="default">Featured</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="discount">Highest Discount</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {loadingProducts ? (
                        <ProductSkeleton count={8} />
                    ) : categoryProducts.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-3">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mx-auto text-2xl">
                                <HiShoppingBag className="w-7 h-7 text-gray-300" />
                            </div>
                            <h3 className="text-base font-extrabold text-gray-800">No items match your filter</h3>
                            <p className="text-xs text-gray-500 max-w-sm mx-auto">
                                We couldn't find items in this subcategory matching "{internalSearch || selectedSubcategory}".
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedSubcategory("All");
                                    setInternalSearch("");
                                    setOnlyInStock(false);
                                }}
                                className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition cursor-pointer"
                            >
                                Reset Category Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5 md:gap-4">
                            {categoryProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
