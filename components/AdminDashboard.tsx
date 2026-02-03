
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, Plus, Search, Calendar, Video, 
  MapPin, CheckCircle, Clock, Link, Trash2, X, Download, FileText, 
  Settings, Save, Edit3, LogOut, Image as ImageIcon, Sparkles, 
  MessageSquare, GraduationCap, ChevronRight, AlertCircle, PlusCircle,
  Briefcase, Globe, Palette, Building2
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

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900" dir="rtl">
      <aside className="w-80 bg-slate-950 text-white flex-shrink-0 hidden md:flex flex-col border-l border-slate-800">
        <div className="p-10 border-b border-slate-900">
           <Logo size={45} showText dark siteSettings={siteSettings} />
        </div>
        <nav className="flex-1 p-8 space-y-2">
          {[
            { id: 'overview', icon: <LayoutDashboard size={20}/>, label: 'الإحصائيات' },
            { id: 'appearance', icon: <Palette size={20}/>, label: 'الهوية والمظهر' },
            { id: 'courses', icon: <BookOpen size={20}/>, label: 'البرامج' },
            { id: 'partners', icon: <Globe size={20}/>, label: 'الشركاء' },
            { id: 'portfolio', icon: <Briefcase size={20}/>, label: 'معرض الأعمال' },
            { id: 'enrollments', icon: <Users size={20}/>, label: 'الطلاب' },
            { id: 'leads', icon: <FileText size={20}/>, label: 'الطلبات' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} 
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-sm uppercase ${activeTab === tab.id ? 'bg-cyan-600 text-white shadow-xl' : 'text-slate-500 hover:bg-slate-900 hover:text-white'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-8 border-t border-slate-900">
          <button onClick={onLogout} className="w-full flex items-center gap-3 text-slate-500 hover:text-rose-400 transition-colors px-6 py-3 font-black text-xs uppercase">
            <LogOut size={18} /> خروج
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen">
        <header className="bg-white border-b border-slate-200 px-10 py-5 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-black uppercase tracking-tight">
            {activeTab === 'overview' && 'الإحصائيات'}
            {activeTab === 'appearance' && 'الهوية والمظهر'}
            {activeTab === 'courses' && 'البرامج التعليمية'}
            {activeTab === 'partners' && 'إدارة الشركاء'}
            {activeTab === 'portfolio' && 'معرض الأعمال'}
            {activeTab === 'enrollments' && 'إدارة الطلاب'}
            {activeTab === 'leads' && 'طلبات الانضمام'}
          </h1>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black">A</div>
        </header>

        <div className="p-10">
          {activeTab === 'appearance' && (
            <div className="max-w-4xl space-y-12">
              <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  <Sparkles className="text-cyan-500" />
                  <h2 className="text-xl font-black uppercase">إعدادات قسم الـ Hero</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">العنوان الرئيسي (عربي)</label>
                    <input className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold" value={appearanceForm.heroTitle} onChange={e => setAppearanceForm({...appearanceForm, heroTitle: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">العنوان الرئيسي (English)</label>
                    <input className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold" value={appearanceForm.heroTitleEn} onChange={e => setAppearanceForm({...appearanceForm, heroTitleEn: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">الوصف (عربي)</label>
                    <textarea className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold" rows={3} value={appearanceForm.heroDescription} onChange={e => setAppearanceForm({...appearanceForm, heroDescription: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">Description (English)</label>
                    <textarea className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-bold" rows={3} value={appearanceForm.heroDescriptionEn} onChange={e => setAppearanceForm({...appearanceForm, heroDescriptionEn: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">رابط صورة الـ Hero</label>
                  <div className="flex gap-4">
                    <input className="flex-1 bg-slate-50 border-none rounded-xl p-4 text-xs" value={appearanceForm.heroImage} onChange={e => setAppearanceForm({...appearanceForm, heroImage: e.target.value})} />
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                      <img src={appearanceForm.heroImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                  {/* Fixed missing import for Building2 */}
                  <Building2 className="text-cyan-500" />
                  <h2 className="text-xl font-black uppercase">صور أقسام الموقع الأخرى</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">صورة قسم "حلول الشركات"</label>
                    <div className="flex gap-4">
                      <input className="flex-1 bg-slate-50 border-none rounded-xl p-4 text-xs" value={appearanceForm.businessImage} onChange={e => setAppearanceForm({...appearanceForm, businessImage: e.target.value})} />
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
                        <img src={appearanceForm.businessImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <button 
                onClick={handleSaveAppearance}
                className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase shadow-2xl shadow-slate-900/20 hover:bg-cyan-600 transition-all flex items-center justify-center gap-3"
              >
                <Save size={20} /> حفظ كافة التعديلات البصرية
              </button>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black uppercase">إدارة الشركاء</h2>
                <button onClick={() => onUpdatePartners([...partners, { id: Date.now().toString(), name: 'شريك جديد', logo: '' }])} className="p-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase flex items-center gap-2"><Plus size={18}/> إضافة شريك</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {partners.map(p => (
                  <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <input className="w-full bg-slate-50 border-none rounded-lg p-2 text-xs font-bold" value={p.name} onChange={e => onUpdatePartners(partners.map(x => x.id === p.id ? {...x, name: e.target.value} : x))} />
                    <input className="w-full bg-slate-50 border-none rounded-lg p-2 text-[10px]" placeholder="رابط اللوجو" value={p.logo} onChange={e => onUpdatePartners(partners.map(x => x.id === p.id ? {...x, logo: e.target.value} : x))} />
                    <button onClick={() => onUpdatePartners(partners.filter(x => x.id !== p.id))} className="w-full py-2 text-rose-500 text-[10px] font-black uppercase hover:bg-rose-50 rounded-lg">حذف</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black uppercase">إدارة المشاريع</h2>
                <button onClick={() => onUpdatePortfolio([...portfolio, { id: Date.now().toString(), title: 'مشروع جديد', client: '', category: '', image: '', description: '' }])} className="p-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase flex items-center gap-2"><Plus size={18}/> إضافة مشروع</button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {portfolio.map(p => (
                  <div key={p.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input className="bg-slate-50 rounded-xl p-3 text-sm font-bold" value={p.title} onChange={e => onUpdatePortfolio(portfolio.map(x => x.id === p.id ? {...x, title: e.target.value} : x))} />
                      <input className="bg-slate-50 rounded-xl p-3 text-sm" value={p.client} placeholder="العميل" onChange={e => onUpdatePortfolio(portfolio.map(x => x.id === p.id ? {...x, client: e.target.value} : x))} />
                    </div>
                    <textarea className="w-full bg-slate-50 rounded-xl p-3 text-sm" value={p.description} rows={2} onChange={e => onUpdatePortfolio(portfolio.map(x => x.id === p.id ? {...x, description: e.target.value} : x))} />
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-slate-400">رابط الصورة</label>
                      <input className="w-full bg-slate-50 rounded-xl p-3 text-[10px]" value={p.image} onChange={e => onUpdatePortfolio(portfolio.map(x => x.id === p.id ? {...x, image: e.target.value} : x))} />
                    </div>
                    <button onClick={() => onUpdatePortfolio(portfolio.filter(x => x.id !== p.id))} className="text-rose-500 font-black text-xs uppercase">حذف المشروع</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map(course => (
                <div key={course.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="w-full h-32 rounded-2xl overflow-hidden mb-4 border border-slate-50">
                    <img src={course.image} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-black mb-4 truncate">{course.title}</h3>
                  <button onClick={() => handleOpenEdit(course)} className="w-full py-3 bg-slate-50 rounded-xl text-xs font-black uppercase hover:bg-cyan-50">تعديل</button>
                </div>
              ))}
              <button onClick={handleOpenAdd} className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center text-slate-400 hover:bg-white hover:border-cyan-500 transition-all min-h-[250px]">
                <Plus size={40} className="mb-4"/>
                <span className="font-black uppercase text-xs">إضافة برنامج</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {showCourseModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-white rounded-[3.5rem] w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
             <div className="p-10 border-b border-slate-100 flex justify-between items-center shrink-0">
               <h2 className="text-3xl font-black uppercase">{editingCourseId ? 'تعديل البرنامج' : 'إنشاء برنامج'}</h2>
               <button onClick={() => setShowCourseModal(false)} className="p-3 bg-slate-100 rounded-2xl"><X size={24} /></button>
             </div>
             <div className="flex-1 overflow-y-auto p-10">
               <form onSubmit={handleSaveCourse} className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">العنوان</label>
                     <input className="w-full bg-slate-50 p-4 rounded-xl font-bold" value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} placeholder="العنوان" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">السعر</label>
                     <input className="w-full bg-slate-50 p-4 rounded-xl font-bold" value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: e.target.value})} placeholder="السعر" />
                   </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">رابط الصورة</label>
                    <input className="w-full bg-slate-50 p-4 rounded-xl text-xs" value={courseForm.image} onChange={e => setCourseForm({...courseForm, image: e.target.value})} placeholder="رابط صورة البرنامج" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400">الوصف</label>
                    <textarea className="w-full bg-slate-50 p-4 rounded-xl" value={courseForm.description} rows={4} onChange={e => setCourseForm({...courseForm, description: e.target.value})} placeholder="الوصف الكامل" />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">مدة البرنامج</label>
                     <input className="w-full bg-slate-50 p-4 rounded-xl" value={courseForm.duration} onChange={e => setCourseForm({...courseForm, duration: e.target.value})} placeholder="مثال: 7 أيام" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">الفئة العمرية</label>
                     <input className="w-full bg-slate-50 p-4 rounded-xl" value={courseForm.ageGroup} onChange={e => setCourseForm({...courseForm, ageGroup: e.target.value})} placeholder="مثال: +18 سنة" />
                   </div>
                 </div>
                 <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase">حفظ البرنامج</button>
               </form>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
