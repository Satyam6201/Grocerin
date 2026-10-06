import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import { 
    HiBolt, 
    HiShieldCheck, 
    HiCreditCard, 
    HiChatBubbleLeftRight, 
    HiArrowUp, 
    HiArrowRight, 
    HiEnvelope, 
    HiCheck, 
    HiClipboardDocumentCheck, 
    HiMapPin, 
    HiSparkles,
    HiCpuChip,
    HiCommandLine
} from 'react-icons/hi2';
import { 
    FaGooglePlay, 
    FaApple, 
    FaInstagram, 
    FaXTwitter, 
    FaFacebookF, 
    FaYoutube, 
    FaGithub, 
    FaLinkedinIn 
} from 'react-icons/fa6';
import { useAppContext } from '../context/AppContext';

const QUICK_CATEGORIES = [
    { label: "Vegetables", path: "/products/Vegetables" },
    { label: "Fresh Fruits", path: "/products/Fruits" },
    { label: "Cold Drinks", path: "/products/Drinks" },
    { label: "Instant Food", path: "/products/Instant" },
    { label: "Dairy & Milk", path: "/products/Dairy" },
    { label: "Bakery & Bread", path: "/products/Bakery" },
    { label: "Grains & Atta", path: "/products/Grains" },
    { label: "Cooking Oils", path: "/products/CookingEssentials" },
    { label: "Personal Care", path: "/products/BeautyCare" },
];

const VALUE_PROPS = [
    {
        icon: HiBolt,
        title: "10-Minute Delivery",
        desc: "Dispatched instantly from your local dark store hub",
        accent: "text-amber-400 bg-amber-400/10 border-amber-400/20"
    },
    {
        icon: HiShieldCheck,
        title: "Freshness Guaranteed",
        desc: "Direct farm harvest with stringent multi-point quality checks",
        accent: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
    },
    {
        icon: HiCreditCard,
        title: "Secure Instant Pay",
        desc: "Stripe, UPI, RuPay, NetBanking or Cash on Delivery",
        accent: "text-blue-400 bg-blue-400/10 border-blue-400/20"
    },
    {
        icon: HiChatBubbleLeftRight,
        title: "24/7 Fast Support",
        desc: "Instant live agent chat & automated order resolution",
        accent: "text-purple-400 bg-purple-400/10 border-purple-400/20"
    }
];

