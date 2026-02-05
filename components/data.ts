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
    id: "ugc-video-foundry",
    title: "إتقان فيديو UGC بالذكاء الاصطناعي",
    titleEn: "AI UGC Video Mastery",
    subtitle: "مستقبل المحتوى المرئي",
    subtitleEn: "The Future of Visual Content",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop", 
    tags: ["Video", "UGC", "KlingAi"],
    tagsEn: ["Video", "UGC", "KlingAi"],
    description: "تعلم صناعة فيديوهات UGC مذهلة باستخدام KlingAi و Veo 3. من كتابة السيناريو الذكي إلى الإنتاج النهائي الاحترافي.",
    descriptionEn: "Master the art of high-impact UGC video creation using KlingAi and Veo 3. From smart scripting to professional production.",
    rating: "5.0",
    duration: "٣ أسابيع",
    durationEn: "3 Weeks",
    ageGroup: "للمبدعين والمسوقين",
    ageGroupEn: "Creatives & Marketers",
    price: "2900",
    schedule: "مسائي",
    scheduleEn: "Evenings",
    features: ["استخدام KlingAi", "تحريك Veo 3", "مونتاج Remotion"],
    featuresEn: ["KlingAi Workflow", "Veo 3 Animation", "Remotion Editing"],
    learningOutcomes: [
      { title: "الإخراج الذكي", titleEn: "AI Directing", description: "كيفية توجيه النماذج لإنتاج لقطات سينمائية متسقة.", descriptionEn: "How to direct models for consistent cinematic shots." }
    ],
    testimonials: [],
    sessions: []
  },
  {
    id: "ai-influencer-os",
    title: "نظام المؤثر الافتراضي المتكامل",
    titleEn: "AI Influencer OS",
    subtitle: "بناء وإدارة الشخصيات الرقمية",
    subtitleEn: "Building & Managing Digital Personas",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop", 
    tags: ["Branding", "Highfield", "Influencer"],
    tagsEn: ["Branding", "Highfield", "Influencer"],
    description: "صمم مؤثرك الخاص باستخدام Highfield و Antigravity. تعلم كيف تحافظ على تناسق الشخصية في كل منصات التواصل الاجتماعي.",
    descriptionEn: "Design and scale your own virtual influencer using Highfield and Antigravity. Maintain flawless character consistency.",
    rating: "4.9",
    duration: "٤ أسابيع",
    durationEn: "4 Weeks",
    ageGroup: "للرياديين الرقميين",
    ageGroupEn: "Digital Entrepreneurs",
    price: "3500",
    schedule: "نهاية الأسبوع",
    scheduleEn: "Weekends",
    features: ["تصميم الشخصية", "أتمتة المحتوى", "إدارة الجمهور"],
    featuresEn: ["Character Design", "Content Automation", "Audience Mgmt"],
    learningOutcomes: [],
    testimonials: [],
    sessions: []
  },
  {
    id: "saas-builder-bootcamp",
    title: "معسكر بناء تطبيقات SaaS",
    titleEn: "SaaS App Builder Bootcamp",
    subtitle: "من الكود إلى الدفع",
    subtitleEn: "From Code to Cash",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop", 
    tags: ["SaaS", "Next.js", "Firebase"],
    tagsEn: ["SaaS", "Next.js", "Firebase"],
    description: "ابنِ تطبيق SaaS متكامل باستخدام Next.js و Firebase و Claude Code. تعلم كيف تدمج الذكاء الاصطناعي كقيمة أساسية في منتجك.",
    descriptionEn: "Engineer a production-ready SaaS application using Next.js and Firebase. Power your product with advanced AI agents.",
    rating: "5.0",
    duration: "٨ أسابيع",
    durationEn: "8 Weeks",
    ageGroup: "للمبرمجين والمؤسسين",
    ageGroupEn: "Devs & Founders",
    price: "8200",
    schedule: "مكثف",
    scheduleEn: "Intensive",
    features: ["تكامل Firebase", "استخدام Claude Code", "نشر GitHub"],
    featuresEn: ["Firebase Integration", "Claude Code Mastery", "GitHub Deploy"],
    learningOutcomes: [],
    testimonials: [],
    sessions: []
  }
];

