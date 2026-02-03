import React, { useRef } from 'react';
import { ArrowLeft, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Course } from './data';

interface CoursesProps {
  onCourseSelect: (courseId: string) => void;
  courses: Course[];
}

const Courses: React.FC<CoursesProps> = ({ onCourseSelect, courses }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; 
      const isRtl = document.dir === 'rtl';
      
      let finalDirection = direction;
      // In RTL, "left" scroll means positive and "right" means negative
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
    <section id="courses" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', 
        backgroundSize: '40px 40px' 
      }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 leading-none uppercase">
              البرامج <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-500">التعليمية</span>
            </h2>
            <p className="text-lg text-slate-400 font-medium">
              تعليم مكثف يركز على المشاريع، مصمم لمؤسسي الغد. اختر مسارك التقني في مختبر الابتكار الخاص بنا.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full border border-slate-800 flex items-center justify-center text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-300 active:scale-95"
              aria-label="Previous"
            >
              <ChevronRight size={24} />
            </button>
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full border border-slate-800 flex items-center justify-center text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-300 active:scale-95"
              aria-label="Next"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-12 -mx-6 px-6 snap-x snap-mandatory no-scrollbar"
        >
          {courses.map((course) => (
            <div 
              key={course.id} 
              onClick={() => onCourseSelect(course.id)}
              className="snap-center shrink-0 w-[320px] md:w-[420px] group relative bg-slate-900 rounded-[3.5rem] overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-900/40 flex flex-col"
            >
              <div className="h-64 overflow-hidden relative shrink-0">
                <div className="absolute inset-0 bg-slate-950/40 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out filter grayscale group-hover:grayscale-0" 
                />
                <div className="absolute top-6 right-6 z-20 flex flex-wrap gap-2">
                  <span className="px-5 py-2 bg-cyan-500 text-slate-900 text-[10px] font-black rounded-full uppercase">
                    {course.tags[0]}
                  </span>
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4 text-slate-500 text-[11px] font-black uppercase">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-cyan-400" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    {course.ageGroup}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors uppercase leading-tight">{course.title}</h3>
                <p className="text-slate-400 text-sm mb-10 line-clamp-3 leading-relaxed flex-grow font-medium">
                  {course.description}
                </p>

                <div className="w-full py-5 rounded-2xl bg-slate-800 text-white font-black text-xs uppercase group-hover:bg-cyan-600 transition-all duration-300 flex items-center justify-center gap-3 mt-auto">
                  استكشف تفاصيل البرنامج
                  <ArrowLeft size={18} className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-6"></div>
        </div>

      </div>
    </section>
  );
};

export default Courses;