import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "user" },
    items: [{
        product: { type: String, required: true, ref: "product" },
        quantity: { type: Number, required: true }
    }],
    amount: { type: Number, required: true },
    address: { type: String, required: true, ref: "address" },
    status: { type: String, default: "Order Placed" },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    bikerId: { type: String, default: "BIKER-101" },
    bikerName: { type: String, default: "Vikram Rathore" },
    bikerPhone: { type: String, default: "+91 98351 22890" },
    bikerVehicle: { type: String, default: "EV Hero Splendor #BR-01-EA-9021" },
    deliveryOtp: { type: String, default: () => Math.floor(1000 + Math.random() * 9000).toString() },
    bikerStatus: { type: String, default: "Assigned" },
    cancelledReason: { type: String, default: "" }
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;
