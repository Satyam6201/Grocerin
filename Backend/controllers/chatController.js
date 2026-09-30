import Product from '../models/Product.js';

export const handleChat = async (req, res) => {
    try {
        const { message, history } = req.body;
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ success: false, message: "Valid message text is required" });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ success: false, message: "Gemini API key is not configured" });
        }

        const cleanTokens = message
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, ' ')
            .split(/\s+/)
            .filter(t => t.length > 2 && !['what', 'where', 'when', 'which', 'who', 'how', 'the', 'and', 'for', 'are', 'can', 'you', 'give', 'show', 'tell', 'want', 'need', 'please'].includes(t));

        let queryConditions = [{ inStock: true }];
        if (cleanTokens.length > 0) {
            const regexQuery = cleanTokens.join('|');
            queryConditions.push({
                $or: [
                    { name: { $regex: regexQuery, $options: 'i' } },
                    { category: { $regex: regexQuery, $options: 'i' } }
                ]
            });
        }

        let relevantProducts = [];
        try {
            relevantProducts = await Product.find({ $and: queryConditions })
                .select('name category price offerPrice inStock')
                .limit(12)
                .lean();
        } catch (dbErr) {
            relevantProducts = [];
        }

        let baselineProducts = [];
        try {
            baselineProducts = await Product.find({ inStock: true })
                .select('name category price offerPrice inStock')
                .sort({ updatedAt: -1 })
                .limit(20)
                .lean();
        } catch (dbErr) {
            baselineProducts = [];
        }

        const productMap = new Map();
        [...relevantProducts, ...baselineProducts].forEach(p => {
            if (p && p._id && !productMap.has(p._id.toString())) {
                productMap.set(p._id.toString(), p);
            }
        });

        const catalogSummary = Array.from(productMap.values())
            .map(p => `${p.name} [${p.category}]: ₹${p.offerPrice || p.price}${p.offerPrice && p.price > p.offerPrice ? ` (Reg ₹${p.price})` : ''}`)
            .join('; ');

        const systemInstruction = `You are the Grocerin AI Shopping Assistant for Grocerin, India's ultra-fast 10-minute quick-commerce grocery delivery platform.

GROCERIN CORE FACTS & POLICIES:
- Hyperlocal 10-Minute SLA: Orders are picked, packed, and dispatched in under 10 minutes from micro-fulfillment dark stores (such as Boring Road Hub #102, Bailey Road Hub #108).
- Service Availability: Operating 365 days a year from 6:00 AM to 11:30 PM.
- Free Delivery Threshold: Free delivery on all orders of ₹499 and above. Standard flat delivery fee of ₹25 applies for smaller carts. No minimum order restriction.
- Active Promo Codes:
  * GROCER100: Flat ₹100 off on first grocery order.
  * GROCER250: Flat ₹250 off on orders above ₹1499.
- Accepted Payments: Stripe card checkout (Visa, Mastercard, RuPay, Maestro), UPI apps (Google Pay, PhonePe, Paytm, BHIM, Cred), Net Banking across all Indian banks, and Cash on Delivery (COD).
- Returns & 100% Freshness Guarantee: If any item is damaged, defective, or not fresh, customers can report it within 24 hours for instant replacement or refund. Refunds credit in 5-7 business days to original method or to bank/UPI for COD. Opened perishable food items cannot be returned once accepted unless spoiled on arrival.
- Order Cancellation: Customers can cancel orders from 'My Orders' while status is 'Order Placed' before warehouse packing begins.
- Dual-Engine Location Detection: GPS automatically pinpoints customer delivery locality and 6-digit postal PIN code with 1 click.
- Account Customization: If a customer forgets their password, they click 'Forgot password?', enter their registered email to receive a 6-digit OTP code, and set a new password with live strength verification.
- Dark Store Hub Portal: Store managers and franchise partners access order fulfillment via the '/seller' Command Center.

CATALOG DEPARTMENTS & POPULAR STAPLES:
1. Organic Veggies: Fresh spinach, red tomatoes, potatoes, onions, carrots, cauliflower, green chillies, ginger, coriander, broccoli.
2. Fresh Fruits: Shimla apples, Nagpur oranges, Robusta bananas, Alphonso mangoes, seedless grapes, pomegranates, papayas.
3. Dairy Products: Amul Taaza/Gold fresh milk (1L/500ml), Amul paneer (200g/500g), curd (dahi), salted/unsalted butter, cheddar/mozzarella cheese, farm eggs (6/12/30 pcs).
4. Cold Drinks & Beverages: Coca-Cola, Pepsi, Sprite, Fanta, 7 Up, Real fruit juices, cold coffee, mineral water, energy drinks.
5. Instant Food: Maggi 2-Minute Noodles, Maggi Oats, Top Ramen, Yippee noodles, Knorr soups, Haldiram bhujia, Lay's chips, Kurkure.
6. Bakery & Breads: Whole wheat bread, brown bread, butter croissants, vanilla muffins, chocolate cakes, pav buns.
7. Grains, Cereals & Atta: Premium Basmati rice (1kg/5kg), Aashirvaad Shahi whole wheat atta, organic quinoa, rolled oats, brown rice, toor dal, moong dal.
8. Cooking Essentials: Fortune sunflower oil, mustard oil, cow ghee, Tata salt, refined sugar, turmeric, red chilli powder, garam masala.
9. Beauty & Personal Care: Dettol soap, Himalayan face wash, Dove shampoo, Colgate toothpaste, moisturizing creams.

REAL-TIME IN-STOCK INVENTORY SNAPSHOT:
${catalogSummary || "Farm Potato 500g: ₹20; Tomato 1kg: ₹35; Carrot 500g: ₹28; Spinach 500g: ₹15; Onion 500g: ₹19; Apple 1kg: ₹110; Orange 1kg: ₹75; Banana 1kg: ₹45; Mango 1kg: ₹140; Grapes 500g: ₹65; Amul Milk 1L: ₹55; Paneer 200g: ₹85; Eggs 12 pcs: ₹85; Cheese 200g: ₹130; Coca-Cola 1.5L: ₹75; Pepsi 1.5L: ₹73; Sprite 1.5L: ₹74; Fanta 1.5L: ₹72; 7 Up 1.5L: ₹71; Basmati Rice 5kg: ₹520; Wheat Flour 5kg: ₹230; Organic Quinoa 500g: ₹420"}

CURATED RECIPES & INGREDIENT BUNDLES:
- Paneer Butter Masala (~₹240): Paneer 200g (₹85) + Tomato 1kg (₹35) + Onion 500g (₹19) + Butter (₹55) + Ginger-Garlic + Garam Masala. Cook in 20 minutes.
- Healthy Breakfast Combo (~₹295): Brown Bread (₹45) + Farm Eggs 12 pcs (₹85) + Butter (₹55) + Apple 1kg (₹110).
- Evening Chai & Snacks (~₹170): Amul Milk 1L (₹55) + Sugar (₹45) + Ginger + Biscuits (₹30) + Haldiram Bhujia (₹40).
- Veg Biryani / Pulao (~₹320): Basmati Rice (₹110) + Potato (₹20) + Onion (₹19) + Carrot (₹28) + Cooking Oil (₹140) + Spices.
- Fresh Fruit Detox Bowl (~₹295): Apple (₹110) + Banana (₹45) + Orange (₹75) + Grapes (₹65).
- Midnight Comfort Snack (~₹171): Maggi 4-pack (₹56) + Cheese 200g (₹75) + Cold Drink (₹40).

DIETARY GUIDELINES:
- High-protein: Eggs, Paneer, Quinoa, Pulses/Dals, Milk, Cheese.
- Gluten-free: Quinoa, Brown Rice, Fresh Fruits, Vegetables, Lentils.
- Jain grocery friendly: Suggest no-onion, no-garlic, no-root alternatives; highlight tomatoes, capsicum, paneer, dairy, rice, and dals.
- Diabetic-friendly: Oats, Quinoa, Green leafy vegetables, low-GI fresh fruits.

RESPONSE RULES:
1. Always be polite, concise, structured, and informative.
2. Include exact item names and estimated prices whenever suggesting products or recipe bundles.
3. Highlight that orders dispatch from the local dark store in under 10 minutes.
4. STRICT REQUIREMENT: Do NOT output any raw unicode emojis anywhere in your response. Use neat bullet points, dashes, and clean formatting.`;

        const formattedContents = [];
        formattedContents.push({
            role: "user",
            parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }]
        });

        if (Array.isArray(history) && history.length > 0) {
            for (const item of history.slice(-6)) {
                if (item.sender === 'user') {
                    formattedContents.push({ role: "user", parts: [{ text: item.text }] });
                } else if (item.sender === 'bot') {
                    formattedContents.push({ role: "model", parts: [{ text: item.text }] });
                }
            }
        }

        const models = ['gemini-flash-lite-latest', 'gemini-flash-latest'];
        let replyText = null;

        for (const model of models) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: formattedContents,
                        generationConfig: {
                            temperature: 0.6,
                            maxOutputTokens: 750
                        }
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                        replyText = data.candidates[0].content.parts[0].text;
                        break;
                    }
                }
            } catch (err) {
                continue;
            }
        }

        if (!replyText) {
            replyText = "I am ready to help you with grocery recommendations, recipe ingredients, active discount coupons, and 10-minute dark store delivery status. What would you like to order today?";
        }

        replyText = replyText.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '');

        return res.json({
            success: true,
            reply: replyText.trim()
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to complete chat request at this moment."
        });
    }
};
