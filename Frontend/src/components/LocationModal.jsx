import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { HiBolt, HiMapPin, HiBuildingStorefront, HiArrowRight, HiXMark } from 'react-icons/hi2';
import { TbLoader2 } from 'react-icons/tb';

const popularLocations = [
    { city: "Boring Road, Patna", pincode: "800001", eta: "8 MINS" },
    { city: "Kankarbagh, Patna", pincode: "800020", eta: "10 MINS" },
    { city: "Connaught Place, New Delhi", pincode: "110001", eta: "9 MINS" },
    { city: "Indiranagar, Bengaluru", pincode: "560038", eta: "7 MINS" },
    { city: "Bandra West, Mumbai", pincode: "400050", eta: "10 MINS" },
    { city: "Sector 18, Noida", pincode: "201301", eta: "9 MINS" },
];

const LocationModal = () => {
    const { 
        showLocationModal, 
        setShowLocationModal, 
        deliveryLocation, 
        setDeliveryLocation,
        detectCurrentLocation,
        isDetectingLocation
    } = useAppContext();

    const [customCity, setCustomCity] = useState("");
    const [customPincode, setCustomPincode] = useState("");

    if (!showLocationModal) return null;

    const handleSelectLocation = (loc) => {
        setDeliveryLocation({
            city: loc.city,
            pincode: loc.pincode,
            label: "Selected Hub",
            eta: loc.eta || "10 MINS"
        });
        setShowLocationModal(false);
    };

    const handleCustomSubmit = (e) => {
        e.preventDefault();
        if (customCity.trim()) {
            setDeliveryLocation({
                city: customCity.trim(),
                pincode: customPincode.trim() || "800001",
                label: "Custom Address",
                eta: "9 MINS"
            });
            setShowLocationModal(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                onClick={() => setShowLocationModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Card */}
            <div className="relative bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                        <h3 className="text-lg font-extrabold text-gray-900">Delivery Location & PIN</h3>
                        <p className="text-xs text-gray-500">Select address for 10-minute grocery delivery</p>
                    </div>
                    <button 
                        onClick={() => setShowLocationModal(false)}
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full cursor-pointer text-lg leading-none"
                    >
                        <HiXMark className="text-xl" />
                    </button>
                </div>

                {/* Detect GPS Current Location Button */}
                <div className="mt-4">
                    <button
                        onClick={detectCurrentLocation}
                        disabled={isDetectingLocation}
                        className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white p-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg">
                                {isDetectingLocation ? (
                                    <TbLoader2 className="animate-spin text-lg" />
                                ) : (
                                    <HiMapPin className="text-lg" />
                                )}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="font-extrabold text-sm">
                                    {isDetectingLocation ? "Detecting GPS Location & PIN..." : "Use Current Location (GPS)"}
                                </span>
                                <span className="text-[11px] text-emerald-100">
                                    Auto-detect live locality & PIN code for instant delivery
                                </span>
                            </div>
                        </div>
                        <HiArrowRight className="text-base font-bold opacity-80" />
                    </button>
                </div>

                <div className="relative flex py-4 items-center">
                    <div className="grow border-t border-gray-200"></div>
                    <span className="shrink mx-3 text-gray-400 text-xs font-semibold uppercase">Or search area / pincode</span>
                    <div className="grow border-t border-gray-200"></div>
                </div>

                {/* Custom Input */}
                <form onSubmit={handleCustomSubmit} className="space-y-3">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={customCity}
                            onChange={(e) => setCustomCity(e.target.value)}
                            placeholder="Type locality, area or 6-digit PIN code..."
                            className="flex-1 text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 outline-emerald-600"
                        />
                        <button
                            type="submit"
                            className="bg-gray-900 hover:bg-black text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
                        >
                            Set
                        </button>
                    </div>
                </form>

                {/* Quick Delivery Hubs */}
                <div className="mt-5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                        <HiBolt className="text-amber-500 text-sm" />
                        <span>Popular Dark Store Hubs (&lt; 10 Mins)</span>
                    </p>
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                        {popularLocations.map((loc, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleSelectLocation(loc)}
                                className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition ${
                                    deliveryLocation.city === loc.city 
                                        ? "border-emerald-600 bg-emerald-50/70 font-semibold text-emerald-950 shadow-2xs" 
                                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700"
                                }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <HiBuildingStorefront className="text-emerald-700 text-base" />
                                    <div>
                                        <p className="font-bold text-xs text-gray-900">{loc.city}</p>
                                        <p className="text-[11px] text-gray-500">PIN: {loc.pincode}</p>
                                    </div>
                                </div>
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-0.5">
                                    <HiBolt className="text-[10px]" />
                                    <span>{loc.eta}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;