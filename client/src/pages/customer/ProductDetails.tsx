import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Heart, Send } from 'lucide-react';
import { Product, Review } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setLoading(true);
      try {
        const [prodRes, revRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get(`/reviews/product/${id}`),
        ]);

        if (prodRes.data.success) {
          setProduct(prodRes.data.data);
          setSelectedImage(prodRes.data.data.images[0] || '');
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
    if (id) fetchProductAndReviews();
  }, [id]);

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
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Top Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
            <img src={selectedImage} alt={product.title} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === img ? 'border-primary-500 scale-95' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950 px-3 py-1 rounded-full border border-primary-200 dark:border-primary-800">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3 leading-tight">
              {product.title}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Brand: <span className="font-semibold text-slate-700 dark:text-slate-300">{product.brand}</span></p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-slate-800 dark:text-slate-100">{product.rating}</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-sm text-slate-500">{reviews.length} Customer Reviews</span>
            <span className="text-slate-300">|</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${product.stock > 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-red-100 text-red-700'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-slate-400 line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Controls & Add to Cart */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary-600 text-white font-semibold hover:bg-primary-700 shadow-lg shadow-primary-500/25 transition"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Shopping Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews & Ratings */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-12 space-y-8">
        <h2 className="text-2xl font-bold">Customer Reviews & Ratings</h2>

        {user && (
          <form onSubmit={handleReviewSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="font-bold text-sm">Write a Product Review</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Rating:</span>
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
              placeholder="Share your feedback about this item..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            ></textarea>

            <button
              type="submit"
              disabled={submittingReview}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition"
            >
              <Send className="w-4 h-4" /> Submit Review
            </button>
          </form>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-sm text-slate-500">No reviews submitted yet.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{rev.userName}</span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{rev.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{rev.comment}</p>
                <span className="text-[10px] text-slate-400">{new Date(rev.createdAt).toLocaleDateString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
