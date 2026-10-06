import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || '';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || '₹';

    const navigate = useNavigate();
    const [user, setuser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);

    const [deliveryLocation, setDeliveryLocation] = useState(() => {
        const saved = localStorage.getItem('grocerin_location');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) {}
        }
        return {
            city: "Boring Road, Patna",
            pincode: "800001",
            label: "Home",
            eta: "9 MINS"
        };
    });

    const detectCurrentLocation = async () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        setIsDetectingLocation(true);
        toast.loading("Detecting your location & PIN code via GPS...", { id: "gps-detect" });

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    
                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = await response.json();

                    const neighborhood = data.locality || data.neighbourhood || data.suburb || data.city;
                    const city = data.city || data.principalSubdivision || "Nearby Hub";
                    const locationLabel = neighborhood ? `${neighborhood}, ${city}` : city;
                    let postcode = data.postcode || "";

                    if (!postcode || postcode.length < 5) {
                        try {
                            const nomRes = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
                            );
                            const nomData = await nomRes.json();
                            if (nomData.address?.postcode) {
                                postcode = nomData.address.postcode;
                            } else if (nomData.display_name) {
                                const pinMatch = nomData.display_name.match(/\b\d{6}\b/);
                                if (pinMatch) postcode = pinMatch[0];
                            }
                        } catch (e) {
                        }
                    }

                    if (!postcode) postcode = "800001";

                    const newLocation = {
                        city: locationLabel,
                        pincode: postcode,
                        label: "Current GPS Location",
                        eta: "8 MINS"
                    };

                    setDeliveryLocation(newLocation);
                    localStorage.setItem('grocerin_location', JSON.stringify(newLocation));
                    toast.success(`Delivering to: ${locationLabel} (PIN: ${postcode})`, { id: "gps-detect" });
                    setShowLocationModal(false);
                } catch (err) {
                    toast.error("Could not fetch address details from GPS coordinates", { id: "gps-detect" });
                } finally {
                    setIsDetectingLocation(false);
                }
            },
            (error) => {
                setIsDetectingLocation(false);
                if (error.code === error.PERMISSION_DENIED) {
                    toast.error("Location permission denied. Please choose your area manually.", { id: "gps-detect" });
                } else {
                    toast.error("Unable to retrieve GPS location.", { id: "gps-detect" });
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
    };

    const updateLocation = (loc) => {
        setDeliveryLocation(loc);
        localStorage.setItem('grocerin_location', JSON.stringify(loc));
    };

    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            setIsSeller(!!data.success);
        } catch (error) {
            setIsSeller(false);
        }
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');
            if (data.success && data.user) {
                setuser(data.user);
                if (data.user.cartItems && Object.keys(data.user.cartItems).length > 0) {
                    setCartItems(data.user.cartItems);
                }
            }
        } catch (error) {
            setuser(null);
        }
    };

    const fetchProducts = async (filters = {}) => {
        try {
            setLoadingProducts(true);
            const params = new URLSearchParams(filters).toString();
            const url = params ? `/api/product/list?${params}` : '/api/product/list';
            const { data } = await axios.get(url);
            if (data.success) {
                setProducts(data.products || []);
            } else {
                toast.error(data.message || "Failed to load products");
            }
        } catch (error) {
            console.error("Fetch products error:", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const addToCart = (itemId) => {
        setCartItems(prev => {
            const updated = { ...prev };
            updated[itemId] = (updated[itemId] || 0) + 1;
            return updated;
        });
        toast.success("Added to cart", {
            duration: 1500,
            style: { borderRadius: '10px', background: '#333', color: '#fff' }
        });
    };

    const updateCartItem = (itemId, quantity) => {
        setCartItems(prev => {
            const updated = { ...prev };
            if (quantity <= 0) {
                delete updated[itemId];
            } else {
                updated[itemId] = quantity;
            }
            return updated;
        });
    };
    
    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const updated = { ...prev };
            if (updated[itemId] > 1) {
                updated[itemId] -= 1;
            } else {
                delete updated[itemId];
            }
            return updated;
        });
    };

    const clearCart = () => {
        setCartItems({});
    };

    const getCartCount = useMemo(() => {
        return () => {
            let totalCount = 0;
            for (const item in cartItems) {
                totalCount += cartItems[item] || 0;
            }
            return totalCount;
        };
    }, [cartItems]);

    const getCartAmount = useMemo(() => {
        return () => {
            let totalAmount = 0;
            for (const itemId in cartItems) {
                const product = products.find(p => p._id === itemId);
                if (product && cartItems[itemId] > 0) {
                    totalAmount += (product.offerPrice || product.price || 0) * cartItems[itemId];
                }
            }
            return Math.round(totalAmount * 100) / 100;
        };
    }, [cartItems, products]);

    useEffect(() => {
        fetchUser();
        fetchSeller();
        fetchProducts();
    }, []);

    useEffect(() => {
        const updateCart = async () => {
            try {
                await axios.post('/api/cart/update', { cartItems });
            } catch (error) {
            }
        };

        if (user) {
            const timeoutId = setTimeout(updateCart, 400);
            return () => clearTimeout(timeoutId);
        }
    }, [cartItems, user]);

    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [showSdeModal, setShowSdeModal] = useState(false);
    const [showLiveTrackingModal, setShowLiveTrackingModal] = useState(false);
    const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
    const [showScratchCardModal, setShowScratchCardModal] = useState(false);

    const applyCoupon = async (code) => {
        try {
            const rawAmount = getCartAmount();
            const { data } = await axios.post('/api/order/coupon', {
                code,
                cartTotal: rawAmount
            });

            if (data.success) {
                setAppliedCoupon({
                    code: data.code,
                    discount: data.discount || 0,
                    freeDelivery: !!data.freeDelivery,
                    message: data.message
                });
                
                try {
                    const confetti = (await import('canvas-confetti')).default;
                    confetti({
                        particleCount: 80,
                        spread: 70,
                        origin: { y: 0.7 }
                    });
                } catch (e) {}

                toast.success(data.message, { icon: '🎉' });
                return { success: true, message: data.message };
            } else {
                toast.error(data.message || "Invalid coupon code");
                return { success: false, message: data.message };
            }
        } catch (error) {
            toast.error(error.message || "Failed to apply coupon");
            return { success: false, message: error.message };
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        toast("Coupon removed", { icon: 'ℹ️' });
    };

    const addMultipleToCart = (itemIds = []) => {
        setCartItems(prev => {
            const updated = { ...prev };
            itemIds.forEach(id => {
                updated[id] = (updated[id] || 0) + 1;
            });
            return updated;
        });
        
        try {
            import('canvas-confetti').then(module => {
                module.default({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.8 }
                });
            });
        } catch (e) {}

        toast.success(`Added ${itemIds.length} items to cart!`, { icon: '🍲' });
        setIsCartDrawerOpen(true);
    };

    const reorderBasket = (items = []) => {
        if (!items || items.length === 0) return;
        setCartItems(prev => {
            const updated = { ...prev };
            items.forEach(item => {
                const pId = item.product?._id || item.product;
                if (pId) {
                    updated[pId] = (updated[pId] || 0) + (item.quantity || 1);
                }
            });
            return updated;
        });
        toast.success("All items added back to your cart!", { icon: '🛒' });
        setIsCartDrawerOpen(true);
    };

    const value = {
        navigate, 
        user, 
        setuser, 
        setIsSeller, 
        isSeller, 
        showUserLogin, 
        setShowUserLogin,
        products,
        loadingProducts,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        cartItems,
        setCartItems,
        searchQuery,
        setSearchQuery, 
        getCartAmount,
        getCartCount,
        axios,
        fetchProducts,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        showLocationModal,
        setShowLocationModal,
        deliveryLocation,
        setDeliveryLocation: updateLocation,
        detectCurrentLocation,
        isDetectingLocation,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        showSdeModal,
        setShowSdeModal,
        showLiveTrackingModal,
        setShowLiveTrackingModal,
        activeTrackingOrder,
        setActiveTrackingOrder,
        showScratchCardModal,
        setShowScratchCardModal,
        addMultipleToCart,
        reorderBasket
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