const Footer = () => {
    const { setShowSdeModal } = useAppContext();
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [copiedCoupon, setCopiedCoupon] = useState(false);
    const navigate = useNavigate();

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            toast.error("Please enter a valid email address");
            return;
        }
        setIsSubscribed(true);
        toast.success("Subscribed successfully! Use coupon GROCER100 for ₹100 off");
    };

    const handleCopyCoupon = () => {
        navigator.clipboard.writeText("GROCER100");
        setCopiedCoupon(true);
        toast.success("Coupon code GROCER100 copied to clipboard!");
        setTimeout(() => setCopiedCoupon(false), 3000);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="mt-20 bg-slate-950 text-gray-300 border-t border-slate-800 relative overflow-hidden">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-500/10 blur-3xl pointer-events-none" />

            
            <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUE_PROPS.map((prop, idx) => {
                            const IconComponent = prop.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 group shadow-xs"
                                >
                                    <div className={`p-3 rounded-xl border shrink-0 ${prop.accent} group-hover:scale-105 transition-transform`}>
                                        <IconComponent className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white tracking-tight">{prop.title}</h4>
                                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{prop.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            
            <div className="border-b border-slate-800 bg-linear-to-r from-emerald-950/40 via-slate-950 to-teal-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-slate-900/90 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="max-w-xl text-center lg:text-left space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide uppercase">
                                <HiSparkles className="w-3.5 h-3.5" />
                                <span>Grocerin Exclusive Club</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                Claim <span className="text-emerald-400">₹100 OFF</span> On Your Next Grocery Order
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                                Join 50,000+ happy households receiving weekly farm-fresh offers, flash deals, and priority delivery windows.
                            </p>
                        </div>

                        
                        <div className="w-full lg:w-auto shrink-0">
                            {isSubscribed ? (
                                <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                        <HiCheck className="w-5 h-5 font-bold" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-emerald-300 font-semibold">Your welcome coupon is unlocked:</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-mono text-base font-black text-white bg-slate-950 px-3 py-1 rounded-lg border border-emerald-500/40 tracking-wider">
                                                GROCER100
                                            </span>
                                            <button
                                                onClick={handleCopyCoupon}
                                                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
                                            >
                                                {copiedCoupon ? (
                                                    <>
                                                        <HiCheck className="w-3.5 h-3.5" />
                                                        <span>Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <HiClipboardDocumentCheck className="w-3.5 h-3.5" />
                                                        <span>Copy</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
                                    <div className="relative w-full">
                                        <HiEnvelope className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address..."
                                            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition shadow-inner"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-emerald-900/30 whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                                    >
                                        <span>Unlock ₹100</span>
                                        <HiArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="border-b border-slate-800/80 bg-slate-950/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
                            Popular Departments:
                        </span>
                        {QUICK_CATEGORIES.map((cat, i) => (
                            <Link
                                key={i}
                                to={cat.path}
                                className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-gray-300 hover:text-white hover:border-emerald-500/60 hover:bg-emerald-950/30 transition-all duration-200"
                            >
                                {cat.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    
                    
                    <div className="lg:col-span-2 space-y-5">
                        <Link to="/" className="inline-block">
                            <img 
                                src={assets.nav_logo || assets.logo} 
                                alt="Grocerin" 
                                className="w-32 md:w-36 brightness-200 contrast-125 object-contain" 
                            />
                        </Link>
                        <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
                            India's fastest growing hyperlocal quick-commerce grocery platform. Farm-fresh produce, daily essentials, and snacks delivered to your doorstep in under 10 minutes.
                        </p>

                        
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                            <span className="text-gray-300 font-semibold">
                                Live Dark Store Hub: <strong className="text-white">Boring Road #102</strong>
                            </span>
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                                99.9% On-Time
                            </span>
                        </div>

                        
                        <div className="pt-2">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
                                Mobile App Coming Soon
                            </span>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2.5 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-left hover:border-slate-700 transition">
                                    <FaApple className="w-5 h-5 text-white" />
                                    <div>
                                        <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Download on</span>
                                        <span className="block text-xs font-extrabold text-white">App Store</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-left hover:border-slate-700 transition">
                                    <FaGooglePlay className="w-4 h-4 text-emerald-400" />
                                    <div>
                                        <span className="block text-[9px] uppercase tracking-wider text-gray-400 font-bold">Get it on</span>
                                        <span className="block text-xs font-extrabold text-white">Google Play</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="space-y-4">
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2.5 text-xs text-gray-400">
                            <li>
                                <Link to="/" className="hover:text-emerald-400 transition-colors">Home Store</Link>
                            </li>
                            <li>
                                <Link to="/best-sellers" className="hover:text-emerald-400 transition-colors">Best Sellers</Link>
                            </li>
                            <li>
                                <Link to="/offer" className="hover:text-emerald-400 transition-colors">Offers & Coupons</Link>
                            </li>
                            <li>
                                <Link to="/product" className="hover:text-emerald-400 transition-colors">All Groceries Catalog</Link>
                            </li>
                            <li>
                                <Link to="/tractOrder" className="hover:text-emerald-400 transition-colors">Track Active Order</Link>
                            </li>
                        </ul>
                    </div>

                    
                    <div className="space-y-4">
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Customer Help</h4>
                        <ul className="space-y-2.5 text-xs text-gray-400">
                            <li>
                                <Link to="/DeliveryInfo" className="hover:text-emerald-400 transition-colors">10-Min Delivery SLA</Link>
                            </li>
                            <li>
                                <Link to="/returnRefund" className="hover:text-emerald-400 transition-colors">Refund & Return Policy</Link>
                            </li>
                            <li>
                                <Link to="/paymentmethod" className="hover:text-emerald-400 transition-colors">Payment Methods</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-emerald-400 transition-colors">Help Center & FAQs</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link>
                            </li>
                        </ul>
                    </div>

                    
                    <div className="space-y-4">
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Admin & Business</h4>
                        <ul className="space-y-2.5 text-xs text-gray-400">
                            <li>
                                <Link 
                                    to="/seller" 
                                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5"
                                >
                                    <span>Dark Store Portal</span>
                                    <HiArrowRight className="w-3 h-3" />
                                </Link>
                            </li>
                            <li>
                                <span className="hover:text-gray-300 transition-colors cursor-pointer">Partner Franchise</span>
                            </li>
                            <li>
                                <span className="hover:text-gray-300 transition-colors cursor-pointer">Farmer Direct Sourcing</span>
                            </li>
                            <li>
                                <span className="hover:text-gray-300 transition-colors cursor-pointer">Warehouse Fulfillment</span>
                            </li>
                            <li>
                                <span className="hover:text-gray-300 transition-colors cursor-pointer">Careers (We're Hiring!)</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* SDE Candidate & Recruiter Architecture Bar */}
            <div className="border-t border-slate-800 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 px-4 sm:px-6 lg:px-8 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-xs">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                            <HiCpuChip className="w-4 h-4" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-white tracking-wide">SDE Fullstack Architecture Engine</span>
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                                    SDE-1 / SDE-2 Showcase
                                </span>
                            </div>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                                Redis Sub-15ms Caching • Gemini AI RAG Grounding • Rider Telemetry Engine • Zero-Downtime Pipeline
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowSdeModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-950/40 transition-all transform hover:scale-[1.02] cursor-pointer shrink-0 border border-emerald-400/30"
                    >
                        <HiCommandLine className="w-4 h-4 text-emerald-200" />
                        <span>Open Live System Telemetry Console</span>
                    </button>
                </div>
            </div>

            {/* Bottom Copyright and Social Links */}
            <div className="border-t border-slate-800/80 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        
                        
                        <div className="text-xs text-gray-500 text-center md:text-left">
                            <p>© {new Date().getFullYear()} Grocerin Technologies Inc. All rights reserved.</p>
                            <p className="text-[11px] text-gray-600 mt-0.5">
                                Built for ultra-fast grocery delivery with Redis caching, Docker, and Stripe.
                            </p>
                        </div>

                        
                        <div className="flex items-center gap-2.5">
                            {[
                                { icon: FaXTwitter, href: "https://x.com", label: "Twitter / X" },
                                { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                                { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
                                { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
                                { icon: FaGithub, href: "https://github.com", label: "GitHub" },
                                { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" }
                            ].map((s, idx) => {
                                const Icon = s.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 hover:text-white hover:border-emerald-500 hover:bg-slate-800 flex items-center justify-center text-xs transition duration-200"
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                    </a>
                                );
                            })}
                        </div>

                        
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-gray-400 hover:text-white hover:border-slate-700 transition cursor-pointer"
                        >
                            <span>Back to Top</span>
                            <HiArrowUp className="w-3.5 h-3.5" />
                        </button>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
