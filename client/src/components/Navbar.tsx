import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Sun, Moon, Heart, User as UserIcon, Sparkles, LogOut, ShieldCheck, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenArchitecture?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenArchitecture }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenSearch) {
      onOpenSearch();
    } else if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-2xl shadow-card border-b border-slate-200/80 dark:border-slate-800/80'
          : 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 via-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
            <ShoppingBag className="w-4.5 h-4.5" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-none">
              AuraStore
            </span>
            <span className="block text-[10px] font-semibold text-primary-500 dark:text-primary-400 tracking-widest uppercase leading-none">
              AI Vector Engine
            </span>
          </div>
        </Link>

        {/* AI Search Bar Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex-1 max-w-md flex items-center justify-between px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm text-slate-400 dark:text-slate-500 hover:border-primary-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-primary-500 group-hover:scale-110 transition-transform" />
            <span className="truncate text-slate-600 dark:text-slate-300 font-medium">Search with AI...</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-200/80 dark:bg-slate-700/80 px-2 py-0.5 rounded-md border border-slate-300/50 dark:border-slate-600/50">
            <kbd className="font-mono">⌘K</kbd>
          </span>
        </button>

        {/* Tech Architecture Trigger */}
        {onOpenArchitecture && (
          <button
            onClick={onOpenArchitecture}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold text-xs hover:bg-primary-500/20 border border-primary-500/20 transition-all"
            title="View Developer Architecture"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-500" />
            <span>Tech Specs</span>
          </button>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {isDark
              ? <Sun className="w-4.5 h-4.5" />
              : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="btn-icon relative" title="Wishlist">
            <Heart className="w-4.5 h-4.5" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="btn-icon relative" title="Cart">
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-glow-sm animate-bounce-light">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div className="relative ml-1">
              <button
                onClick={() => setShowMenu((p) => !p)}
                className={`flex items-center gap-2 p-0.5 rounded-full transition-all duration-200 ${
                  showMenu ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950' : 'hover:ring-2 hover:ring-primary-400/50 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-slate-950'
                }`}
              >
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 object-cover"
                />
              </button>

              {showMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                  <div className="absolute right-0 mt-2.5 w-60 glass dark:glass-dark rounded-2xl shadow-card-hover border border-slate-200 dark:border-slate-700 py-2 z-50 animate-slide-up">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-display font-semibold text-sm text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{user.email}</p>
                      <span className="badge-primary mt-1.5 text-[10px] uppercase tracking-wider">
                        {user.role}
                      </span>
                    </div>

                    <div className="py-1">
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setShowMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-950/40 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                        </Link>
                      )}
                      <Link
                        to="/orders"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <Package className="w-4 h-4 text-slate-400" /> My Orders
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" /> Profile Settings
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={() => { logout(); setShowMenu(false); }}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary ml-1 text-sm"
            >
              <UserIcon className="w-4 h-4" /> Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
