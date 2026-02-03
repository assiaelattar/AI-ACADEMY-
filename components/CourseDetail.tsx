import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckCircle2, Calendar, Clock, Users, ShieldCheck, 
  ArrowRight, Star, MapPin, Video, Loader2, Download, X, 
  Phone, User, Mail, Sparkles, BookOpen, Quote, Zap, Rocket,
  CheckCircle, ChevronLeft, MessageSquare
} from 'lucide-react';
import { Course } from './data';
import TechSticker from './TechSticker';

interface CourseDetailProps {
  course: Course;
  language: 'AR' | 'EN';
  onBack: () => void;
  onEnroll?: (courseId: string, studentName: string, email: string, mode: 'campus' | 'online') => void;
  onBrochureRequest?: (courseId: string, fullName: string, email: string, phone: string) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, language, onBack, onEnroll, onBrochureRequest }) => {
  const [mode, setMode] = useState<'campus' | 'online'>('campus');
  const [formData, setFormData] = useState({ parentName: '', email: '', childName: '', age: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [course.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onEnroll) {
      setIsSubmitting(true);
      setTimeout(() => {
        onEnroll(course.id, formData.parentName, formData.email, mode);
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const labels = {
    AR: {
      back: 'العودة للبرامج',
      duration: 'المدة',
      category: 'الفئة',
      rating: 'التقييم',
      curriculum: 'المنهج الدراسي',
      sessions: 'الفعاليات القادمة',
      investment: 'استثمار في الغد',
      currency: 'درهم',
      campus: 'حضوري',
      online: 'أونلاين',
      parentName: 'اسم ولي الأمر',
      email: 'البريد الإلكتروني',
      placeholderName: 'الاسم الكامل',
      register: 'سجل الآن في المختبر',
      successTitle: 'تم التسجيل!',
      successDesc: 'شكراً لك، سنتواصل معك قريباً لتأكيد تفاصيل الدفع والجدول الزمني.',
      backHome: 'العودة للبرامج'
    },
    EN: {
      back: 'Back to Programs',
      duration: 'Duration',
      category: 'Category',
      rating: 'Rating',
      curriculum: 'Curriculum',
      sessions: 'Upcoming Sessions',
      investment: 'Investment in Future',
      currency: 'MAD',
      campus: 'On Campus',
      online: 'Online',
      parentName: 'Parent Name',
      email: 'Email Address',
      placeholderName: 'Full Name',
      register: 'Register in Lab Now',
      successTitle: 'Registered Successfully!',
      successDesc: 'Thank you, we will contact you soon to confirm payment details and schedule.',
      backHome: 'Back to Programs'
    }
  }[language];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-md w-full text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl font-black mb-4 uppercase">{labels.successTitle}</h2>
          <p className="text-slate-500 mb-8 font-medium leading-relaxed">{labels.successDesc}</p>
          <button onClick={onBack} className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl uppercase shadow-xl shadow-slate-900/10">{labels.backHome}</button>
        </div>
      </div>
    );
  }

  const title = language === 'AR' ? course.title : course.titleEn;
  const description = language === 'AR' ? course.description : course.descriptionEn;
  const duration = language === 'AR' ? course.duration : course.durationEn;
  const ageGroup = language === 'AR' ? course.ageGroup : course.ageGroupEn;
  const tags = language === 'AR' ? course.tags : course.tagsEn;

  return (
    <div className="bg-slate-50 min-h-screen">
      
      <div className="relative bg-slate-950 text-white overflow-hidden min-h-[70vh] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img src={course.image} alt="Background" className="w-full h-full object-cover opacity-30 filter grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>

        <div className={`fixed top-6 ${language === 'AR' ? 'right-6' : 'left-6'} md:relative md:top-0 md:right-0 z-50 md:max-w-7xl md:mx-auto md:px-6 md:pt-32 shrink-0`}>
          <button 
            onClick={onBack}
            className={`flex items-center gap-2 px-5 py-3 md:px-0 md:py-0 bg-white/10 md:bg-transparent backdrop-blur-md md:backdrop-blur-none rounded-2xl text-white hover:text-cyan-400 transition-all group font-black uppercase text-[10px] tracking-widest border border-white/10 md:border-none ${language === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {language === 'AR' ? <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /> : <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />}
            {labels.back}
          </button>
        </div>

        <div className={`max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10 mt-auto w-full ${language === 'AR' ? 'text-right' : 'text-left'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6 md:space-y-10">
              <div className={`flex gap-2 flex-wrap ${language === 'AR' ? 'justify-start' : 'justify-end md:justify-start'}`}>
                {tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-cyan-500 text-slate-950 rounded-full text-[9px] font-black uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-8xl font-black leading-tight tracking-tighter uppercase">
                {title}
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 leading-relaxed max-w-2xl font-medium">
                {description}
              </p>
              
              <div className={`grid grid-cols-2 md:flex md:flex-wrap gap-6 md:gap-12 pt-6 ${language === 'AR' ? '' : 'flex-row-reverse md:flex-row'}`}>
                {[
                  { icon: <Clock className="text-cyan-400" />, label: labels.duration, value: duration },
                  { icon: <Users className="text-violet-400" />, label: labels.category, value: ageGroup },
                  { icon: <Star className="text-amber-400" />, label: labels.rating, value: `${course.rating}/5.0` }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 md:bg-transparent md:border-none md:p-0">
                    <span className="text-[9px] font-black uppercase text-slate-500 mb-2">{item.label}</span>
                    <div className="flex items-center gap-2 text-white font-black text-sm md:text-2xl">
                      {item.icon} {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 ${language === 'AR' ? '' : 'lg:flex-row-reverse'}`}>
          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            
            <section className="space-y-8 md:space-y-12">
              <div className={`flex items-center gap-4 md:gap-6 ${language === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-2xl md:text-4xl font-black uppercase">{labels.curriculum}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {course.learningOutcomes?.map((outcome, idx) => (
                  <div key={idx} className={`bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all ${language === 'AR' ? 'text-right' : 'text-left'}`}>
                    <div className="text-cyan-500 font-black text-3xl md:text-5xl mb-6 opacity-20">٠{idx + 1}</div>
                    <h3 className="text-xl md:text-2xl font-black uppercase mb-4">{language === 'AR' ? outcome.title : outcome.titleEn}</h3>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">{language === 'AR' ? outcome.description : outcome.descriptionEn}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-12">
               <div className={`flex items-center gap-6 ${language === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Calendar size={28} />
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tight">{labels.sessions}</h2>
              </div>
              <div className="space-y-4 md:space-y-6">
                {course.sessions?.map((session, idx) => (
                  <div key={idx} className={`flex flex-col md:flex-row md:items-center justify-between p-8 bg-white rounded-[2rem] border border-slate-100 group ${language === 'AR' ? '' : 'md:flex-row-reverse'}`}>
                    <div className={`flex items-center gap-6 ${language === 'AR' ? '' : 'flex-row-reverse'}`}>
                      <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                        <Calendar className="text-slate-400 group-hover:text-emerald-500" size={24} />
                      </div>
                      <div className={language === 'AR' ? 'text-right' : 'text-left'}>
                        <p className="font-black text-xl uppercase">{language === 'AR' ? session.date : session.dateEn}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase">{language === 'AR' ? session.time : session.timeEn}</p>
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-8">
                      <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        session.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 
                        session.status === 'Filling Fast' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {language === 'AR' ? session.statusAr : session.statusEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-slate-100">
                <div className={`space-y-8 md:space-y-10 ${language === 'AR' ? 'text-right' : 'text-left'}`}>
                  <div className="border-b border-slate-100 pb-8">
                    <span className="text-[10px] font-black uppercase text-slate-400">{labels.investment}</span>
                    <div className="text-4xl md:text-5xl font-black text-slate-950 mt-2">{course.price} <span className="text-base text-slate-400">{labels.currency}</span></div>
                  </div>

                  <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                    <div className="bg-slate-50 p-1.5 rounded-2xl flex border border-slate-200">
                      <button type="button" onClick={() => setMode('campus')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${mode === 'campus' ? 'bg-white shadow-md text-slate-950' : 'text-slate-400'}`}>{labels.campus}</button>
                      <button type="button" onClick={() => setMode('online')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${mode === 'online' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400'}`}>{labels.online}</button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400">{labels.parentName}</label>
                      <input required type="text" value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500 text-sm font-bold" placeholder={labels.placeholderName} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400">{labels.email}</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500 text-sm font-bold" placeholder="example@email.com" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-slate-950 text-white font-black py-5 rounded-2xl hover:bg-cyan-500 hover:text-slate-950 transition-all uppercase text-xs shadow-xl shadow-slate-950/20">
                      {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : labels.register}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;