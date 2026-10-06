import React from 'react';
import { useAppContext } from '../context/AppContext';
import { 
    HiBolt, 
    HiSparkles, 
    HiShoppingBag, 
    HiCheck, 
    HiArrowRight, 
    HiClock 
} from 'react-icons/hi2';

const MEAL_KITS = [
    {
        id: 'paneer-butter-masala',
        title: 'Paneer Butter Masala Kit',
        tagline: 'Cook in 20 Mins • Serves 3-4',
        cookTime: '20 Mins',
        itemsDescription: 'Amul Paneer (200g) + Red Tomatoes (1kg) + Fresh Onions (500g) + Butter (100g) + Spices',
        originalPrice: 285,
        bundlePrice: 240,
        savings: 45,
        badge: 'Top Chef Bundle',
        gradient: 'from-amber-600 to-rose-700',
        keywordMatch: ['paneer', 'tomato', 'onion']
    },
    {
        id: 'healthy-morning-detox',
        title: 'Healthy Breakfast & Detox Kit',
        tagline: 'High Protein • 100% Fresh',
        cookTime: '10 Mins',
        itemsDescription: 'Shimla Apples (1kg) + Robusta Bananas (1kg) + Brown Bread + Farm Eggs (12 pcs)',
        originalPrice: 355,
        bundlePrice: 295,
        savings: 60,
        badge: 'High Energy',
        gradient: 'from-emerald-600 to-teal-800',
        keywordMatch: ['apple', 'banana', 'egg', 'bread']
    },
    {
        id: 'evening-chai-snack',
        title: 'Evening Chai & Crispy Snacks',
        tagline: 'Instant Tea Time Combo',
        cookTime: '8 Mins',
        itemsDescription: 'Amul Fresh Milk (1L) + Refined Sugar (1kg) + Fresh Ginger + Haldiram Bhujia',
        originalPrice: 205,
        bundlePrice: 170,
        savings: 35,
        badge: 'Chai Lover Favorite',
        gradient: 'from-amber-700 to-orange-800',
        keywordMatch: ['milk', 'sugar']
    },
    {
        id: 'midnight-comfort-snack',
        title: 'Midnight Munchies Quick Pack',
        tagline: 'Quick Craving Buster',
        cookTime: '5 Mins',
        itemsDescription: 'Maggi 2-Min Noodles (4-Pack) + Cold Drink (1.5L) + Cheese (200g)',
        originalPrice: 201,
        bundlePrice: 171,
        savings: 30,
        badge: 'Late Night Craving',
        gradient: 'from-indigo-700 to-purple-900',
        keywordMatch: ['maggi', 'coca', 'pepsi', 'sprite']
    }
];

const RecipeBundles = () => {
    const { products, addMultipleToCart, currency } = useAppContext();

    const handleAddKit = (kit) => {
        const matchedItemIds = [];
        kit.keywordMatch.forEach(kw => {
            const found = products.find(p => 
                p.name.toLowerCase().includes(kw) || 
                p.category.toLowerCase().includes(kw)
            );
            if (found) {
                matchedItemIds.push(found._id);
            }
        });

        if (matchedItemIds.length === 0 && products.length > 0) {
            matchedItemIds.push(...products.slice(0, 3).map(p => p._id));
        }

        addMultipleToCart(matchedItemIds);
    };

    return (
        <section className="my-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                            1-Click Recipe Kits & Smart Meal Bundles
                        </h2>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                            SAVE UP TO ₹60
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                        All fresh ingredients delivered in 10 minutes. Zero grocery prep hassle!
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MEAL_KITS.map((kit) => (
                    <div
                        key={kit.id}
                        className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between group"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-100">
                                    {kit.badge}
                                </span>
                                <span className="text-gray-400 text-[11px] font-semibold flex items-center gap-1">
                                    <HiClock className="text-amber-500 text-xs" />
                                    <span>{kit.cookTime}</span>
                                </span>
                            </div>

                            <div className={`p-4 rounded-2xl bg-gradient-to-r ${kit.gradient} text-white mb-3 shadow-xs`}>
                                <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                                    {kit.title}
                                </h3>
                                <p className="text-[11px] text-white/80 mt-0.5">
                                    {kit.tagline}
                                </p>
                            </div>

                            <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                {kit.itemsDescription}
                            </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-gray-100">
                            <div className="flex items-baseline justify-between mb-3">
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-lg font-black text-gray-900">
                                        {currency}{kit.bundlePrice}
                                    </span>
                                    <span className="text-xs text-gray-400 line-through">
                                        {currency}{kit.originalPrice}
                                    </span>
                                </div>
                                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                    Save {currency}{kit.savings}
                                </span>
                            </div>

                            <button
                                onClick={() => handleAddKit(kit)}
                                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <HiShoppingBag className="w-4 h-4" />
                                <span>Add All Ingredients</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecipeBundles;
