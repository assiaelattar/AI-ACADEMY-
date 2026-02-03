import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Code, Terminal, Zap, Cpu, Sparkles, Building2, Layers } from 'lucide-react';
import TechSticker from './TechSticker';
import { SiteSettings } from './data';

interface HeroProps {
  siteSettings: SiteSettings;
}

const Hero: React.FC<HeroProps> = ({ siteSettings }) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setOffset(prev => (prev + 0.05) % 100); 
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Use a fallback for the title if splitting fails
  const fullTitle = siteSettings.heroTitle || "أي شخص بشغف يمكنه أن يكون صانعاً بالذكاء الاصطناعي";
  const titleParts = fullTitle.split(' ');
  const lastWord = titleParts.pop();
  const firstPart = titleParts.join(' ');

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center pt-20 bg-slate-50 pb-20">
      
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}></div>

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
              MAKER SPIRIT • INNOVATION • PASSION • MAKER SPIRIT • INNOVATION • PASSION •
            </textPath>
          </text>
        </svg>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 text-center lg:text-right space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-200 bg-white/80 backdrop-blur-sm text-[11px] font-black uppercase text-cyan-600 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            بيئة الصناع والمبتكرين
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black leading-[1.1] tracking-tighter text-slate-900">
            {firstPart}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-500 via-blue-600 to-indigo-600">
              {lastWord}
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            {siteSettings.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button className="group relative px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-900/20">
              <span className="relative z-10 flex items-center gap-2">
                انضم لمجتمع الصناع <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-500 to-blue-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
            </button>
            <button className="px-12 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-[2rem] font-black text-sm uppercase hover:border-cyan-400 hover:text-cyan-600 transition-colors shadow-sm">
              معرض المشاريع
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-[600px] w-full flex items-center justify-center">
          <div className="relative w-72 h-96 md:w-80 md:h-[480px] z-20 group">
             <div className="w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl border-[10px] border-white bg-slate-100 transform rotate-[2deg] group-hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1200&auto=format&fit=crop" 
                  alt="مختبر الابتكار والذكاء الاصطناعي" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 to-transparent flex items-end p-10">
                  <div className="text-white">
                    <p className="font-black text-2xl leading-none uppercase">فريق المبدعين</p>
                    <p className="text-[11px] font-bold uppercase mt-2 opacity-80">تأسس في 2024 • مختبر الابتكار</p>
                  </div>
                </div>
             </div>
          </div>

          <TechSticker className="absolute top-[10%] right-[5%] z-30 animate-float">
             <div className="w-36 h-36 bg-white/90 backdrop-blur-xl rounded-full flex flex-col items-center justify-center text-center p-4 shadow-2xl border border-cyan-100 -rotate-12">
                <Cpu className="text-cyan-500 mb-1" size={28} />
                <span className="text-[10px] font-black uppercase text-slate-400">Deep Search</span>
                <span className="font-black text-sm text-slate-900 leading-tight">بحث عميق</span>
             </div>
          </TechSticker>

          <TechSticker className="absolute bottom-[15%] left-[5%] z-30 animate-float-delayed">
             <div className="px-8 py-5 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl border border-slate-700 rotate-6 group hover:rotate-0 transition-transform">
                <div className="flex items-center gap-4">
                   <div className="p-2.5 bg-cyan-500/20 rounded-2xl">
                      <Layers className="text-cyan-400" size={22} />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase">AI Data Engine</span>
                      <span className="font-black text-base">محرك بيانات<br/>ذكي</span>
                   </div>
                </div>
             </div>
          </TechSticker>
        </div>
      </div>
    </div>
  );
};

export default Hero;