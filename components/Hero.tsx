import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Code, Terminal, Zap, Cpu, Sparkles, Building2, Layers, CheckCircle, Rocket, Bot, ShieldCheck } from 'lucide-react';
import TechSticker from './TechSticker';
import { SiteSettings } from './data';

interface HeroProps {
  siteSettings: SiteSettings;
  language: 'AR' | 'EN';
  onRegisterClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ siteSettings, language, onRegisterClick }) => {
  const [offset, setOffset] = useState(0);
  const [buildIndex, setBuildIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const buildables = language === 'AR' 
    ? (siteSettings.buildablesAr || []) 
    : (siteSettings.buildablesEn || []);

  const heroTitle = language === 'AR' ? siteSettings.heroTitle : siteSettings.heroTitleEn;
  const heroDescription = language === 'AR' ? siteSettings.heroDescription : siteSettings.heroDescriptionEn;

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setOffset(prev => (prev + 0.05) % 100); 
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    if (buildables.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setBuildIndex((prev) => (prev + 1) % buildables.length);
        setFade(true);
      }, 400); 
    }, 3000);
    return () => clearInterval(interval);
  }, [buildables.length]);

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const portfolio = document.getElementById('portfolio');
    if (portfolio) portfolio.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative min-h-[90vh] md:min-h-screen w-full overflow-hidden flex flex-col justify-center items-center pt-28 md:pt-32 bg-slate-50 pb-16 md:pb-24">
      
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-br from-cyan-100/20 to-indigo-100/20 rounded-full blur-[80px] md:blur-[150px] animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-tr from-slate-200 to-blue-100/20 rounded-full blur-[80px] md:blur-[150px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', 
        backgroundSize: '24px 24px' 
      }}></div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Content Column */}
        <div className={`lg:col-span-7 text-center ${language === 'AR' ? 'lg:text-right' : 'lg:text-left'} space-y-8 md:space-y-12`}>
          <div className={`flex flex-col ${language === 'AR' ? 'lg:items-start' : 'lg:items-end'} gap-3 md:gap-4`}>
            <div className={`group inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm self-center ${language === 'AR' ? 'lg:self-start' : 'lg:self-end'} hover:border-slate-900 transition-colors`}>
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=maker${i}`} className="w-6 h-6 rounded-full border-2 border-white" alt="Avatar" />
                ))}
              </div>
              <span className="text-[10px] md:text-[11px] font-black uppercase text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                {language === 'AR' ? 'مختبر الابتكار نشط الآن' : 'Innovation Foundry Active'}
              </span>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-7xl lg:text-[7rem] font-black leading-[0.9] tracking-tighter text-slate-950">
                {heroTitle}<br />
                {buildables.length > 0 && (
                  <div className="mt-2 md:mt-4">
                    <span className="text-slate-300 block md:inline text-3xl md:text-6xl">{language === 'AR' ? 'ابنِ ' : 'Build '}</span>
                    <span className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${fade ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-cyan-600 to-slate-950 min-h-[1.1em]`}>
                      {buildables[buildIndex]}
                    </span>
                  </div>
                )}
              </h1>
            </div>
          </div>
          
          <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {heroDescription}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center ${language === 'AR' ? 'lg:justify-start' : 'lg:justify-end'} pt-4`}>
            <button 
              onClick={onRegisterClick}
              className="group relative px-10 py-5 md:px-14 md:py-6 bg-slate-950 text-white rounded-2xl md:rounded-[2rem] font-black text-xs md:text-sm uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-900/20"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {language === 'AR' ? 'ابدأ البناء الآن' : 'Start Building Now'} 
                <Rocket className={`w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform`} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            </button>
            
            <button 
              onClick={handlePortfolioClick}
              className="flex items-center justify-center gap-4 px-8 py-5 md:px-10 md:py-6 bg-white border-2 border-slate-100 rounded-2xl md:rounded-[2rem] shadow-sm hover:border-slate-950 transition-all active:scale-95"
            >
               <span className="font-black text-slate-900 text-xs md:text-sm uppercase">{language === 'AR' ? 'شاهد النماذج' : 'View Prototypes'}</span>
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors">
                  <ArrowLeft className={`w-5 h-5 ${language === 'EN' ? 'rotate-180' : ''}`} />
               </div>
            </button>
          </div>
        </div>

        {/* Right Media Column */}
        <div className="lg:col-span-5 relative h-[450px] md:h-[700px] w-full flex items-center justify-center">
          
          {/* Main Visual Frame */}
          <div className="relative w-[95%] h-[90%] z-20 group">
             {/* Decorative Background Frame */}
             <div className="absolute inset-0 border-[1.5px] border-slate-200 rounded-[3rem] md:rounded-[4.5rem] rotate-[-3deg] group-hover:rotate-0 transition-transform duration-1000 scale-105"></div>
             
             {/* Image Container */}
             <div className="w-full h-full rounded-[3rem] md:rounded-[4.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border-8 md:border-[16px] border-white bg-white transform rotate-[1.5deg] group-hover:rotate-0 transition-transform duration-1000">
                <img 
                  src={siteSettings.heroImage} 
                  alt="Founder working on AI" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
             </div>
          </div>

          {/* Floaters - Professional elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* AI Prompt Sticker */}
            <TechSticker className="absolute top-[8%] left-[-15%] md:left-[-12%] z-30 animate-float">
               <div className="px-5 py-3 md:px-8 md:py-5 bg-white shadow-2xl rounded-2xl md:rounded-[2.5rem] flex items-center gap-4 border border-slate-100 rotate-[-5deg]">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-cyan-500">
                    <Terminal size={24} />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Build Status</span>
                    <span className="font-black text-xs md:text-lg text-slate-950 uppercase">{language === 'AR' ? 'مباشر...' : 'Production'}</span>
                  </div>
               </div>
            </TechSticker>

            {/* Achievement Sticker */}
            <TechSticker className="absolute bottom-[10%] right-[-12%] md:right-[-8%] z-30 animate-float-delayed">
               <div className="px-6 py-4 md:px-10 md:py-7 bg-slate-950 text-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-slate-800 rotate-[5deg]">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-3xl flex items-center justify-center">
                        <Cpu className="text-white" size={32} />
                     </div>
                     <div className="flex flex-col items-start leading-tight">
                        <span className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest">Architecture</span>
                        <span className="font-black text-lg md:text-3xl uppercase tracking-tighter">Scalable AI</span>
                     </div>
                  </div>
               </div>
            </TechSticker>

            {/* Sparkle Sticker */}
            <TechSticker className="absolute top-[15%] right-[-5%] z-30 animate-float" style={{ animationDelay: '2s' }}>
              <div className="w-14 h-14 md:w-24 md:h-24 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-cyan-600 border border-slate-50 rotate-12">
                <ShieldCheck size={40} />
              </div>
            </TechSticker>
          </div>
        </div>
      </div>

      {/* Hero Marquee */}
      <div className="absolute bottom-6 md:bottom-12 w-full overflow-hidden whitespace-nowrap opacity-[0.04] pointer-events-none">
        <div className="flex animate-marquee text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-950">
          <span className="mx-12">SaaS • AI Agents • RAG • Automation • LLMs • Founders • SaaS • AI Agents • RAG • Automation • </span>
          <span className="mx-12">SaaS • AI Agents • RAG • Automation • LLMs • Founders • SaaS • AI Agents • RAG • Automation • </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;