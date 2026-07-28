import React from 'react';
import { User as UserIcon, Shield, Mail, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight">Account Profile</h1>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-8 shadow-sm">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
            alt={user.name}
            className="w-20 h-20 rounded-full border-2 border-primary-500 bg-slate-100 dark:bg-slate-800"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
            <span className="inline-flex items-center gap-1 mt-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-400">
              <Shield className="w-3.5 h-3.5" /> {user.role} Account
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-500" /> Default Shipping Address
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">123 Tech Way</p>
            <p>San Francisco, CA 94105</p>
            <p>United States</p>
          </div>
        </div>
      </div>
    </div>
  );
};
