import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send, Cpu } from 'lucide-react';
import { SiteSettings } from './data';

interface FooterProps {
  siteSettings: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ siteSettings }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-16">
        
        <div className="space-y-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-white/5">
              <span className="text-slate-950 font-black text-2xl">{siteSettings.academyName.charAt(0)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-white leading-none">{siteSettings.academyName}</span>
              <span className="font-bold text-xs text-slate-500 uppercase mt-1">مختبر الابتكار</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-xs font-medium">
            تمكين الجيل القادم من المبتكرين والصناع والحالمين من خلال تعليم تكنولوجي عملي ومكثف.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 uppercase text-sm">استكشف</h4>
          <ul className="space-y-5 text-sm font-medium">
            {['من نحن', 'برامجنا التعليمية', 'قصص النجاح', 'الفعاليات', 'المدونة'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-cyan-400 transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

         <div>
          <h4 className="text-white font-black mb-8 uppercase text-sm">المصادر</h4>
          <ul className="space-y-5 text-sm font-medium">
            {['دليل أولياء الأمور', 'المنح الدراسية', 'المجتمع', 'الدعم الفني', 'اتصل بنا'].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-cyan-400 transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 uppercase text-sm">ابقَ على اطلاع</h4>
          <p className="text-sm mb-6 font-medium">احصل على آخر التحديثات حول الدورات والاتجاهات التقنية.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="بريدك الإلكتروني" 
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
            />
            <button className="absolute left-2 top-2 p-2.5 bg-cyan-500 text-slate-950 rounded-xl hover:bg-cyan-400 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-wider">
        <div className="flex items-center gap-6">
          <p>&copy; 2024 {siteSettings.academyName}. جميع الحقوق محفوظة.</p>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-800">
            <Cpu size={14} className="text-cyan-400" />
            <span className="text-[9px]">Powered by <span className="text-white font-black">Makerlab</span></span>
          </div>
        </div>
        <div className="flex gap-10 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
          <a href="#" className="hover:text-white transition-colors">شروط الخدمة</a>
        </div>
      </div>
      <div className="md:hidden flex justify-center mt-10">
          <div className="flex items-center gap-2 px-6 py-3 bg-slate-900 rounded-full border border-slate-800">
            <Cpu size={14} className="text-cyan-400" />
            <span className="text-[10px]">Powered by <span className="text-white font-black">Makerlab</span></span>
          </div>
      </div>
    </footer>
  );
};

export default Footer;