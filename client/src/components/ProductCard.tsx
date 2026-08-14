import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAddToCart = async () => {
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 700);
  };

  const renderStars = (rating: number) =>
    [1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        className={`w-3 h-3 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden card-hover flex flex-col">

      {/* Image area */}
      <div className="relative overflow-hidden aspect-square bg-slate-100 dark:bg-slate-800">
        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-spring"
          style={{ transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isFeatured && (
            <span className="badge bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
          {discountPercent && (
            <span className="badge bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Action buttons — reveal on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={() => setWishlisted((p) => !p)}
            title="Save to Wishlist"
            className={`p-2 rounded-xl backdrop-blur-md border transition-all duration-200 shadow-sm ${
              wishlisted
                ? 'bg-red-500 border-red-400 text-white'
                : 'bg-white/90 dark:bg-slate-900/90 border-white/60 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-red-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
          <Link
            to={`/products/${product._id}`}
            title="Quick View"
            className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-white/60 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 backdrop-blur-md shadow-sm transition-colors duration-200"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Out of stock */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
            <span className="badge bg-slate-800 dark:bg-slate-700 text-white text-xs px-3 py-1.5">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          <span className="section-subtitle text-[10px]">{product.category}</span>
          <Link to={`/products/${product._id}`}>
            <h3 className="font-display font-semibold text-sm leading-snug text-slate-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mt-1 line-clamp-2">
              {product.title}
            </h3>
          </Link>
        </div>

        <div>
          {/* Stars + review count */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({product.reviewCount ?? 0})
            </span>
          </div>

          {/* Price + Add-to-cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || adding}
              title="Add to Cart"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                adding
                  ? 'bg-accent-500 text-white scale-95 shadow-glow-green'
                  : 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white hover:shadow-glow-sm'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs">{adding ? 'Added!' : 'Add'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
