import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Flame, 
  RefreshCw, 
  Cpu, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Tag, 
  CheckCircle2, 
  Award,
  Smartphone,
  Shirt,
  Footprints,
  Home as HomeIcon,
  Gamepad2,
  Dumbbell
} from 'lucide-react';
import { Product, Category } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [departmentProducts, setDepartmentProducts] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const navigate = useNavigate();

  // Flash Sale Countdown State
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const heroBanners = [
    {
      title: 'Next-Gen Tech & Electronics Fest',
      subtitle: 'Apple, Sony, Samsung, Dell & Bose — Up to 40% OFF with AI Recommendation',
      tag: 'Tech Mega Event',
      bgGradient: 'from-slate-950 via-sky-950 to-slate-900',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      buttonText: 'Shop Electronics',
      category: 'Electronics',
      prompt: 'noise cancelling bluetooth headphones',
    },
    {
      title: 'Global Footwear & Athletic Sneakers',
      subtitle: 'Nike, Adidas, Puma, Reebok, Asics & New Balance Latest Drops',
      tag: 'New Season Footwear',
      bgGradient: 'from-slate-950 via-emerald-950 to-slate-900',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      buttonText: 'Explore Shoe Catalog',
      category: 'Shoes',
      prompt: 'ultra light running shoes',
    },
    {
      title: 'Premium Fashion & Designer Outfits',
      subtitle: 'Levi\'s, Tommy Hilfiger, Calvin Klein, Zara & Ralph Lauren Collection',
      tag: 'Style Trends 2026',
      bgGradient: 'from-slate-950 via-rose-950 to-slate-900',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      buttonText: 'Shop Fashion',
      category: 'Fashion',
      prompt: 'warm jackets for snowfall',
    },
    {
      title: 'Smart Home & Gourmet Kitchen',
      subtitle: 'DeLonghi, Ninja, Vitamix, KitchenAid & Herman Miller Essentials',
      tag: 'Home Refresh Sale',
      bgGradient: 'from-slate-950 via-amber-950 to-slate-900',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      buttonText: 'Upgrade Home',
      category: 'Home & Kitchen',
      prompt: 'smart espresso machine',
    },
  ];

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(bannerTimer);
  }, [heroBanners.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products/featured'),
          api.get('/categories'),
        ]);

        if (prodRes.data.success) setFeaturedProducts(prodRes.data.data);
        if (catRes.data.success) setCategories(catRes.data.data);

        // Fetch sample products for specific departments (Shoes, Electronics, Fashion, Home & Kitchen)
        const depts = ['Shoes', 'Electronics', 'Fashion', 'Home & Kitchen'];
        const deptData: Record<string, Product[]> = {};

        await Promise.all(
          depts.map(async (d) => {
            try {
              const res = await api.get(`/products?category=${encodeURIComponent(d)}&limit=4`);
              if (res.data.success) {
                deptData[d] = res.data.data.products || res.data.data;
              }
            } catch (err) {
              console.error(`Failed to load ${d} products:`, err);
            }
          })
        );
        setDepartmentProducts(deptData);

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
    '4k gaming oled monitor',
  ];

  return (
    <div className="space-y-16 pb-16">

      {/* ─── Hero Carousel Banner ──────────────────────────────────── */}
      <section className="relative overflow-hidden mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-3xl border border-slate-800 shadow-2xl">
        <div className={`bg-gradient-to-r ${heroBanners[heroIndex].bgGradient} transition-all duration-700`}>
          
          {/* Ambient Glow Effects */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-600/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary-600/20 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Banner Text Content */}
            <div className="lg:col-span-8 space-y-6 text-white text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className={heroBanners[heroIndex].badgeColor}>{heroBanners[heroIndex].tag}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.15]">
                {heroBanners[heroIndex].title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-lg max-w-2xl font-normal leading-relaxed">
                {heroBanners[heroIndex].subtitle}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate(`/products?category=${encodeURIComponent(heroBanners[heroIndex].category)}`)}
                  className="btn-primary py-3.5 px-8 text-sm sm:text-base font-bold shadow-glow hover:shadow-glow-lg transition-all"
                >
                  {heroBanners[heroIndex].buttonText} <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <button
                  onClick={() => navigate(`/products?search=${encodeURIComponent(heroBanners[heroIndex].prompt)}`)}
                  className="btn-ghost py-3.5 px-6 text-sm border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 backdrop-blur-md"
                >
                  <Sparkles className="w-4 h-4 text-primary-400" /> Try AI Intent Search
                </button>
              </div>

              {/* Prompts Tag Row */}
              <div className="pt-4 flex items-center gap-2 text-xs text-slate-400">
                <span>Popular AI Searches:</span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePrompts.slice(0, 3).map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(`/products?search=${encodeURIComponent(prompt)}`)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-primary-600 text-slate-300 hover:text-white border border-slate-800 text-[11px] transition-colors"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Banner Quick Highlights / Badges */}
            <div className="lg:col-span-4 hidden lg:block space-y-4">
              <div className="p-5 rounded-2xl glass-dark border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-primary-400 font-bold text-xs uppercase tracking-wider">
                  <Zap className="w-4 h-4" /> Redis Powered Cache
                </div>
                <div className="text-white font-display font-extrabold text-2xl">Sub-50ms Response</div>
                <div className="text-xs text-slate-400">Ultra-fast category listings cached in Redis Upstash</div>
              </div>

              <div className="p-5 rounded-2xl glass-dark border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-secondary-400 font-bold text-xs uppercase tracking-wider">
                  <Cpu className="w-4 h-4" /> AI Vector Matching
                </div>
                <div className="text-white font-display font-extrabold text-2xl">1536d Embeddings</div>
                <div className="text-xs text-slate-400">Natural language search backed by MongoDB Atlas</div>
              </div>
            </div>

          </div>

          {/* Carousel Slider Navigation Controls */}
          <div className="relative z-20 max-w-7xl mx-auto px-6 pb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {heroBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeroIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    heroIndex === idx ? 'w-8 bg-primary-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-white">
              <button
                onClick={() => setHeroIndex((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1))}
                className="p-2 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-primary-600 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setHeroIndex((prev) => (prev + 1) % heroBanners.length)}
                className="p-2 rounded-full bg-slate-900/80 border border-slate-700 hover:bg-primary-600 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Flash Sale & Deals of the Day ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500 text-white shadow-glow-rose">
                <Flame className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <span className="section-subtitle text-rose-500 dark:text-rose-400 font-extrabold uppercase">Limited Time Offer</span>
                <h2 className="section-title text-slate-900 dark:text-white mt-0.5">Deals of the Day</h2>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl border border-slate-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-slate-400">Ends in:</span>
              <div className="font-mono font-bold text-sm tracking-wider text-amber-400">
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </div>
            </div>
          </div>

          {/* Flash Sale Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>

        </div>
      </section>

      {/* ─── Category Grid (Shop by Department) ──────────────────── */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="section-subtitle">Multi-Department Marketplace</span>
            <h2 className="section-title text-slate-900 dark:text-white mt-1">Shop By Category</h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1.5 hover:gap-2.5 transition-all"
          >
            Explore All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center flex flex-col items-center gap-3 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=300'}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-display font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-1">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Department Spotlight 1: Shoes & Footwear ─────────────── */}
      {departmentProducts['Shoes'] && departmentProducts['Shoes'].length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <span className="section-subtitle">Top Footwear Brands</span>
                <h2 className="section-title text-slate-900 dark:text-white mt-0.5">
                  Nike, Adidas, Puma, Reebok & Asics Sneakers
                </h2>
              </div>
            </div>
            <Link
              to="/products?category=Shoes"
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
              View All Shoes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {departmentProducts['Shoes'].map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* ─── Department Spotlight 2: Electronics & Tech ──────────── */}
      {departmentProducts['Electronics'] && departmentProducts['Electronics'].length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="section-subtitle">Electronics & Gadgets</span>
                <h2 className="section-title text-slate-900 dark:text-white mt-0.5">
                  Apple, Sony, Samsung, Dell & Bose Innovations
                </h2>
              </div>
            </div>
            <Link
              to="/products?category=Electronics"
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
              View Electronics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {departmentProducts['Electronics'].map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* ─── Department Spotlight 3: Fashion & Style ─────────────── */}
      {departmentProducts['Fashion'] && departmentProducts['Fashion'].length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <span className="section-subtitle">Apparel & Winter Collection</span>
                <h2 className="section-title text-slate-900 dark:text-white mt-0.5">
                  Levi's, Tommy Hilfiger, Calvin Klein & Zara Outfits
                </h2>
              </div>
            </div>
            <Link
              to="/products?category=Fashion"
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
              View Fashion <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {departmentProducts['Fashion'].map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* ─── Value Proposition & Assurance Badges ────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="glass p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">100% Authentic Brands</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sourced directly from certified brand distributors.</p>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Express Delivery</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Fast shipping with real-time tracking across all locations.</p>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-4">
            <div className="p-6.5 rounded-2xl bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">30-Day Easy Returns</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Hassle-free replacement guarantee on every purchase.</p>
            </div>
          </div>

          <div className="glass p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Secure Encrypted Payments</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">256-bit SSL encrypted checkout and COD options.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
