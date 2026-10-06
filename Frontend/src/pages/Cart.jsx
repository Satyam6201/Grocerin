import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { 
    HiShoppingBag, 
    HiBolt, 
    HiTruck, 
    HiBanknotes, 
    HiCreditCard, 
    HiPhone, 
    HiArrowRight,
    HiMapPin,
    HiSparkles 
} from "react-icons/hi2";
import { TbLoader2 } from "react-icons/tb";

const Cart = () => {
    const {
        products,
        currency,
        getCartAmount,
        getCartCount,
        navigate, 
        updateCartItem,
        removeFromCart,
        addToCart,
        cartItems,
        axios,
        user,
        setCartItems,
        setShowUserLogin,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        setShowScratchCardModal
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [couponInput, setCouponInput] = useState("");
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            if (cartItems[key] > 0) {
                const product = products.find((item) => item._id === key);
                if (product) {
                    tempArray.push({
                        ...product,
                        quantity: cartItems[key]
                    });
                }
            }
        }
        setCartArray(tempArray);
    };

    const getUserAddress = async () => {
        try {
            const { data } = await axios.get('/api/address/get');
            if (data.success) {
                setAddresses(data.addresses || []);
                if (data.addresses && data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            }
        } catch (error) {
        }
    };

    const itemTotal = getCartAmount();
    const deliveryFee = (itemTotal >= 199 || itemTotal === 0 || appliedCoupon?.freeDelivery) ? 0 : 25;
    const taxCharge = Math.round(itemTotal * 0.02);
    const couponDiscount = appliedCoupon ? Math.min(appliedCoupon.discount, itemTotal) : 0;
    const grandTotal = Math.max(0, itemTotal + deliveryFee + taxCharge - couponDiscount);

    const handleApplyPromo = async (code) => {
        const target = code || couponInput;
        if (!target.trim()) return;
        setIsApplyingCoupon(true);
        await applyCoupon(target.trim());
        setIsApplyingCoupon(false);
        setCouponInput("");
    };

    const placeOrder = async () => {
        if (!user) {
            setShowUserLogin(true);
            return toast.error("Please login to place your order");
        }

        if (cartArray.length === 0) {
            return toast.error("Your cart is empty");
        }

        if (!selectedAddress) {
            return toast.error("Please select or add a delivery address");
        }

        try {
            setIsPlacingOrder(true);

            if (paymentOption === "COD") {
                const { data } = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: cartArray.map(item => ({
                        product: item._id, 
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id
                });

                if (data.success) {
                    toast.success("Order Placed Successfully! Arriving in 10 mins");
                    setCartItems({});
                    navigate('/my-orders');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post('/api/order/stripe', {
                    userId: user._id,
                    items: cartArray.map(item => ({
                        product: item._id, 
                        quantity: item.quantity
                    })),
                    address: selectedAddress._id
                });

                if (data.success && data.url) {
                    setCartItems({});
                    window.location.replace(data.url);
                } else {
                    toast.error(data.message || "Stripe checkout session failed");
                }
            }
        } catch (error) {
            toast.error(error.message || "Failed to place order");
        } finally {
            setIsPlacingOrder(false);
        }
    };

    useEffect(() => {
        if (products.length > 0) {
            getCart();
        }
    }, [products, cartItems]);

    useEffect(() => {
        if (user) {
            getUserAddress();
        }
    }, [user]);

    if (cartArray.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[65vh] text-center py-16">
                <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-4xl mb-4">
                    <HiShoppingBag className="text-5xl text-emerald-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">Your cart is empty</h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-sm">
                    Looks like you haven't added anything yet. Choose from fresh groceries and get them delivered in 10 minutes!
                </p>
                <Link
                    to="/product"
                    className="mt-6 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                    <span>Start Shopping</span>
                    <HiArrowRight className="text-sm" />
                </Link>
            </div>
        );
    }

    return (
        <div className="py-8 max-w-6xl mx-auto">
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                        <HiBolt className="text-xl text-amber-300" />
                    </div>
                    <div>
                        <h3 className="font-extrabold text-sm md:text-base text-emerald-950">
                            Superfast Delivery in 9-11 Mins
                        </h3>
                        <p className="text-xs text-emerald-800">
                            Shipment from nearest Grocerin Dark Store
                        </p>
                    </div>
                </div>
                <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {getCartCount()} items
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                
                <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Items in Cart</h2>
                        <Link to="/product" className="text-xs font-bold text-emerald-700 hover:underline">
                            + Add more items
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {cartArray.map((product) => (
                            <div key={product._id} className="py-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                    <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 p-1 shrink-0">
                                        <img 
                                            src={product.image?.[0] || assets.logo} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-xs md:text-sm font-bold text-gray-900 truncate">
                                            {product.name}
                                        </h4>
                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                            {product.category}
                                        </p>
                                        <span className="text-xs font-extrabold text-gray-900 block mt-1">
                                            {currency}{product.offerPrice || product.price}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    
                                    <div className="flex items-center bg-emerald-700 text-white rounded-lg px-1.5 py-0.5 font-bold text-xs">
                                        <button
                                            onClick={() => removeFromCart(product._id)}
                                            className="w-5 h-5 flex items-center justify-center hover:bg-emerald-800 rounded transition cursor-pointer"
                                        >
                                            -
                                        </button>
                                        <span className="w-5 text-center text-xs">{product.quantity}</span>
                                        <button
                                            onClick={() => addToCart(product._id)}
                                            className="w-5 h-5 flex items-center justify-center hover:bg-emerald-800 rounded transition cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <span className="text-xs md:text-sm font-bold text-gray-900 w-16 text-right">
                                        {currency}{(product.offerPrice || product.price) * product.quantity}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className="lg:col-span-5 space-y-4">
                    
                    
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Delivery Address
                            </span>
                            <button
                                onClick={() => setShowAddress(!showAddress)}
                                className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                            >
                                {selectedAddress ? "Change" : "+ Select"}
                            </button>
                        </div>

                        <div className="mt-3 relative">
                            {selectedAddress ? (
                                <div className="text-xs text-gray-700 space-y-1">
                                    <p className="font-bold text-gray-900">
                                        {selectedAddress.firstName} {selectedAddress.lastName}
                                    </p>
                                    <p>{selectedAddress.street}, {selectedAddress.city}</p>
                                    <p>{selectedAddress.state} - {selectedAddress.zipcode}</p>
                                    <p className="text-emerald-800 font-semibold flex items-center gap-1">
                                        <HiPhone className="text-emerald-700" />
                                        <span>{selectedAddress.phone}</span>
                                    </p>
                                </div>
                            ) : (
                                <div className="text-xs text-gray-400 py-2">
                                    No delivery address selected.
                                </div>
                            )}

                            
                            {showAddress && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-30 space-y-2">
                                    <p className="text-xs font-bold text-gray-700">Select an address:</p>
                                    {addresses.map((addr, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => {
                                                setSelectedAddress(addr);
                                                setShowAddress(false);
                                            }}
                                            className="p-2 border border-gray-100 hover:border-emerald-600 hover:bg-emerald-50/50 rounded-lg text-xs cursor-pointer"
                                        >
                                            <p className="font-bold">{addr.street}, {addr.city}</p>
                                            <p className="text-gray-500">{addr.phone}</p>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => navigate('/add-address')}
                                        className="w-full py-1.5 text-center text-xs font-bold text-emerald-700 border border-dashed border-emerald-300 rounded-lg hover:bg-emerald-50 cursor-pointer"
                                    >
                                        + Add New Address
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-3">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                            Payment Method
                        </span>
                        <div className="grid grid-cols-2 gap-3">
                            <label className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold cursor-pointer transition ${
                                paymentOption === "COD" 
                                    ? "border-emerald-600 bg-emerald-50/60 text-emerald-950" 
                                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={paymentOption === "COD"}
                                    onChange={(e) => setPaymentOption(e.target.value)}
                                    className="text-emerald-700"
                                />
                                <HiBanknotes className="text-base text-emerald-700" />
                                <span>Cash on Delivery</span>
                            </label>

                            <label className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold cursor-pointer transition ${
                                paymentOption === "Online" 
                                    ? "border-emerald-600 bg-emerald-50/60 text-emerald-950" 
                                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="Online"
                                    checked={paymentOption === "Online"}
                                    onChange={(e) => setPaymentOption(e.target.value)}
                                    className="text-emerald-700"
                                />
                                <HiCreditCard className="text-base text-emerald-700" />
                                <span>Pay Online (Card/UPI)</span>
                            </label>
                        </div>
                    </div>

                    {/* Promo Coupons Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                            <span className="flex items-center gap-1.5">
                                <HiSparkles className="text-amber-500 text-sm" />
                                <span>Coupons & Bank Offers</span>
                            </span>
                            <button
                                onClick={() => setShowScratchCardModal(true)}
                                className="text-[11px] text-amber-700 hover:underline font-extrabold cursor-pointer"
                            >
                                Scratch & Win
                            </button>
                        </div>

                        {appliedCoupon ? (
                            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                                <div>
                                    <p className="font-extrabold flex items-center gap-1.5">
                                        <span>Code: {appliedCoupon.code}</span>
                                        <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.2 rounded font-mono">APPLIED</span>
                                    </p>
                                    <p className="text-[11px] text-emerald-700 mt-0.5">{appliedCoupon.message}</p>
                                </div>
                                <button
                                    onClick={removeCoupon}
                                    className="text-rose-600 hover:text-rose-800 text-xs font-bold cursor-pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                        placeholder="Enter promo code (e.g. SUPERDEV)"
                                        className="flex-1 text-xs px-3.5 py-2 border border-gray-200 rounded-xl outline-emerald-600 uppercase font-mono font-bold"
                                    />
                                    <button
                                        onClick={() => handleApplyPromo()}
                                        disabled={!couponInput.trim() || isApplyingCoupon}
                                        className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                                    >
                                        {isApplyingCoupon ? "..." : "Apply"}
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                    {['SUPERDEV', 'GROCER100', 'GROCER250', 'FREEDEL'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => handleApplyPromo(c)}
                                            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer"
                                        >
                                            %{c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-2.5 text-xs text-gray-600">
                        <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">
                            Bill Details
                        </h3>
                        <div className="flex justify-between">
                            <span>Item Total</span>
                            <span className="font-semibold text-gray-900">{currency}{itemTotal}</span>
                        </div>
                        {couponDiscount > 0 && (
                            <div className="flex justify-between text-emerald-700 font-bold">
                                <span>Coupon Discount ({appliedCoupon?.code})</span>
                                <span>-{currency}{couponDiscount}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Delivery Fee (Orders over ₹199 free)</span>
                            <span className={deliveryFee === 0 ? "text-emerald-700 font-bold" : "font-semibold text-gray-900"}>
                                {deliveryFee === 0 ? "FREE" : `${currency}${deliveryFee}`}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Handling & Govt. Taxes (2%)</span>
                            <span className="font-semibold text-gray-900">{currency}{taxCharge}</span>
                        </div>
                        <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center text-sm font-black text-gray-900">
                            <span>Grand Total</span>
                            <span className="text-lg font-black text-emerald-800">{currency}{grandTotal}</span>
                        </div>
                    </div>

                    
                    <button
                        onClick={placeOrder}
                        disabled={isPlacingOrder}
                        className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                        {isPlacingOrder ? (
                            <span className="flex items-center gap-2">
                                <TbLoader2 className="animate-spin text-base" />
                                <span>Placing Order...</span>
                            </span>
                        ) : paymentOption === "COD" ? (
                            <span className="flex items-center gap-1.5">
                                <span>Place Order for {currency}{grandTotal}</span>
                                <HiArrowRight className="text-sm" />
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5">
                                <span>Proceed to Pay {currency}{grandTotal}</span>
                                <HiArrowRight className="text-sm" />
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
