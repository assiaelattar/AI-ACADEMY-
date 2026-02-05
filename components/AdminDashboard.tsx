import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, Plus, Search, Calendar, Video, 
  MapPin, CheckCircle, Clock, Link, Trash2, X, Download, FileText, 
  Settings, Save, Edit3, LogOut, Image as ImageIcon, Sparkles, 
  MessageSquare, GraduationCap, ChevronRight, AlertCircle, PlusCircle,
  Briefcase, Globe, Palette, Building2, Menu
} from 'lucide-react';
import { Course, Enrollment, BrochureRequest, SiteSettings, Partner, PortfolioProject } from './data';
import Logo from './Logo';

interface AdminDashboardProps {
  courses: Course[];
  enrollments: Enrollment[];
  brochureRequests: BrochureRequest[];
  siteSettings: SiteSettings;
  partners: Partner[];
  portfolio: PortfolioProject[];
  onAddCourse: (course: Course) => void;
  onUpdateCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
  onUpdateEnrollmentStatus: (id: string, status: 'confirmed' | 'scheduled', meetLink?: string) => void;
  onUpdateSiteSettings: (settings: SiteSettings) => void;
  onUpdatePartners: (partners: Partner[]) => void;
  onUpdatePortfolio: (portfolio: PortfolioProject[]) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  courses, enrollments, brochureRequests, siteSettings, partners, portfolio,
  onAddCourse, onUpdateCourse, onDeleteCourse, onUpdateEnrollmentStatus, 
  onUpdateSiteSettings, onUpdatePartners, onUpdatePortfolio, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'enrollments' | 'leads' | 'settings' | 'partners' | 'portfolio' | 'appearance'>('overview');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Appearance state
  const [appearanceForm, setAppearanceForm] = useState<SiteSettings>(siteSettings);

