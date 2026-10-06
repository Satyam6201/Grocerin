import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { HiPlus, HiMagnifyingGlass, HiTrash } from 'react-icons/hi2';

const ProductList = () => {
    const { products, currency, axios, fetchProducts } = useAppContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isDeleting, setIsDeleting] = useState(null);

    const toggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.post('/api/product/stock', { id, inStock });
            if (data.success) {
                fetchProducts();
                toast.success(data.message || "Stock Updated");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeleteProduct = async (id, name) => {
        if (!window.confirm(`Are you sure you want to permanently delete "${name}" from inventory?`)) {
            return;
        }

        try {
            setIsDeleting(id);
            const { data } = await axios.post('/api/product/delete', { id });
            if (data.success) {
                toast.success(`"${name}" deleted successfully`);
                fetchProducts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(null);
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                p.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCategory = selectedCategory === "all" || p.category.toLowerCase() === selectedCategory.toLowerCase();
            return matchSearch && matchCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    const inStockCount = products.filter(p => p.inStock).length;
    const outOfStockCount = products.length - inStockCount;

    return (
        <div className="p-3 sm:p-5 md:p-8 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-60px)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Inventory Catalog</h1>
                    <p className="text-xs text-gray-500">Manage dark store stock, prices, and live availability</p>
                </div>
                <Link
                    to="/seller/add-product"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-xs flex items-center justify-center gap-1.5 self-start sm:self-auto"
                >
                    <HiPlus className="w-3.5 h-3.5" />
                    <span>Add New SKU</span>
                </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-white border border-gray-100 rounded-2xl p-2.5 sm:p-3 text-center sm:text-left shadow-2xs">
                    <span className="text-[10px] sm:text-xs text-gray-400 block">Total SKUs</span>
                    <strong className="text-sm sm:text-base text-gray-900 font-black">{products.length}</strong>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-2.5 sm:p-3 text-center sm:text-left shadow-2xs">
                    <span className="text-[10px] sm:text-xs text-emerald-700 block">In Stock</span>
                    <strong className="text-sm sm:text-base text-emerald-900 font-black">{inStockCount}</strong>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-2.5 sm:p-3 text-center sm:text-left shadow-2xs">
                    <span className="text-[10px] sm:text-xs text-rose-700 block">Sold Out</span>
                    <strong className="text-sm sm:text-base text-rose-900 font-black">{outOfStockCount}</strong>
                </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products by title or category..."
                        className="w-full text-xs pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl outline-emerald-600 bg-gray-50/50 focus:bg-white"
                    />
                    <HiMagnifyingGlass className="absolute left-2.5 top-3 text-gray-400 w-4 h-4" />
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full sm:w-auto text-xs border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 outline-emerald-600 font-medium cursor-pointer"
                    >
                        <option value="all">All Categories ({products.length})</option>
                        {Array.from(new Set(products.map(p => p.category))).map((cat, i) => (
                            <option key={i} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="block md:hidden space-y-3">
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 text-center text-xs text-gray-400 border border-gray-100">
                        No products found matching your search.
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <div key={product._id} className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-2xs space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 p-1 shrink-0 flex items-center justify-center">
                                    <img 
                                        src={product.image?.[0]} 
                                        alt={product.name} 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-gray-900 text-xs truncate">{product.name}</p>
                                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-semibold text-[10px] mt-0.5">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <div>
                                    <span className="text-[10px] text-gray-400 line-through mr-1.5">{currency}{product.price}</span>
                                    <span className="text-sm font-black text-gray-900">{currency}{product.offerPrice}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={product.inStock}
                                            onChange={() => toggleStock(product._id, !product.inStock)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                                    </label>

                                    <button
                                        onClick={() => handleDeleteProduct(product._id, product.name)}
                                        disabled={isDeleting === product._id}
                                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200"
                                        aria-label="Delete product"
                                    >
                                        <HiTrash className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50/70 text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                            <tr>
                                <th className="py-3 px-4">Product Details</th>
                                <th className="py-3 px-4">Category</th>
                                <th className="py-3 px-4">MRP</th>
                                <th className="py-3 px-4">Offer Price</th>
                                <th className="py-3 px-4">In-Stock Toggle</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-gray-400">
                                        No products found matching your filter criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50/50 transition">
                                        <td className="py-3 px-4 flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 p-1 shrink-0 flex items-center justify-center">
                                                <img 
                                                    src={product.image?.[0]} 
                                                    alt={product.name} 
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-gray-900 truncate max-w-xs">{product.name}</p>
                                                <p className="text-[11px] text-gray-400">ID: #{product._id.slice(-6)}</p>
                                            </div>
                                        </td>

                                        <td className="py-3 px-4">
                                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                                                {product.category}
                                            </span>
                                        </td>

                                        <td className="py-3 px-4 text-gray-400 line-through">
                                            {currency}{product.price}
                                        </td>

                                        <td className="py-3 px-4 font-black text-gray-900 text-sm">
                                            {currency}{product.offerPrice}
                                        </td>

                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={product.inStock}
                                                        onChange={() => toggleStock(product._id, !product.inStock)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                                                </label>
                                                <span className={`text-[11px] font-bold ${product.inStock ? "text-emerald-700" : "text-rose-600"}`}>
                                                    {product.inStock ? "In Stock" : "Sold Out"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-4 text-right">
                                            <button
                                                onClick={() => handleDeleteProduct(product._id, product.name)}
                                                disabled={isDeleting === product._id}
                                                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer inline-flex items-center gap-1"
                                            >
                                                <HiTrash className="w-3.5 h-3.5" />
                                                <span>{isDeleting === product._id ? "Deleting..." : "Delete"}</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
