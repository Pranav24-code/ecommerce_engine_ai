import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Sparkles, SlidersHorizontal, X, Search, ChevronRight } from 'lucide-react';
import { Product, Category } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { api } from '../../services/api';

export const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        if (res.data.success) setCategories(res.data.data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let endpoint = '/products';
        const params: any = {};

        if (currentSearch) {
          endpoint = '/search';
          params.q = currentSearch;
          if (currentCategory !== 'All') params.category = currentCategory;
          if (minPrice) params.minPrice = minPrice;
          if (maxPrice) params.maxPrice = maxPrice;
        } else {
          if (currentCategory !== 'All') params.category = currentCategory;
          if (currentSort) params.sort = currentSort;
          if (minPrice) params.minPrice = minPrice;
          if (maxPrice) params.maxPrice = maxPrice;
        }

        const res = await api.get(endpoint, { params });
        if (res.data.success) {
          const list = currentSearch ? res.data.data : res.data.data.products || res.data.data;
          setProducts(list);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory, currentSearch, currentSort, minPrice, maxPrice]);

  const handleCategoryChange = (catName: string) => {
    const params = new URLSearchParams(searchParams);
    if (catName === 'All') params.delete('category');
    else params.set('category', catName);
    setSearchParams(params);
  };

  const handleSortChange = (sortVal: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sortVal);
    setSearchParams(params);
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Header Banner */}
      <div className="glass p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="section-subtitle">Catalog Directory</span>
              {currentSearch && (
                <span className="badge-gradient text-[10px]">
                  <Sparkles className="w-3 h-3" /> Vector Search Active
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              {currentSearch ? (
                <>
                  Results for "<span className="gradient-text">{currentSearch}</span>"
                </>
              ) : (
                currentCategory === 'All' ? 'All Products' : currentCategory
              )}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {currentSearch
                ? `Showing semantically matching products powered by MongoDB Atlas Vector embeddings.`
                : `Showing products filtered by category: ${currentCategory}`}
            </p>
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="input py-2 px-3.5 text-sm font-medium w-auto cursor-pointer"
            >
              <option value="newest">Sort by: Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Active Filters Chips */}
        {(currentSearch || currentCategory !== 'All') && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-400">Active Filters:</span>
            {currentCategory !== 'All' && (
              <span className="badge bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 gap-1.5 pl-3 pr-2 py-1">
                Category: {currentCategory}
                <button onClick={() => handleCategoryChange('All')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {currentSearch && (
              <span className="badge bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 gap-1.5 pl-3 pr-2 py-1 border border-primary-300 dark:border-primary-800">
                Search: "{currentSearch}"
                <button onClick={clearSearch} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filter Sidebar */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 sticky top-24 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary-500" /> Filter Categories
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                {categories.length} Total
              </span>
            </div>

            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
              <button
                onClick={() => handleCategoryChange('All')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                  currentCategory === 'All'
                    ? 'bg-primary-600 text-white shadow-glow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>All Products</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>

              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    currentCategory === cat.name
                      ? 'bg-primary-600 text-white shadow-glow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-88 skeleton rounded-2xl"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="glass text-center py-20 px-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                No matching products found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                We couldn't find anything matching your search criteria. Try asking with different keywords or clear your active category filters.
              </p>
              <button
                onClick={() => {
                  setSearchParams(new URLSearchParams());
                }}
                className="btn-primary"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
