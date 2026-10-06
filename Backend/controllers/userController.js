import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: 'Missing Details'
            });
        };

        const existingUser = await User.findOne({email});

        if (existingUser) 
            return res.json({
                success: false,
                message: 'User already exists',   
            });
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, password: hashedPassword
        })
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
                success: true,
                user: { email: user.email, name: user.name }
        });

    } catch (error) {
        console.log(error.message);

        res.json({
                success: false,
                message: error.message,
        });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) 
            return res.json({
                success: false,
                message: 'Email nad Password are required'
        });

        const user = await User.findOne({email});

        if (!user) {
            return res.json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) 
            return res.json({
                success: false,
                message: 'Invalid email or password'
            });
        
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
        );

        res.cookie('token', token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
        });

        return res.json({
                success: true,
                user: { email: user.email, name: user.name }
        });

    } catch (error) {
        console.log(error.message);

        res.json({
                success: false,
                message: error.message,
        });
    }
}

export const isAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        return res.json({ success: true, user });

    } catch (error) {
        console.log(error.message);

        res.json({
                success: false,
                message: error.message,
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({
                success: true,
                message: "Logged Out",
        });
        
    } catch (error) {
        console.log(error.message);

        res.json({
                success: false,
                message: error.message,
        });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({ success: false, message: "Email is required" });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.json({ success: false, message: "No account registered with this email" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetOtp = otp;
        user.resetOtpExpire = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        console.log(`[Grocerin Auth] Password Reset OTP for ${email}: ${otp}`);

        return res.json({
            success: true,
            message: "6-digit verification code generated",
            otp: otp
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.json({ success: false, message: error.message || "Failed to process request" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.json({ success: false, message: "Email, OTP, and new password are required" });
        }

        if (newPassword.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.resetOtp || user.resetOtp !== otp.trim()) {
            return res.json({ success: false, message: "Invalid verification code" });
        }

        if (new Date() > new Date(user.resetOtpExpire)) {
            return res.json({ success: false, message: "Verification code has expired. Please request a new one." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = null;
        user.resetOtpExpire = null;
        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            success: true,
            message: "Password reset successful! You are now logged in.",
            user: { email: user.email, name: user.name }
        });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.json({ success: false, message: error.message || "Password reset failed" });
    }
};
