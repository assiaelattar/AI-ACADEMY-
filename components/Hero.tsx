import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Code, Terminal, Zap, Cpu, Sparkles, Building2, Layers, CheckCircle } from 'lucide-react';
import TechSticker from './TechSticker';
import { SiteSettings } from './data';

interface HeroProps {
  siteSettings: SiteSettings;
  language: 'AR' | 'EN';
  onRegisterClick?: () => void;
}

const buildablesAr = [
  "تطبيق SaaS متكامل",
  "فيلماً سينمائياً",
  "نظام ERP ذكي",
  "موقعاً عالمياً",
  "لعبة تفاعلية",
  "حملة إعلانية",
  "تطبيق جوال"
];

const buildablesEn = [
  "Full SaaS App",
  "Cinematic Film",
  "Smart ERP System",
  "Global Website",
  "Interactive Game",
  "Ad Campaign",
  "Mobile App"
];

const Hero: React.FC<HeroProps> = ({ siteSettings, language, onRegisterClick }) => {
  const [offset, setOffset] = useState(0);
  const [buildIndex, setBuildIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const buildables = language === 'AR' ? buildablesAr : buildablesEn;

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
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center pt-20 bg-slate-50 pb-20">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-100 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}></div>

      {/* Floating Text Path */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none">
        <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <path
            id="curve-path"
            d="M -100,600 C 300,600 400,200 720,200 C 1040,200 1140,600 1540,600"
            fill="transparent"
            stroke="none"
          />
          <text className="text-4xl md:text-6xl lg:text-8xl font-black uppercase fill-slate-900/[0.03]" dir="ltr">
            <textPath href="#curve-path" startOffset={`${-offset}%`}>
              BUILD • CREATE • INNOVATE • BUILD • CREATE • INNOVATE • BUILD • CREATE •
            </textPath>
          </text>
        </svg>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className={`lg:col-span-7 text-center ${language === 'AR' ? 'lg:text-right' : 'lg:text-left'} space-y-10`}>
          <div className={`flex flex-col ${language === 'AR' ? 'lg:items-start' : 'lg:items-end'} gap-4`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-200 bg-white/80 backdrop-blur-sm text-[11px] font-black uppercase text-cyan-600 shadow-sm self-center ${language === 'AR' ? 'lg:self-start' : 'lg:self-end'}`}>
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              {language === 'AR' ? 'مختبر الابتكار والذكاء الاصطناعي' : 'AI & Innovation Foundry'}
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black leading-[1.05] tracking-tighter text-slate-900">
                {language === 'AR' ? <>مع الذكاء الاصطناعي،<br />يمكنك أن تبني <br /></> : <>With AI,<br />You Can Build <br /></>}
                <span className={`inline-block transition-all duration-500 transform ${fade ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} text-transparent bg-clip-text bg-gradient-to-l from-cyan-500 via-blue-600 to-indigo-600 min-h-[1.2em]`}>
                  {buildables[buildIndex]}
                </span>
              </h1>
            </div>
          </div>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {language === 'AR' ? siteSettings.heroDescription : siteSettings.heroDescriptionEn}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center ${language === 'AR' ? 'lg:justify-start' : 'lg:justify-end'} pt-4`}>
            <button 
              onClick={onRegisterClick}
              className="group relative px-12 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-sm uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-900/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                {language === 'AR' ? 'ابدأ رحلة البناء الآن' : 'Start Building Now'} 
                <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${language === 'EN' ? 'rotate-180' : ''}`} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-500 to-blue-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
            </button>
            
            <button 
              onClick={handlePortfolioClick}
              className="flex items-center gap-4 px-8 py-5 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-sm hover:border-cyan-500 transition-all active:scale-95"
            >
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=maker${i}`} className="w-10 h-10 rounded-full border-2 border-white" alt="Maker" />
                ))}
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-black text-slate-900 text-sm">+١,٢٠٠</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">{language === 'AR' ? 'صانع نشط' : 'Active Makers'}</span>
              </div>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-[600px] w-full flex items-center justify-center">
          {/* Main Showcase Image */}
          <div className="relative w-72 h-96 md:w-80 md:h-[480px] z-20 group">
             <div className="w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white bg-slate-100 transform rotate-[3deg] group-hover:rotate-0 transition-transform duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1200&auto=format&fit=crop" 
                  alt="AI Maker Space" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-10">
                  <div className="text-white text-right">
                    <p className="font-black text-2xl leading-none uppercase tracking-tight">{language === 'AR' ? 'مختبر المستقبل' : 'Future Foundry'}</p>
                    <div className="flex items-center gap-2 mt-3 justify-end">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <p className="text-[10px] font-bold uppercase opacity-80">{language === 'AR' ? 'بناء نشط الآن' : 'Active Build Now'}</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Floaters */}
          <TechSticker className="absolute top-[5%] left-[0%] z-30 animate-float">
             <div className="px-6 py-4 bg-white/90 backdrop-blur-xl rounded-[2rem] flex items-center gap-3 shadow-2xl border border-cyan-100 -rotate-6">
                <div className="p-2 bg-cyan-500 rounded-xl text-white">
                  <Terminal size={18} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Input</span>
                  <span className="font-black text-xs text-slate-900">Idea.generate()</span>
                </div>
             </div>
          </TechSticker>

          <TechSticker className="absolute bottom-[20%] right-[-5%] z-30 animate-float-delayed">
             <div className="p-6 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl border border-slate-700 rotate-12 group hover:rotate-0 transition-transform">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Zap className="text-white" size={24} />
                   </div>
                   <div className="flex flex-col items-start">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase">Deploy Rate</span>
                      <span className="font-black text-lg">١٠٠٪ نجاح</span>
                   </div>
                </div>
             </div>
          </TechSticker>

          <TechSticker className="absolute top-[15%] right-[10%] z-30 animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-indigo-600 border border-slate-100 rotate-12">
              <Sparkles size={24} />
            </div>
          </TechSticker>
        </div>
      </div>
    </div>
  );
};

export default Hero;