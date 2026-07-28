import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RotateCcw, Zap } from 'lucide-react';
import { Product, Category } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { api } from '../../services/api';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products/featured'),
          api.get('/categories'),
        ]);
        if (prodRes.data.success) setFeaturedProducts(prodRes.data.data);
        if (catRes.data.success) setCategories(catRes.data.data);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const samplePrompts = [
    'warm jackets for snowfall',
    'noise cancelling bluetooth headphones',
    'ultra light running shoes',
    'smart espresso machine',
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary-400" /> Powered by MongoDB Atlas Vector Search & Redis Cache
          </span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Discover Products with <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-500 bg-clip-text text-transparent">AI Natural Intent</span>
          </h1>

          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Say goodbye to rigid keyword matches. Describe what you're looking for naturally, and enjoy sub-50ms catalog responses.
          </p>

          {/* AI Search Prompt Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            <span className="text-xs text-slate-400 self-center">Try asking:</span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/products?search=${encodeURIComponent(prompt)}`)}
                className="text-xs bg-slate-800/80 hover:bg-primary-600 text-slate-200 hover:text-white px-3 py-1.5 rounded-full border border-slate-700 hover:border-primary-500 transition shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-primary-400" /> "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Browse Categories</h2>
          <Link to="/products" className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 dark:bg-slate-800 p-4 flex flex-col justify-end text-white shadow-md hover:shadow-xl transition"
            >
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=500'}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="font-bold text-sm sm:text-base leading-snug">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">High Speed Cached Catalog</span>
            <h2 className="text-2xl font-bold tracking-tight">Featured & Trending Products</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:underline">
            Explore Store <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Value Proposition Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Cache-Aside Speed</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sub-50ms catalog response cached in Redis</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-secondary-500/10 text-secondary-600 dark:text-secondary-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Express Shipping</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Free delivery on orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Buyer Protection</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Hassle-free 30-day money back guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
