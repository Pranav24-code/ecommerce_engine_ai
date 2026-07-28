import React, { useEffect, useState } from 'react';
import { Plus, Trash2, FolderTree } from 'lucide-react';
import { Category } from '../../types';
import { api } from '../../services/api';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      if (res.data.success) setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await api.post('/categories', { name, description, image });
      if (res.data.success) {
        fetchCategories();
        setName('');
        setDescription('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete category?')) return;
    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Category Taxonomy</h1>
        <p className="text-xs text-slate-500 mt-1">Manage store product categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleCreate} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary-500" /> Add New Category
          </h3>

          <input
            type="text"
            placeholder="Category Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
          />

          <textarea
            placeholder="Category Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
          />

          <input
            type="url"
            placeholder="Cover Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
          />

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-xs hover:bg-primary-700 transition"
          >
            Create Category
          </button>
        </form>

        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="font-bold text-base flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-primary-500" /> Active Categories
          </h3>

          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat._id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img src={cat.image || 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=500'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-sm">{cat.name}</h4>
                    <span className="text-[11px] text-slate-400">/{cat.slug}</span>
                  </div>
                </div>

                <button onClick={() => handleDelete(cat._id)} className="p-2 text-slate-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
