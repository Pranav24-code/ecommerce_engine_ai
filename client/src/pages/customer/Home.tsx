import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Zap, Flame, RefreshCw, Cpu, Layers } from 'lucide-react';
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
    <div className="space-y-20 pb-12">

      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 border border-slate-800 shadow-card-hover">
        {/* Glow Spheres */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-600/30 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary-600/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full dot-grid opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 relative z-10 text-center space-y-8">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-glow-sm animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" /> MongoDB Atlas Vector Search + Redis Sub-50ms Cache
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] text-balance">
            Discover Products with <br className="hidden sm:inline" />
            <span className="gradient-text">AI Natural Intent</span>
          </h1>

          {/* Description */}
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-xl font-normal leading-relaxed text-balance">
            Say goodbye to rigid keyword matches. Describe what you're looking for naturally, and enjoy lightning-fast, context-aware responses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/products"
              className="btn-primary py-3.5 px-8 text-base shadow-glow hover:shadow-glow-lg transition-all duration-300"
            >
              Explore Full Catalog <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#categories"
              className="btn-ghost py-3.5 px-8 text-base border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 backdrop-blur-md"
            >
              Browse Categories
            </a>
          </div>

          {/* AI Search Prompt Pills */}
          <div className="pt-6 border-t border-slate-800/80 max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Try Natural Language Queries:
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/products?search=${encodeURIComponent(prompt)}`)}
                  className="text-xs bg-slate-900/90 hover:bg-primary-600 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl border border-slate-800 hover:border-primary-500 transition-all duration-200 shadow-sm flex items-center gap-2 group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary-400 group-hover:text-white transition-colors" />
                  <span>"{prompt}"</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stat Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="text-2xl font-display font-bold text-white">&lt;50ms</div>
              <div className="text-xs text-slate-400">Redis Response Time</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="text-2xl font-display font-bold text-primary-400">1536d</div>
              <div className="text-xs text-slate-400">Vector Embeddings</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="text-2xl font-display font-bold text-secondary-400">99.9%</div>
              <div className="text-xs text-slate-400">Cache Hit Ratio</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <div className="text-2xl font-display font-bold text-accent-400">JWT + RBAC</div>
              <div className="text-xs text-slate-400">Enterprise Security</div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Categories Grid ─────────────────────────────────────── */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="section-subtitle">Curated Catalog</span>
            <h2 className="section-title text-slate-900 dark:text-white mt-1">Browse Categories</h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1.5 hover:gap-2.5 transition-all"
          >
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 dark:bg-slate-800 flex flex-col justify-end p-4 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={cat.image || 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=500'}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-spring"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent transition-opacity" />
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-primary-400 uppercase tracking-wider block">Explore</span>
                <h3 className="font-display font-bold text-base text-white leading-snug">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Products ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="section-subtitle flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" /> High-Performance Redis Cache
            </span>
            <h2 className="section-title text-slate-900 dark:text-white mt-1">
              Featured & Trending Products
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1.5 hover:gap-2.5 transition-all"
          >
            Explore Full Store <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-88 skeleton rounded-2xl"></div>
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

      {/* ─── Value Proposition Cards ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="glass p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-4 card-hover">
            <div className="p-4 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Cache-Aside Speed
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Sub-50ms catalog responses cached directly in Upstash Redis to bypass DB bottlenecks.
              </p>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-4 card-hover">
            <div className="p-4 rounded-2xl bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Vector Semantic Search
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                MongoDB Atlas 1536-dim vector embeddings translate natural language intents into accurate items.
              </p>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-4 card-hover">
            <div className="p-4 rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Enterprise Guardrails
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Secure JWT access tokens, refresh rotation, and role-based access control (RBAC).
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
