import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        const validEmail = (process.env.SELLER_EMAIL || "").trim().toLowerCase();
        const validPassword = process.env.SELLER_PASSWORD;

        if (password === validPassword && email.trim().toLowerCase() === validEmail) {
            const token = jwt.sign({ email: validEmail }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ success: true, message: "Logged In" });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const isSellerAuth = async (req, res) => {
    try {
        if (req.seller) {
            return res.json({ success: true });
        } else {
            return res.json({ success: false });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({
            success: true,
            message: "Logged Out",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
