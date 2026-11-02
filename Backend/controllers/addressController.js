import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Address data is required"
            });
        }
        await Address.create({ ...address, userId: req.userId });
        res.json({
            success: true,
            message: "Address added successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
