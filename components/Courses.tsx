import React, { useRef } from 'react';
import { ArrowLeft, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Course } from './data';

interface CoursesProps {
  onCourseSelect: (courseId: string) => void;
  courses: Course[];
  language?: 'AR' | 'EN';
}

const Courses: React.FC<CoursesProps> = ({ onCourseSelect, courses, language = 'AR' }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450; 
      const isRtl = language === 'AR';
      
      let finalDirection = direction;
      if (isRtl) {
        finalDirection = direction === 'left' ? 'right' : 'left';
      }

      const newScrollLeft = finalDirection === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="courses" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', 
        backgroundSize: '40px 40px' 
      }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className={`max-w-3xl ${language === 'AR' ? 'text-right' : 'text-left'}`}>
            <h2 className="text-[11px] font-black tracking-[0.4em] text-cyan-400 uppercase mb-4">
               {language === 'AR' ? 'مختبرات البناء' : 'BUILDING LABS'}
            </h2>
            <h3 className="text-4xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-6">
              {language === 'AR' ? (
                <>البرامج <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-500">التعليمية</span></>
              ) : (
                <>FOUNDRY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">PROGRAMS</span></>
              )}
            </h3>
            <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
              {language === 'AR' 
                ? 'تعليم مكثف يركز على المشاريع، مصمم لمؤسسي الغد. اختر مسارك التقني في مختبر الابتكار الخاص بنا.'
                : 'Intensive project-focused education designed for founders. Choose your technical specialization.'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-slate-800 flex items-center justify-center text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300 active:scale-95 group"
              aria-label="Previous"
            >
              {language === 'AR' ? <ChevronRight size={24} className="group-hover:translate-x-1" /> : <ChevronLeft size={24} className="group-hover:-translate-x-1" />}
            </button>
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-slate-800 flex items-center justify-center text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300 active:scale-95 group"
              aria-label="Next"
            >
              {language === 'AR' ? <ChevronLeft size={24} className="group-hover:-translate-x-1" /> : <ChevronRight size={24} className="group-hover:translate-x-1" />}
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-10 pb-16 -mx-6 px-6 snap-x snap-mandatory no-scrollbar"
        >
          {courses.map((course) => (
            <div 
              key={course.id} 
              onClick={() => onCourseSelect(course.id)}
              className="snap-center shrink-0 w-[300px] md:w-[480px] group relative bg-slate-900 rounded-[3.5rem] overflow-hidden border border-slate-800 hover:border-cyan-500 transition-all duration-700 cursor-pointer hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-900/50 flex flex-col"
            >
              <div className="h-72 md:h-80 overflow-hidden relative shrink-0">
                <div className="absolute inset-0 bg-slate-950/50 z-10 group-hover:bg-transparent transition-colors duration-700"></div>
                <img 
                  src={course.image} 
                  alt={language === 'AR' ? course.title : course.titleEn} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out grayscale group-hover:grayscale-0" 
                />
                <div className="absolute top-8 right-8 z-20 flex flex-wrap gap-2">
                  <span className="px-6 py-2 bg-cyan-500 text-slate-950 text-[10px] font-black rounded-full uppercase shadow-lg">
                    {language === 'AR' ? course.tags[0] : course.tagsEn[0]}
                  </span>
                </div>
              </div>

              <div className={`p-10 md:p-14 flex flex-col flex-grow ${language === 'AR' ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center justify-between mb-6 text-slate-500 text-[11px] font-black uppercase ${language === 'AR' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-cyan-500" />
                    {language === 'AR' ? course.duration : course.durationEn}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    {language === 'AR' ? course.ageGroup : course.ageGroupEn}
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-black text-white mb-6 group-hover:text-cyan-400 transition-colors uppercase leading-tight tracking-tighter">
                  {language === 'AR' ? course.title : course.titleEn}
                </h3>
                <p className="text-slate-400 text-sm md:text-lg mb-12 line-clamp-3 leading-relaxed flex-grow font-medium">
                  {language === 'AR' ? course.description : course.descriptionEn}
                </p>

                <div className="w-full py-6 rounded-[2rem] bg-slate-800 text-white font-black text-xs md:text-sm uppercase group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-500 flex items-center justify-center gap-4 mt-auto">
                  {language === 'AR' ? 'استكشف البرنامج' : 'Launch Program Details'}
                  <ArrowLeft size={20} className={`opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${language === 'EN' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-8"></div>
        </div>

      </div>
    </section>
  );
};

export default Courses;