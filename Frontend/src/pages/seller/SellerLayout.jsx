import { useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { 
    HiSquares2X2, 
    HiCube, 
    HiPlus, 
    HiTruck, 
    HiArrowTopRightOnSquare,
    HiBars3,
    HiXMark
} from "react-icons/hi2";
import { FaMotorcycle } from "react-icons/fa6";

const SellerLayout = () => {
    const { axios, navigate, setIsSeller } = useAppContext();
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
     
    const sidebarLinks = [
        { name: "Command Center", shortName: "Dashboard", path: "/seller", icon: HiSquares2X2 },
        { name: "Catalog Inventory", shortName: "Inventory", path: "/seller/product-list", icon: HiCube },
        { name: "Add New SKU", shortName: "Add SKU", path: "/seller/add-product", icon: HiPlus },
        { name: "Live Fulfillment", shortName: "Orders", path: "/seller/orders", icon: HiTruck },
        { name: "Delivery Fleet", shortName: "Fleet", path: "/seller/bikers", icon: FaMotorcycle },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/seller/logout');
            if (data.success) {
                toast.success(data.message || "Logged out from Seller Hub");
                setIsSeller(false);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/70 flex flex-col pb-16 md:pb-0">
            <header className="flex items-center justify-between px-3 sm:px-6 md:px-8 border-b border-gray-200 py-2.5 sm:py-3 bg-white sticky top-0 z-40 shadow-xs">
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
                        className="md:hidden p-1.5 rounded-xl text-gray-600 hover:bg-gray-100 cursor-pointer"
                        aria-label="Toggle navigation drawer"
                    >
                        {mobileDrawerOpen ? <HiXMark className="w-5 h-5" /> : <HiBars3 className="w-5 h-5" />}
                    </button>

                    <Link to="/" className="flex items-center gap-2">
                        <img src={assets.nav_logo} alt="Grocerin" className="w-24 sm:w-28 md:w-32 object-contain" />
                    </Link>
                    <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Dark Store Admin Hub
                    </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold">
                    <Link 
                        to="/biker"
                        target="_blank"
                        className="hidden sm:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-2.5 sm:px-3 py-1.5 rounded-xl transition shadow-xs text-[11px] sm:text-xs"
                    >
                        <FaMotorcycle className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden md:inline">Biker Mode</span>
                    </Link>

                    <Link 
                        to="/"
                        target="_blank"
                        className="hidden lg:flex items-center gap-1.5 text-gray-500 hover:text-emerald-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-xl transition"
                    >
                        <span>Customer Store</span>
                        <HiArrowTopRightOnSquare className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2 border-l border-gray-200 pl-2 sm:pl-4">
                        <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            A
                        </div>
                        <span className="hidden md:inline text-gray-800 font-bold">Admin</span>
                        <button 
                            onClick={logout}
                            className="border border-gray-200 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 text-gray-600 rounded-xl px-2.5 sm:px-3 py-1 transition cursor-pointer text-xs font-bold"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </header>

            {mobileDrawerOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 md:hidden animate-in fade-in duration-200"
                    onClick={() => setMobileDrawerOpen(false)}
                >
                    <div 
                        className="w-72 max-w-[80vw] h-full bg-white shadow-2xl p-4 flex flex-col justify-between animate-in slide-in-from-left duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <img src={assets.nav_logo} alt="Grocerin" className="w-24 object-contain" />
                                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                                        Admin
                                    </span>
                                </div>
                                <button
                                    onClick={() => setMobileDrawerOpen(false)}
                                    className="p-1 rounded-lg text-gray-500 hover:bg-gray-100"
                                >
                                    <HiXMark className="w-5 h-5" />
                                </button>
                            </div>

                            <nav className="space-y-1">
                                {sidebarLinks.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <NavLink
                                            to={item.path}
                                            key={item.name}
                                            end={item.path === "/seller"}
                                            onClick={() => setMobileDrawerOpen(false)}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
                                                    isActive
                                                        ? "bg-emerald-700 text-white shadow-sm"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`
                                            }
                                        >
                                            <IconComponent className="w-4 h-4 shrink-0" />
                                            <span>{item.name}</span>
                                        </NavLink>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-gray-100 text-xs">
                            <Link 
                                to="/" 
                                target="_blank"
                                onClick={() => setMobileDrawerOpen(false)}
                                className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100"
                            >
                                <span>Visit Customer Store</span>
                                <HiArrowTopRightOnSquare className="w-4 h-4" />
                            </Link>

                            <button
                                onClick={logout}
                                className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold transition"
                            >
                                Log Out Admin
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-1 min-w-0">
                <aside className="hidden md:flex flex-col w-56 lg:w-64 bg-white border-r border-gray-200 p-3 md:p-4 space-y-1 shrink-0 min-h-[calc(100vh-57px)]">
                    <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                        Management
                    </div>

                    {sidebarLinks.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <NavLink
                                to={item.path}
                                key={item.name}
                                end={item.path === "/seller"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                                        isActive
                                            ? "bg-emerald-700 text-white shadow-xs"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`
                                }
                            >
                                <IconComponent className="w-4 h-4 shrink-0" />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}

                    <div className="pt-8 px-3 mt-auto">
                        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-[11px] text-emerald-900 space-y-1">
                            <p className="font-extrabold flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                <span>Live Store</span>
                            </p>
                            <p className="text-emerald-700 text-[10px]">
                                Redis caching active with auto-invalidation on catalog edits.
                            </p>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 bg-gray-50/50 min-w-0 w-full">
                    <Outlet />
                </main>
            </div>

            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-1.5 flex items-center justify-around z-40 shadow-lg">
                {sidebarLinks.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === "/seller"}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center p-1.5 rounded-xl transition min-w-[56px] ${
                                    isActive
                                        ? "text-emerald-700 font-extrabold"
                                        : "text-gray-400 hover:text-gray-700 font-medium"
                                }`
                            }
                        >
                            <IconComponent className="w-5 h-5 mb-0.5" />
                            <span className="text-[10px] leading-tight">{item.shortName}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};

export default SellerLayout;
