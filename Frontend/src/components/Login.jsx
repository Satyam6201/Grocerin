import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { 
    HiXMark, 
    HiUser, 
    HiEnvelope, 
    HiLockClosed, 
    HiEye, 
    HiEyeSlash, 
    HiBolt, 
    HiGift, 
    HiShieldCheck, 
    HiArrowRight,
    HiSparkles,
    HiKey,
    HiCheck,
    HiArrowPath
} from 'react-icons/hi2';
import { TbLoader2 } from 'react-icons/tb';

const Login = () => {
    const { setShowUserLogin, setuser, axios, navigate } = useAppContext();
    const [state, setState] = useState("login"); // "login" | "register" | "forgot" | "reset"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpHint, setOtpHint] = useState(null);

    const activePassword = state === "reset" ? newPassword : password;
    const isUnlocked = showPassword || showNewPassword || activePassword.length >= 6;

    const getPasswordStrength = (pwd) => {
        if (!pwd) return 0;
        let score = 0;
        if (pwd.length >= 6) score += 1;
        if (pwd.length >= 8) score += 1;
        if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) score += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
        return score;
    };

    const strength = getPasswordStrength(state === "reset" ? newPassword : password);
    const strengthLabels = ["Too short", "Fair", "Good", "Strong"];
    const strengthColors = ["bg-rose-500", "bg-amber-500", "bg-blue-500", "bg-emerald-600"];

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            setIsSubmitting(true);
            const endpoint = state === "register" ? "/api/user/register" : "/api/user/login";
            const payload = state === "register" 
                ? { name, email, password } 
                : { email, password };

            const { data } = await axios.post(endpoint, payload);

            if (data.success) {
                toast.success(
                    state === "register" 
                        ? `Welcome to Grocerin, ${data.user?.name || 'User'}!` 
                        : `Welcome back, ${data.user?.name || 'User'}!`,
                    { duration: 3000 }
                );
                setuser(data.user);
                setShowUserLogin(false);
                navigate('/');
            } else {
                toast.error(data.message || "Authentication failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Network error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your registered email address");
            return;
        }

        try {
            setIsSubmitting(true);
            const { data } = await axios.post('/api/user/forgot-password', { email });
            if (data.success) {
                toast.success("Verification code sent to your email!");
                if (data.otp) {
                    setOtpHint(data.otp);
                    setOtp(data.otp); // Pre-fill for instant seamless developer testing
                }
                setState("reset");
            } else {
                toast.error(data.message || "Failed to find account");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Request failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!otp || otp.length < 4) {
            toast.error("Please enter the verification code");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setIsSubmitting(true);
            const { data } = await axios.post('/api/user/reset-password', {
                email,
                otp,
                newPassword
            });

            if (data.success) {
                toast.success("Password customized successfully! You are now logged in.", { duration: 4000 });
                setuser(data.user);
                setShowUserLogin(false);
                navigate('/');
            } else {
                toast.error(data.message || "Password reset failed");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Reset failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div 
            onClick={() => setShowUserLogin(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-[420px] overflow-hidden animate-in zoom-in-95 duration-250 max-h-[92vh] overflow-y-auto"
            >
                
                <button
                    onClick={() => setShowUserLogin(false)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center text-sm font-bold transition cursor-pointer"
                >
                    <HiXMark className="text-lg" />
                </button>

                
                <div className="bg-linear-to-b from-emerald-50 via-emerald-50/50 to-white pt-8 pb-4 px-6 text-center flex flex-col items-center">
                    
                    
                    <div 
                        onClick={() => {
                            if (state === "reset") {
                                setShowNewPassword(!showNewPassword);
                            } else {
                                setShowPassword(!showPassword);
                            }
                        }}
                        title="Click to toggle security lock"
                        className="relative w-16 h-16 flex items-center justify-center cursor-pointer select-none group mb-3"
                    >
                        
                        <div 
                            className={`absolute top-0 w-8 h-9 border-4 border-amber-500 rounded-t-full transition-all duration-500 origin-bottom-left ${
                                isUnlocked 
                                    ? "-rotate-40 -translate-y-2 -translate-x-1 border-emerald-600 shadow-xs" 
                                    : "rotate-0 translate-y-0.5 border-amber-600"
                            }`}
                        />
                        
                        <div className={`relative z-10 w-11 h-9.5 rounded-xl shadow-md flex items-center justify-center transition-all duration-300 border ${
                            isUnlocked
                                ? "bg-linear-to-b from-emerald-500 to-emerald-600 border-emerald-700 shadow-emerald-200"
                                : "bg-linear-to-b from-amber-400 to-amber-500 border-amber-600 shadow-amber-200"
                        }`}>
                            
                            <div className="flex flex-col items-center">
                                <div className="w-2.5 h-2.5 bg-gray-900 rounded-full" />
                                <div className="w-1.5 h-2.5 bg-gray-900 -mt-0.5 rounded-b-xs" />
                            </div>
                        </div>

                        
                        <div className={`absolute -bottom-1 text-[9px] font-extrabold uppercase tracking-widest px-1.5 py-0.2 rounded-full transition-all duration-300 ${
                            isUnlocked 
                                ? "bg-emerald-100 text-emerald-800" 
                                : "bg-amber-100 text-amber-800"
                        }`}>
                            {isUnlocked ? "UNLOCKED" : "SECURED"}
                        </div>
                    </div>

                    <h2 className="text-xl font-black text-gray-900 tracking-tight">
                        {state === "login" && "Sign in to Grocerin"}
                        {state === "register" && "Create Grocerin Account"}
                        {state === "forgot" && "Reset Forgotten Password"}
                        {state === "reset" && "Customize New Password"}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5 font-medium">
                        <span className="text-emerald-700 flex items-center gap-1">
                            <HiLockClosed className="text-xs" />
                            <span>256-Bit SSL</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <HiBolt className="text-xs text-amber-500" />
                            <span>10-Min Fast Delivery</span>
                        </span>
                    </p>

                    
                    {(state === "login" || state === "register") && (
                        <div className="mt-4 p-1 bg-gray-100 rounded-2xl flex w-full max-w-[280px]">
                            <button
                                type="button"
                                onClick={() => setState("login")}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                                    state === "login"
                                        ? "bg-white text-emerald-800 shadow-xs"
                                        : "text-gray-500 hover:text-gray-900"
                                }`}
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => setState("register")}
                                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                                    state === "register"
                                        ? "bg-white text-emerald-800 shadow-xs"
                                        : "text-gray-500 hover:text-gray-900"
                                }`}
                            >
                                New Customer?
                            </button>
                        </div>
                    )}
                </div>

                
                {(state === "login" || state === "register") && (
                    <form onSubmit={onSubmitHandler} className="p-6 pt-2 space-y-4">
                        
                        {state === "register" && (
                            <div className="space-y-1 animate-in fade-in-50 duration-200">
                                <label className="block text-xs font-bold text-gray-700">
                                    Your Full Name
                                </label>
                                <div className="relative flex items-center">
                                    <HiUser className="absolute left-3.5 text-gray-400 text-base" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Satyam Sharma"
                                        className="w-full text-xs md:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                    />
                                </div>
                            </div>
                        )}

                        
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-gray-700">
                                Email Address
                            </label>
                            <div className="relative flex items-center">
                                <HiEnvelope className="absolute left-3.5 text-gray-400 text-base" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full text-xs md:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                            </div>
                        </div>

                        
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="block text-xs font-bold text-gray-700">
                                    Password
                                </label>
                                {state === "login" && (
                                    <button
                                        type="button"
                                        onClick={() => setState("forgot")}
                                        className="text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer"
                                    >
                                        Forgot password?
                                    </button>
                                )}
                            </div>
                            <div className="relative flex items-center">
                                <HiLockClosed className="absolute left-3.5 text-gray-400 text-base" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={state === "register" ? "At least 6 characters" : "Enter your password"}
                                    className="w-full text-xs md:text-sm pl-10 pr-16 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-gray-500 hover:text-gray-800 text-xs font-semibold p-1 cursor-pointer flex items-center gap-1"
                                >
                                    {showPassword ? (
                                        <>
                                            <HiEyeSlash className="text-sm" />
                                            <span className="text-[11px]">Hide</span>
                                        </>
                                    ) : (
                                        <>
                                            <HiEye className="text-sm" />
                                            <span className="text-[11px]">Show</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            
                            {state === "register" && password.length > 0 && (
                                <div className="pt-1 space-y-1 animate-in fade-in duration-150">
                                    <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500">
                                        <span>Password Strength:</span>
                                        <span className="font-bold text-gray-800">{strengthLabels[strength - 1] || "Too weak"}</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-1.5 h-1.5">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`rounded-full transition-all duration-300 ${
                                                    strength >= level 
                                                        ? strengthColors[strength - 1] 
                                                        : "bg-gray-200"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        
                        <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="rounded text-emerald-700 focus:ring-emerald-500"
                                />
                                <span>Keep me signed in</span>
                            </label>
                        </div>

                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <TbLoader2 className="animate-spin text-base" />
                                    <span>Verifying Secure Access...</span>
                                </span>
                            ) : state === "login" ? (
                                <span className="flex items-center gap-1.5">
                                    <span>Sign In to Grocerin</span>
                                    <HiArrowRight className="text-sm" />
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <span>Create Your Free Account</span>
                                    <HiArrowRight className="text-sm" />
                                </span>
                            )}
                        </button>

                        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                            By continuing, you agree to Grocerin's{' '}
                            <span className="text-emerald-700 font-semibold cursor-pointer hover:underline">Conditions of Use</span> and{' '}
                            <span className="text-emerald-700 font-semibold cursor-pointer hover:underline">Privacy Notice</span>.
                        </p>
                    </form>
                )}

                
                {state === "forgot" && (
                    <form onSubmit={handleForgotPassword} className="p-6 pt-2 space-y-4">
                        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                            <p className="font-bold flex items-center gap-1.5">
                                <HiKey className="w-4 h-4 text-amber-700 shrink-0" />
                                <span>Password Recovery</span>
                            </p>
                            <p className="text-[11px] text-amber-800 mt-1">
                                Enter your registered account email. We will generate a 6-digit security verification code to allow you to customize your new password.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-gray-700">
                                Registered Email Address
                            </label>
                            <div className="relative flex items-center">
                                <HiEnvelope className="absolute left-3.5 text-gray-400 text-base" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your registered email"
                                    className="w-full text-xs md:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <TbLoader2 className="animate-spin text-base" />
                                    <span>Generating Security Code...</span>
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <span>Send Verification Code</span>
                                    <HiArrowRight className="text-sm" />
                                </span>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setState("login")}
                            className="w-full text-center text-xs font-bold text-gray-500 hover:text-emerald-700 transition cursor-pointer py-1"
                        >
                            Back to Sign In
                        </button>
                    </form>
                )}

                
                {state === "reset" && (
                    <form onSubmit={handleResetPassword} className="p-6 pt-2 space-y-4">
                        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/60 text-xs text-emerald-900 leading-relaxed">
                            <p className="font-bold flex items-center gap-1.5">
                                <HiSparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                                <span>Verification Code Sent</span>
                            </p>
                            <p className="text-[11px] text-emerald-800 mt-1">
                                Code sent to <strong className="text-gray-900">{email}</strong>. Enter code below and choose your customized new password.
                            </p>
                            {otpHint && (
                                <div className="mt-2 p-1.5 bg-white rounded-lg border border-emerald-200 text-center font-mono font-bold text-xs text-emerald-900">
                                    Demo Code: <span className="tracking-widest text-emerald-700">{otpHint}</span>
                                </div>
                            )}
                        </div>

                        
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-gray-700">
                                6-Digit Verification Code
                            </label>
                            <div className="relative flex items-center">
                                <HiKey className="absolute left-3.5 text-gray-400 text-base" />
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.trim())}
                                    placeholder="e.g. 123456"
                                    className="w-full text-sm font-mono tracking-widest pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition text-center font-bold"
                                />
                            </div>
                        </div>

                        
                        <div className="space-y-1">
                            <label className="block text-xs font-bold text-gray-700">
                                New Customized Password
                            </label>
                            <div className="relative flex items-center">
                                <HiLockClosed className="absolute left-3.5 text-gray-400 text-base" />
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="At least 6 characters"
                                    className="w-full text-xs md:text-sm pl-10 pr-16 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 text-gray-500 hover:text-gray-800 text-xs font-semibold p-1 cursor-pointer flex items-center gap-1"
                                >
                                    {showNewPassword ? (
                                        <>
                                            <HiEyeSlash className="text-sm" />
                                            <span className="text-[11px]">Hide</span>
                                        </>
                                    ) : (
                                        <>
                                            <HiEye className="text-sm" />
                                            <span className="text-[11px]">Show</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            
                            {newPassword.length > 0 && (
                                <div className="pt-1 space-y-1 animate-in fade-in duration-150">
                                    <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500">
                                        <span>Password Strength:</span>
                                        <span className="font-bold text-gray-800">{strengthLabels[strength - 1] || "Too weak"}</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-1.5 h-1.5">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`rounded-full transition-all duration-300 ${
                                                    strength >= level 
                                                        ? strengthColors[strength - 1] 
                                                        : "bg-gray-200"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="block text-xs font-bold text-gray-700">
                                    Confirm New Password
                                </label>
                                {confirmPassword.length > 0 && (
                                    <span className={`text-[10px] font-bold flex items-center gap-1 ${
                                        newPassword === confirmPassword ? "text-emerald-700" : "text-rose-600"
                                    }`}>
                                        {newPassword === confirmPassword ? (
                                            <>
                                                <HiCheck className="text-xs" />
                                                <span>Passwords Match</span>
                                            </>
                                        ) : (
                                            <span>Mismatch</span>
                                        )}
                                    </span>
                                )}
                            </div>
                            <div className="relative flex items-center">
                                <HiLockClosed className="absolute left-3.5 text-gray-400 text-base" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter new password"
                                    className={`w-full text-xs md:text-sm pl-10 pr-16 py-2.5 rounded-xl border outline-none transition ${
                                        confirmPassword.length > 0 && newPassword === confirmPassword 
                                            ? "border-emerald-500 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" 
                                            : "border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 text-gray-500 hover:text-gray-800 text-xs font-semibold p-1 cursor-pointer flex items-center gap-1"
                                >
                                    {showConfirmPassword ? (
                                        <>
                                            <HiEyeSlash className="text-sm" />
                                            <span className="text-[11px]">Hide</span>
                                        </>
                                    ) : (
                                        <>
                                            <HiEye className="text-sm" />
                                            <span className="text-[11px]">Show</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <TbLoader2 className="animate-spin text-base" />
                                    <span>Updating Password...</span>
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <span>Update Password & Sign In</span>
                                    <HiArrowRight className="text-sm" />
                                </span>
                            )}
                        </button>

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="hover:text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer"
                            >
                                <HiArrowPath className="w-3.5 h-3.5" />
                                <span>Resend Code</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setState("login")}
                                className="hover:text-gray-900 font-semibold cursor-pointer"
                            >
                                Back to Sign In
                            </button>
                        </div>
                    </form>
                )}

                
                <div className="bg-gray-50 border-t border-gray-100 p-4 px-6 flex items-center justify-around text-[11px] font-bold text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <HiBolt className="text-amber-500 text-sm" />
                        <span>10-Min Delivery</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                        <HiGift className="text-emerald-600 text-sm" />
                        <span>First Order Discount</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                        <HiShieldCheck className="text-blue-600 text-sm" />
                        <span>100% Genuine</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
