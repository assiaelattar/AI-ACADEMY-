import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send, Cpu } from 'lucide-react';
import { SiteSettings } from './data';

interface FooterProps {
  siteSettings: SiteSettings;
  language: 'AR' | 'EN';
}

const Footer: React.FC<FooterProps> = ({ siteSettings, language }) => {
  const content = {
    AR: {
      tagline: 'مختبر الابتكار',
      description: 'تمكين الجيل القادم من المبتكرين والصناع والحالمين من خلال تعليم تكنولوجي عملي ومكثف.',
      explore: 'استكشف',
      exploreLinks: ['من نحن', 'برامجنا التعليمية', 'قصص النجاح', 'الفعاليات', 'المدونة'],
      resources: 'المصادر',
      resourceLinks: ['دليل أولياء الأمور', 'المنح الدراسية', 'المجتمع', 'الدعم الفني', 'اتصل بنا'],
      newsletter: 'ابقَ على اطلاع',
      newsletterDesc: 'احصل على آخر التحديثات حول الدورات والاتجاهات التقنية.',
      placeholder: 'بريدك الإلكتروني',
      copyright: 'جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة'
    },
    EN: {
      tagline: 'Innovation Foundry',
      description: 'Empowering the next generation of innovators, makers, and dreamers through practical and intensive technology education.',
      explore: 'Explore',
      exploreLinks: ['About Us', 'Our Programs', 'Success Stories', 'Events', 'Blog'],
      resources: 'Resources',
      resourceLinks: ['Parent Guide', 'Scholarships', 'Community', 'Tech Support', 'Contact Us'],
      newsletter: 'Stay Updated',
      newsletterDesc: 'Get the latest updates on courses and tech trends.',
      placeholder: 'Your Email',
      copyright: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    }
  }[language];

  const academyName = language === 'AR' ? siteSettings.academyName : siteSettings.academyNameEn;

  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900">
      <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-16 ${language === 'AR' ? 'text-right' : 'text-left'}`}>
        
        <div className="space-y-8">
          <div className={`flex items-center gap-3 group cursor-pointer ${language === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-white/5">
              <span className="text-slate-950 font-black text-2xl">{academyName.charAt(0)}</span>
            </div>
            <div className={`flex flex-col ${language === 'AR' ? 'items-end' : 'items-start'}`}>
              <span className="font-black text-xl text-white leading-none">{academyName}</span>
              <span className="font-bold text-xs text-slate-500 uppercase mt-1">{content.tagline}</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-xs font-medium">
            {content.description}
          </p>
          <div className={`flex gap-4 ${language === 'AR' ? 'justify-start' : 'justify-end md:justify-start'}`}>
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 uppercase text-sm">{content.explore}</h4>
          <ul className="space-y-5 text-sm font-medium">
            {content.exploreLinks.map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-cyan-400 transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

         <div>
          <h4 className="text-white font-black mb-8 uppercase text-sm">{content.resources}</h4>
          <ul className="space-y-5 text-sm font-medium">
            {content.resourceLinks.map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-cyan-400 transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 uppercase text-sm">{content.newsletter}</h4>
          <p className="text-sm mb-6 font-medium">{content.newsletterDesc}</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder={content.placeholder}
              className={`w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm ${language === 'AR' ? 'text-right' : 'text-left'}`}
            />
            <button className={`absolute ${language === 'AR' ? 'left-2' : 'right-2'} top-2 p-2.5 bg-cyan-500 text-slate-950 rounded-xl hover:bg-cyan-400 transition-colors`}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className={`max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-wider ${language === 'AR' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className={`flex items-center gap-6 ${language === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
          <p>&copy; 2024 {academyName}. {content.copyright}</p>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-800">
            <Cpu size={14} className="text-cyan-400" />
            <span className="text-[9px]">Powered by <span className="text-white font-black">Makerlab</span></span>
          </div>
        </div>
        <div className="flex gap-10 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">{content.privacy}</a>
          <a href="#" className="hover:text-white transition-colors">{content.terms}</a>
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