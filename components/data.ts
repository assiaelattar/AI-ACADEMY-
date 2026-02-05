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
  parentName: string; // Internal name, but will label as "Full Name" in UI
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
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop", 
    tags: ["Video", "UGC", "KlingAi"],
    tagsEn: ["Video", "UGC", "KlingAi"],
    description: "تعلم صناعة فيديوهات UGC (محتوى من إنشاء المستخدمين) مذهلة باستخدام KlingAi و Veo 3. من كتابة السيناريو الذكي إلى الإنتاج النهائي.",
    descriptionEn: "Learn to create stunning UGC (User Generated Content) videos using KlingAi and Veo 3. From smart scripting to final production.",
    rating: "5.0",
    duration: "٣ أسابيع",
    durationEn: "3 Weeks",
    ageGroup: "للمسوقين والمبدعين",
    ageGroupEn: "Marketers & Creatives",
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
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop", 
    tags: ["Branding", "Highfield", "Influencer"],
    tagsEn: ["Branding", "Highfield", "Influencer"],
    description: "صمم مؤثرك الخاص باستخدام Highfield و Antigravity. تعلم كيف تحافظ على تناسق الشخصية في كل منصات التواصل الاجتماعي.",
    descriptionEn: "Design your own influencer using Highfield and Antigravity. Learn to maintain character consistency across all social platforms.",
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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop", 
    tags: ["SaaS", "Next.js", "Firebase"],
    tagsEn: ["SaaS", "Next.js", "Firebase"],
    description: "ابنِ تطبيق SaaS متكامل باستخدام Next.js و Firebase و Claude Code. تعلم كيف تدمج الذكاء الاصطناعي كقيمة أساسية في منتجك.",
    descriptionEn: "Build a full SaaS app using Next.js, Firebase, and Claude Code. Learn to integrate AI as a core value in your product.",
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
  },
  {
    id: "ai-business-strategist",
    title: "إستراتيجية مشاريع الذكاء الاصطناعي",
    titleEn: "AI Business Strategist",
    subtitle: "إدارة شركات المستقبل",
    subtitleEn: "Managing Future Companies",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop", 
    tags: ["Business", "AI Strategy", "ROI"],
    tagsEn: ["Business", "AI Strategy", "ROI"],
    description: "كيف تطلق مشروعاً يعتمد كلياً على الذكاء الاصطناعي. من تحديد الفجوة في السوق إلى استخدام Google AI Studio للنمذجة السريعة.",
    descriptionEn: "How to launch a business entirely powered by AI. From identifying market gaps to using Google AI Studio for rapid prototyping.",
    rating: "5.0",
    duration: "٦ أسابيع",
    durationEn: "6 Weeks",
    ageGroup: "للمدراء والتنفيذيين",
    ageGroupEn: "Managers & Execs",
    price: "5500",
    schedule: "أونلاين",
    scheduleEn: "Online",
    features: ["نمذجة الأعمال AI", "دراسات جدوى", "إطلاق MVP"],
    featuresEn: ["AI Business Modeling", "Feasibility Studies", "MVP Launch"],
    learningOutcomes: [],
    testimonials: [],
    sessions: []
  },
  {
    id: "intelligent-ecommerce-dev",
    title: "تطوير المتاجر الإلكترونية الذكية",
    titleEn: "Intelligent E-commerce Dev",
    subtitle: "ثورة البيع بالتجزئة",
    subtitleEn: "Retail Revolution",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop", 
    tags: ["E-commerce", "Conversion", "AI"],
    tagsEn: ["E-commerce", "Conversion", "AI"],
    description: "حول أي متجر إلكتروني عادي إلى محرك مبيعات ذكي. تعلم تخصيص تجربة العميل باستخدام Gemini و Nano Banana Pro.",
    descriptionEn: "Turn any regular e-commerce store into a smart sales engine. Learn UX personalization using Gemini and Nano Banana Pro.",
    rating: "4.8",
    duration: "٥ أسابيع",
    durationEn: "5 Weeks",
    ageGroup: "لرياديي التجارة",
    ageGroupEn: "E-com Pros",
    price: "4200",
    schedule: "مسائي",
    scheduleEn: "Evenings",
    features: ["توصيات AI", "تخصيص الواجهات", "أتمتة المخزون"],
    featuresEn: ["AI Recommendations", "UI Personalization", "Inventory Automation"],
    learningOutcomes: [],
    testimonials: [],
    sessions: []
  },
  {
    id: "automation-architect-pro",
    title: "مهندس أتمتة الأعمال (احترافي)",
    titleEn: "Automation Architect Pro",
    subtitle: "كفاءة مطلقة",
    subtitleEn: "Absolute Efficiency",
    image: "https://images.unsplash.com/photo-1518433278981-d1027883bc9e?q=80&w=1200&auto=format&fit=crop", 
    tags: ["Automation", "No-Code", "Efficiency"],
    tagsEn: ["Automation", "No-Code", "Efficiency"],
    description: "صمم مسارات عمل ذاتية التشغيل بالكامل. اربط بين تطبيقاتك ووكلائك الذكيين لتعمل شركتك بينما أنت نائم.",
    descriptionEn: "Design fully self-running workflows. Connect your apps and AI agents so your business runs while you sleep.",
    rating: "4.9",
    duration: "٤ أسابيع",
    durationEn: "4 Weeks",
    ageGroup: "للعمليات والإنتاجية",
    ageGroupEn: "Operations & Ops",
    price: "3900",
    schedule: "مكثف",
    scheduleEn: "Intensive",
    features: ["أتمتة العمليات", "وكلاء مستقلين", "تقليل التكاليف"],
    featuresEn: ["Workflow Automation", "Autonomous Agents", "Cost Reduction"],
    learningOutcomes: [],
    testimonials: [],
    sessions: []
  },
  {
    id: "enterprise-chatbot-eng",
    title: "هندسة بوتات المحادثة للمؤسسات",
    titleEn: "Enterprise Chatbot Engineering",
    subtitle: "ذكاء المحادثة الفائق",
    subtitleEn: "Supercharged Conversational AI",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop", 
    tags: ["NLP", "Chatbots", "Gemini"],
    tagsEn: ["NLP", "Chatbots", "Gemini"],
    description: "طور بوتات محادثة بمستوى بشري لخدمة العملاء والمبيعات. تدريب مخصص على نماذج Gemini و Seedream.",
    descriptionEn: "Develop human-level chatbots for customer service and sales. Custom training on Gemini and Seedream models.",
    rating: "5.0",
    duration: "٤ أسابيع",
    durationEn: "4 Weeks",
    ageGroup: "للمطورين",
    ageGroupEn: "Developers",
    price: "3200",
    schedule: "نهاية الأسبوع",
    scheduleEn: "Weekends",
    features: ["تكامل WhatsApp", "تدريب RAG", "تحليل المشاعر"],
    featuresEn: ["WhatsApp Integration", "RAG Training", "Sentiment Analysis"],
    learningOutcomes: [],
    testimonials: [],
    sessions: []
  },
  {
    id: "ai-mobile-foundry",
    title: "مختبر تطبيقات الجوال الذكية",
    titleEn: "AI Mobile App Foundry",
    subtitle: "تطبيقات تفكر وتتفاعل",
    subtitleEn: "Apps that Think & Interact",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop", 
    tags: ["Mobile", "Flutter", "AI Apps"],
    tagsEn: ["Mobile", "Flutter", "AI Apps"],
    description: "ابنِ الجيل القادم من تطبيقات الجوال التي تدمج ميزات الرؤية الحاسوبية والذكاء الصوتي المتقدم.",
    descriptionEn: "Build the next generation of mobile apps integrating computer vision and advanced voice intelligence features.",
    rating: "4.8",
    duration: "٨ أسابيع",
    durationEn: "8 Weeks",
    ageGroup: "للمصممين والمطورين",
    ageGroupEn: "Designers & Devs",
    price: "5900",
    schedule: "أونلاين + حضوري",
    scheduleEn: "Blended Learning",
    features: ["برمجة Flutter", "واجهات ذكية", "تكامل API"],
    featuresEn: ["Flutter Programming", "Intelligent UIs", "API Integration"],
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
  heroDescriptionEn: "We are the leading innovation lab turning developers and founders into leaders in the AI era. Intensive programs, real projects, and tangible results.",
  heroImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
  businessImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
  buildablesAr: [
    "فيديو UGC", 
    "مؤثر ذكاء اصطناعي", 
    "مشروع ذكاء اصطناعي", 
    "موقع إلكتروني", 
    "متجر إلكتروني", 
    "تطبيقات ذكية", 
    "أنظمة أتمتة", 
    "تطبيق SaaS", 
    "بوتات محادثة", 
    "وأكثر..."
  ],
  buildablesEn: [
    "UGC Video", 
    "AI Influencer", 
    "AI Business", 
    "Website", 
    "E-commerce", 
    "Apps", 
    "Automation", 
    "SaaS App", 
    "Chat Bots", 
    "And More"
  ]
};

export const masteredTools = [
  { name: 'KlingAi', category: 'Video' },
  { name: 'Veo 3', category: 'Video' },
  { name: 'Antigravity', category: 'Consistency' },
  { name: 'Google AI Studio', category: 'Models' },
  { name: 'Nano Banana Pro', category: 'Advanced AI' },
  { name: 'Seedream', category: 'Chat' },
  { name: 'Gemini', category: 'Models' },
  { name: 'Claude Code', category: 'Dev' },
  { name: 'Remotion', category: 'Programmatic Video' },
  { name: 'Firebase', category: 'Backend' },
  { name: 'GitHub', category: 'Dev' },
  { name: 'Highfield', category: 'Influencers' }
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