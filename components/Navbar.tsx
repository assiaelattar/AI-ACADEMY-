import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, Globe } from 'lucide-react';
import Logo from './Logo';
import { SiteSettings } from './data';

interface NavbarProps {
  onNavigate?: (page: 'home') => void;
  onAdminClick?: () => void;
  onRegisterClick?: () => void;
  siteSettings: SiteSettings;
  language: 'AR' | 'EN';
  onLanguageToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  onAdminClick, 
  onRegisterClick,
  siteSettings, 
  language, 
  onLanguageToggle 
}) => {
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
    
    // Small delay to ensure view has switched if not on home
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }, 10);
  };

  const handleLanguageToggle = () => {
    onLanguageToggle();
    setIsMenuOpen(false); // Close menu on mobile after toggle to reflect change immediately
  };

  const menuItems = {
    AR: [
      { label: 'البرامج', id: 'courses' },
      { label: 'المشاريع', id: 'portfolio' },
      { label: 'للشركات', id: 'business' },
    ],
    EN: [
      { label: 'Programs', id: 'courses' },
      { label: 'Portfolio', id: 'portfolio' },
      { label: 'For Business', id: 'business' },
    ]
  };

  const currentMenu = menuItems[language];

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
          language={language}
          className="cursor-pointer hover:scale-105 transition-transform" 
          onClick={handleHomeClick} 
        />

        <div className="hidden md:flex items-center gap-8 font-bold text-slate-600">
          {currentMenu.map(item => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => scrollToSection(e, item.id)} 
              className="hover:text-cyan-600 transition-colors text-xs font-black uppercase"
            >
              {item.label}
            </a>
          ))}
          
          <button 
            onClick={onLanguageToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-black hover:bg-slate-200 transition-colors"
          >
            <Globe size={14} /> {language}
          </button>

          <button 
            onClick={onAdminClick}
            className="text-slate-300 hover:text-slate-900 transition-colors p-2"
            title="Dashboard"
          >
            <Lock size={16} />
          </button>
          
          <button 
            onClick={onRegisterClick}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 font-black text-[10px] uppercase border border-slate-800"
          >
            {language === 'AR' ? 'سجل الآن' : 'Register Now'}
          </button>
        </div>

        <button 
          className="md:hidden p-2 text-slate-900 z-[60]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-50 transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : (language === 'AR' ? 'translate-x-full' : '-translate-x-full')} md:hidden flex flex-col p-8 pt-24 gap-8`}>
        <div className="flex justify-between items-center pb-6 border-b border-slate-100">
          <span className="text-[10px] font-black uppercase text-slate-400">{language === 'AR' ? 'القائمة' : 'Menu'}</span>
          <button 
            onClick={handleLanguageToggle}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase active:scale-95 transition-transform"
          >
            <Globe size={18} /> {language === 'AR' ? 'English' : 'العربية'}
          </button>
        </div>
        
        {currentMenu.map(item => (
          <a 
            key={item.id}
            href={`#${item.id}`} 
            onClick={(e) => scrollToSection(e, item.id)} 
            className={`${language === 'AR' ? 'text-right' : 'text-left'} text-4xl font-black text-slate-800 uppercase tracking-tighter`}
          >
            {item.label}
          </a>
        ))}
        
        <button 
          onClick={() => { if(onAdminClick) onAdminClick(); setIsMenuOpen(false); }} 
          className={`${language === 'AR' ? 'text-right' : 'text-left'} text-4xl font-black text-slate-800 uppercase tracking-tighter`}
        >
          {language === 'AR' ? 'الإدارة' : 'Dashboard'}
        </button>
        
        <div className="mt-auto space-y-4">
          <button 
            onClick={() => { if(onRegisterClick) onRegisterClick(); setIsMenuOpen(false); }}
            className="bg-cyan-500 text-white px-6 py-6 rounded-[2.5rem] font-black w-full text-xl shadow-2xl shadow-cyan-500/30 uppercase"
          >
            {language === 'AR' ? 'سجل الآن' : 'Register Now'}
          </button>
          
          <p className="text-