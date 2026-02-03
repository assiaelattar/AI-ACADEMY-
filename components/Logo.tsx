import React from 'react';
import { SiteSettings } from './data';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  dark?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  siteSettings?: SiteSettings;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 48, showText = false, dark = false, onClick, siteSettings }) => {
  const academyName = siteSettings?.academyName || "أكاديمية الذكاء";
  
  return (
    <div className={`flex items-center gap-3 ${className}`} onClick={onClick}>
      <div 
        className="relative flex items-center justify-center shrink-0" 
        style={{ width: size, height: size }}
      >
        <img 
          src="logo.png" 
          alt="AI Academy Logo" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 -z-10 bg-cyan-500/10 blur-xl rounded-full"></div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-black leading-none ${dark ? 'text-white' : 'text-slate-900'} ${size > 40 ? 'text-xl' : 'text-sm'}`}>
            {academyName}
          </span>
          <span className={`font-bold uppercase ${dark ? 'text-slate-500' : 'text-slate-400'} ${size > 40 ? 'text-[11px]' : 'text-[9px]'} mt-1`}>
            مختبر الابتكار
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;