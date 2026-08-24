import React, { useState } from 'react';
import { X, Cpu, Database, Zap, Layers, Server, Code, Sparkles, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai' | 'cache' | 'stack'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-scale-up">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display tracking-tight flex items-center gap-2">
                System Architecture & Tech Specs
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Production Grade
                </span>
              </h2>
              <p className="text-xs text-slate-400">Under the hood of the AI-Powered E-Commerce Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-6 pt-3 gap-2 overflow-x-auto scrollbar-hidden">
          {[
            { id: 'overview', label: 'System Overview', icon: Layers },
            { id: 'ai', label: 'AI & Vector Search', icon: Sparkles },
            { id: 'cache', label: 'Caching & Database', icon: Database },
            { id: 'stack', label: 'Tech Stack Specs', icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-white dark:bg-slate-900 shadow-sm'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary-500' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hidden">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-primary-500/10 border border-primary-500/20">
                  <Activity className="w-6 h-6 text-primary-500 mb-2" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sub-50ms API Latency</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Multi-tier caching with Redis and optimized MongoDB vector indices.</p>
                </div>
                <div className="p-4 rounded-2xl bg-secondary-500/10 border border-secondary-500/20">
                  <Sparkles className="w-6 h-6 text-secondary-500 mb-2" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Vector Search Engine</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Natural language query embeddings with cosine similarity matching.</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="w-6 h-6 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Graceful Fallback</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Zero downtime offline dataset fallback mode for offline resilience.</p>
                </div>
              </div>

              {/* Data Flow Diagram Card */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Full-Stack Data Pipeline Flow</h4>
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                  <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 w-full md:w-auto flex-1">
                    <span className="text-[10px] uppercase font-bold text-primary-400">1. Client Layer</span>
                    <h5 className="font-bold text-sm mt-0.5">React 19 + Vite</h5>
                    <p className="text-[11px] text-slate-400">TypeScript, Tailwind CSS, Context API</p>
                  </div>
                  <div className="text-slate-500 font-bold text-lg hidden md:block">➔</div>
                  <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 w-full md:w-auto flex-1">
                    <span className="text-[10px] uppercase font-bold text-amber-400">2. Caching Tier</span>
                    <h5 className="font-bold text-sm mt-0.5">Upstash Redis</h5>
                    <p className="text-[11px] text-slate-400">TTL Invalidation, Cache-Aside Pattern</p>
                  </div>
                  <div className="text-slate-500 font-bold text-lg hidden md:block">➔</div>
                  <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 w-full md:w-auto flex-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400">3. Backend Engine</span>
                    <h5 className="font-bold text-sm mt-0.5">Express + Node.js</h5>
                    <p className="text-[11px] text-slate-400">MongoDB Mongoose + Vector Search</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-secondary-500/10 to-primary-500/10 border border-secondary-500/20">
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary-500" /> Natural Language AI Recommendations
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  The semantic search controller converts user input into high-dimensional vector representations. It executes cosine similarity calculations across stored product embeddings, surfacing intent-based recommendations beyond simple keyword matching.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2">1. Embedding Generation</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Transforms title, description, category, and tags into normalized numerical feature vectors.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2">2. Cosine Distance Ranking</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ranks nearest neighbor product embeddings with similarity scoring thresholds.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cache' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Redis Cache Invalidation Strategy
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Uses the <strong>Cache-Aside (Lazy Loading)</strong> pattern. Read queries first check Upstash Redis. On cache miss, data is queried from MongoDB and populated into Redis with TTL (Time-To-Live). Cache is automatically invalidated upon product updates or admin operations.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { key: 'products:all:*', ttl: '300 seconds (5 min)', desc: 'Catalog listings & search filters' },
                  { key: 'featured', ttl: '600 seconds (10 min)', desc: 'Homepage featured showcase carousel' },
                  { key: 'categories:all', ttl: '1800 seconds (30 min)', desc: 'Mega menu category navigation hierarchy' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="font-mono font-bold text-primary-600 dark:text-primary-400">{item.key}</span>
                    <span className="text-slate-500 dark:text-slate-400">{item.desc}</span>
                    <span className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 font-bold text-[10px] text-slate-700 dark:text-slate-300">{item.ttl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stack' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary-500" /> Frontend Technologies
                </h5>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> React 19 + TypeScript (Strict mode)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Vite Build Engine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Tailwind CSS + Glassmorphism UI</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Lucide React Icons</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-secondary-500" /> Backend Infrastructure
                </h5>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Node.js & Express RESTful API</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Upstash Redis Cloud Cache</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> MongoDB Mongoose ODM</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Resilient Offline Dataset Fallback</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Designed & Built for Software Engineering Internships</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
          >
            Close Tech Specs
          </button>
        </div>
      </div>
    </div>
  );
};
