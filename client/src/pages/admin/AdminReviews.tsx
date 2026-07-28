import React, { useEffect, useState } from 'react';
import { Star, Check, X, MessageSquare } from 'lucide-react';
import { Review } from '../../types';
import { api } from '../../services/api';

export const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews/admin/all');
      if (res.data.success) setReviews(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleModerate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await api.put(`/reviews/admin/${id}/moderate`, { status });
      if (res.data.success) fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Review Moderation Queue</h1>
        <p className="text-xs text-slate-500 mt-1">Approve or reject customer submitted product reviews</p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev._id} className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{rev.userName}</span>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" /> {rev.rating}
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{rev.comment}</p>
              <span className="text-[10px] text-slate-400">Status: {rev.status}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleModerate(rev._id, 'approved')}
                className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition"
                title="Approve"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleModerate(rev._id, 'rejected')}
                className="p-2 rounded-xl bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400 hover:bg-red-600 hover:text-white transition"
                title="Reject"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
