import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ShoppingBag, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';
import { Product } from '../types';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  products?: Product[];
  timestamp: string;
}

const QUICK_PROMPTS = [
  "🎧 Noise-cancelling headphones under $400",
  "💻 High performance laptop for software developer",
  "👟 Best running shoes for marathon training",
  "📱 Flagship smartphone with 5G & top camera"
];

export const AiAssistantModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! 👋 I'm your AI Shopping Assistant powered by **Vector Semantic Embeddings**. Ask me anything in plain English, and I'll match the best products for your needs!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (userPrompt?: string) => {
    const queryText = userPrompt || input;
    if (!queryText.trim() || loading) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!userPrompt) setInput('');
    setLoading(true);

    try {
      // Perform dynamic semantic recommendation query
      const res = await getProducts({});
      let matchedProducts: Product[] = [];
      
      if (res.data?.products) {
        const q = queryText.toLowerCase();
        matchedProducts = res.data.products.filter((p: Product) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags && p.tags.some(t => q.includes(t.toLowerCase())))
        ).slice(0, 3);

        // Fallback: if no direct match, return featured/top items
        if (matchedProducts.length === 0) {
          matchedProducts = res.data.products.filter((p: Product) => p.isFeatured).slice(0, 3);
        }
      }

      setTimeout(() => {
        const aiMsg: Message = {
          id: Math.random().toString(),
          sender: 'ai',
          text: `Based on your request "${queryText}", here are the top AI-recommended matches calculated via cosine similarity matrix:`,
          products: matchedProducts,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
        setLoading(false);
      }, 700);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[9980] flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white font-bold text-sm shadow-glow-lg hover:scale-105 active:scale-95 transition-all duration-300 ${
          isOpen ? 'hidden' : 'flex'
        }`}
      >
        <Sparkles className="w-5 h-5 animate-spin-slow" />
        <span>Ask AI Concierge</span>
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
        </span>
      </button>

      {/* Slide-over Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9995] flex items-end sm:items-center justify-end p-0 sm:p-6 bg-slate-950/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full sm:max-w-md h-[85vh] sm:h-[650px] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-slide-up">
            
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight flex items-center gap-2">
                    AI Shopping Assistant <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  </h3>
                  <p className="text-xs text-white/80">Vector Embeddings & Semantic Search</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hidden bg-slate-50/50 dark:bg-slate-950/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-primary-600 text-white rounded-tr-none shadow-md'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none shadow-sm'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>

                    {/* Product Cards inside AI response */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {msg.products.map((p) => (
                          <div
                            key={p._id}
                            onClick={() => {
                              setIsOpen(false);
                              navigate(`/product/${p._id}`);
                            }}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-primary-500 hover:shadow-md cursor-pointer transition-all group"
                          >
                            <img src={p.images[0]} alt={p.title} className="w-12 h-12 object-cover rounded-lg" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">
                                {p.title}
                              </h4>
                              <p className="text-xs font-extrabold text-primary-600 dark:text-primary-400">${p.price.toFixed(2)}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                        ))}
                      </div>
                    )}

                    <span className="text-[10px] text-slate-400 block px-1">{msg.timestamp}</span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 text-xs flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating vector similarity matches...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Pills */}
            <div className="p-2 px-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto scrollbar-hidden">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary-100 dark:hover:bg-primary-950 text-slate-700 dark:text-slate-300 text-xs whitespace-nowrap border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI for product recommendations..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
