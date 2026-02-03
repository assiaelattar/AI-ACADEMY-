import React from 'react';
import { SiteSettings } from './data';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  dark?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  siteSettings?: SiteSettings;
  language?: 'AR' | 'EN';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 40, 
  showText = false, 
  dark = false, 
  onClick, 
  siteSettings,
  language = 'AR'
}) => {
  const academyName = language === 'AR' 
    ? (siteSettings?.academyName || "أكاديمية الذكاء الاصطناعي")
    : (siteSettings?.academyNameEn || "AI Academy");
  
  const subtitle = language === 'AR' ? "مختبر الابتكار" : "Innovation Foundry";
  
  return (
    <div className={`flex items-center gap-3 ${className}`} onClick={onClick}>
      <div 
        className="relative flex items-center justify-center shrink-0" 
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-lg">
          <span className="text-white font-black text-xl md:text-2xl select-none">A</span>
        </div>
        <div className="absolute inset-0 -z-10 bg-cyan-500/20 blur-xl rounded-full"></div>
      </div>

      {showText && (
        <div className={`flex flex-col ${language === 'AR' ? 'text-right' : 'text-left'}`}>
          <span className={`font-black leading-none ${dark ? 'text-white' : 'text-slate-900'} ${size > 40 ? 'text-lg md:text-xl' : 'text-sm md:text-base'}`}>
            {academyName}
          </span>
          <span className={`font-bold uppercase ${dark ? 'text-slate-500' : 'text-slate-400'} ${size > 40 ? 'text-[10px] md:text-[11px]' : 'text-[8px] md:text-[9px]'} mt-1`}>
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;