export const initialSiteSettings: SiteSettings = {
  academyName: "أكاديمية الذكاء الاصطناعي",
  academyNameEn: "AI Academy",
  contactEmail: "contact@ai-academy.ma",
  whatsappNumber: "+212 600 000 000",
  heroTitle: "ابنِ مستقبل عملك بقوة الذكاء الاصطناعي",
  heroTitleEn: "Build Your Business Future with AI Power",
  heroDescription: "نحن مختبر الابتكار الأول الذي يحول المطورين والمؤسسين إلى رواد في عصر الذكاء الاصطناعي. برامج مكثفة، مشاريع حقيقية، ونتائج ملموسة.",
  heroDescriptionEn: "The world's leading Innovation Foundry turning creators and founders into leaders. Intensive programs, real-world deployment, and tangible business results.",
  heroImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  businessImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  buildablesAr: ["فيديو UGC", "مؤثر ذكاء اصطناعي", "مشروع ذكاء اصطناعي", "موقع إلكتروني", "متجر إلكتروني", "تطبيقات ذكية", "أنظمة أتمتة", "تطبيق SaaS", "بوتات محادثة", "وأكثر..."],
  buildablesEn: ["UGC Video", "AI Influencer", "AI Business", "Website", "E-commerce", "Apps", "Automation", "SaaS App", "Chat Bots", "And More"]
};

export const masteredTools = [
  { name: 'Gemini', category: 'LLM Model', descAr: 'المحرك الأقوى للمنطق والتحليل', descEn: 'State-of-the-art Reasoning Engine', featured: true },
  { name: 'KlingAi', category: 'UGC Video', descAr: 'توليد فيديو واقعي فائق الدقة', descEn: 'High-fidelity UGC Video Gen', featured: true },
  { name: 'Claude Code', category: 'Dev Agent', descAr: 'مساعد البرمجة والترميز الذكي', descEn: 'Intelligent Coding Companion', featured: true },
  { name: 'Veo 3', category: 'Cinematics', descAr: 'إخراج سينمائي بالذكاء الاصطناعي', descEn: 'Next-Gen Cinematic Motion' },
  { name: 'Antigravity', category: 'Consistency', descAr: 'الحفاظ على ملامح الشخصية', descEn: 'Character Consistency System' },
  { name: 'Google AI Studio', category: 'Ideation', descAr: 'بيئة تطوير النماذج الأولية', descEn: 'Rapid Prototyping Sandbox' },
  { name: 'Nano Banana Pro', category: 'Optimization', descAr: 'نماذج صغيرة فائقة السرعة', descEn: 'Ultra-fast Lightweight Models' },
  { name: 'Seedream', category: 'Speech', descAr: 'تحويل النص لصوت بشري', descEn: 'Human-like Voice Synthesis' },
  { name: 'Remotion', category: 'Automation', descAr: 'برمجة الفيديو بالكود', descEn: 'Code-driven Video Production' },
  { name: 'Firebase', category: 'Infrastructure', descAr: 'قواعد بيانات ونشر سحابي', descEn: 'Real-time Backend & Hosting' },
  { name: 'GitHub', category: 'Version Control', descAr: 'إدارة الكود والتعاون البرمجي', descEn: 'Code Mgmt & CI/CD Pipelines' },
  { name: 'Highfield', category: 'Social AI', descAr: 'إدارة المؤثرين الافتراضيين', descEn: 'Virtual Influencer Management' }
];

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
    title: 'مساعد إنتاج الأفلام بالذكاء الاصطناعي',
    titleEn: 'AI Film Production Suite',
    client: 'استوديو الإبداع الرقمي',
    clientEn: 'Digital Creative Studio',
    category: 'Cinematics',
    categoryEn: 'Cinematics',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800',
    description: 'تحويل السيناريوهات النصية إلى لوحات قصصية ولقطات سينمائية باستخدام KlingAi و Veo 3.',
    descriptionEn: 'Transforming text scripts into high-fidelity storyboards and cinematic shots using KlingAi and Veo 3.'
  }
];