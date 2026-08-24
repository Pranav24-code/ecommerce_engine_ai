import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles, Command, ArrowRight, History, Tag, TrendingUp } from 'lucide-react';
import { getProducts } from '../services/api';
import { Product } from '../types';

interface InstantSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ['MacBook Pro', 'iPhone 15', 'Nike Air Max', 'Sony Headphones', 'Wireless Earbuds', 'Gaming Keyboard'];

export const InstantSearchModal: React.FC<InstantSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Keyboard focus & escape handler
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Debounced search fetching
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await getProducts({ category: '', minPrice: 0 });
        if (res.data?.products) {
          const q = query.toLowerCase();
          const filtered = res.data.products.filter((p: Product) =>
            p.title.toLowerCase().includes(q) ||
            (p.category && p.category.toLowerCase().includes(q)) ||
            (p.brand && p.brand.toLowerCase().includes(q)) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
          ).slice(0, 6);
          setResults(filtered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectProduct = (product: Product) => {
    saveRecentSearch(product.title);
    onClose();
    navigate(`/product/${product._id}`);
  };

  const handleSearchSubmit = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    saveRecentSearch(searchTerm);
    onClose();
    navigate(`/products?category=All&query=${encodeURIComponent(searchTerm)}`);
  };

  const saveRecentSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent_searches');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="relative flex items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-primary-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(query)}
            placeholder="Search products, brands, or categories... (Press Enter)"
            className="w-full pl-4 pr-10 py-2 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-base sm:text-lg font-medium"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <Command className="w-3 h-3" /> ESC
            </kbd>
          )}
        </div>

        {/* Results / Default State */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 scrollbar-hidden">
          {query.trim() !== '' ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {loading ? 'Searching live catalog...' : `Results (${results.length})`}
                </span>
                <button
                  onClick={() => handleSearchSubmit(query)}
                  className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
                >
                  View all results <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {results.map((product) => (
                    <button
                      key={product._id}
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all text-left group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400">
                            {product.category}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">{product.brand}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {product.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{product.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-extrabold text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : !loading ? (
                <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                  <Search className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-600 opacity-60" />
                  <p className="font-semibold text-base">No matching products found for "{query}"</p>
                  <p className="text-xs mt-1">Try searching for keywords like "iPhone", "Headphones", or "Nike"</p>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5" /> Recent Searches
                    </span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSearchSubmit(term)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all flex items-center gap-1.5"
                      >
                        <Tag className="w-3 h-3 text-slate-400" /> {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-secondary-500" /> Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearchSubmit(term)}
                      className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-primary-500" /> {term}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>Tip: Type product name or category</span>
          <span className="flex items-center gap-1 font-mono">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">↵</kbd> to search</span>
        </div>
      </div>
    </div>
  );
};
