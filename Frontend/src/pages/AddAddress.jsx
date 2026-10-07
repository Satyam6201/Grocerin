import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
    HiBolt,
    HiMapPin,
    HiHome,
    HiBriefcase,
    HiUserGroup,
    HiTruck,
    HiArrowRight,
    HiArrowLeft,
    HiCheckCircle
} from 'react-icons/hi2';
import { TbLoader2 } from 'react-icons/tb';

const ADDRESS_TAGS = [
    { label: "Home", icon: HiHome },
    { label: "Work", icon: HiBriefcase },
    { label: "Friends & Family", icon: HiUserGroup },
    { label: "Other", icon: HiMapPin }
];

const AddAddress = () => {
    const { axios, user, navigate, setDeliveryLocation } = useAppContext();

    const [addressTag, setAddressTag] = useState("Home");
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [loadingSaved, setLoadingSaved] = useState(false);
    const [isDetectingGPS, setIsDetectingGPS] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [gpsCoordinates, setGpsCoordinates] = useState(null);

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: 'India',
        phone: '',
    });

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        if (user) {
            const nameParts = (user.name || '').trim().split(' ');
            setAddress(prev => ({
                ...prev,
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || nameParts[0] || '',
                email: user.email || ''
            }));
            fetchSavedAddresses();
        } else {
            navigate('/cart');
        }
    }, [user]);

    const fetchSavedAddresses = async () => {
        try {
            setLoadingSaved(true);
            const { data } = await axios.get('/api/address/get');
            if (data.success) {
                setSavedAddresses(data.addresses || []);
            }
        } catch (error) {
            console.error("Fetch addresses error:", error);
        } finally {
            setLoadingSaved(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDetectCurrentLocation = () => {
        if (!navigator.geolocation) {
            return toast.error("Geolocation is not supported by your browser");
        }

        setIsDetectingGPS(true);
        toast.loading("Pinpointing GPS location & PIN code...", { id: "gps-fill" });

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    setGpsCoordinates({ latitude, longitude });

                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = await response.json();

                    const neighborhood = data.locality || data.neighbourhood || data.suburb || "";
                    const streetName = data.localityInfo?.administrative?.[3]?.name || neighborhood;
                    const city = data.city || data.principalSubdivision || "";
                    const state = data.principalSubdivision || "";
                    let postcode = data.postcode || "";
                    const country = data.countryName || "India";

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

                    setAddress(prev => ({
                        ...prev,
                        street: streetName ? `${streetName}, ${neighborhood}` : neighborhood || prev.street,
                        city: city || prev.city,
                        state: state || prev.state,
                        zipcode: Number(postcode),
                        country: country || prev.country
                    }));

                    const displayCity = neighborhood ? `${neighborhood}, ${city}` : city;
                    if (displayCity) {
                        setDeliveryLocation({
                            city: displayCity,
                            pincode: postcode,
                            label: "GPS Address",
                            eta: "8 MINS"
                        });
                    }

                    toast.success(`Address & PIN code (${postcode}) auto-filled!`, { id: "gps-fill" });
                } catch (err) {
                    toast.error("Could not fetch address details from GPS coordinates", { id: "gps-fill" });
                } finally {
                    setIsDetectingGPS(false);
                }
            },
            (error) => {
                setIsDetectingGPS(false);
                if (error.code === error.PERMISSION_DENIED) {
                    toast.error("GPS permission denied. Please fill in the address manually.", { id: "gps-fill" });
                } else {
                    toast.error("Unable to retrieve location via GPS.", { id: "gps-fill" });
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
        );
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            const { data } = await axios.post('/api/address/add', { address });
            if (data.success) {
                toast.success("Delivery address saved successfully!");
                navigate('/cart');
            } else {
                toast.error(data.message || "Failed to save address");
            }
        } catch (error) {
            toast.error(error.message || "Server error");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="py-8 max-w-6xl mx-auto min-h-screen">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                        Delivery Addresses
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                        Save addresses for 10-minute instant grocery drop-offs
                    </p>
                </div>
                <Link
                    to="/cart"
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 self-start sm:self-auto"
                >
                    <HiArrowLeft className="text-sm" />
                    <span>Back to Cart</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
                
                
                <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xs space-y-6">
                    
                    
                    <div className="relative overflow-hidden bg-linear-to-r from-emerald-700 to-teal-800 text-white rounded-2xl p-4 md:p-5 shadow-sm">
                        
                        {isDetectingGPS && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <div className="w-16 h-16 rounded-full border-2 border-emerald-300/60 animate-ping absolute -top-8 -left-8" />
                                <div className="w-24 h-24 rounded-full border border-emerald-200/40 animate-pulse absolute -top-12 -left-12" />
                            </div>
                        )}

                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3.5">
                                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shrink-0 shadow-inner">
                                    {isDetectingGPS ? (
                                        <TbLoader2 className="animate-spin text-2xl text-white" />
                                    ) : (
                                        <HiMapPin className="text-2xl text-white" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-sm md:text-base leading-tight">
                                        Use Current Location (GPS)
                                    </h3>
                                    <p className="text-xs text-emerald-100 mt-0.5">
                                        {gpsCoordinates 
                                            ? `Lat: ${gpsCoordinates.latitude.toFixed(4)}, Long: ${gpsCoordinates.longitude.toFixed(4)} • PIN: ${address.zipcode || 'Detected'}` 
                                            : "Auto-detect locality, city, state & 6-digit PIN code"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleDetectCurrentLocation}
                                disabled={isDetectingGPS}
                                className="bg-white hover:bg-emerald-50 active:scale-95 text-emerald-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto disabled:opacity-80 flex items-center gap-1.5"
                            >
                                <HiBolt className="text-amber-500 text-sm" />
                                <span>{isDetectingGPS ? "Pinpointing..." : "Auto-Detect & Fill"}</span>
                            </button>
                        </div>
                    </div>

                    
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                            Save Address As:
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {ADDRESS_TAGS.map((tag) => {
                                const IconComponent = tag.icon;
                                return (
                                    <button
                                        key={tag.label}
                                        type="button"
                                        onClick={() => setAddressTag(tag.label)}
                                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                                            addressTag === tag.label
                                                ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                                                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                                        }`}
                                    >
                                        <IconComponent className="text-sm" />
                                        <span>{tag.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    
                    <form onSubmit={onSubmitHandler} className="space-y-4 text-xs md:text-sm">
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    required
                                    name="firstName"
                                    value={address.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    name="lastName"
                                    value={address.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                            </div>
                        </div>

                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    name="email"
                                    value={address.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-700">Delivery Mobile Phone</label>
                                <input
                                    type="tel"
                                    required
                                    name="phone"
                                    value={address.phone}
                                    onChange={handleChange}
                                    placeholder="10-digit mobile number"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                            </div>
                        </div>

                        
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-gray-700">
                                House / Flat No., Building & Street Address
                            </label>
                            <input
                                type="text"
                                required
                                name="street"
                                value={address.street}
                                onChange={handleChange}
                                placeholder="e.g. Flat 301, Shanti Niketan, Boring Canal Road"
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                            />
                        </div>

                        
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-700">City / District</label>
                                <input
                                    type="text"
                                    required
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                    placeholder="e.g. Patna"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-700">State</label>
                                <input
                                    type="text"
                                    required
                                    name="state"
                                    value={address.state}
                                    onChange={handleChange}
                                    placeholder="e.g. Bihar"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                            </div>
                        </div>

                        
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="block text-xs font-bold text-gray-700">Postal / PIN Code</label>
                                    {address.zipcode && (
                                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                                            <HiCheckCircle className="text-xs" />
                                            <span>Valid PIN</span>
                                        </span>
                                    )}
                                </div>
                                <input
                                    type="number"
                                    required
                                    name="zipcode"
                                    value={address.zipcode}
                                    onChange={handleChange}
                                    placeholder="e.g. 800001"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition font-semibold"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-bold text-gray-700">Country</label>
                                <input
                                    type="text"
                                    required
                                    name="country"
                                    value={address.country}
                                    onChange={handleChange}
                                    placeholder="India"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                            </div>
                        </div>

                        
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                        >
                            {isSaving ? (
                                <span className="flex items-center gap-2">
                                    <TbLoader2 className="animate-spin text-base" />
                                    <span>Saving Address...</span>
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <span>Save Delivery Address & Proceed</span>
                                    <HiArrowRight className="text-sm" />
                                </span>
                            )}
                        </button>
                    </form>
                </div>

                
                <div className="lg:col-span-5 space-y-4">
                    
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                            <h3 className="font-extrabold text-sm text-gray-900">Your Saved Addresses</h3>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {savedAddresses.length} Saved
                            </span>
                        </div>

                        {loadingSaved ? (
                            <div className="space-y-3">
                                <div className="h-20 bg-gray-100 rounded-xl shimmer-wrapper" />
                                <div className="h-20 bg-gray-100 rounded-xl shimmer-wrapper" />
                            </div>
                        ) : savedAddresses.length === 0 ? (
                            <div className="text-center py-8 text-xs text-gray-400">
                                <HiMapPin className="text-3xl text-gray-300 mx-auto mb-2" />
                                No addresses saved yet. Use the GPS auto-fill or form to add your first delivery location.
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                                {savedAddresses.map((addr, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3.5 rounded-2xl border border-gray-100 hover:border-emerald-600 hover:bg-emerald-50/40 transition text-xs space-y-1"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-extrabold text-gray-900">
                                                {addr.firstName} {addr.lastName}
                                            </span>
                                            <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">
                                                Saved #{idx + 1}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">{addr.street}, {addr.city}</p>
                                        <p className="text-gray-500">{addr.state} - {addr.zipcode}</p>
                                        <p className="text-emerald-800 font-semibold">Phone: {addr.phone}</p>
                                        
                                        <button
                                            onClick={() => {
                                                setDeliveryLocation({
                                                    city: `${addr.street}, ${addr.city}`,
                                                    pincode: String(addr.zipcode),
                                                    label: "Selected Address",
                                                    eta: "9 MINS"
                                                });
                                                toast.success("Delivery address selected!");
                                                navigate('/cart');
                                            }}
                                            className="mt-2 w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] rounded-xl transition cursor-pointer flex items-center justify-center gap-1"
                                        >
                                            <span>Deliver Here</span>
                                            <HiArrowRight className="text-xs" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-5 text-xs text-emerald-900 space-y-2">
                        <div className="flex items-center gap-2 font-black text-sm">
                            <HiTruck className="text-emerald-700 text-base" />
                            <span>10-Minute Dark Store Fulfillment</span>
                        </div>
                        <p className="text-emerald-700 text-[11px] leading-relaxed">
                            Grocerin delivers direct from cold-chain dark stores located within 5 km of your GPS coordinates, keeping produce crisp and ice-creams cold!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAddress;
