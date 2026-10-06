import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
import { getCache, setCache, delCache } from "../configs/redis.js";

export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);

        const images = req.files || [];
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, 
                    { resource_type: 'image', folder: 'grocerin_products' });
                return result.secure_url;
            })
        );

        const newProduct = await Product.create({
            ...productData, 
            image: imageUrl.length > 0 ? imageUrl : productData.image || []
        });

        await delCache('product_list*');

        res.json({
            success: true,
            message: "Product Added Successfully",
            product: newProduct
        });

    } catch (error) {
        console.error("Add Product Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const productList = async (req, res) => {
    try {
        const { category, search, sortBy, inStockOnly } = req.query;

        const isPlainRequest = !category && !search && !sortBy && !inStockOnly;
        const cacheKey = isPlainRequest ? 'product_list_all' : `product_list_${category || 'all'}_${search || ''}_${sortBy || ''}`;

        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return res.json({
                success: true,
                products: cachedData,
                source: 'cache'
            });
        }

        const query = {};
        if (category && category !== 'all') {
            query.category = { $regex: new RegExp(`^${category}$`, 'i') };
        }
        if (inStockOnly === 'true') {
            query.inStock = true;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        let mongoQuery = Product.find(query);

        if (sortBy === 'price_asc') {
            mongoQuery = mongoQuery.sort({ offerPrice: 1 });
        } else if (sortBy === 'price_desc') {
            mongoQuery = mongoQuery.sort({ offerPrice: -1 });
        } else if (sortBy === 'newest') {
            mongoQuery = mongoQuery.sort({ createdAt: -1 });
        } else {
            mongoQuery = mongoQuery.sort({ createdAt: -1 });
        }

        const products = await mongoQuery.lean();

        await setCache(cacheKey, products, 300);

        res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
        res.json({
            success: true,
            products,
            count: products.length,
            source: 'database'
        });

    } catch (error) {
        console.error("Product List Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const productById = async (req, res) => {
    try {
        const id = req.body.id || req.params.id || req.query.id;
        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID required" });
        }

        const cacheKey = `product_${id}`;
        const cachedProduct = await getCache(cacheKey);
        if (cachedProduct) {
            return res.json({ success: true, product: cachedProduct, source: 'cache' });
        }

        const product = await Product.findById(id).lean();
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await setCache(cacheKey, product, 600);

        res.json({ success: true, product, source: 'database' });

    } catch (error) {
        console.error("Product By ID Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });

        await delCache('product_list*');
        await delCache(`product_${id}`);

        res.json({ success: true, message: "Inventory Stock Updated" });

    } catch (error) {
        console.error("Change Stock Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        await Product.findByIdAndDelete(id);

        await delCache('product_list*');
        await delCache(`product_${id}`);

        res.json({ success: true, message: "Product Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addProductReview = async (req, res) => {
    try {
        const { id, rating, comment, userName } = req.body;
        if (!id || !rating || !comment) {
            return res.status(400).json({ success: false, message: "Product ID, rating, and review comment are required" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (!product.reviews) {
            product.reviews = [];
        }

        const newReview = {
            id: Date.now().toString(),
            user: userName || "Verified Buyer",
            rating: Number(rating),
            comment: comment.trim(),
            verified: true,
            createdAt: new Date().toISOString()
        };

        product.reviews.unshift(newReview);
        const totalRating = product.reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
        product.rating = Number((totalRating / product.reviews.length).toFixed(1));
        product.numReviews = product.reviews.length;

        await product.save();
        await delCache(`product_${id}`);
        await delCache('product_list*');

        return res.json({
            success: true,
            message: "Review submitted successfully!",
            review: newReview,
            rating: product.rating,
            numReviews: product.numReviews
        });
    } catch (error) {
        console.error("Add Review Error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

