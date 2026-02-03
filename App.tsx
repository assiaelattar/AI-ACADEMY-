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
  initialPartners, initialPortfolio 
} from './components/data';
import { Building2, Rocket, Briefcase, Layout, ChevronLeft, X, CheckCircle, Loader2 } from 'lucide-react';

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

  // Sync document direction
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
      parentName: 'Parent',
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
            
            {/* Partners Marquee */}
            <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
               <div className="max-w-7xl mx-auto px-6">
                 <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">
                   {language === 'AR' ? 'شركاء النجاح في مختبر الابتكار' : 'Innovation Partners & Supporters'}
                 </p>
                 <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
                   {partners.map(p => (
                     <img key={p.id} src={p.logo} alt={p.name} className="h-8 md:h-12 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
                   ))}
                 </div>
               </div>
            </section>

            <Features language={language} />
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