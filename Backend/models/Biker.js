import mongoose from "mongoose";

const bikerSchema = new mongoose.Schema({
    bikerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    vehicleType: { type: String, default: "Electric Scooter (Zero Emission)" },
    vehicleNumber: { type: String, required: true },
    status: { type: String, enum: ["Available", "On Delivery", "Offline"], default: "Available" },
    batteryLevel: { type: Number, default: 88 },
    rating: { type: Number, default: 4.9 },
    completedDeliveries: { type: Number, default: 12 },
    hubId: { type: String, default: "PATNA-HUB-102" },
    activeOrderId: { type: String, default: null }
}, { timestamps: true });

const Biker = mongoose.models.biker || mongoose.model("biker", bikerSchema);

export default Biker;
