import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { CategoryNavbar } from '../components/CategoryNavbar';
import { Footer } from '../components/Footer';
import { InstantSearchModal } from '../components/InstantSearchModal';
import { AiAssistantModal } from '../components/AiAssistantModal';
import { ArchitectureModal } from '../components/ArchitectureModal';

export const StorefrontLayout: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div>
        <Navbar 
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenArchitecture={() => setIsArchitectureOpen(true)}
        />
        <CategoryNavbar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Internship Showcase Modals & Floating AI Assistant */}
      <InstantSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ArchitectureModal isOpen={isArchitectureOpen} onClose={() => setIsArchitectureOpen(false)} />
      <AiAssistantModal />
    </div>
  );
};
