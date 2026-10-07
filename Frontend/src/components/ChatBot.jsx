import React, { useState, useRef, useEffect } from 'react';
import {
    HiSparkles,
    HiXMark,
    HiPaperAirplane,
    HiTrash
} from 'react-icons/hi2';
import { useAppContext } from '../context/AppContext';

const SUGGESTED_PROMPTS = [
    "What is your 10-minute delivery SLA?",
    "Paneer Butter Masala recipe & cost",
    "Show active discount coupons",
    "Healthy breakfast bundle under ₹300",
    "Return & refund policy details",
    "Recommend organic veggies in stock"
];

const ChatBot = () => {
    const { axios } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 'welcome',
            sender: 'bot',
            text: "Hello! I am your Grocerin AI Shopping Assistant. How can I help you with fresh groceries, quick recipes, or 10-minute delivery today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async (messageToSend) => {
        const text = (messageToSend || input).trim();
        if (!text || loading) return;

        const userMsg = { id: Date.now().toString(), sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const history = messages.slice(-6).map(m => ({ sender: m.sender, text: m.text }));
            const { data } = await axios.post('/api/chat', {
                message: text,
                history
            });

            if (data.success && data.reply) {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    sender: 'bot',
                    text: data.reply
                }]);
            } else {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    sender: 'bot',
                    text: "I am ready to assist your grocery orders. Our local dark store is dispatching in under 10 minutes. What would you like to add to your cart?"
                }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: "Our AI assistant is momentarily busy. Please try asking again, or browse our grocery catalog directly."
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setMessages([
            {
                id: 'welcome',
                sender: 'bot',
                text: "Chat cleared. What groceries or recipes can I help you find today?"
            }
        ]);
    };

    return (
        <div className={`fixed z-50 transition-all duration-300 ${isOpen ? 'bottom-4 sm:bottom-6 right-3 sm:right-6' : 'bottom-20 sm:bottom-6 right-4 sm:right-6'}`}>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Open AI Assistant"
                    className="relative group bg-linear-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white p-3.5 sm:p-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2.5 cursor-pointer border border-emerald-400/30"
                >
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
                    
                    <HiSparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                    <span className="hidden sm:inline font-bold text-xs tracking-wide">
                        Ask Grocerin AI
                    </span>
                </button>
            )}

            {isOpen && (
                <div className="w-[calc(100vw-24px)] sm:w-[380px] md:w-[410px] h-[520px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-250">
                    
                    <div className="bg-linear-to-r from-emerald-800 to-teal-900 text-white p-4 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 backdrop-blur-xs">
                                <HiSparkles className="w-5 h-5 text-amber-300" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
                                    <span>Grocerin AI Assistant</span>
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                                </h3>
                                <p className="text-[10px] text-emerald-100/80">Hyperlocal 10-Min Grocery Intelligence</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleClear}
                                title="Clear conversation"
                                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
                            >
                                <HiTrash className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                title="Close Assistant"
                                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
                            >
                                <HiXMark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                                        m.sender === 'user'
                                            ? 'bg-emerald-700 text-white rounded-br-xs shadow-xs font-medium'
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-xs shadow-2xs font-normal'
                                    }`}
                                >
                                    {m.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 text-gray-500 rounded-2xl rounded-bl-xs p-3 shadow-2xs flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.15s]" />
                                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.3s]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length <= 2 && (
                        <div className="p-2.5 bg-white border-t border-gray-100 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                            {SUGGESTED_PROMPTS.map((p, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(p)}
                                    className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-800 border border-gray-200 transition cursor-pointer"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    )}

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about groceries, recipes, or delivery..."
                            className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 focus:border-emerald-600 rounded-xl text-xs outline-none transition"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl transition cursor-pointer shrink-0 shadow-xs"
                        >
                            <HiPaperAirplane className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
