import React from 'react';
import { ShoppingBag, Github, Twitter, Linkedin, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary-600 dark:text-primary-400">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-secondary-500 flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span>AuraStore AI</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Enterprise-grade e-commerce engine engineered with sub-50ms Redis cache performance & MongoDB Atlas AI Vector Search.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Core Technology</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-amber-500" /> Redis Cache-Aside Pattern</li>
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-primary-500" /> Vector Semantic Embeddings</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> JWT Auth & RBAC Roles</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>Order Tracking</li>
              <li>Shipping & Delivery Policy</li>
              <li>Returns & Moderation</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Connect</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Project 2 — Infotact Technical Internship Program
            </p>
            <div className="flex gap-4 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary-500 transition"><Github className="w-5 h-5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary-500 transition"><Twitter className="w-5 h-5" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary-500 transition"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 mt-10 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} AuraStore AI. Built by Tauqeer Abbas — MERN Stack Developer Intern.
        </div>
      </div>
    </footer>
  );
};
