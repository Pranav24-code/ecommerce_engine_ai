import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Sparkles, SlidersHorizontal, X, Search, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Product, Category } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { api } from '../../services/api';

const PRODUCTS_PER_PAGE = 24;

export const ProductListing: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const currentPage = Number(searchParams.get('page') || '1');

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
        const params: any = { limit: PRODUCTS_PER_PAGE, page: currentPage };

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
          const payload = currentSearch ? res.data.data : res.data.data;
          if (currentSearch) {
            const list = Array.isArray(payload) ? payload : payload.products || [];
            setProducts(list);
            setTotalProducts(list.length);
            setTotalPages(1);
          } else {
            const list = payload.products || payload || [];
            const pagination = payload.pagination;
            setProducts(list);
            setTotalProducts(pagination?.total ?? list.length);
            setTotalPages(pagination?.pages ?? 1);
          }
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory, currentSearch, currentSort, minPrice, maxPrice, currentPage]);

  const handleCategoryChange = (catName: string) => {
    const params = new URLSearchParams(searchParams);
    if (catName === 'All') params.delete('category');
    else params.set('category', catName);
    params.delete('page'); // reset to page 1 on category change
    setSearchParams(params);
  };

  const handleSortChange = (sortVal: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sortVal);
    params.delete('page');
    setSearchParams(params);
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    params.delete('page');
    setSearchParams(params);
  };

  const goToPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, setSearchParams]);

  // Build page numbers to show
  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
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
                : totalProducts > 0
                  ? `Showing ${Math.min((currentPage - 1) * PRODUCTS_PER_PAGE + 1, totalProducts)}–${Math.min(currentPage * PRODUCTS_PER_PAGE, totalProducts)} of ${totalProducts} products${currentCategory !== 'All' ? ` in "${currentCategory}"` : ''}`
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
        <div className="lg:col-span-3 space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, n) => (
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800">
                  {/* Prev */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1.5">
                    {getPageNumbers().map((p, idx) =>
                      p === '...' ? (
                        <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 text-sm select-none">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => goToPage(p as number)}
                          className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            currentPage === p
                              ? 'bg-primary-600 text-white shadow-glow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                  </div>

                  {/* Next */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Page info text */}
              {totalPages > 1 && (
                <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                  Page {currentPage} of {totalPages} · {totalProducts} total products
                </p>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
