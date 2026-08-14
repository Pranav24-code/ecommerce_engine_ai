import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Heart, Send, CheckCircle2, Tag, Layers, Sparkles } from 'lucide-react';
import { Product, Review } from '../../types';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProductAndDetails = async () => {
      setLoading(true);
      try {
        const [prodRes, revRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get(`/reviews/product/${id}`),
        ]);

        if (prodRes.data.success) {
          const currentProd = prodRes.data.data;
          setProduct(currentProd);
          setSelectedImage(currentProd.images[0] || '');

          // Fetch related products in the same category
          try {
            const relRes = await api.get(`/products?category=${encodeURIComponent(currentProd.category)}&limit=4`);
            if (relRes.data.success) {
              const list = relRes.data.data.products || relRes.data.data;
              setRelatedProducts(list.filter((p: Product) => p._id !== currentProd._id));
            }
          } catch (e) {
            console.error('Failed to load related products:', e);
          }
        }

        if (revRes.data.success) {
          setReviews(revRes.data.data);
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProductAndDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !id) return;
    setSubmittingReview(true);
    try {
      const res = await api.post('/reviews', {
        productId: id,
        rating: newRating,
        comment: newComment,
      });
      if (res.data.success) {
        setReviews([res.data.data, ...reviews]);
        setNewComment('');
      }
    } catch (err) {
      console.error('Review submit failed:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 skeleton rounded-3xl"></div>
          <div className="space-y-4">
            <div className="h-8 skeleton rounded-xl w-3/4"></div>
            <div className="h-6 skeleton rounded-xl w-1/4"></div>
            <div className="h-24 skeleton rounded-2xl"></div>
            <div className="h-12 skeleton rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Product Not Found</h2>
        <p className="text-slate-500 text-sm">The requested item could not be retrieved from the database catalog.</p>
        <Link to="/products" className="btn-primary inline-flex">Return to Catalog</Link>
      </div>
    );
  }

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Top Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Gallery */}
        <div className="space-y-4 sticky top-24">
          <div className="aspect-square bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-card relative group">
            <img
              src={selectedImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {discountPercent && (
              <span className="absolute top-4 left-4 badge bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs px-3 py-1 shadow-md">
                -{discountPercent}% OFF
              </span>
            )}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md border shadow-sm transition-all duration-200 ${
                wishlisted
                  ? 'bg-red-500 text-white border-red-400'
                  : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border-white/60 dark:border-slate-700 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hidden">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 shrink-0 ${
                    selectedImage === img ? 'border-primary-500 scale-95 shadow-glow-sm' : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Purchase Controls */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge-primary text-xs uppercase tracking-wider">
                {product.category}
              </span>
              {product.isFeatured && (
                <span className="badge-gradient text-xs">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span>Brand: <strong className="text-slate-800 dark:text-slate-200">{product.brand || 'Generic'}</strong></span>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-slate-900 dark:text-white">{product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} Reviews)</span>
              </div>
              <span>•</span>
              <span className={`font-bold ${product.stock > 0 ? 'text-accent-500' : 'text-red-500'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl glass border border-slate-200/80 dark:border-slate-800 flex items-baseline gap-3">
            <span className="text-3xl font-display font-bold text-slate-900 dark:text-white">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-slate-400 line-through">
                ₹{product.originalPrice}
              </span>
            )}
            {discountPercent && (
              <span className="text-xs font-bold text-accent-500 ml-auto">
                Save ₹{(product.originalPrice! - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Value Highlights */}
          <div className="grid grid-cols-3 gap-3 py-2">
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-center space-y-1">
              <Truck className="w-4 h-4 text-primary-500 mx-auto" />
              <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Free Express Delivery</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-center space-y-1">
              <ShieldCheck className="w-4 h-4 text-accent-500 mx-auto" />
              <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">2-Year Warranty</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-center space-y-1">
              <RotateCcw className="w-4 h-4 text-secondary-500 mx-auto" />
              <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">30-Day Returns</div>
            </div>
          </div>

          {/* Specifications Table */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary-500" /> Specifications
              </h3>
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden divide-y divide-slate-200/60 dark:divide-slate-800 text-xs">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-3 p-3 bg-white dark:bg-slate-900/60">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{key}</span>
                    <span className="col-span-2 text-slate-900 dark:text-slate-100 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Cart Action */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary py-3.5 shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {addedNotice ? (
                  <span className="flex items-center justify-center gap-2 text-white font-bold">
                    <CheckCircle2 className="w-5 h-5" /> Added to Shopping Cart!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> Add to Shopping Cart
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Related Category Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-slate-200/80 dark:border-slate-800 pt-12 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="section-subtitle">More From {product.category}</span>
              <h2 className="section-title text-slate-900 dark:text-white mt-1">Related Products</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd._id} product={relProd} />
            ))}
          </div>
        </div>
      )}

      {/* Customer Reviews & Form */}
      <div className="border-t border-slate-200/80 dark:border-slate-800 pt-12 space-y-8">
        <h2 className="section-title text-slate-900 dark:text-white">Customer Reviews & Ratings</h2>

        {user ? (
          <form onSubmit={handleReviewSubmit} className="glass p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Write a Product Review</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Your Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="text-amber-400 hover:scale-110 transition"
                >
                  <Star className={`w-5 h-5 ${star <= newRating ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your detailed experience with this product..."
              className="input"
            ></textarea>

            <button
              type="submit"
              disabled={submittingReview}
              className="btn-primary py-2.5 px-6"
            >
              <Send className="w-4 h-4" /> Submit Review
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-500 text-center">
            Please <Link to="/login" className="text-primary-600 font-bold hover:underline">Sign In</Link> to write a customer review.
          </div>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-slate-500">No reviews submitted yet for this product.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="glass p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">{rev.userName}</span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{rev.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{rev.comment}</p>
                <span className="text-[10px] text-slate-400 block pt-1">{new Date(rev.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
