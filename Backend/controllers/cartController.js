import User from "../models/User.js";


export const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body;
        await User.findByIdAndUpdate(req.userId, {cartItems}, { new: true });
        res.json({
            success: true,
            message: "Cart Updated"
        })
    } catch (error) {
        console.log(error.message);

        res.json({
                success: false,
                message: error.message,
        });
    }
}
