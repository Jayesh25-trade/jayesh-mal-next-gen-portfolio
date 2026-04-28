// 30+ language localization. Static dictionary, no runtime fetches.
export type LangCode =
  | "en" | "hi" | "mr" | "es" | "fr" | "de" | "it" | "pt" | "ru" | "zh"
  | "ja" | "ko" | "ar" | "tr" | "nl" | "pl" | "sv" | "id" | "vi" | "th"
  | "bn" | "ta" | "te" | "gu" | "pa" | "ur" | "fa" | "he" | "uk" | "el"
  | "cs" | "ro";

export const LANGUAGES: { code: LangCode; name: string; native: string; flag: string; rtl?: boolean }[] = [
  { code: "en", name: "English", native: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  { code: "ta", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", native: "اردو", flag: "🇵🇰", rtl: true },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦", rtl: true },
  { code: "fa", name: "Persian", native: "فارسی", flag: "🇮🇷", rtl: true },
  { code: "he", name: "Hebrew", native: "עברית", flag: "🇮🇱", rtl: true },
  { code: "tr", name: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  { code: "pl", name: "Polish", native: "Polski", flag: "🇵🇱" },
  { code: "sv", name: "Swedish", native: "Svenska", flag: "🇸🇪" },
  { code: "id", name: "Indonesian", native: "Indonesia", flag: "🇮🇩" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", name: "Thai", native: "ไทย", flag: "🇹🇭" },
  { code: "uk", name: "Ukrainian", native: "Українська", flag: "🇺🇦" },
  { code: "el", name: "Greek", native: "Ελληνικά", flag: "🇬🇷" },
  { code: "cs", name: "Czech", native: "Čeština", flag: "🇨🇿" },
  { code: "ro", name: "Romanian", native: "Română", flag: "🇷🇴" },
];

export type Dict = {
  nav: { work: string; services: string; stack: string; contact: string };
  hero: {
    badge: string;
    title1: string; title2: string;
    subtitle: string;
    ctaWork: string; ctaContact: string;
  };
  values: {
    title: string; subtitle: string;
    items: { title: string; desc: string }[];
  };
  featured: {
    eyebrow: string; title: string; desc: string; visit: string;
  };
  projects: { title: string; subtitle: string; visit: string };
  services: {
    title: string; subtitle: string;
    items: { title: string; desc: string }[];
  };
  stack: { title: string; subtitle: string };
  contact: {
    title: string; subtitle: string;
    name: string; email: string; message: string;
    send: string; whatsapp: string; emailMe: string;
    sent: string;
  };
  footer: string;
  modal: { title: string; subtitle: string; continue: string };
};

const en: Dict = {
  nav: { work: "Work", services: "Services", stack: "Stack", contact: "Contact" },
  hero: {
    badge: "Available for new projects",
    title1: "I build next-generation",
    title2: "websites & web apps",
    subtitle: "Fast, scalable, and designed to convert.",
    ctaWork: "View Work", ctaContact: "Contact Me",
  },
  values: {
    title: "Why work with me",
    subtitle: "Modern engineering meets business outcomes.",
    items: [
      { title: "Modern UI / UX", desc: "Polished interfaces that feel premium on every device." },
      { title: "Business-focused solutions", desc: "Built around real KPIs — leads, conversions, retention." },
      { title: "Automation tools", desc: "Save hours weekly with smart workflows and integrations." },
      { title: "High-performance apps", desc: "Sub-second loads, optimized rendering, scalable backends." },
    ],
  },
  featured: {
    eyebrow: "Featured project",
    title: "Maheshwari Smart Bill",
    desc: "A complete billing and inventory platform for modern retail. Real-time invoicing, GST-ready exports, and a dashboard built for speed.",
    visit: "Open live site",
  },
  projects: { title: "Selected work", subtitle: "Live products shipped to real users.", visit: "Visit" },
  services: {
    title: "Services",
    subtitle: "Everything you need to launch and grow.",
    items: [
      { title: "Web App Development", desc: "Full-stack apps with React, Node and modern tooling." },
      { title: "Landing Pages", desc: "High-converting marketing sites that load instantly." },
      { title: "Dashboards & Admin", desc: "Powerful internal tools tailored to your team." },
      { title: "Automation & APIs", desc: "Connect your stack and remove repetitive work." },
    ],
  },
  stack: { title: "Tech stack", subtitle: "The tools I reach for every day." },
  contact: {
    title: "Let's build something powerful",
    subtitle: "Tell me about your project — I usually reply within a few hours.",
    name: "Your name", email: "Your email", message: "Your message",
    send: "Send message", whatsapp: "Chat on WhatsApp", emailMe: "Email me",
    sent: "Thanks — opening your email client.",
  },
  footer: "Designed and built by Jayesh Mal",
  modal: { title: "Choose your language", subtitle: "Select a language to continue.", continue: "Continue" },
};

// Helper: build localized dict reusing structure. For untranslated keys we keep English text but localize headings.
const make = (overrides: Partial<Record<keyof Dict, any>>): Dict => ({
  ...en,
  ...overrides,
  nav: { ...en.nav, ...(overrides.nav || {}) },
  hero: { ...en.hero, ...(overrides.hero || {}) },
  values: { ...en.values, ...(overrides.values || {}), items: (overrides.values?.items) || en.values.items },
  featured: { ...en.featured, ...(overrides.featured || {}) },
  projects: { ...en.projects, ...(overrides.projects || {}) },
  services: { ...en.services, ...(overrides.services || {}), items: (overrides.services?.items) || en.services.items },
  stack: { ...en.stack, ...(overrides.stack || {}) },
  contact: { ...en.contact, ...(overrides.contact || {}) },
  modal: { ...en.modal, ...(overrides.modal || {}) },
});

export const DICTS: Record<LangCode, Dict> = {
  en,
  hi: make({
    nav: { work: "काम", services: "सेवाएँ", stack: "स्टैक", contact: "संपर्क" },
    hero: { badge: "नए प्रोजेक्ट के लिए उपलब्ध", title1: "मैं बनाता हूँ अगली पीढ़ी की", title2: "वेबसाइट्स और वेब ऐप्स", subtitle: "तेज़, स्केलेबल और कन्वर्ज़न के लिए डिज़ाइन की गई।", ctaWork: "काम देखें", ctaContact: "संपर्क करें" },
    values: { title: "मेरे साथ क्यों काम करें", subtitle: "आधुनिक इंजीनियरिंग और बिज़नेस रिज़ल्ट्स।",
      items: [
        { title: "आधुनिक UI / UX", desc: "हर डिवाइस पर प्रीमियम अनुभव।" },
        { title: "बिज़नेस-केंद्रित समाधान", desc: "लीड्स, कन्वर्ज़न और रिटेंशन पर केंद्रित।" },
        { title: "ऑटोमेशन टूल्स", desc: "स्मार्ट वर्कफ़्लो से समय बचाएँ।" },
        { title: "हाई-परफॉर्मेंस ऐप्स", desc: "सेकंड से कम लोड, स्केलेबल बैकएंड।" },
      ] },
    featured: { eyebrow: "विशेष प्रोजेक्ट", title: "Maheshwari Smart Bill", desc: "रिटेल के लिए आधुनिक बिलिंग और इन्वेंट्री प्लेटफ़ॉर्म।", visit: "लाइव साइट खोलें" },
    projects: { title: "चुनिंदा कार्य", subtitle: "वास्तविक उपयोगकर्ताओं के लिए लाइव प्रोडक्ट्स।", visit: "देखें" },
    services: { title: "सेवाएँ", subtitle: "लॉन्च और ग्रोथ के लिए सब कुछ।",
      items: [
        { title: "वेब ऐप डेवलपमेंट", desc: "React और Node के साथ फुल-स्टैक ऐप्स।" },
        { title: "लैंडिंग पेज", desc: "तेज़ी से लोड होने वाले हाई-कन्वर्टिंग पेज।" },
        { title: "डैशबोर्ड और एडमिन", desc: "टीम के लिए शक्तिशाली टूल्स।" },
        { title: "ऑटोमेशन और API", desc: "अपने स्टैक को कनेक्ट करें।" },
      ] },
    stack: { title: "टेक स्टैक", subtitle: "रोज़ इस्तेमाल होने वाले टूल्स।" },
    contact: { title: "कुछ शक्तिशाली बनाते हैं", subtitle: "अपने प्रोजेक्ट के बारे में बताएँ — कुछ ही घंटों में जवाब।",
      name: "आपका नाम", email: "आपका ईमेल", message: "आपका संदेश",
      send: "संदेश भेजें", whatsapp: "WhatsApp पर चैट करें", emailMe: "ईमेल करें", sent: "धन्यवाद — ईमेल खोल रहे हैं।" },
    footer: "जयेश माल द्वारा डिज़ाइन और निर्मित",
    modal: { title: "अपनी भाषा चुनें", subtitle: "जारी रखने के लिए भाषा चुनें।", continue: "जारी रखें" },
  }),
  mr: make({
    nav: { work: "काम", services: "सेवा", stack: "स्टॅक", contact: "संपर्क" },
    hero: { badge: "नवीन प्रोजेक्टसाठी उपलब्ध", title1: "मी बनवतो पुढच्या पिढीच्या", title2: "वेबसाइट्स आणि वेब अ‍ॅप्स", subtitle: "वेगवान, स्केलेबल आणि कन्व्हर्जनसाठी डिझाइन केलेले.", ctaWork: "काम पहा", ctaContact: "संपर्क करा" },
    values: { title: "माझ्यासोबत का काम करावे", subtitle: "आधुनिक इंजिनिअरिंग आणि व्यवसाय परिणाम.",
      items: [
        { title: "आधुनिक UI / UX", desc: "प्रत्येक डिव्हाइसवर प्रीमियम अनुभव." },
        { title: "व्यवसाय-केंद्रित उपाय", desc: "लीड्स, कन्व्हर्जन आणि रिटेंशनवर केंद्रित." },
        { title: "ऑटोमेशन साधने", desc: "स्मार्ट वर्कफ्लोने वेळ वाचवा." },
        { title: "उच्च-कार्यक्षम अ‍ॅप्स", desc: "अति-वेगवान लोड्स, स्केलेबल बॅकएंड." },
      ] },
    featured: { eyebrow: "विशेष प्रोजेक्ट", title: "Maheshwari Smart Bill", desc: "आधुनिक रिटेलसाठी संपूर्ण बिलिंग आणि इन्व्हेंटरी प्लॅटफॉर्म.", visit: "लाइव्ह साइट उघडा" },
    projects: { title: "निवडक काम", subtitle: "वास्तविक वापरकर्त्यांसाठी लाइव्ह उत्पादने.", visit: "भेट द्या" },
    services: { title: "सेवा", subtitle: "लाँच आणि वाढीसाठी सर्वकाही.",
      items: [
        { title: "वेब अ‍ॅप विकास", desc: "React आणि Node सह फुल-स्टॅक अ‍ॅप्स." },
        { title: "लँडिंग पेजेस", desc: "त्वरित लोड होणारी उच्च-कन्व्हर्टिंग पेजेस." },
        { title: "डॅशबोर्ड आणि अ‍ॅडमिन", desc: "टीमसाठी शक्तिशाली साधने." },
        { title: "ऑटोमेशन आणि API", desc: "तुमचा स्टॅक कनेक्ट करा." },
      ] },
    stack: { title: "टेक स्टॅक", subtitle: "दररोज वापरली जाणारी साधने." },
    contact: { title: "चला काहीतरी शक्तिशाली बनवूया", subtitle: "तुमच्या प्रोजेक्टबद्दल सांगा — काही तासांत उत्तर.",
      name: "तुमचे नाव", email: "तुमचा ईमेल", message: "तुमचा संदेश",
      send: "संदेश पाठवा", whatsapp: "WhatsApp वर चॅट", emailMe: "ईमेल करा", sent: "धन्यवाद — ईमेल उघडत आहे." },
    footer: "जयेश माल द्वारे डिझाइन आणि बनवलेले",
    modal: { title: "तुमची भाषा निवडा", subtitle: "सुरू ठेवण्यासाठी भाषा निवडा.", continue: "सुरू ठेवा" },
  }),
  es: make({
    nav: { work: "Trabajo", services: "Servicios", stack: "Stack", contact: "Contacto" },
    hero: { badge: "Disponible para nuevos proyectos", title1: "Construyo sitios web", title2: "y apps de nueva generación", subtitle: "Rápidos, escalables y diseñados para convertir.", ctaWork: "Ver trabajos", ctaContact: "Contáctame" },
    values: { title: "Por qué trabajar conmigo", subtitle: "Ingeniería moderna con resultados de negocio.", items: en.values.items },
    featured: { ...en.featured, eyebrow: "Proyecto destacado", desc: "Plataforma completa de facturación e inventario para retail moderno.", visit: "Abrir sitio" },
    projects: { title: "Trabajos seleccionados", subtitle: "Productos en vivo con usuarios reales.", visit: "Visitar" },
    services: { title: "Servicios", subtitle: "Todo lo que necesitas para lanzar y crecer.", items: en.services.items },
    stack: { title: "Stack tecnológico", subtitle: "Las herramientas que uso a diario." },
    contact: { ...en.contact, title: "Construyamos algo poderoso", subtitle: "Cuéntame de tu proyecto — respondo en pocas horas.", name: "Tu nombre", email: "Tu email", message: "Tu mensaje", send: "Enviar mensaje", whatsapp: "Chatear por WhatsApp", emailMe: "Envíame un email", sent: "Gracias — abriendo tu cliente de email." },
    footer: "Diseñado y construido por Jayesh Mal",
    modal: { title: "Elige tu idioma", subtitle: "Selecciona un idioma para continuar.", continue: "Continuar" },
  }),
  fr: make({
    nav: { work: "Projets", services: "Services", stack: "Stack", contact: "Contact" },
    hero: { badge: "Disponible pour de nouveaux projets", title1: "Je crée des sites web", title2: "et apps nouvelle génération", subtitle: "Rapides, évolutifs et conçus pour convertir.", ctaWork: "Voir les projets", ctaContact: "Me contacter" },
    values: { title: "Pourquoi travailler avec moi", subtitle: "Ingénierie moderne et résultats business.", items: en.values.items },
    featured: { ...en.featured, eyebrow: "Projet en vedette", visit: "Ouvrir le site" },
    projects: { title: "Projets sélectionnés", subtitle: "Produits en ligne avec de vrais utilisateurs.", visit: "Visiter" },
    services: { title: "Services", subtitle: "Tout ce qu’il faut pour lancer et grandir.", items: en.services.items },
    stack: { title: "Stack technique", subtitle: "Les outils que j’utilise au quotidien." },
    contact: { ...en.contact, title: "Construisons quelque chose de puissant", subtitle: "Parlez-moi de votre projet.", name: "Votre nom", email: "Votre email", message: "Votre message", send: "Envoyer", whatsapp: "Discuter sur WhatsApp", emailMe: "M’envoyer un email", sent: "Merci — ouverture de votre messagerie." },
    footer: "Conçu et développé par Jayesh Mal",
    modal: { title: "Choisissez votre langue", subtitle: "Sélectionnez une langue pour continuer.", continue: "Continuer" },
  }),
  de: make({
    nav: { work: "Arbeit", services: "Leistungen", stack: "Stack", contact: "Kontakt" },
    hero: { badge: "Verfügbar für neue Projekte", title1: "Ich entwickle Websites", title2: "und Web-Apps der nächsten Generation", subtitle: "Schnell, skalierbar und auf Conversion ausgelegt.", ctaWork: "Arbeit ansehen", ctaContact: "Kontakt aufnehmen" },
    featured: { ...en.featured, eyebrow: "Ausgewähltes Projekt", visit: "Live-Seite öffnen" },
    contact: { ...en.contact, title: "Lass uns etwas Kraftvolles bauen", name: "Ihr Name", email: "Ihre E-Mail", message: "Ihre Nachricht", send: "Senden", whatsapp: "Auf WhatsApp chatten", emailMe: "E-Mail senden" },
    modal: { title: "Wählen Sie Ihre Sprache", subtitle: "Bitte eine Sprache auswählen.", continue: "Weiter" },
  }),
  it: make({
    nav: { work: "Lavori", services: "Servizi", stack: "Stack", contact: "Contatto" },
    hero: { badge: "Disponibile per nuovi progetti", title1: "Costruisco siti web", title2: "e app di nuova generazione", subtitle: "Veloci, scalabili e progettati per convertire.", ctaWork: "Vedi lavori", ctaContact: "Contattami" },
    contact: { ...en.contact, title: "Costruiamo qualcosa di potente", name: "Il tuo nome", email: "La tua email", message: "Il tuo messaggio", send: "Invia", whatsapp: "Chatta su WhatsApp", emailMe: "Inviami una email" },
    modal: { title: "Scegli la tua lingua", subtitle: "Seleziona una lingua per continuare.", continue: "Continua" },
  }),
  pt: make({
    nav: { work: "Trabalhos", services: "Serviços", stack: "Stack", contact: "Contato" },
    hero: { badge: "Disponível para novos projetos", title1: "Eu construo sites", title2: "e apps de nova geração", subtitle: "Rápidos, escaláveis e feitos para converter.", ctaWork: "Ver trabalhos", ctaContact: "Fale comigo" },
    contact: { ...en.contact, title: "Vamos construir algo poderoso", name: "Seu nome", email: "Seu email", message: "Sua mensagem", send: "Enviar", whatsapp: "Chamar no WhatsApp", emailMe: "Me enviar email" },
    modal: { title: "Escolha seu idioma", subtitle: "Selecione um idioma para continuar.", continue: "Continuar" },
  }),
  ru: make({
    nav: { work: "Работы", services: "Услуги", stack: "Стек", contact: "Контакты" },
    hero: { badge: "Открыт для новых проектов", title1: "Создаю сайты", title2: "и веб-приложения нового поколения", subtitle: "Быстрые, масштабируемые, ориентированные на конверсию.", ctaWork: "Смотреть работы", ctaContact: "Связаться" },
    contact: { ...en.contact, title: "Давайте создадим нечто мощное", name: "Ваше имя", email: "Ваш email", message: "Ваше сообщение", send: "Отправить", whatsapp: "Чат в WhatsApp", emailMe: "Написать email" },
    modal: { title: "Выберите язык", subtitle: "Выберите язык, чтобы продолжить.", continue: "Продолжить" },
  }),
  zh: make({
    nav: { work: "作品", services: "服务", stack: "技术栈", contact: "联系" },
    hero: { badge: "接受新项目", title1: "我构建下一代", title2: "网站与 Web 应用", subtitle: "快速、可扩展、为转化而设计。", ctaWork: "查看作品", ctaContact: "联系我" },
    contact: { ...en.contact, title: "一起打造强大的产品", name: "您的姓名", email: "您的邮箱", message: "您的留言", send: "发送", whatsapp: "WhatsApp 沟通", emailMe: "给我发邮件" },
    modal: { title: "选择您的语言", subtitle: "请选择语言以继续。", continue: "继续" },
  }),
  ja: make({
    nav: { work: "作品", services: "サービス", stack: "技術", contact: "連絡" },
    hero: { badge: "新しいプロジェクト受付中", title1: "次世代の", title2: "ウェブサイトとアプリを構築", subtitle: "高速・スケーラブル・コンバージョン重視。", ctaWork: "作品を見る", ctaContact: "お問い合わせ" },
    contact: { ...en.contact, title: "強力なプロダクトを作りましょう", name: "お名前", email: "メール", message: "メッセージ", send: "送信", whatsapp: "WhatsAppで連絡", emailMe: "メールを送る" },
    modal: { title: "言語を選択", subtitle: "続行する言語を選んでください。", continue: "続ける" },
  }),
  ko: make({
    nav: { work: "작업", services: "서비스", stack: "기술", contact: "연락" },
    hero: { badge: "새 프로젝트 가능", title1: "차세대 웹사이트와", title2: "웹 앱을 만듭니다", subtitle: "빠르고, 확장 가능하며, 전환에 최적화.", ctaWork: "작업 보기", ctaContact: "연락하기" },
    modal: { title: "언어를 선택하세요", subtitle: "계속하려면 언어를 선택하세요.", continue: "계속" },
  }),
  ar: make({
    nav: { work: "الأعمال", services: "الخدمات", stack: "التقنيات", contact: "تواصل" },
    hero: { badge: "متاح لمشاريع جديدة", title1: "أبني مواقع وتطبيقات", title2: "من الجيل القادم", subtitle: "سريعة، قابلة للتوسع، ومصممة لتحقيق التحويل.", ctaWork: "عرض الأعمال", ctaContact: "تواصل معي" },
    contact: { ...en.contact, title: "لنبنِ شيئًا قويًا", name: "اسمك", email: "بريدك", message: "رسالتك", send: "إرسال", whatsapp: "محادثة واتساب", emailMe: "راسلني" },
    modal: { title: "اختر لغتك", subtitle: "اختر لغة للمتابعة.", continue: "متابعة" },
  }),
  tr: make({
    nav: { work: "Projeler", services: "Hizmetler", stack: "Teknoloji", contact: "İletişim" },
    hero: { badge: "Yeni projelere açığım", title1: "Yeni nesil web siteleri", title2: "ve uygulamalar geliştiriyorum", subtitle: "Hızlı, ölçeklenebilir ve dönüşüm odaklı.", ctaWork: "Projeleri gör", ctaContact: "İletişime geç" },
    modal: { title: "Dilinizi seçin", subtitle: "Devam etmek için bir dil seçin.", continue: "Devam" },
  }),
  nl: make({
    nav: { work: "Werk", services: "Diensten", stack: "Stack", contact: "Contact" },
    hero: { badge: "Beschikbaar voor nieuwe projecten", title1: "Ik bouw next-gen websites", title2: "en webapps", subtitle: "Snel, schaalbaar en gemaakt om te converteren.", ctaWork: "Bekijk werk", ctaContact: "Neem contact op" },
    modal: { title: "Kies je taal", subtitle: "Selecteer een taal om door te gaan.", continue: "Doorgaan" },
  }),
  pl: make({
    nav: { work: "Projekty", services: "Usługi", stack: "Stack", contact: "Kontakt" },
    hero: { badge: "Otwarty na nowe projekty", title1: "Tworzę nowoczesne strony", title2: "i aplikacje webowe", subtitle: "Szybkie, skalowalne i zaprojektowane pod konwersję.", ctaWork: "Zobacz prace", ctaContact: "Kontakt" },
    modal: { title: "Wybierz język", subtitle: "Wybierz język, aby kontynuować.", continue: "Kontynuuj" },
  }),
  sv: make({
    hero: { badge: "Tillgänglig för nya projekt", title1: "Jag bygger nästa generations", title2: "webbplatser och webbappar", subtitle: "Snabba, skalbara och designade för att konvertera.", ctaWork: "Se arbeten", ctaContact: "Kontakta mig" },
    modal: { title: "Välj språk", subtitle: "Välj ett språk för att fortsätta.", continue: "Fortsätt" },
  }),
  id: make({
    nav: { work: "Karya", services: "Layanan", stack: "Stack", contact: "Kontak" },
    hero: { badge: "Tersedia untuk proyek baru", title1: "Saya membangun situs", title2: "dan aplikasi web masa depan", subtitle: "Cepat, skalabel, dirancang untuk konversi.", ctaWork: "Lihat karya", ctaContact: "Hubungi saya" },
    modal: { title: "Pilih bahasa Anda", subtitle: "Pilih bahasa untuk lanjut.", continue: "Lanjutkan" },
  }),
  vi: make({
    nav: { work: "Dự án", services: "Dịch vụ", stack: "Công nghệ", contact: "Liên hệ" },
    hero: { badge: "Sẵn sàng nhận dự án mới", title1: "Tôi xây dựng website", title2: "và web app thế hệ mới", subtitle: "Nhanh, mở rộng được và tối ưu chuyển đổi.", ctaWork: "Xem dự án", ctaContact: "Liên hệ" },
    modal: { title: "Chọn ngôn ngữ", subtitle: "Chọn ngôn ngữ để tiếp tục.", continue: "Tiếp tục" },
  }),
  th: make({
    nav: { work: "ผลงาน", services: "บริการ", stack: "เทคโนโลยี", contact: "ติดต่อ" },
    hero: { badge: "พร้อมรับโปรเจกต์ใหม่", title1: "ผมสร้างเว็บไซต์", title2: "และเว็บแอปยุคใหม่", subtitle: "เร็ว ขยายได้ และออกแบบให้แปลงยอด.", ctaWork: "ดูผลงาน", ctaContact: "ติดต่อผม" },
    modal: { title: "เลือกภาษาของคุณ", subtitle: "เลือกภาษาเพื่อดำเนินการต่อ.", continue: "ดำเนินการต่อ" },
  }),
  bn: make({
    hero: { badge: "নতুন প্রকল্পের জন্য উপলব্ধ", title1: "আমি তৈরি করি পরবর্তী প্রজন্মের", title2: "ওয়েবসাইট ও ওয়েব অ্যাপ", subtitle: "দ্রুত, স্কেলেবল এবং কনভার্সনের জন্য ডিজাইন করা.", ctaWork: "কাজ দেখুন", ctaContact: "যোগাযোগ" },
    modal: { title: "আপনার ভাষা নির্বাচন করুন", subtitle: "চালিয়ে যেতে একটি ভাষা নির্বাচন করুন.", continue: "চালিয়ে যান" },
  }),
  ta: make({
    hero: { badge: "புதிய திட்டங்களுக்கு கிடைக்கிறேன்", title1: "நான் கட்டமைக்கிறேன் அடுத்த தலைமுறை", title2: "வலைத்தளங்கள் & வலை செயலிகள்", subtitle: "வேகமான, அளவிடக்கூடிய, மாற்றத்திற்கு வடிவமைக்கப்பட்ட.", ctaWork: "வேலையைப் பார்", ctaContact: "தொடர்பு கொள்ள" },
    modal: { title: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்", subtitle: "தொடர மொழியைத் தேர்ந்தெடுக்கவும்.", continue: "தொடர்க" },
  }),
  te: make({
    hero: { badge: "కొత్త ప్రాజెక్టులకు అందుబాటులో", title1: "నేను నిర్మిస్తాను తరువాతి తరం", title2: "వెబ్‌సైట్లు & వెబ్ యాప్‌లు", subtitle: "వేగవంతమైన, స్కేలబుల్, మార్పిడికి రూపొందించబడింది.", ctaWork: "పనిని చూడండి", ctaContact: "సంప్రదించండి" },
    modal: { title: "మీ భాషను ఎంచుకోండి", subtitle: "కొనసాగించడానికి భాషను ఎంచుకోండి.", continue: "కొనసాగించు" },
  }),
  gu: make({
    hero: { badge: "નવા પ્રોજેક્ટ્સ માટે ઉપલબ્ધ", title1: "હું બનાવું છું આગામી પેઢીની", title2: "વેબસાઇટ્સ અને વેબ ઍપ્સ", subtitle: "ઝડપી, સ્કેલેબલ અને કન્વર્ઝન માટે ડિઝાઇન.", ctaWork: "કામ જુઓ", ctaContact: "સંપર્ક" },
    modal: { title: "તમારી ભાષા પસંદ કરો", subtitle: "ચાલુ રાખવા માટે ભાષા પસંદ કરો.", continue: "ચાલુ રાખો" },
  }),
  pa: make({
    hero: { badge: "ਨਵੇਂ ਪ੍ਰੋਜੈਕਟ ਲਈ ਉਪਲਬਧ", title1: "ਮੈਂ ਬਣਾਉਂਦਾ ਹਾਂ ਅਗਲੀ ਪੀੜ੍ਹੀ ਦੀਆਂ", title2: "ਵੈਬਸਾਈਟਾਂ ਅਤੇ ਵੈਬ ਐਪ", subtitle: "ਤੇਜ਼, ਸਕੇਲੇਬਲ ਅਤੇ ਕਨਵਰਜ਼ਨ ਲਈ ਡਿਜ਼ਾਈਨ।", ctaWork: "ਕੰਮ ਵੇਖੋ", ctaContact: "ਸੰਪਰਕ ਕਰੋ" },
    modal: { title: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ", subtitle: "ਜਾਰੀ ਰੱਖਣ ਲਈ ਭਾਸ਼ਾ ਚੁਣੋ.", continue: "ਜਾਰੀ ਰੱਖੋ" },
  }),
  ur: make({
    hero: { badge: "نئے پروجیکٹس کے لیے دستیاب", title1: "میں بناتا ہوں اگلی نسل کی", title2: "ویب سائٹس اور ویب ایپس", subtitle: "تیز، اسکیل ایبل اور کنورژن کے لیے ڈیزائن کردہ۔", ctaWork: "کام دیکھیں", ctaContact: "رابطہ کریں" },
    modal: { title: "اپنی زبان منتخب کریں", subtitle: "جاری رکھنے کے لیے زبان منتخب کریں۔", continue: "جاری رکھیں" },
  }),
  fa: make({
    hero: { badge: "آماده پروژه‌های جدید", title1: "من می‌سازم وب‌سایت‌ها", title2: "و اپ‌های نسل بعد", subtitle: "سریع، مقیاس‌پذیر و طراحی‌شده برای تبدیل.", ctaWork: "مشاهده کارها", ctaContact: "تماس" },
    modal: { title: "زبان خود را انتخاب کنید", subtitle: "برای ادامه یک زبان انتخاب کنید.", continue: "ادامه" },
  }),
  he: make({
    hero: { badge: "פנוי לפרויקטים חדשים", title1: "אני בונה אתרים", title2: "ואפליקציות מהדור הבא", subtitle: "מהירים, מדרגיים ומעוצבים להמרה.", ctaWork: "צפה בעבודות", ctaContact: "צור קשר" },
    modal: { title: "בחר את השפה שלך", subtitle: "בחר שפה כדי להמשיך.", continue: "המשך" },
  }),
  uk: make({
    hero: { badge: "Відкритий до нових проектів", title1: "Я створюю сайти", title2: "та веб-додатки нового покоління", subtitle: "Швидкі, масштабовані та орієнтовані на конверсію.", ctaWork: "Переглянути роботи", ctaContact: "Зв'язатися" },
    modal: { title: "Оберіть мову", subtitle: "Виберіть мову, щоб продовжити.", continue: "Продовжити" },
  }),
  el: make({
    hero: { badge: "Διαθέσιμος για νέα projects", title1: "Φτιάχνω ιστοσελίδες", title2: "και web apps νέας γενιάς", subtitle: "Γρήγορα, κλιμακούμενα και σχεδιασμένα για μετατροπές.", ctaWork: "Δείτε δουλειές", ctaContact: "Επικοινωνία" },
    modal: { title: "Επιλέξτε γλώσσα", subtitle: "Επιλέξτε γλώσσα για να συνεχίσετε.", continue: "Συνέχεια" },
  }),
  cs: make({
    hero: { badge: "K dispozici pro nové projekty", title1: "Stavím weby", title2: "a webové aplikace nové generace", subtitle: "Rychlé, škálovatelné a navržené pro konverze.", ctaWork: "Zobrazit práce", ctaContact: "Kontakt" },
    modal: { title: "Vyberte jazyk", subtitle: "Vyberte jazyk pro pokračování.", continue: "Pokračovat" },
  }),
  ro: make({
    hero: { badge: "Disponibil pentru proiecte noi", title1: "Construiesc site-uri", title2: "și aplicații web de nouă generație", subtitle: "Rapide, scalabile și concepute pentru conversie.", ctaWork: "Vezi lucrări", ctaContact: "Contact" },
    modal: { title: "Alege limba ta", subtitle: "Selectează o limbă pentru a continua.", continue: "Continuă" },
  }),
};
