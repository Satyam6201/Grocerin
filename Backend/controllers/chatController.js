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

        const sampleProducts = await Product.find({ inStock: true })
            .select('name category price offerPrice')
            .limit(15)
            .lean();

        const catalogSummary = sampleProducts.map(p => `${p.name} (${p.category}) - ₹${p.offerPrice || p.price}`).join(', ');

        const systemInstruction = `You are the Grocerin AI Shopping Assistant for Grocerin, India's leading 10-minute quick-commerce grocery delivery platform.
Key Information:
- Delivery SLA: Grocerin delivers fresh groceries, dairy, snacks, and daily essentials in under 10 minutes from local dark store hubs (such as Boring Road Hub #102).
- Operating Hours: 6:00 AM to 11:30 PM, 365 days a year.
- Available Departments: Organic Veggies, Fresh Fruits, Cold Drinks, Instant Food, Dairy Products, Bakery & Bread, Grains & Atta, Cooking Essentials, Personal Care.
- In-Stock Sample Products: ${catalogSummary || "Farm Spinach, Fresh Milk, Amul Paneer, Basmati Rice, Maggie Noodles, Eggs, Brown Bread, Coca Cola"}
- Current Coupons: Use code GROCER100 for ₹100 off on eligible orders, or GROCER250 for orders above ₹1499.
- Payment Methods: Stripe (Credit/Debit/RuPay cards), UPI, Net Banking, and Cash on Delivery.
- Free delivery on orders above ₹499.
- If a user asks for recipes, recommend exact ingredients available on Grocerin and offer tips.
- Keep responses friendly, concise, and helpful.
- Formatting requirement: Do NOT output any raw unicode emojis anywhere in your response. Use clear, elegant text and bullet points.`;

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
                            temperature: 0.7,
                            maxOutputTokens: 600
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
            replyText = "I am ready to help you with grocery recommendations, 10-minute delivery status, or finding recipe ingredients. How can I assist your order today?";
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
