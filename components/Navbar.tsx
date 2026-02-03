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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigate) onNavigate('home');
    
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
    setIsMenuOpen(false);
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 md:px-12 py-3 md:py-4 ${
        isScrolled || isMenuOpen 
          ? 'bg-white shadow-md border-b border-slate-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-[110]">
        <Logo 
          showText 
          siteSettings={siteSettings}
          language={language}
          className="cursor-pointer hover:scale-105 transition-transform" 
          onClick={handleHomeClick} 
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-bold text-slate-600">
          {currentMenu.map(item => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => scrollToSection(e, item.id)} 
              className="hover:text-cyan-600 transition-colors text-[11px] font-black uppercase tracking-tight"
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

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden p-2 text-slate-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[105] transition-all duration-500 ease-in-out transform ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0'
        } md:hidden flex flex-col p-6 pt-24 overflow-y-auto`}
      >
        <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-8">
          <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">
            {language === 'AR' ? 'القائمة الرئيسية' : 'MAIN MENU'}
          </span>
          <button 
            onClick={handleLanguageToggle}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-900 rounded-xl text-[10px] font-black uppercase active:scale-95 transition-all"
          >
            <Globe size={16} /> {language === 'AR' ? 'English' : 'العربية'}
          </button>
        </div>
        
        <div className="flex flex-col gap-6">
          {currentMenu.map(item => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              onClick={(e) => scrollToSection(e, item.id)} 
              className={`text-3xl font-black text-slate-900 uppercase tracking-tighter hover:text-cyan-500 transition-colors ${
                language === 'AR' ? 'text-right' : 'text-left'
              }`}
            >
              {item.label}
            </a>
          ))}
          
          <button 
            onClick={() => { if(onAdminClick) onAdminClick(); setIsMenuOpen(false); }} 
            className={`text-3xl font-black text-slate-900 uppercase tracking-tighter hover:text-cyan-500 transition-colors ${
              language === 'AR' ? 'text-right' : 'text-left'
            }`}
          >
            {language === 'AR' ? 'لوحة التحكم' : 'Dashboard'}
          </button>
        </div>
        
        <div className="mt-auto pt-10 space-y-4">
          <button 
            onClick={() => { if(onRegisterClick) onRegisterClick(); setIsMenuOpen(false); }}
            className="bg-slate-900 text-white px-6 py-5 rounded-[2rem] font-black w-full text-lg shadow-xl hover:bg-cyan-600 transition-all uppercase"
          >
            {language === 'AR' ? 'سجل الآن' : 'Register Now'}
          </button>
          
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {siteSettings.academyNameEn} &copy; 2024
            </p>
            <div className="flex justify-center gap-6 text-slate-300">
               {/* Small icons or extra links can go here */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;