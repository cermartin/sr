import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import logoImg from '../images/logo.png';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img src={logoImg} alt="SR" className="h-10 w-10 rounded-full" />
          <span className="font-serif text-2xl tracking-widest font-semibold text-stone-900">
            SERRANO RIVERS
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-stone-600 hover:text-stone-900 tracking-wide transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button className="flex items-center gap-2 px-5 py-2 bg-stone-900 text-stone-50 text-xs uppercase tracking-widest hover:bg-stone-700 transition-colors">
            Shop <ShoppingBag className="w-3 h-3" />
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-stone-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-stone-50 border-t border-stone-200 shadow-lg py-6 px-6 flex flex-col space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-lg font-serif text-stone-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button className="w-full py-3 bg-stone-900 text-stone-50 uppercase tracking-widest text-sm">
            Shop Now
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
