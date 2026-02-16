import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="font-serif text-2xl text-stone-100 tracking-wider mb-2">SERRANO RIVERS</h2>
            <p className="text-xs uppercase tracking-widest">Functional Art • Est. 2024</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-100 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-stone-100 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-stone-100 transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-wide">
          <p>&copy; {new Date().getFullYear()} Serrano Rivers. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-stone-200">Privacy Policy</a>
            <a href="#" className="hover:text-stone-200">Terms of Service</a>
            <a href="#" className="hover:text-stone-200">Shipping & Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;