import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import Logo from './Logo';
import { SiteSettings } from './data';

interface NavbarProps {
  onNavigate?: (page: 'home') => void;
  onAdminClick?: () => void;
  siteSettings: SiteSettings;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onAdminClick, siteSettings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
    window.scrollTo(0, 0);
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo 
          showText 
          siteSettings={siteSettings}
          className="cursor-pointer hover:scale-105 transition-transform" 
          onClick={handleHomeClick} 
        />

        <div className="hidden md:flex items-center gap-8 font-bold text-slate-600">
          <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="hover:text-cyan-600 transition-colors text-xs font-black uppercase">البرامج</a>
          <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="hover:text-cyan-600 transition-colors text-xs font-black uppercase">معرض المشاريع</a>
          <a href="#business" onClick={(e) => scrollToSection(e, 'business')} className="hover:text-cyan-600 transition-colors text-xs font-black uppercase">للشركات</a>
          <button 
            onClick={onAdminClick}
            className="text-slate-300 hover:text-slate-900 transition-colors p-2"
            title="لوحة الإدارة"
          >
            <Lock size={16} />
          </button>
          <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 font-black text-[10px] uppercase border border-slate-800">
            سجل الآن
          </button>
        </div>

        <button 
          className="md:hidden p-2 text-slate-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-8 md:hidden flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="text-xl font-black text-slate-800 uppercase">البرامج</a>
          <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="text-xl font-black text-slate-800 uppercase">المشاريع</a>
          <a href="#business" onClick={(e) => scrollToSection(e, 'business')} className="text-xl font-black text-slate-800 uppercase">للشركات</a>
          <button onClick={() => { if(onAdminClick) onAdminClick(); setIsMenuOpen(false); }} className="text-right text-xl font-black text-slate-800 uppercase">الإدارة</button>
          <button className="bg-cyan-500 text-white px-6 py-5 rounded-2xl font-black w-full text-lg shadow-xl shadow-cyan-500/20 uppercase">
            سجل الآن
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;