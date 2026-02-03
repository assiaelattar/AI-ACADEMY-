import React, { useState } from 'react';
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
import { Building2, Rocket, Briefcase, Layout, ChevronLeft } from 'lucide-react';

type ViewState = 'home' | 'course-detail' | 'admin';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [brochureRequests, setBrochureRequests] = useState<BrochureRequest[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(initialPortfolio);

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
      age: 12,
      mode,
      status: 'pending',
      date: new Date().toISOString()
    };

    setEnrollments(prev => [newEnrollment, ...prev]);
  };

  const handleBrochureRequest = (courseId: string, fullName: string, email: string, phone: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const newRequest: BrochureRequest = {
      id: Math.random().toString(36).substr(2, 9),
      courseId,
      courseTitle: course.title,
      fullName,
      email,
      phone,
      date: new Date().toISOString()
    };

    setBrochureRequests(prev => [newRequest, ...prev]);
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
             <Logo size={120} showText dark className="items-center" siteSettings={siteSettings} />
          </div>
          <form onSubmit={handleAdminLogin} className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-slate-800 max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
            <h2 className="text-2xl font-black text-white mb-2 text-center uppercase tracking-tight">الدخول للوحة التحكم</h2>
            <p className="text-slate-400 text-center text-sm mb-8 font-medium">يرجى إدخال كلمة المرور الإدارية.</p>
            <div className="space-y-4">
              <input 
                type="password" 
                placeholder="كلمة المرور" 
                className={`w-full p-4 rounded-2xl border bg-slate-800 text-white transition-all focus:outline-none focus:ring-2 text-center ${loginError ? 'border-rose-500 focus:ring-rose-500/20' : 'border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20'}`}
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }}
                required 
              />
              <button className="w-full bg-cyan-500 text-slate-900 py-4 rounded-2xl font-black uppercase hover:bg-cyan-400 transition-all">فتح اللوحة</button>
            </div>
            <button type="button" onClick={handleNavigateHome} className="w-full mt-8 text-slate-500 text-xs font-black uppercase hover:text-white transition-colors">العودة للموقع</button>
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
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <Navbar siteSettings={siteSettings} onNavigate={(page) => { if(page === 'home') handleNavigateHome(); }} onAdminClick={handleNavigateAdmin} />
      <main>
        {view === 'course-detail' && selectedCourseData ? (
          <CourseDetail course={selectedCourseData} onBack={handleNavigateHome} onEnroll={handleEnroll} onBrochureRequest={handleBrochureRequest} />
        ) : (
          <>
            <Hero siteSettings={siteSettings} />
            
            {/* Partners Marquee */}
            <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
               <div className="max-w-7xl mx-auto px-6">
                 <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">شركاء النجاح في مختبر الابتكار</p>
                 <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
                   {partners.map(p => (
                     <img key={p.id} src={p.logo} alt={p.name} className="h-8 md:h-12 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
                   ))}
                 </div>
               </div>
            </section>

            <Features />
            <Courses courses={courses} onCourseSelect={handleCourseSelect} />

            {/* Business Solutions Section */}
            <section id="business" className="py-32 bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div className="space-y-8">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[11px] font-black uppercase">
                     <Building2 size={14} className="text-cyan-400" /> حلول للأعمال والشركات
                   </div>
                   <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-none">ابنِ منتج <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-600 to-blue-600">SaaS</span> الخاص بشركتك</h2>
                   <p className="text-xl text-slate-500 font-medium leading-relaxed">نحن لا نعلم الطلاب فحسب، بل نبني حلولاً تقنية حقيقية. فريقنا المتخصص يساعد الشركات على أتمتة عملياتها وبناء وكلاء ذكاء اصطناعي مخصصين.</p>
                   <div className="space-y-4">
                     {['تطوير منتجات SaaS مخصصة', 'أتمتة العمليات بالذكاء الاصطناعي', 'بناء وكلاء دعم مخصصين'].map(item => (
                       <div key={item} className="flex items-center gap-3 font-bold text-slate-700">
                         <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600"><Rocket size={14} /></div>
                         {item}
                       </div>
                     ))}
                   </div>
                   <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-4">ابدأ مشروعك معنا <ChevronLeft size={20}/></button>
                 </div>
                 <div className="relative">
                   <div className="w-full aspect-square bg-slate-100 rounded-[4rem] overflow-hidden rotate-3">
                     <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200" className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute -bottom-10 -left-10 p-8 bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 animate-float">
                      <p className="text-cyan-600 font-black text-4xl leading-none">٩٨٪</p>
                      <p className="text-slate-400 text-[10px] font-black uppercase mt-1">نسبة رضا العملاء</p>
                   </div>
                 </div>
              </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-32 bg-slate-50">
               <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-20 space-y-4">
                    <h2 className="text-[11px] font-black text-cyan-600 uppercase tracking-widest">معرض أعمالنا</h2>
                    <h3 className="text-5xl font-black uppercase">مشاريع <span className="text-slate-400">حقيقية</span> لعملاء حقيقيين</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {portfolio.map(project => (
                      <div key={project.id} className="group bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                        <div className="h-80 overflow-hidden relative">
                           <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute top-8 right-8 px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase text-slate-900">{project.category}</div>
                        </div>
                        <div className="p-12">
                           <p className="text-cyan-500 font-black text-xs uppercase mb-2">{project.client}</p>
                           <h4 className="text-3xl font-black uppercase mb-4">{project.title}</h4>
                           <p className="text-slate-500 font-medium leading-relaxed mb-8">{project.description}</p>
                           <button className="flex items-center gap-3 text-slate-900 font-black uppercase text-xs hover:text-cyan-600 transition-colors">عرض دراسة الحالة <ChevronLeft size={16}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </section>
          </>
        )}
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}