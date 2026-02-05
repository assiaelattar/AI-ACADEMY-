import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import Footer from './components/Footer';
import CourseDetail from './components/CourseDetail';
import AdminDashboard from './components/AdminDashboard';
import Logo from './components/Logo';
import { 
  initialCourses, Course, Enrollment, BrochureRequest, 
  SiteSettings, initialSiteSettings, Partner, PortfolioProject,
  initialPartners, initialPortfolio, masteredTools 
} from './components/data';
import { 
  Building2, Rocket, Briefcase, Layout, ChevronLeft, X, 
  CheckCircle, Loader2, Sparkles, Code, Globe, Zap, Bot, 
  Terminal, Cpu, Database, Github, Layers, ArrowUpRight, 
  Plus, Video, Mic2, MessageSquare
} from 'lucide-react';

type ViewState = 'home' | 'course-detail' | 'admin';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [language, setLanguage] = useState<'AR' | 'EN'>('AR');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [brochureRequests, setBrochureRequests] = useState<BrochureRequest[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(initialPortfolio);

  useEffect(() => {
    document.dir = language === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'AR' ? 'ar' : 'en';
  }, [language]);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView('course-detail');
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = () => {
    setView('home');
    setSelectedCourseId(null);
    window.scrollTo(0, 0);
  };

  const handleNavigateAdmin = () => {
    setView('admin');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'AR' ? 'EN' : 'AR');
  };

  const handleEnroll = (courseId: string, studentName: string, email: string, mode: 'campus' | 'online') => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const newEnrollment: Enrollment = {
      id: Math.random().toString(36).substr(2, 9),
      courseId,
      courseTitle: course.title,
      studentName,
      parentName: 'Founder',
      email,
      age: 25,
      mode,
      status: 'pending',
      date: new Date().toISOString()
    };

    setEnrollments(prev => [newEnrollment, ...prev]);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAdminLoggedIn(true);
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const selectedCourseData = selectedCourseId ? courses.find(c => c.id === selectedCourseId) : null;

  // Helper to map tool to icon
  const getToolIcon = (name: string) => {
    const iconSize = 18;
    switch(name.toLowerCase()) {
      case 'gemini': return <Bot size={iconSize} />;
      case 'klingai': return <Video size={iconSize} />;
      case 'claude code': return <Code size={iconSize} />;
      case 'veo 3': return <Zap size={iconSize} />;
      case 'antigravity': return <Layers size={iconSize} />;
      case 'google ai studio': return <Cpu size={iconSize} />;
      case 'nano banana pro': return <Zap size={iconSize} />;
      case 'seedream': return <Mic2 size={iconSize} />;
      case 'remotion': return <Terminal size={iconSize} />;
      case 'firebase': return <Database size={iconSize} />;
      case 'github': return <Github size={iconSize} />;
      case 'highfield': return <Globe size={iconSize} />;
      default: return <Sparkles size={iconSize} />;
    }
  };

  if (view === 'admin') {
    if (!isAdminLoggedIn) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-6">
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
             <Logo size={120} showText dark className="items-center" siteSettings={siteSettings} language={language} />
          </div>
          <form onSubmit={handleAdminLogin} className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-slate-800 max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-black text-white mb-2 text-center uppercase tracking-tight">
              {language === 'AR' ? 'الدخول للوحة التحكم' : 'Admin Login'}
            </h2>
            <p className="text-slate-400 text-center text-sm mb-8 font-medium">
              {language === 'AR' ? 'يرجى إدخال كلمة المرور الإدارية.' : 'Please enter the administrative password.'}
            </p>
            <div className="space-y-4">
              <input 
                type="password" 
                placeholder={language === 'AR' ? 'كلمة المرور' : 'Password'}
                className={`w-full p-4 rounded-2xl border bg-slate-800 text-white transition-all focus:outline-none focus:ring-2 text-center ${loginError ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20'}`}
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }}
                required 
              />
              <button className="w-full bg-cyan-500 text-slate-900 py-4 rounded-2xl font-black uppercase hover:bg-cyan-400 transition-all">
                {language === 'AR' ? 'فتح اللوحة' : 'Open Dashboard'}
              </button>
            </div>
            <button type="button" onClick={handleNavigateHome} className="w-full mt-8 text-slate-500 text-xs font-black uppercase hover:text-white transition-colors">
              {language === 'AR' ? 'العودة للموقع' : 'Back to Website'}
            </button>
          </form>
        </div>
      );
    }
    return (
      <AdminDashboard 
        courses={courses}
        enrollments={enrollments}
        brochureRequests={brochureRequests}
        siteSettings={siteSettings}
        partners={partners}
        portfolio={portfolio}
        onAddCourse={(c) => setCourses([...courses, c])}
        onUpdateCourse={(c) => setCourses(courses.map(x => x.id === c.id ? c : x))}
        onDeleteCourse={(id) => setCourses(courses.filter(x => x.id !== id))}
        onUpdateEnrollmentStatus={(id, s, m) => setEnrollments(enrollments.map(e => e.id === id ? {...e, status: s, meetLink: m} : e))}
        onUpdateSiteSettings={setSiteSettings}
        onUpdatePartners={setPartners}
        onUpdatePortfolio={setPortfolio}
        onLogout={() => { setIsAdminLoggedIn(false); handleNavigateHome(); }}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900`} dir={language === 'AR' ? 'rtl' : 'ltr'}>
      <Navbar 
        siteSettings={siteSettings} 
        language={language} 
        onLanguageToggle={toggleLanguage}
        onNavigate={(page) => { if(page === 'home') handleNavigateHome(); }} 
        onAdminClick={handleNavigateAdmin} 
        onRegisterClick={() => setIsRegistrationOpen(true)}
      />
      <main>
        {view === 'course-detail' && selectedCourseData ? (
          <CourseDetail course={selectedCourseData} language={language} onBack={handleNavigateHome} onEnroll={handleEnroll} />
        ) : (
          <>
            <Hero siteSettings={siteSettings} language={language} onRegisterClick={() => setIsRegistrationOpen(true)} />
            
            {/* Tech Stack Sleek Marquee - New Redesign */}
            <div className="bg-white py-12 border-b border-slate-100 relative z-40 overflow-hidden">
               <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                     {language === 'AR' ? 'الترسانة التقنية للمختبر' : 'FOUNDRY TECH STACK'}
                  </h3>
                  <div className="h-px flex-1 mx-8 bg-slate-100 hidden md:block"></div>
                  <div className="flex items-center gap-2 text-cyan-500">
                    <Sparkles size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">{language === 'AR' ? 'أدوات الجيل القادم' : 'NEXT-GEN AI'}</span>
                  </div>
               </div>

               <div className="relative">
                  {/* Fade Overlays */}
                  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
                  
                  <div className="flex animate-marquee-fast gap-6 md:gap-10">
                     {[...masteredTools, ...masteredTools, ...masteredTools].map((tool, i) => (
                       <div key={i} className="flex-shrink-0 flex items-center gap-4 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-slate-950 hover:text-white hover:border-slate-900 transition-all duration-300">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tool.featured ? 'bg-cyan-500 text-slate-950' : 'bg-slate-200 text-slate-600 group-hover:bg-slate-800 group-hover:text-cyan-400'}`}>
                             {getToolIcon(tool.name)}
                          </div>
                          <div className="flex flex-col">
                             <span className="text-xs md:text-sm font-black uppercase leading-none">{tool.name}</span>
                             <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1 group-hover:text-slate-500">{tool.category}</span>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
            
            {/* Partners Bar */}
            <section className="py-10 bg-slate-50 overflow-hidden border-b border-slate-100">
               <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
                 {partners.map(p => (
                   <img key={p.id} src={p.logo} alt={p.name} className="h-6 md:h-8 grayscale object-contain" />
                 ))}
               </div>
            </section>

            <Features language={language} />

            {/* The Lab Process Section */}
            <section className="py-24 md:py-32 bg-slate-950 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
                   <div className="lg:col-span-5 space-y-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 rounded-full text-slate-950 text-[11px] font-black uppercase">
                        {language === 'AR' ? 'رحلة الصناع' : 'The Makers Journey'}
                      </div>
                      <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.1]">
                        {language === 'AR' ? <>كيف نحول <span className="text-slate-500">الخيال</span> إلى واقع؟</> : <>How We Turn <span className="text-slate-500">Imagination</span> Into Reality?</>}
                      </h2>
                      <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        {language === 'AR' 
                          ? 'نتبع منهجية الابتكار السريع. يبدأ الطلاب بفهم احتياج حقيقي، ثم يشرعون في بناء وتجريب حلولهم الذكية.'
                          : 'We follow a rapid innovation methodology. Students start by understanding a real need, then set out to build and test their smart solutions.'}
                      </p>
                      
                      <div className="space-y-6">
                        {[
                          { icon: <Bot size={20}/>, title: language === 'AR' ? 'التفكير التصميمي' : 'Design Thinking', desc: language === 'AR' ? 'تحديد المشكلة وحلولها الممكنة' : 'Define problem & potential solutions' },
                          { icon: <Code size={20}/>, title: language === 'AR' ? 'البناء التقني' : 'Technical Build', desc: language === 'AR' ? 'برمجة الحلول باستخدام أحدث الأدوات' : 'Coding solutions with latest tools' },
                          { icon: <Rocket size={20}/>, title: language === 'AR' ? 'الإطلاق والنشر' : 'Launch & Deploy', desc: language === 'AR' ? 'عرض المشروع للعالم' : 'Show project to the world' }
                        ].map((step, i) => (
                          <div key={i} className={`flex gap-4 ${language === 'AR' ? 'text-right' : 'text-left'}`}>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-xl flex items-center justify-center text-cyan-500 flex-shrink-0">
                               {step.icon}
                            </div>
                            <div>
                               <h4 className="text-white font-black text-sm md:text-base uppercase tracking-tight">{step.title}</h4>
                               <p className="text-slate-500 text-xs md:text-sm font-medium">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                   
                   <div className="lg:col-span-7 relative">
                      <div className="grid grid-cols-2 gap-4 md:gap-6 transform rotate-3 scale-95 md:scale-100">
                        <div className="space-y-4 md:space-y-6">
                           <div className="aspect-[4/5] bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-800">
                              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600" className="w-full h-full object-cover grayscale opacity-50" />
                           </div>
                           <div className="aspect-square bg-cyan-600 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-6 text-center text-slate-950">
                              <Sparkles size={48} className="mb-4" />
                              <span className="font-black text-xl md:text-3xl uppercase leading-none">{language === 'AR' ? 'إبداع بلا حدود' : 'Limitless Creativity'}</span>
                           </div>
                        </div>
                        <div className="space-y-4 md:space-y-6 pt-12">
                           <div className="aspect-square bg-white rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-6 text-center text-slate-950">
                              <Zap size={48} className="text-indigo-600 mb-4" />
                              <span className="font-black text-xl md:text-3xl uppercase leading-none">{language === 'AR' ? 'تطور سريع' : 'Fast Growth'}</span>
                           </div>
                           <div className="aspect-[4/5] bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-800">
                              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600" className="w-full h-full object-cover grayscale opacity-50" />
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </section>

            <Courses courses={courses} language={language} onCourseSelect={handleCourseSelect} />

            {/* Business Solutions Section */}
            <section id="business" className="py-32 bg-white overflow-hidden">
              <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${language === 'AR' ? '' : 'lg:flex-row-reverse'}`}>
                 <div className={`space-y-8 ${language === 'AR' ? 'text-right' : 'text-left'}`}>
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase">
                     <Building2 size={14} className="text-cyan-400" /> {language === 'AR' ? 'حلول للأعمال والشركات' : 'Business Solutions'}
                   </div>
                   <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-none">
                     {language === 'AR' ? <>ابنِ منتج <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-600 to-blue-600">SaaS</span> الخاص بشركتك</> : <>Build Your Own <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">SaaS</span> Product</>}
                   </h2>
                   <p className="text-xl text-slate-500 font-medium leading-relaxed">
                     {language === 'AR' 
                       ? 'نحن لا نعلم الطلاب فحسب، بل نبني حلولاً تقنية حقيقية. فريقنا المتخصص يساعد الشركات على أتمتة عملياتها وبناء وكلاء ذكاء اصطناعي مخصصين.' 
                       : 'We don\'t just teach students; we build real-world tech solutions. Our specialized team helps businesses automate workflows and build custom AI agents.'}
                   </p>
                   <div className="space-y-4">
                     {(language === 'AR' 
                       ? ['تطوير منتجات SaaS مخصصة', 'أتمتة العمليات بالذكاء الاصطناعي', 'بناء وكلاء دعم مخصصين']
                       : ['Custom SaaS Development', 'AI Workflow Automation', 'Custom Support Agents']
                     ).map(item => (
                       <div key={item} className={`flex items-center gap-3 font-bold text-slate-700 ${language === 'AR' ? '' : 'flex-row-reverse'}`}>
                         <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600"><Rocket size={14} /></div>
                         {item}
                       </div>
                     ))}
                   </div>
                   <button 
                    onClick={() => setIsRegistrationOpen(true)}
                    className={`px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-4 active:scale-95 ${language === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}
                   >
                     {language === 'AR' ? 'ابدأ مشروعك معنا' : 'Start Your Project'} <ChevronLeft size={20} className={language === 'EN' ? 'rotate-180' : ''}/>
                   </button>
                 </div>
                 <div className="relative">
                   <div className="w-full aspect-square bg-slate-100 rounded-[4rem] overflow-hidden rotate-3">
                     <img src={siteSettings.businessImage} className="w-full h-full object-cover" />
                   </div>
                   <div className={`absolute -bottom-10 ${language === 'AR' ? '-left-10' : '-right-10'} p-8 bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 animate-float`}>
                      <p className="text-cyan-600 font-black text-4xl leading-none">٩٨٪</p>
                      <p className="text-slate-400 text-[10px] font-black uppercase mt-1">{language === 'AR' ? 'نسبة رضا العملاء' : 'Customer Satisfaction'}</p>
                   </div>
                 </div>
              </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-32 bg-slate-50">
               <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-20 space-y-4">
                    <h2 className="text-[11px] font-black text-cyan-600 uppercase tracking-widest">{language === 'AR' ? 'معرض أعمالنا' : 'Our Portfolio'}</h2>
                    <h3 className="text-5xl font-black uppercase">{language === 'AR' ? <>مشاريع <span className="text-slate-400">حقيقية</span> لعملاء حقيقيين</> : <>Real <span className="text-slate-400">Projects</span> For Real Clients</>}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {portfolio.map(project => (
                      <div key={project.id} className="group bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                        <div className="h-80 overflow-hidden relative">
                           <img src={project.image} alt={language === 'AR' ? project.title : project.titleEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className={`absolute top-8 ${language === 'AR' ? 'right-8' : 'left-8'} px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase text-slate-900`}>
                             {language === 'AR' ? project.category : project.categoryEn}
                           </div>
                        </div>
                        <div className={`p-12 ${language === 'AR' ? 'text-right' : 'text-left'}`}>
                           <p className="text-cyan-500 font-black text-xs uppercase mb-2">{language === 'AR' ? project.client : project.clientEn}</p>
                           <h4 className="text-3xl font-black uppercase mb-4">{language === 'AR' ? project.title : project.titleEn}</h4>
                           <p className="text-slate-500 font-medium leading-relaxed mb-8">{language === 'AR' ? project.description : project.descriptionEn}</p>
                           <button className={`flex items-center gap-3 text-slate-900 font-black uppercase text-xs hover:text-cyan-600 transition-colors ${language === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
                             {language === 'AR' ? 'عرض دراسة الحالة' : 'View Case Study'} <ChevronLeft size={16} className={language === 'EN' ? 'rotate-180' : ''}/>
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </section>
          </>
        )}
      </main>
      <Footer siteSettings={siteSettings} language={language} />

      {/* Global Registration Modal */}
      {isRegistrationOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] sm:rounded-[3.5rem] w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-8 sm:p-12">
            <button 
              onClick={() => setIsRegistrationOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X size={20} />
            </button>
            <div className={`text-center mb-8 ${language === 'AR' ? '' : 'text-left'}`}>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                {language === 'AR' ? 'انضم لمختبر الصناع' : 'Join The Maker Foundry'}
              </h2>
              <p className="text-slate-500 font-medium">
                {language === 'AR' ? 'ابدأ رحلتك في بناء المستقبل مع الذكاء الاصطناعي.' : 'Start your journey in building the future with AI.'}
              </p>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsRegistrationOpen(false); alert(language === 'AR' ? 'تم التسجيل بنجاح!' : 'Successfully Registered!'); }}>
               <div className="space-y-1">
                 <label className={`text-[10px] font-black uppercase text-slate-400 block ${language === 'AR' ? 'text-right' : 'text-left'}`}>{language === 'AR' ? 'الاسم الكامل' : 'Full Name'}</label>
                 <input required type="text" className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500 text-sm font-bold ${language === 'AR' ? 'text-right' : 'text-left'}`} />
               </div>
               <div className="space-y-1">
                 <label className={`text-[10px] font-black uppercase text-slate-400 block ${language === 'AR' ? 'text-right' : 'text-left'}`}>{language === 'AR' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                 <input required type="email" className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500 text-sm font-bold ${language === 'AR' ? 'text-right' : 'text-left'}`} />
               </div>
               <div className="space-y-1">
                 <label className={`text-[10px] font-black uppercase text-slate-400 block ${language === 'AR' ? 'text-right' : 'text-left'}`}>{language === 'AR' ? 'البرنامج المفضل' : 'Preferred Program'}</label>
                 <select className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500 text-sm font-bold appearance-none ${language === 'AR' ? 'text-right' : 'text-left'}`}>
                    {courses.map(c => <option key={c.id} value={c.id}>{language === 'AR' ? c.title : c.titleEn}</option>)}
                    <option value="business">{language === 'AR' ? 'حلول للأعمال' : 'Business Solutions'}</option>
                 </select>
               </div>
               <button type="submit" className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-cyan-500 hover:text-slate-950 transition-all uppercase text-xs shadow-xl shadow-slate-950/20 mt-4">
                 {language === 'AR' ? 'إرسال طلب الانضمام' : 'Submit Join Request'}
               </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}