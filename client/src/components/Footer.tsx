import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Github, Twitter, Linkedin, ShieldCheck, Zap, Sparkles, Send, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 transition-colors mt-24 relative overflow-hidden">
      {/* Radial glow background effect */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-slate-800/60 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-glow-sm">
          <div className="space-y-2">
            <span className="badge-primary text-[10px] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-primary-400" /> Exclusive Insights
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Stay ahead with AI E-Commerce Tech
            </h3>
            <p className="text-sm text-slate-400">
              Get updates on vector search algorithms, cache optimizations, and architectural benchmarks.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                placeholder="Enter your work email..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
            <button
              type="submit"
              className="btn-primary py-3 px-6 shrink-0 shadow-glow-sm hover:shadow-glow"
            >
              Subscribe <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 via-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-glow-sm">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white tracking-tight leading-none block">
                  AuraStore
                </span>
                <span className="text-[10px] font-semibold text-primary-400 tracking-widest uppercase leading-none block">
                  AI Vector Engine
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Enterprise-grade e-commerce engine engineered with sub-50ms Redis cache performance & MongoDB Atlas AI Vector Search.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-icon bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn-icon bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn-icon bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Technology Col */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Core Tech Stack
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" /> Redis Cache-Aside
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <Sparkles className="w-4 h-4 text-primary-400 shrink-0" /> Atlas Vector Search
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <ShieldCheck className="w-4 h-4 text-accent-400 shrink-0" /> JWT Auth & RBAC
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/products" className="hover:text-primary-400 transition-colors inline-flex items-center gap-1">
                  Catalog Browsing <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-primary-400 transition-colors">Cart & Checkout</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-primary-400 transition-colors">Order History</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary-400 transition-colors">Account Settings</Link>
              </li>
            </ul>
          </div>

          {/* Program Info */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Internship Showcase
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-secondary-400 uppercase tracking-widest block">Project 2</span>
              <p className="text-xs text-slate-300">
                Infotact Technical Internship Program
              </p>
              <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                Production Architecture
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AuraStore AI. Built by Tauqeer Abbas — MERN Stack Developer Intern.</p>
          <div className="flex gap-6 text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 cursor-pointer">API Docs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
