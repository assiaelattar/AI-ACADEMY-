import React from 'react';
import { Building2, Layers, Zap, Globe, Cpu, Rocket } from 'lucide-react';

interface FeaturesProps {
  language?: 'AR' | 'EN';
}

const pillarsData = {
  AR: [
    {
      icon: <Building2 className="w-8 h-8 text-cyan-600" />,
      title: "مختبر SaaS",
      description: "نحن نعلم الهندسة وراء برمجيات الخدمات، مع التركيز على دمج الذكاء الاصطناعي لخلق قيمة مستدامة.",
      color: "bg-cyan-100",
      borderColor: "hover:border-cyan-300"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "مختبرات حقيقية",
      description: "نتشارك مع المدارس والشركات لتوفير مختبرات حية - مشاكل حقيقية تحتاج إلى نماذج أولية ذكية.",
      color: "bg-blue-100",
      borderColor: "hover:border-blue-300"
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: "تكرار سريع",
      description: "صُممت معسكرات البناء الخاصة بنا للسرعة، والانتقال من المفهوم إلى النموذج الأولي في وقت قياسي.",
      color: "bg-indigo-100",
      borderColor: "hover:border-indigo-300"
    },
    {
      icon: <Layers className="w-8 h-8 text-violet-600" />,
      title: "المعرض أولاً",
      description: "أنت لا تتخرج بشهادة ورقية؛ بل تتخرج برابط لتطبيق حي قمت ببنائه ونشره بنفسك.",
      color: "bg-violet-100",
      borderColor: "hover:border-violet-300"
    }
  ],
  EN: [
    {
      icon: <Building2 className="w-8 h-8 text-cyan-600" />,
      title: "SaaS Lab",
      description: "We teach the engineering behind service software, focusing on AI integration for sustainable value.",
      color: "bg-cyan-100",
      borderColor: "hover:border-cyan-300"
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: "Real Labs",
      description: "We partner with schools and companies to provide live labs - real problems needing smart prototypes.",
      color: "bg-blue-100",
      borderColor: "hover:border-blue-300"
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: "Rapid Iteration",
      description: "Our build camps are designed for speed, going from concept to prototype in record time.",
      color: "bg-indigo-100",
      borderColor: "hover:border-indigo-300"
    },
    {
      icon: <Layers className="w-8 h-8 text-violet-600" />,
      title: "Portfolio First",
      description: "You don't graduate with paper; you graduate with a live app link you built and deployed yourself.",
      color: "bg-violet-100",
      borderColor: "hover:border-violet-300"
    }
  ]
};

const Features: React.FC<FeaturesProps> = ({ language = 'AR' }) => {
  const pillars = pillarsData[language];
  
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[11px] font-black tracking-[0.3em] text-cyan-600 uppercase mb-4">
            {language === 'AR' ? 'الركائز الاستراتيجية' : 'STRATEGIC PILLARS'}
          </h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.1]">
            {language === 'AR' ? (
              <>تحويل الفضول إلى <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-600 to-indigo-600">قوة ذكية</span></>
            ) : (
              <>Turning Curiosity Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600">Intelligent Power</span></>
            )}
          </h3>
          <p className="text-lg text-slate-500 leading-relaxed font-medium">
            {language === 'AR' 
              ? 'فلسفة "مختبر الابتكار" تضمن أن كل طالب يبني أدوات حقيقية لأعمال حقيقية. لا نظريات فارغة، فقط تنفيذ.'
              : 'The "Innovation Foundry" philosophy ensures every student builds real tools for real businesses. No empty theories, just execution.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className={`group p-10 rounded-[3rem] bg-slate-50 border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-200/50 hover:bg-white ${pillar.borderColor}`}
            >
              <div className={`w-16 h-16 rounded-[1.5rem] ${pillar.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {pillar.icon}
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">{pillar.title}</h4>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;