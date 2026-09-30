import React, { useState } from 'react';
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HiCamera, HiXMark, HiSparkles, HiArrowRight } from 'react-icons/hi2';

const AddProduct = () => {
    const [files, setFiles] = useState([null, null, null, null]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [weight, setWeight] = useState('500 g');
    const [isUploading, setIsUploading] = useState(false);

    const { axios, currency, fetchProducts } = useAppContext();
    const navigate = useNavigate();

    const numPrice = Number(price);
    const numOffer = Number(offerPrice);
    const discountPercent = numPrice > 0 && numOffer > 0 && numPrice > numOffer
        ? Math.round(((numPrice - numOffer) / numPrice) * 100)
        : null;

    const handleFileChange = (index, file) => {
        const updated = [...files];
        updated[index] = file;
        setFiles(updated);
    };

    const handleRemoveFile = (index) => {
        const updated = [...files];
        updated[index] = null;
        setFiles(updated);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const selectedFiles = files.filter(Boolean);
        if (selectedFiles.length === 0) {
            return toast.error("Please upload at least 1 product image");
        }

        if (numOffer > numPrice) {
            return toast.error("Selling price cannot exceed MRP price");
        }

        try {
            setIsUploading(true);

            const productData = {
                name: `${name} ${weight}`.trim(),
                description: description.split('\n').filter(Boolean),
                category,
                price: numPrice,
                offerPrice: numOffer || numPrice,
                inStock: true
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));

            selectedFiles.forEach((file) => {
                formData.append('images', file);
            });

            const { data } = await axios.post('/api/product/add', formData);
            if (data.success) {
                toast.success("Product SKU added to inventory catalog!");
                await fetchProducts();
                navigate('/seller/product-list');
            } else {
                toast.error(data.message || "Failed to add product");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Upload error");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex-1 p-4 md:p-8 space-y-6 overflow-y-auto max-h-[92vh]">
            <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Add New SKU to Dark Store</h1>
                <p className="text-xs text-gray-500">List fresh items with photos, real-time prices, and fast delivery specs</p>
            </div>

            <form onSubmit={onSubmitHandler} className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xs max-w-2xl space-y-6">
                
                
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Product Images (Up to 4)
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                        {files.map((file, index) => (
                            <div key={index} className="relative aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-emerald-500 bg-gray-50 flex items-center justify-center overflow-hidden transition group">
                                {file ? (
                                    <>
                                        <img 
                                            src={URL.createObjectURL(file)} 
                                            alt="" 
                                            className="w-full h-full object-contain p-2" 
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(index)}
                                            className="absolute top-1.5 right-1.5 bg-rose-600 hover:bg-rose-700 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-xs cursor-pointer transition"
                                        >
                                            <HiXMark className="w-3.5 h-3.5" />
                                        </button>
                                    </>
                                ) : (
                                    <label htmlFor={`img-${index}`} className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-2 text-center">
                                        <input
                                            id={`img-${index}`}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(index, e.target.files[0])}
                                            hidden
                                        />
                                        <HiCamera className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 transition" />
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">Upload</span>
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1">
                        <label className="block text-xs font-bold text-gray-700">Product Title</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Fresh Farm Spinach"
                            className="w-full text-xs md:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 outline-none"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-xs font-bold text-gray-700">Unit / Pack Size</label>
                        <input
                            type="text"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="e.g. 500 g, 1 kg, 1L"
                            className="w-full text-xs md:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 outline-none"
                        />
                    </div>
                </div>

                
                <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">Grocery Category</label>
                    <select
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-xs md:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:border-emerald-600 outline-none font-medium cursor-pointer"
                    >
                        <option value="">Choose a Category...</option>
                        {categories.map((c, i) => (
                            <option key={i} value={c.path}>{c.text} ({c.path})</option>
                        ))}
                    </select>
                </div>

                
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                    <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wider block">
                        Pricing & Profit Margin
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-semibold text-gray-600">MRP / Regular Price</label>
                            <input
                                type="number"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="e.g. 100"
                                className="w-full text-xs md:text-sm px-3 py-2 rounded-xl border border-gray-200 bg-white focus:border-emerald-600 outline-none font-bold"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-xs font-semibold text-gray-600">Discounted Selling Price</label>
                            <input
                                type="number"
                                required
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(e.target.value)}
                                placeholder="e.g. 80"
                                className="w-full text-xs md:text-sm px-3 py-2 rounded-xl border border-gray-200 bg-white focus:border-emerald-600 outline-none font-bold text-emerald-800"
                            />
                        </div>
                    </div>

                    {discountPercent && (
                        <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-gray-200/60 text-emerald-800">
                            <span className="flex items-center gap-1.5">
                                <HiSparkles className="w-4 h-4 text-emerald-600" />
                                <span>Customer Discount:</span>
                            </span>
                            <span className="bg-emerald-100 px-2 py-0.5 rounded-md">
                                {discountPercent}% OFF (Saves {currency}{numPrice - numOffer})
                            </span>
                        </div>
                    )}
                </div>

                
                <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">Product Bullet Points (1 per line)</label>
                    <textarea
                        rows={3}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Farm-fresh harvest&#10;Rich in essential nutrients&#10;100% Organic certified"
                        className="w-full text-xs md:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 outline-none resize-none"
                    />
                </div>

                
                <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {isUploading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Uploading Photos & Saving to Catalog...</span>
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <span>Publish Product to Store Catalog</span>
                            <HiArrowRight className="w-4 h-4" />
                        </span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
