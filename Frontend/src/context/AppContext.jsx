import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || '';

// Create context
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
    
    // Quick-commerce additions
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);

    const [deliveryLocation, setDeliveryLocation] = useState(() => {
        const saved = localStorage.getItem('grocerin_location');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { /* ignore */ }
        }
        return {
            city: "Boring Road, Patna",
            pincode: "800001",
            label: "Home",
            eta: "9 MINS"
        };
    });

    // Detect GPS Current Location & Precise PIN Code
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
                    
                    // Layer 1: BigDataCloud Reverse Geocoding
                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = await response.json();

                    const neighborhood = data.locality || data.neighbourhood || data.suburb || data.city;
                    const city = data.city || data.principalSubdivision || "Nearby Hub";
                    const locationLabel = neighborhood ? `${neighborhood}, ${city}` : city;
                    let postcode = data.postcode || "";

                    // Layer 2: OSM Nominatim Fallback if PIN Code is missing
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
                            // silent fallback
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

    // Set custom location
    const updateLocation = (loc) => {
        setDeliveryLocation(loc);
        localStorage.setItem('grocerin_location', JSON.stringify(loc));
    };

    // Fetch Seller Status 
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            setIsSeller(!!data.success);
        } catch (error) {
            setIsSeller(false);
        }
    };

    // Fetch User Auth Status, User Data and Cart Items 
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

    // Fetch All Products (backed by Redis cache on backend)
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

    // Add Product to Cart
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

    // Update Cart Item Quantity
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
    
    // Remove Product from Cart
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

    // Clear whole cart
    const clearCart = () => {
        setCartItems({});
    };

    // Total count of items in cart
    const getCartCount = useMemo(() => {
        return () => {
            let totalCount = 0;
            for (const item in cartItems) {
                totalCount += cartItems[item] || 0;
            }
            return totalCount;
        };
    }, [cartItems]);

    // Total subtotal amount in cart
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

    // Initial load
    useEffect(() => {
        fetchUser();
        fetchSeller();
        fetchProducts();
    }, []);

    // Sync Cart Items to database for authenticated users
    useEffect(() => {
        const updateCart = async () => {
            try {
                await axios.post('/api/cart/update', { cartItems });
            } catch (error) {
                // Silently handle background sync errors
            }
        };

        if (user) {
            const timeoutId = setTimeout(updateCart, 400);
            return () => clearTimeout(timeoutId);
        }
    }, [cartItems, user]);

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
        isDetectingLocation
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