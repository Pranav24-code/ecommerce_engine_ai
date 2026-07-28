import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 flex flex-col justify-between">
      <div className="relative overflow-hidden aspect-square bg-slate-100 dark:bg-slate-800">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            Featured
          </span>
        )}
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
          title="Save to Wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
            {product.category}
          </span>
          <Link to={`/products/${product._id}`}>
            <h3 className="font-semibold text-sm line-clamp-2 text-slate-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 transition mt-1">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs text-amber-500 mb-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-medium text-slate-700 dark:text-slate-300">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900 dark:text-white">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all shadow-sm"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
