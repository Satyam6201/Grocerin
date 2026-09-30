import { Link, Outlet, NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { 
    HiSquares2X2, 
    HiCube, 
    HiPlus, 
    HiTruck, 
    HiArrowTopRightOnSquare 
} from "react-icons/hi2";

const SellerLayout = () => {
    const { axios, navigate, setIsSeller } = useAppContext();
     
    const sidebarLinks = [
        { name: "Command Center", path: "/seller", icon: HiSquares2X2 },
        { name: "Catalog Inventory", path: "/seller/product-list", icon: HiCube },
        { name: "Add New SKU", path: "/seller/add-product", icon: HiPlus },
        { name: "Live Fulfillment", path: "/seller/orders", icon: HiTruck },
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
        <div className="min-h-screen bg-gray-50/60 flex flex-col">
            
            <header className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-3 bg-white sticky top-0 z-40 shadow-2xs">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <img src={assets.nav_logo} alt="Grocerin" className="w-28 md:w-32 object-contain" />
                    </Link>
                    <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Dark Store Admin Hub
                    </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                    <Link 
                        to="/"
                        target="_blank"
                        className="hidden md:flex items-center gap-1.5 text-gray-500 hover:text-emerald-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-xl transition"
                    >
                        <span>Customer Store</span>
                        <HiArrowTopRightOnSquare className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                        <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                            A
                        </div>
                        <span className="hidden sm:inline text-gray-800 font-bold">Admin Manager</span>
                        <button 
                            onClick={logout}
                            className="border border-gray-200 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 text-gray-600 rounded-xl px-3 py-1 transition cursor-pointer text-xs font-bold"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </header>

            
            <div className="flex flex-1">
                <aside className="w-16 md:w-64 bg-white border-r border-gray-200 p-3 md:p-4 space-y-1 shrink-0">
                    <div className="hidden md:block px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
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
                                <span className="hidden md:inline">{item.name}</span>
                            </NavLink>
                        );
                    })}

                    <div className="hidden md:block pt-8 px-3">
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

                <main className="flex-1 bg-gray-50/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SellerLayout;
