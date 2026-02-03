import { Rocket, BookOpen, Briefcase, Sparkles, Code, Globe, Video, Zap, Terminal, Building2 } from 'lucide-react';

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface LearningOutcome {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

export interface Session {
  date: string;
  dateEn: string;
  time: string;
  timeEn: string;
  status: 'Open' | 'Filling Fast' | 'Waitlist';
  statusAr: string;
  statusEn: string;
}

export interface Course {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  image: string;
  tags: string[];
  tagsEn: string[];
  description: string;
  descriptionEn: string;
  rating: string;
  duration: string;
  durationEn: string;
  ageGroup: string;
  ageGroupEn: string;
  price: string;
  schedule: string;
  scheduleEn: string;
  features: string[];
  featuresEn: string[];
  learningOutcomes: LearningOutcome[];
  testimonials: Testimonial[];
  sessions: Session[];
}

export interface SiteSettings {
  academyName: string;
  academyNameEn: string;
  contactEmail: string;
  whatsappNumber: string;
  heroTitle: string;
  heroTitleEn: string;
  heroDescription: string;
  heroDescriptionEn: string;
  heroImage: string;
  businessImage: string;
  buildablesAr: string[];
  buildablesEn: string[];
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  titleEn: string;
  client: string;
  clientEn: string;
  category: string;
  categoryEn: string;
  image: string;
  description: string;
  descriptionEn: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  parentName: string;
  email: string;
  age: number;
  mode: 'campus' | 'online';
  status: 'pending' | 'confirmed' | 'scheduled';
  meetLink?: string;
  date: string;
}

export interface BrochureRequest {
  id: string;
  courseId: string;
  courseTitle: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
}

export const initialCourses: Course[] = [
  {
    id: "7-day-build-camp",
    title: "مخيم بناء الذكاء الاصطناعي (7 أيام)",
    titleEn: "AI Build Camp (7 Days)",
    subtitle: "من الفكرة إلى منتج SaaS جاهز",
    subtitleEn: "From Idea to Ready SaaS Product",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop", 
    tags: ["مكثف", "مؤسسون", "SaaS"],
    tagsEn: ["Intensive", "Founders", "SaaS"],
    description: "انتقل من مجرد فكرة إلى نموذج أولي وظيفي لخدمة برمجية مدعومة بالذكاء الاصطناعي في أسبوع واحد فقط. تعلم هندسة الذكاء الاصطناعي وتكامل التطبيقات.",
    descriptionEn: "Go from just an idea to a functional prototype for an AI-powered software service in just one week. Learn AI engineering and app integration.",
    rating: "5.0",
    duration: "7 أيام",
    durationEn: "7 Days",
    ageGroup: "للكبار والشغوفين",
    ageGroupEn: "Adults & Enthusiasts",
    price: "4900",
    schedule: "يومياً 9:00 ص - 6:00 م",
    scheduleEn: "Daily 9:00 AM - 6:00 PM",
    features: ["تصميم هندسة الذكاء الاصطناعي", "تكامل LLM", "بدون كود"],
    featuresEn: ["AI Architecture", "LLM Integration", "No-Code Build"],
    learningOutcomes: [
      { 
        title: "أساسيات نماذج اللغة", 
        titleEn: "Language Model Basics",
        description: "إتقان هندسة الأوامر (Prompt Engineering) ومعماريات RAG.",
        descriptionEn: "Mastering Prompt Engineering and RAG architectures."
      },
      { 
        title: "تقنيات SaaS", 
        titleEn: "SaaS Technologies",
        description: "البناء باستخدام Next.js و Tailwind و Supabase.",
        descriptionEn: "Building with Next.js, Tailwind, and Supabase."
      }
    ],
    testimonials: [
      { name: "Sami", role: "Founder", quote: "Built my startup in 6 days.", avatar: "https://i.pravatar.cc/150?u=sami" }
    ],
    sessions: [
      { date: "12 أكتوبر - 18 أكتوبر", dateEn: "Oct 12 - Oct 18", time: "09:00 - 18:00", timeEn: "9 AM - 6 PM", status: "Filling Fast", statusAr: "المقاعد محدودة", statusEn: "Filling Fast" },
      { date: "05 نوفمبر - 11 نوفمبر", dateEn: "Nov 05 - Nov 11", time: "09:00 - 18:00", timeEn: "9 AM - 6 PM", status: "Open", statusAr: "متاح", statusEn: "Open" }
    ]
  },
  {
    id: "innovators-path",
    title: "مسار المبتكرين في الذكاء الاصطناعي",
    titleEn: "AI Innovators Path",
    subtitle: "برمج، ابدع، تحكم",
    subtitleEn: "Code, Create, Control",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop", 
    tags: ["صناع", "برمجة", "إبداع"],
    tagsEn: ["Makers", "Coding", "Creative"],
    description: "مسار مصمم خصيصاً لأي شخص لديه شغف بالبناء. تعلم كيف تحول أفكارك إلى حقيقة باستخدام قوة الذكاء الاصطناعي في صناعة الأفلام والبحث العميق.",
    descriptionEn: "A track specially designed for anyone with a passion for building. Learn how to turn your ideas into reality using the power of AI in filmmaking and deep search.",
    rating: "4.9",
    duration: "4 أسابيع",
    durationEn: "4 Weeks",
    ageGroup: "جميع الأعمار الشغوفة",
    ageGroupEn: "All Passionate Ages",
    price: "2500",
    schedule: "الثلاثاء والخميس، 4:00 م",
    scheduleEn: "Tue & Thu, 4:00 PM",
    features: ["البرمجة المنطقية", "توليد الصور والفنون", "تطوير المنتجات"],
    featuresEn: ["Logic Programming", "Art Generation", "Product Development"],
    learningOutcomes: [
      { 
        title: "التفكير التصميمي", 
        titleEn: "Design Thinking",
        description: "تفكيك المشكلات المعقدة إلى خطوات صغيرة.",
        descriptionEn: "Breaking down complex problems into small steps."
      }
    ],
    testimonials: [],
    sessions: [
      { date: "15 أكتوبر - 12 نوفمبر", dateEn: "Oct 15 - Nov 12", time: "16:00 - 17:30", timeEn: "4:00 PM - 5:30 PM", status: "Waitlist", statusAr: "قائمة الانتظار", statusEn: "Waitlist" }
    ]
  }
];

export const initialSiteSettings: SiteSettings = {
  academyName: "أكاديمية الذكاء الاصطناعي",
  academyNameEn: "AI Academy",
  contactEmail: "contact@ai-academy.ma",
  whatsappNumber: "+212 600 000 000",
  heroTitle: "مع الذكاء الاصطناعي، يمكنك أن تبني المستحيل",
  heroTitleEn: "With AI, You Can Build Anything",
  heroDescription: "تحول من مجرد مستخدم إلى صانع حقيقي. نحن نوفر لك الأدوات والبيئة لتطوير حلول ذكية، أفلام، وأنظمة برمجية متكاملة بضغطة زر واحدة.",
  heroDescriptionEn: "Transform from a user to a true maker. We provide the tools and environment to develop smart solutions, films, and integrated software systems with one click.",
  heroImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1200&auto=format&fit=crop",
  businessImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
  buildablesAr: ["تطبيق SaaS متكامل", "فيلماً سينمائياً", "نظام ERP ذكي", "موقعاً عالمياً", "لعبة تفاعلية", "حملة إعلانية", "تطبيق جوال"],
  buildablesEn: ["Full SaaS App", "Cinematic Film", "Smart ERP System", "Global Website", "Interactive Game", "Ad Campaign", "Mobile App"]
};

export const initialPartners: Partner[] = [
  { id: '1', name: 'Google for Startups', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { id: '2', name: 'OpenAI', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg' },
  { id: '3', name: 'NVIDIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg' },
  { id: '4', name: 'Microsoft Azure', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' }
];

export const initialPortfolio: PortfolioProject[] = [
  {
    id: 'p1',
    title: 'نظام إدارة التعليم الذكي',
    titleEn: 'Smart LMS System',
    client: 'مجموعة مدارس النخبة',
    clientEn: 'Elite Schools Group',
    category: 'Data Science',
    categoryEn: 'Data Science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', 
    description: 'منصة متكاملة لأتمتة المهام الإدارية وتخصيص تجربة التعلم لكل طالب باستخدام خوارزميات تحليل البيانات المتقدمة.',
    descriptionEn: 'An integrated platform for automating administrative tasks and customizing the learning experience for each student using advanced data analysis algorithms.'
  },
  {
    id: 'p2',
    title: 'مساعد الإنتاج السينمائي الآلي',
    titleEn: 'Automated Film Assistant',
    client: 'استوديو إبداع',
    clientEn: 'Creativity Studio',
    category: 'AI Film Production',
    categoryEn: 'AI Film Production',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800', 
    description: 'بوت ذكي يساعد المخرجين في جدولة المشاهد وتحليل السيناريو وتوقع احتياجات الإضاءة باستخدام البحث العميق.',
    descriptionEn: 'A smart bot helping directors schedule scenes, analyze scripts, and predict lighting needs using deep search.'
  }
];