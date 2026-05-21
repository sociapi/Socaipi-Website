import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Heart } from 'lucide-react';

import { SiteSettings } from '../data/initialData';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
  wishlistCount: number;
  toggleCart: () => void;
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  wishlistCount,
  toggleCart,
  settings,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'blog', label: 'Blog' },
    { id: 'team', label: 'Team' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'partners', label: 'Partners' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'careers', label: 'Careers' },
    { id: 'store', label: 'Merch' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between border border-[rgba(123,211,85,0.15)] shadow-lg shadow-[rgba(0,0,0,0.4)] transition-all duration-300">
        
        {/* Logo / Brand */}
        <div 
          onClick={() => setCurrentPage('home')}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          {settings.logoUrl ? (
            <img 
              src={settings.logoUrl} 
              alt="Logo" 
              className="w-8 h-8 rounded-lg object-contain border border-[#7bd355]/40 bg-[#333333] shadow-[0_0_10px_rgba(123,211,85,0.2)]"
            />
          ) : (
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-[#333333] border border-[#7bd355]/40 shadow-[0_0_10px_rgba(123,211,85,0.2)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#517642] to-[#7bd355] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <span className="font-futuristic font-bold text-lg text-[#7bd355] glow-text select-none">
                {settings.logoText ? settings.logoText.charAt(0) : 'S'}
              </span>
            </div>
          )}
          
          <div className="flex flex-col">
            <span className="font-futuristic font-bold text-sm tracking-widest text-[#e8ecee]">
              {settings.logoText || 'SOCIAPI'}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#7bd355]">
              {settings.campusName.split(' ')[0]} {settings.campusLocation}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-200 ${
                  isActive
                    ? 'text-[#7bd355] bg-[rgba(123,211,85,0.08)] glow-border'
                    : 'text-[#939596] hover:text-[#e8ecee] hover:bg-[rgba(147,149,150,0.05)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#7bd355] shadow-[0_0_8px_#7bd355]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Wishlist Button */}
          <button
            onClick={() => setCurrentPage('store')}
            className="p-2 rounded-full bg-[#333333] border border-[#939596]/20 text-[#e8ecee] hover:text-[#7bd355] hover:border-[#7bd355]/40 transition-all duration-300 relative"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#121212]">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="p-2 rounded-full bg-[#333333] border border-[#939596]/20 text-[#e8ecee] hover:text-[#7bd355] hover:border-[#7bd355]/40 transition-all duration-300 relative"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#7bd355] text-[#121212] font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#121212]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-full bg-[#333333] border border-[#939596]/20 text-[#e8ecee] hover:text-[#7bd355] hover:border-[#7bd355]/40 transition-all duration-300"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-4 right-4 z-40 bg-[#121212]/95 border border-[#7bd355]/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-left text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[rgba(123,211,85,0.1)] text-[#7bd355] border-l-2 border-[#7bd355]'
                      : 'bg-[#333333]/50 text-[#939596] hover:text-[#e8ecee]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};
