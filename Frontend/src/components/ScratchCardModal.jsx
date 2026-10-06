import React, { useRef, useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { HiXMark, HiSparkles, HiGift, HiCheck, HiClipboardDocument } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const ScratchCardModal = () => {
    const { showScratchCardModal, setShowScratchCardModal, applyCoupon } = useAppContext();
    const canvasRef = useRef(null);
    const [isScratched, setIsScratched] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [couponCode, setCouponCode] = useState('SUPERDEV');
    const [couponDesc, setCouponDesc] = useState('30% SDE Special Discount (Up to ₹300)');

    useEffect(() => {
        if (!showScratchCardModal) {
            setIsScratched(false);
            return;
        }

        const codes = [
            { code: 'SUPERDEV', desc: '30% SDE Candidate Special Discount (Up to ₹300)' },
            { code: 'GROCER250', desc: 'Flat ₹250 Off on orders above ₹1499' },
            { code: 'FIRSTBITE', desc: 'Flat 20% Instant Savings on First Order' },
            { code: 'FREEDEL', desc: '100% Free 10-Minute Instant Delivery' }
        ];
        const randomChoice = codes[Math.floor(Math.random() * codes.length)];
        setCouponCode(randomChoice.code);
        setCouponDesc(randomChoice.desc);

        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#94a3b8'; // Slate silver foil
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add shimmering scratch foil pattern
            ctx.fillStyle = '#64748b';
            ctx.font = 'bold 14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('✨ SCRATCH HERE TO REVEAL ✨', canvas.width / 2, canvas.height / 2);
        }
    }, [showScratchCardModal]);

    if (!showScratchCardModal) return null;

    const scratch = (clientX, clientY) => {
        const canvas = canvasRef.current;
        if (!canvas || isScratched) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2, false);
        ctx.fill();

        // Check scratched percentage
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparentPixels = 0;
        for (let i = 3; i < imgData.data.length; i += 4) {
            if (imgData.data[i] === 0) transparentPixels++;
        }

        const percent = (transparentPixels / (imgData.data.length / 4)) * 100;
        if (percent > 40 && !isScratched) {
            setIsScratched(true);
            try {
                import('canvas-confetti').then(module => {
                    module.default({
                        particleCount: 100,
                        spread: 80,
                        origin: { y: 0.6 }
                    });
                });
            } catch (e) {}
            toast.success(`You unlocked ${couponCode}!`, { icon: '🎁' });
        }
    };

    const handleMouseDown = () => setIsDrawing(true);
    const handleMouseUp = () => setIsDrawing(false);
    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        scratch(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
        if (e.touches && e.touches[0]) {
            scratch(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const handleApplyAndClose = () => {
        applyCoupon(couponCode);
        setShowScratchCardModal(false);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(couponCode);
        toast.success(`Copied ${couponCode} to clipboard!`);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-sm p-6 overflow-hidden animate-in zoom-in-95 duration-250 text-center flex flex-col items-center"
            >
                <button
                    onClick={() => setShowScratchCardModal(false)}
                    className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                >
                    <HiXMark className="w-5 h-5" />
                </button>

                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mb-2 shadow-xs">
                    <HiGift className="w-6 h-6 text-amber-600 animate-bounce" />
                </div>

                <h3 className="text-lg font-black text-gray-900 tracking-tight">
                    Lucky Grocery Scratch Card
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 max-w-xs">
                    Scratch the surface below with your mouse or finger to reveal an instant reward!
                </p>

                {/* Scratch Canvas Card Container */}
                <div className="relative w-64 h-36 my-5 rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-600 to-teal-800 flex flex-col items-center justify-center text-white p-3 select-none">
                    {/* Underlying Secret Reward */}
                    <div className="flex flex-col items-center justify-center space-y-1">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-200">
                            PROMO REWARD CODE
                        </span>
                        <span className="text-2xl font-black tracking-widest text-amber-300 font-mono">
                            {couponCode}
                        </span>
                        <p className="text-[10px] text-emerald-100 font-semibold px-2 text-center">
                            {couponDesc}
                        </p>
                    </div>

                    {/* Scratch Canvas Foil */}
                    <canvas
                        ref={canvasRef}
                        width={256}
                        height={144}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleTouchMove}
                        className={`absolute inset-0 cursor-crosshair transition-opacity duration-500 ${
                            isScratched ? 'pointer-events-none opacity-0' : 'opacity-100'
                        }`}
                    />
                </div>

                {isScratched ? (
                    <div className="w-full space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <button
                            onClick={handleApplyAndClose}
                            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                            <HiSparkles className="w-4 h-4 text-amber-300" />
                            <span>Apply {couponCode} to Cart Now</span>
                        </button>
                        <button
                            onClick={copyCode}
                            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1"
                        >
                            <HiClipboardDocument className="w-3.5 h-3.5" />
                            <span>Copy Coupon Code</span>
                        </button>
                    </div>
                ) : (
                    <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <HiSparkles className="text-amber-500 text-sm" />
                        <span>Rub with cursor or finger to claim!</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default ScratchCardModal;
