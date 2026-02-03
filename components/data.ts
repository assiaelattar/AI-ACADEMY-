import { Rocket, BookOpen, Briefcase, Sparkles, Code, Globe, Video, Zap, Terminal, Building2 } from 'lucide-react';

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface LearningOutcome {
  title: string;
  description: string;
}

export interface Session {
  date: string;
  time: string;
  status: 'Open' | 'Filling Fast' | 'Waitlist';
  statusAr: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  description: string;
  rating: string;
  duration: string;
  ageGroup: string;
  price: string;
  schedule: string;
  features: string[];
  learningOutcomes: LearningOutcome[];
  testimonials: Testimonial[];
  sessions: Session[];
}

export interface SiteSettings {
  academyName: string;
  contactEmail: string;
  whatsappNumber: string;
  heroTitle: string;
  heroDescription: string;
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
  client: string;
  category: string;
  image: string;
  description: string;
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
    subtitle: "من الفكرة إلى منتج SaaS جاهز",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop", 
    tags: ["مكثف", "مؤسسون", "SaaS"],
    description: "انتقل من مجرد فكرة إلى نموذج أولي وظيفي لخدمة برمجية مدعومة بالذكاء الاصطناعي في أسبوع واحد فقط. تعلم هندسة الذكاء الاصطناعي وتكامل التطبيقات.",
    rating: "5.0",
    duration: "7 أيام",
    ageGroup: "للكبار والشغوفين",
    price: "4900",
    schedule: "يومياً 9:00 ص - 6:00 م",
    features: [
      "تصميم هندسة الذكاء الاصطناعي",
      "تكامل واجهات برمجة التطبيقات ونماذج LLM",
      "بناء حلول بدون كود للنمو السريع",
      "يوم العرض والتقديم للمستثمرين"
    ],
    learningOutcomes: [
      { title: "أساسيات نماذج اللغة", description: "إتقان هندسة الأوامر (Prompt Engineering) ومفاهيم الضبط الدقيق ومعماريات RAG." },
      { title: "تقنيات SaaS", description: "البناء باستخدام Next.js و Tailwind و Supabase للنشر السريع." },
      { title: "إتقان الـ API", description: "الاتصال بنماذج OpenAI و Anthropic ونقاط النهاية المتخصصة." },
      { title: "إطلاق المنتج", description: "تعلم كيفية النشر على Vercel وإعداد Stripe لتحقيق الأرباح." }
    ],
    testimonials: [
      { name: "سامي منصوري", role: "مؤسس شركة ناشئة", quote: "بنيت مشروعي في 6 أيام. التركيز على التنفيذ الفعلي بدلاً من النظريات هو بالضبط ما يحتاجه التعليم التقني.", avatar: "https://i.pravatar.cc/150?u=sami" },
      { name: "ياسمين العلوي", role: "مديرة منتج", quote: "فهمت أخيراً كيف يمكن دمج الذكاء الاصطناعي في سير عملنا الحالي. تدريب مكثف بنتائج مذهلة.", avatar: "https://i.pravatar.cc/150?u=yasmine" }
    ],
    sessions: [
      { date: "12 أكتوبر - 18 أكتوبر", time: "09:00 - 18:00", status: "Filling Fast", statusAr: "المقاعد محدودة" },
      { date: "05 نوفمبر - 11 نوفمبر", time: "09:00 - 18:00", status: "Open", statusAr: "متاح" }
    ]
  },
  {
    id: "innovators-path",
    title: "مسار المبتكرين في الذكاء الاصطناعي",
    subtitle: "برمج، ابدع، تحكم",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop", 
    tags: ["صناع", "برمجة", "إبداع"],
    description: "مسار مصمم خصيصاً لأي شخص لديه شغف بالبناء. تعلم كيف تحول أفكارك إلى حقيقة باستخدام قوة الذكاء الاصطناعي في صناعة الأفلام والبحث العميق.",
    rating: "4.9",
    duration: "4 أسابيع",
    ageGroup: "جميع الأعمار الشغوفة",
    price: "2500",
    schedule: "الثلاثاء والخميس، 4:00 م",
    features: [
      "البرمجة المنطقية والذكاء الاصطناعي",
      "توليد الصور والفنون الرقمية",
      "أساسيات تطوير المنتجات",
      "بناء حلول لمشاكل حقيقية"
    ],
    learningOutcomes: [
      { title: "التفكير التصميمي", description: "تفكيك المشكلات المعقدة إلى خطوات صغيرة قابلة للحل باستخدام التكنولوجيا." },
      { title: "إبداع المحتوى الذكي", description: "استخدام أدوات الإنشاء الذكية بأمان للتعبير عن الأفكار المبتكرة." },
      { title: "البرمجة كأداة بناء", description: "تعلم البرمجة ليس كهدف، بل كأداة لصناعة كل ما تتخيله." },
      { title: "العمل الجماعي التقني", description: "التعاون مع مبتكرين آخرين لحل تحديات ملموسة." }
    ],
    testimonials: [
      { name: "عمر ك.", role: "مصمم حر", quote: "البرمجة كانت تبدو صعبة، لكن هنا تعلمت أنها مجرد وسيلة لتحقيق شغفي.", avatar: "https://i.pravatar.cc/150?u=omar" },
      { name: "سارة ب.", role: "مبتكرة", quote: "صناعة أدوات الذكاء الاصطناعي الخاصة بي كانت الجزء المفضل لدي. أي شخص شغوف يمكنه القيام بذلك!", avatar: "https://i.pravatar.cc/150?u=sarah" }
    ],
    sessions: [
      { date: "15 أكتوبر - 12 نوفمبر", time: "16:00 - 17:30", status: "Waitlist", statusAr: "قائمة الانتظار" },
      { date: "20 نوفمبر - 18 ديسمبر", time: "16:00 - 17:30", status: "Open", statusAr: "متاح" }
    ]
  }
];

export const initialSiteSettings: SiteSettings = {
  academyName: "أكاديمية الصناع الذكية",
  contactEmail: "contact@makerlab.ma",
  whatsappNumber: "+212 600 000 000",
  heroTitle: "مع الذكاء الاصطناعي، يمكنك أن تبني المستحيل",
  heroDescription: "تحول من مجرد مستخدم إلى صانع حقيقي. نحن نوفر لك الأدوات والبيئة لتطوير حلول ذكية، أفلام، وأنظمة برمجية متكاملة بضغطة زر واحدة."
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
    client: 'مجموعة مدارس النخبة',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800', 
    description: 'منصة متكاملة لأتمتة المهام الإدارية وتخصيص تجربة التعلم لكل طالب باستخدام خوارزميات تحليل البيانات المتقدمة.'
  },
  {
    id: 'p2',
    title: 'مساعد الإنتاج السينمائي الآلي',
    client: 'استوديو إبداع',
    category: 'AI Film Production',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800', 
    description: 'بوت ذكي يساعد المخرجين في جدولة المشاهد وتحليل السيناريو وتوقع احتياجات الإضاءة باستخدام البحث العميق.'
  }
];