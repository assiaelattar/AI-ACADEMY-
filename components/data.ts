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
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop",
    tags: ["مكثف", "مؤسسون", "SaaS"],
    description: "انتقل من مجرد فكرة إلى نموذج أولي وظيفي لخدمة برمجية مدعومة بالذكاء الاصطناعي في أسبوع واحد فقط. تعلم هندسة الذكاء الاصطناعي وتكامل التطبيقات.",
    rating: "5.0",
    duration: "7 أيام",
    ageGroup: "+16 / الكبار",
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
    id: "young-innovators",
    title: "المبتكرون الصغار في الذكاء الاصطناعي",
    subtitle: "برمج، ابدع، تحكم",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop",
    tags: ["أطفال", "برمجة", "إبداع"],
    description: "مسار مصمم خصيصاً للعقول الشابة لفهم منطق الذكاء الاصطناعي من خلال تطوير الألعاب ورواية القصص التفاعلية.",
    rating: "4.9",
    duration: "4 أسابيع",
    ageGroup: "8 - 12 سنة",
    price: "2500",
    schedule: "الثلاثاء والخميس، 4:00 م",
    features: [
      "البرمجة المنطقية المرئية",
      "فن توليد الصور بالذكاء الاصطناعي",
      "أساسيات تصميم الألعاب",
      "رواية القصص التفاعلية"
    ],
    learningOutcomes: [
      { title: "التفكير المنطقي", description: "تفكيك المشكلات المعقدة إلى خطوات صغيرة قابلة للحل." },
      { title: "إبداع فنون الذكاء الاصطناعي", description: "استخدام أدوات مثل Midjourney بأمان للتعبير عن الإبداع." },
      { title: "سكراتش وبايثون", description: "تعلم أساسيات البرمجة باستخدام أدوات مرئية ونصية." },
      { title: "الروبوتات الجماعية", description: "التعاون مع الأقران لحل تحديات ملموسة بالذكاء الاصطناعي." }
    ],
    testimonials: [
      { name: "والدة أحمد", role: "ولي أمر", quote: "كان ابني يكتفي باللعب، الآن يحاول البناء. التغيير في العقلية كان مذهلاً.", avatar: "https://i.pravatar.cc/150?u=ahmedmom" },
      { name: "سارة ب.", role: "طالبة (11 سنة)", quote: "صناعة فنون الذكاء الاصطناعي كانت الجزء المفضل لدي. تعلمت أن البرمجة هي قوة خارقة!", avatar: "https://i.pravatar.cc/150?u=sarah" }
    ],
    sessions: [
      { date: "15 أكتوبر - 12 نوفمبر", time: "16:00 - 17:30", status: "Waitlist", statusAr: "قائمة الانتظار" },
      { date: "20 نوفمبر - 18 ديسمبر", time: "16:00 - 17:30", status: "Open", statusAr: "متاح" }
    ]
  }
];

export const initialSiteSettings: SiteSettings = {
  academyName: "أكاديمية الذكاء الاصطناعي",
  contactEmail: "contact@techkids.ma",
  whatsappNumber: "+212 600 000 000",
  heroTitle: "احلـم. ابـنِ. انطلـق.",
  heroDescription: "تمكين الأطفال من إتقان الذكاء الاصطناعي، برمجة أحلامهم، وحل مشكلات العالم الحقيقي بأدوات الغد."
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
    category: 'SaaS / AI',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
    description: 'منصة متكاملة لأتمتة المهام الإدارية وتخصيص تجربة التعلم لكل طالب باستخدام الذكاء الاصطناعي.'
  },
  {
    id: 'p2',
    title: 'مساعد خدمة العملاء الآلي',
    client: 'شركة تأمين كبرى',
    category: 'AI Chatbot',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=800',
    description: 'بوت ذكي قادر على معالجة المطالبات والرد على استفسارات العملاء بـ ١٢ لغة مختلفة بدقة ٩٨٪.'
  }
];