import {
    useEffect,
    useState
} from 'react';
import { useAppContext } from '../context/AppContext';
import {
    Link,
    useParams
} from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from "../components/ProductCard";
import ProductReviews from "../components/ProductReviews";
import {
    HiBolt,
    HiSparkles,
    HiShoppingBag,
    HiArrowRight,
    HiStar
} from 'react-icons/hi2';

const ProductDetails = () => {
    const { products, navigate, currency, addToCart, removeFromCart, cartItems, setIsCartDrawerOpen } = useAppContext();
    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [id]);

    useEffect(() => {
        if (product && products.length > 0) {
            const related = products.filter(
                (item) => item.category === product.category && item._id !== product._id
            );
            setRelatedProducts(related.slice(0, 5));
        }
    }, [products, product]);

    useEffect(() => {
        if (product?.image?.length > 0) {
            setThumbnail(product.image[0]);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <h3 className="text-xl font-bold text-gray-800">Product not found</h3>
                <Link to="/product" className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold">
                    Browse All Products
                </Link>
            </div>
        );
    }

    const currentQty = cartItems[product._id] || 0;
    const discountPercent = product.price && product.offerPrice && product.price > product.offerPrice
        ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
        : null;

    return (
        <div className="py-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
                <Link to="/" className="hover:text-emerald-700">Home</Link>
                <span>/</span>
                <Link to="/product" className="hover:text-emerald-700">Groceries</Link>
                <span>/</span>
                <Link to={`/products/${product.category.toLowerCase()}`} className="hover:text-emerald-700">
                    {product.category}
                </Link>
                <span>/</span>
                <span className="font-semibold text-gray-700 truncate max-w-xs">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xs">
                <div className="md:col-span-5 flex flex-col-reverse sm:flex-row gap-4 items-center sm:items-start">
                    {product.image?.length > 1 && (
                        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto no-scrollbar shrink-0">
                            {product.image.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setThumbnail(img)}
                                    className={`w-14 h-14 rounded-xl border p-1 bg-gray-50 overflow-hidden cursor-pointer transition ${
                                        thumbnail === img ? "border-emerald-600 ring-2 ring-emerald-100" : "border-gray-200 hover:border-gray-300"
                                    }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="relative w-full aspect-square bg-gray-50/70 rounded-2xl border border-gray-100 flex items-center justify-center p-6 overflow-hidden">
                        <img
                            src={thumbnail || product.image?.[0] || assets.logo}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                        {discountPercent && (
                            <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-xs">
                                {discountPercent}% OFF
                            </span>
                        )}
                    </div>
                </div>

                <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                                <HiBolt className="text-xs text-amber-600" />
                                <span>Delivery in 10 mins</span>
                            </span>
                            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center bg-emerald-50 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-md gap-1">
                                <span>{product.rating || "4.8"}</span>
                                <HiStar className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            </div>
                            <span className="text-xs text-gray-400">({product.numReviews || 128} Customer Reviews)</span>
                        </div>

                        <div className="mt-5 p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-baseline gap-3">
                            <span className="text-3xl font-black text-gray-900">
                                {currency}{product.offerPrice || product.price}
                            </span>
                            {product.price > product.offerPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                    MRP: {currency}{product.price}
                                </span>
                            )}
                            <span className="text-xs text-gray-500 font-medium ml-auto">
                                (Inclusive of all taxes)
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-semibold text-gray-700">
                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                                <HiSparkles className="text-emerald-700 text-sm" />
                                <span>100% Quality Guarantee</span>
                            </div>
                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
                                <HiBolt className="text-amber-500 text-sm" />
                                <span>Superfast Dark Store Dispatch</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm font-bold text-gray-900 mb-2">Product Information</h3>
                            <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
                                {product.description?.map((desc, idx) => (
                                    <li key={idx}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                        {currentQty === 0 ? (
                            <button
                                onClick={() => addToCart(product._id)}
                                className="flex-1 py-3.5 bg-white border-2 border-emerald-700 text-emerald-800 hover:bg-emerald-50 rounded-2xl font-bold text-sm transition cursor-pointer shadow-xs active:scale-[0.99] flex items-center justify-center gap-1.5"
                            >
                                <HiShoppingBag className="text-base" />
                                <span>Add to Cart</span>
                            </button>
                        ) : (
                            <div className="flex items-center justify-between border-2 border-emerald-700 bg-emerald-700 text-white rounded-2xl px-4 py-2 text-sm font-bold w-44">
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-emerald-800 rounded-lg text-lg cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="text-base">{currentQty} in Cart</span>
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-emerald-800 rounded-lg text-lg cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                if (currentQty === 0) addToCart(product._id);
                                setIsCartDrawerOpen(true);
                            }}
                            className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm transition cursor-pointer shadow-md active:scale-[0.99] flex items-center justify-center gap-1.5"
                        >
                            <span>Quick Checkout</span>
                            <HiArrowRight className="text-base" />
                        </button>
                    </div>
                </div>
            </div>

            <ProductReviews product={product} />

            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                            Similar in {product.category}
                        </h2>
                        <Link 
                            to={`/products/${product.category.toLowerCase()}`}
                            className="text-xs font-bold text-emerald-800 hover:underline"
                        >
                            View All &rarr;
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