  const handleOpenEdit = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm(JSON.parse(JSON.stringify(course)));
    setShowCourseModal(true);
  };

  const handleOpenAdd = () => {
    setEditingCourseId(null);
    setCourseForm({ title: '', tags: ['جديد'], features: [], learningOutcomes: [], testimonials: [], sessions: [] });
    setShowCourseModal(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = { ...courseForm, id: editingCourseId || Date.now().toString() } as Course;
    editingCourseId ? onUpdateCourse(courseData) : onAddCourse(courseData);
    setShowCourseModal(false);
  };

  const handleSaveAppearance = () => {
    onUpdateSiteSettings(appearanceForm);
    alert('تم حفظ الإعدادات بنجاح!');
  };

  const navItems = [
    { id: 'overview', icon: <LayoutDashboard size={20}/>, label: 'الإحصائيات' },
    { id: 'appearance', icon: <Palette size={20}/>, label: 'الهوية والمظهر' },
    { id: 'courses', icon: <BookOpen size={20}/>, label: 'البرامج' },
    { id: 'partners', icon: <Globe size={20}/>, label: 'الشركاء' },
    { id: 'portfolio', icon: <Briefcase size={20}/>, label: 'معرض الأعمال' },
    { id: 'enrollments', icon: <Users size={20}/>, label: 'الطلاب' },
    { id: 'leads', icon: <FileText size={20}/>, label: 'الطلبات' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 md:p-10 border-b border-slate-900 flex justify-between items-center">
         <Logo size={40} showText dark siteSettings={siteSettings} />
         <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 p-2 hover:text-white transition-colors">
            <X size={24} />
         </button>
      </div>
      <nav className="flex-1 p-4 md:p-8 space-y-2">
        {navItems.map(tab => (
          <button 
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setIsMobileMenuOpen(false);
            }} 
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase ${activeTab === tab.id ? 'bg-cyan-600 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-900 hover:text-white'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>
      <div className="p-6 md:p-8 border-t border-slate-900">
        <button onClick={onLogout} className="w-full flex items-center gap-3 text-slate-500 hover:text-rose-400 transition-colors px-6 py-3 font-black text-xs uppercase">
          <LogOut size={18} /> خروج
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900" dir="rtl">
      {/* Desktop Sidebar */}
      <aside className="w-80 bg-slate-950 text-white flex-shrink-0 hidden md:flex flex-col border-l border-slate-800">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[150] bg-slate-950/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar Drawer */}
      <aside className={`fixed inset-y-0 right-0 z-[160] w-72 bg-slate-950 text-white transform transition-transform duration-300 md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <SidebarContent />
      </aside>

      <main className="flex-1 overflow-y-auto h-screen relative">
        <header className="bg-white border-b border-slate-200 px-4 md:px-10 py-4 md:py-5 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-2xl font-black uppercase tracking-tight">
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-100 flex items-center justify-center font-black text-sm md:text-base">A</div>
        </header>

        <div className="p-4 md:p-10">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
               {[
                 { label: 'إجمالي البرامج', value: courses.length, icon: <BookOpen className="text-cyan-500" /> },
                 { label: 'الطلاب المسجلين', value: enrollments.length, icon: <Users className="text-indigo-500" /> },
                 { label: 'طلبات الانضمام', value: brochureRequests.length, icon: <FileText className="text-emerald-500" /> },
                 { label: 'المشاريع الحية', value: portfolio.length, icon: <Briefcase className="text-amber-500" /> }
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                   <div className="flex items-center justify-between mb-4">
                     <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                       {stat.icon}
                     </div>
                   </div>
                   <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{stat.label}</p>
                   <p className="text-2xl md:text-3xl font-black text-slate-900">{stat.value}</p>
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-12 pb-20 md:pb-0">
              <section className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-4 md:pb-6">
                  <Sparkles className="text-cyan-500" />
                  <h2 className="text-base md:text-xl font-black uppercase">إعدادات قسم الـ Hero</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">العنوان الرئيسي (عربي)</label>
                    <input className="w-full bg-slate-50 border-none rounded-xl p-3 md:p-4 text-sm font-bold focus:ring-2 focus:ring-cyan-500/20" value={appearanceForm.heroTitle} onChange={e => setAppearanceForm({...appearanceForm, heroTitle: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">العنوان الرئيسي (English)</label>
                    <input className="w-full bg-slate-50 border-none rounded-xl p-3 md:p-4 text-sm font-bold focus:ring-2 focus:ring-cyan-500/20" value={appearanceForm.heroTitleEn} onChange={e => setAppearanceForm({...appearanceForm, heroTitleEn: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">الوصف (عربي)</label>
                    <textarea className="w-full bg-slate-50 border-none rounded-xl p-3 md:p-4 text-sm font-bold focus:ring-2 focus:ring-cyan-500/20" rows={3} value={appearanceForm.heroDescription} onChange={e => setAppearanceForm({...appearanceForm, heroDescription: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">Description (English)</label>
                    <textarea className="w-full bg-slate-50 border-none rounded-xl p-3 md:p-4 text-sm font-bold focus:ring-2 focus:ring-cyan-500/20" rows={3} value={appearanceForm.heroDescriptionEn} onChange={e => setAppearanceForm({...appearanceForm, heroDescriptionEn: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">رابط صورة الـ Hero</label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input className="flex-1 bg-slate-50 border-none rounded-xl p-3 md:p-4 text-xs focus:ring-2 focus:ring-cyan-500/20" value={appearanceForm.heroImage} onChange={e => setAppearanceForm({...appearanceForm, heroImage: e.target.value})} />
                    <div className="w-full md:w-20 h-32 md:h-20 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                      <img src={appearanceForm.heroImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-4 md:pb-6">
                  <Building2 className="text-cyan-500" />
                  <h2 className="text-base md:text-xl font-black uppercase">صور أقسام الموقع الأخرى</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">صورة قسم "حلول الشركات"</label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <input className="flex-1 bg-slate-50 border-none rounded-xl p-3 md:p-4 text-xs focus:ring-2 focus:ring-cyan-500/20" value={appearanceForm.businessImage} onChange={e => setAppearanceForm({...appearanceForm, businessImage: e.target.value})} />
                      <div className="w-full md:w-20 h-32 md:h-20 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                        <img src={appearanceForm.businessImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div className="fixed bottom-6 left-6 right-6 md:relative md:bottom-0 md:left-0 md:right-0">
                <button 
                  onClick={handleSaveAppearance}
                  className="w-full py-5 md:py-6 bg-slate-900 text-white rounded-[1.5rem] md:rounded-[2rem] font-black uppercase shadow-2xl shadow-slate-900/40 hover:bg-cyan-600 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  <Save size={20} /> حفظ كافة التعديلات
                </button>
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="space-y-8 pb-20 md:pb-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-lg md:text-xl font-black uppercase">إدارة الشركاء</h2>
                <button onClick={() => onUpdatePartners([...partners, { id: Date.now().toString(), name: 'شريك جديد', logo: '' }])} className="w-full md:w-auto p-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 active:scale-95"><Plus size={18}/> إضافة شريك</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {partners.map(p => (
                  <div key={p.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                    <div className="w-full h-16 flex items-center justify-center bg-slate-50 rounded-xl mb-2">
                       {p.logo ? <img src={p.logo} alt={p.name} className="max-h-12 max-w-[80%] object-contain grayscale opacity-50" /> : <ImageIcon className="text-slate-300" />}
                    </div>
                    <input className="w-full bg-slate-50 border-none rounded-lg p-2 text-xs font-bold" value={p.name} onChange={e => onUpdatePartners(partners.map(x => x.id === p.id ? {...x, name: e.target.value} : x))} />
                    <input className="w-full bg-slate-50 border-none rounded-lg p-2 text-[10px]" placeholder="رابط اللوجو" value={p.logo} onChange={e => onUpdatePartners(partners.map(x => x.id === p.id ? {...x, logo: e.target.value} : x))} />
                    <button onClick={() => onUpdatePartners(partners.filter(x => x.id !== p.id))} className="w-full py-2 text-rose-500 text-[10px] font-black uppercase hover:bg-rose-50 rounded-lg transition-colors">حذف</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8 pb-20 md:pb-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-lg md:text-xl font-black uppercase">إدارة المشاريع</h2>
                <button onClick={() => onUpdatePortfolio([...portfolio, { id: Date.now().toString(), title: 'مشروع جديد', client: '', category: '', image: '', description: '' }])} className="w-full md:w-auto p-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 active:scale-95"><Plus size={18}/> إضافة مشروع</button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {portfolio.map(p => (
                  <div key={p.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 group">
                    <div className="h-48 md:h-56 rounded-2xl overflow-hidden mb-2 border border-slate-50 relative">
                      {p.image ? (
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.title} />
                      ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300"><ImageIcon size={48} /></div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">اسم المشروع</label>
                        <input className="w-full bg-slate-50 rounded-xl p-3 text-sm font-bold" value={p.title} onChange={e => onUpdatePortfolio(portfolio.map(x => x.id === p.id ? {...x, title: e.target.value} : x))} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase text-slate-400">اسم العميل</label>
                        <input className="w-full bg-slate-50 rounded-xl p-3 text-sm font-bold" value={p.client} placeholder="العميل" onChange={e => onUpdatePortfolio(portfolio.map(x => x.id === p.id ? {...x, client: e.target.value} : x))} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-slate-400">الوصف</label>
                      <textarea className="w-full bg-slate-50 rounded-xl p-3 text-sm" value={p.description} rows={2} onChange={e => onUpdatePortfolio(portfolio.map(x => x.id === p.id ? {...x, description: e.target.value} : x))} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-slate-400">رابط الصورة</label>
                      <input className="w-full bg-slate-50 rounded-xl p-3 text-[10px]" value={p.image} onChange={e => onUpdatePortfolio(portfolio.map(x => x.id === p.id ? {...x, image: e.target.value} : x))} />
                    </div>
                    <div className="pt-2 border-t border-slate-50">
                      <button onClick={() => onUpdatePortfolio(portfolio.filter(x => x.id !== p.id))} className="text-rose-500 font-black text-[10px] uppercase flex items-center gap-2 hover:text-rose-600 transition-colors">
                        <Trash2 size={14} /> حذف المشروع من المعرض
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-20 md:pb-0">
              {courses.map(course => (
                <div key={course.id} className="bg-white p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col group">
                  <div className="w-full h-40 md:h-48 rounded-[1.5rem] overflow-hidden mb-4 border border-slate-50">
                    <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={course.title} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-base md:text-lg mb-2 truncate uppercase">{course.title}</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase mb-6">{course.duration} • {course.ageGroup}</p>
                  </div>
                  <button onClick={() => handleOpenEdit(course)} className="w-full py-4 bg-slate-50 rounded-xl text-xs font-black uppercase hover:bg-cyan-600 hover:text-white transition-all active:scale-95">تعديل البرنامج</button>
                </div>
              ))}
              <button onClick={handleOpenAdd} className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 md:p-10 flex flex-col items-center justify-center text-slate-400 hover:bg-white hover:border-cyan-500 hover:text-cyan-500 transition-all min-h-[300px] group active:scale-95">
                <PlusCircle size={48} className="mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <span className="font-black uppercase text-xs">إضافة برنامج تعليمي جديد</span>
              </button>
            </div>
          )}

          {(activeTab === 'enrollments' || activeTab === 'leads') && (
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-right">
                   <thead>
                     <tr className="bg-slate-50 border-b border-slate-100">
                       <th className="px-6 py-5 font-black text-[10px] uppercase text-slate-400">الاسم</th>
                       <th className="px-6 py-5 font-black text-[10px] uppercase text-slate-400">البرنامج</th>
                       <th className="px-6 py-5 font-black text-[10px] uppercase text-slate-400">التاريخ</th>
                       <th className="px-6 py-5 font-black text-[10px] uppercase text-slate-400">الإجراء</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {activeTab === 'enrollments' ? enrollments.map(e => (
                       <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                         <td className="px-6 py-5">
                           <p className="font-bold text-sm">{e.studentName}</p>
                           <p className="text-[10px] text-slate-400">{e.email}</p>
                         </td>
                         <td className="px-6 py-5 font-bold text-xs uppercase">{e.courseTitle}</td>
                         <td className="px-6 py-5 text-[10px] font-bold text-slate-400">{new Date(e.date).toLocaleDateString('ar-MA')}</td>
                         <td className="px-6 py-5">
                           <button className="text-cyan-600 font-black text-[10px] uppercase hover:underline">عرض</button>
                         </td>
                       </tr>
                     )) : (
                       <tr className="text-center">
                         <td colSpan={4} className="py-20 text-slate-400 font-bold uppercase text-xs italic">لا يوجد طلبات حالياً</td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal is already mostly responsive, ensuring it works well on mobile */}
      {showCourseModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-white rounded-[2rem] md:rounded-[3.5rem] w-full max-w-6xl h-[95vh] md:h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
             <div className="p-6 md:p-10 border-b border-slate-100 flex justify-between items-center shrink-0">
               <h2 className="text-xl md:text-3xl font-black uppercase">{editingCourseId ? 'تعديل البرنامج' : 'إنشاء برنامج'}</h2>
               <button onClick={() => setShowCourseModal(false)} className="p-3 bg-slate-100 rounded-xl md:rounded-2xl transition-colors hover:bg-slate-200"><X size={24} /></button>
             </div>
             <div className="flex-1 overflow-y-auto p-6 md:p-10">
               <form onSubmit={handleSaveCourse} className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">العنوان</label>
                     <input className="w-full bg-slate-50 p-4 rounded-xl font-bold focus:ring-2 focus:ring-cyan-500/20" value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} placeholder="العنوان" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">السعر</label>
                     <input className="w-full bg-slate-50 p-4 rounded-xl font-bold focus:ring-2 focus:ring-cyan-500/20" value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: e.target.value})} placeholder="السعر" />
                   </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">رابط الصورة</label>
                    <input className="w-full bg-slate-50 p-4 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500/20" value={courseForm.image} onChange={e => setCourseForm({...courseForm, image: e.target.value})} placeholder="رابط صورة البرنامج" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">الوصف</label>
                    <textarea className="w-full bg-slate-50 p-4 rounded-xl focus:ring-2 focus:ring-cyan-500/20" value={courseForm.description} rows={4} onChange={e => setCourseForm({...courseForm, description: e.target.value})} placeholder="الوصف الكامل" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">مدة البرنامج</label>
                     <input className="w-full bg-slate-50 p-4 rounded-xl focus:ring-2 focus:ring-cyan-500/20" value={courseForm.duration} onChange={e => setCourseForm({...courseForm, duration: e.target.value})} placeholder="مثال: 7 أيام" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[9px] md:text-[10px] font-black uppercase text-slate-400">الفئة العمرية</label>
                     <input className="w-full bg-slate-50 p-4 rounded-xl focus:ring-2 focus:ring-cyan-500/20" value={courseForm.ageGroup} onChange={e => setCourseForm({...courseForm, ageGroup: e.target.value})} placeholder="مثال: +18 سنة" />
                   </div>
                 </div>
                 <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase hover:bg-cyan-600 transition-all active:scale-95 shadow-xl shadow-slate-950/20">حفظ البرنامج</button>
               </form>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;