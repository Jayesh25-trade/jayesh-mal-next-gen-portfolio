import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X, Play, Pause, Sparkles, Languages } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import avatarImg from "@/assets/jayesh-avatar.png";
import { toast } from "sonner";

const SECTION_SCRIPTS: Record<string, Record<string, string>> = {
  top: {
    en: "Welcome to Jimmzzz Developers! We are a next-generation web development agency building fast, premium websites and web apps designed to convert.",
    hi: "जियमज़ डेवेलपर्स (Jimmzzz Developers) में आपका स्वागत है! हम एक अगली पीढ़ी की वेब डेवलपमेंट एजेंसी हैं जो तेज़, प्रीमियम और कन्वर्ज़न के लिए वेबसाइट और वेब ऐप्स बनाती हैं।",
    mr: "जियमज़ डेव्हलपर्स (Jimmzzz Developers) मध्ये आपले स्वागत आहे! आम्ही एक पुढच्या पिढीची वेब डेव्हलपमेंट एजन्सी आहोत जी वेगवान, प्रीमियम आणि कन्व्हर्जनसाठी वेबसाइट आणि वेब अ‍ॅप्स बनवते.",
    es: "¡Bienvenido a Jimmzzz Developers! Somos una agencia de desarrollo web de nueva generación que crea sitios y aplicaciones web rápidos, premium y diseñados para convertir.",
    fr: "Bienvenue chez Jimmzzz Developers! Nous sommes une agence de développement web de nouvelle génération qui crée des sites et applications web rapides, premium et conçus pour convertir."
  },
  about: {
    en: "Here is a bit about us. We design and engineer modern web experiences end-to-end. Led by founder Jayesh Mal, our team focuses on performance, motion, and visual details.",
    hi: "यहाँ हमारे बारे में जानकारी है। हम शुरू से अंत तक आधुनिक वेब अनुभव डिज़ाइन करते हैं। हमारे फाउंडर जयेश माल के नेतृत्व में, हमारी टीम परफॉर्मेंस, मोशन और विज़ुअल डिटेल्स पर ध्यान केंद्रित करती है।",
    mr: "येथे आमच्याबद्दल माहिती आहे. आम्ही सुरुवातीपासून शेवटपर्यंत आधुनिक वेब अनुभव डिझाइन करतो. आमचे संस्थापक जयेश माल यांच्या नेतृत्वाखाली, आमची टीम कार्यक्षमता, मोशन आणि व्हिज्युअल डिटेल्सवर लक्ष केंद्रित करते.",
    es: "Aquí hay un poco sobre nosotros. Diseñamos y construimos experiencias web modernas de principio a fin. Liderado por el fundador Jayesh Mal, nuestro equipo se enfoca en el rendimiento, el movimiento y los detalles visuales.",
    fr: "Voici un aperçu de notre agence. Nous concevons et développons des expériences web modernes de bout en bout. Dirigée par le fondateur Jayesh Mal, notre équipe se concentre sur la performance, les animations et les détails visuels."
  },
  work: {
    en: "Here is a selection of our work, including AI SaaS platforms, corporate portals, and luxury e-commerce brands shipped to real clients.",
    hi: "यहाँ हमारे काम का एक चयन है, जिसमें एआई सास प्लेटफॉर्म, कॉर्पोरेट पोर्टल और वास्तविक ग्राहकों के लिए बनाए गए लक्जरी ई-कॉमर्स ब्रांड शामिल हैं।",
    mr: "येथे आमच्या कामाची निवड आहे, ज्यामध्ये एआय सास प्लॅटफॉर्म, कॉर्पोरेट पोर्टल्स आणि वास्तविक ग्राहकांसाठी तयार केलेले लक्झरी ई-कॉमर्स ब्रँड समाविष्ट आहेत.",
    es: "Aquí hay una selección de nuestro trabajo, incluyendo plataformas SaaS de IA, portales corporativos y marcas de comercio electrónico de lujo creadas para clientes reales.",
    fr: "Voici une sélection de nos projets, comprenant des plateformes SaaS d'IA, des portails d'entreprise et des marques de e-commerce de luxe développées pour nos clients."
  },
  process: {
    en: "Our workflow is simple and collaborative: Discover, Design, Build, and Launch. We align on your business goals first.",
    hi: "हमारा काम करने का तरीका सरल और सहयोगात्मक है: खोजें, डिज़ाइन करें, निर्माण करें और लॉन्च करें। हम सबसे पहले आपके व्यावसायिक लक्ष्यों पर ध्यान केंद्रित करते हैं।",
    mr: "आमची काम करण्याची पद्धत सोपी आणि सहयोगात्मक आहे: शोध, डिझाइन, निर्मिती आणि लाँच. आम्ही प्रथम तुमच्या व्यावसायिक उद्दिष्टांवर लक्ष केंद्रित करतो.",
    es: "Nuestro flujo de trabajo es simple y colaborativo: Descubrir, Diseñar, Construir y Lanzar. Primero nos alineamos con tus objetivos comerciales.",
    fr: "Notre flux de travail es simple et collaboratif: Découverte, Conception, Développement et Lancement. Nous nous alignons d'abord sur vos objectifs commerciaux."
  },
  services: {
    en: "We offer end-to-end services: Web App Development, Landing Pages, Dashboards, and API automation to help grow your business.",
    hi: "हम शुरू से अंत तक सेवाएँ प्रदान करते हैं: वेब ऐप डेवलपमेंट, लैंडिंग पेज, डैशबोर्ड और आपके बिज़नेस को बढ़ाने में मदद करने के लिए एपीआई ऑटोमेशन।",
    mr: "आम्ही सुरुवातीपासून शेवटपर्यंत सेवा देतो: वेब अ‍ॅप डेव्हलपमेंट, लँडिंग पेजेस, डॅशबोर्ड आणि तुमचा व्यवसाय वाढवण्यास मदत करण्यासाठी एपीआय ऑटोमेशन.",
    es: "Ofrecemos servicios de principio a fin: desarrollo de aplicaciones web, páginas de destino, paneles de control y automatización de API para hacer crecer tu negocio.",
    fr: "Nous proposons des services complets: développement d'applications web, landing pages, tableaux de bord et automatisation d'API pour faire grandir votre entreprise."
  },
  stack: {
    en: "These are the modern tools we reach for every day, including React, Next.js, Node, PostgreSQL, and Framer Motion.",
    hi: "ये वे आधुनिक टूल्स हैं जिनका हम रोज़ाना उपयोग करते हैं, जैसे कि React, Next.js, Node, PostgreSQL और Framer Motion।",
    mr: "ही ती आधुनिक साधने आहेत जी आम्ही दररोज वापरतो, जसे की React, Next.js, Node, PostgreSQL आणि Framer Motion.",
    es: "Estas son las herramientas modernas que utilizamos todos los días, incluyendo React, Next.js, Node, PostgreSQL y Framer Motion.",
    fr: "Voici les outils modernes que nous utilisons au quotidien, notamment React, Next.js, Node, PostgreSQL et Framer Motion."
  },
  testimonials: {
    en: "Here are reviews from real clients we've worked with. We always focus on speed, communication, and business outcomes.",
    hi: "यहाँ उन वास्तविक ग्राहकों की समीक्षाएं हैं जिनके साथ हमने काम किया है। हम हमेशा गति, संचार और व्यावसायिक परिणामों पर ध्यान केंद्रित करते हैं।",
    mr: "येथे आम्ही ज्यांच्यासोबत काम केले आहे अशा वास्तविक ग्राहकांची पुनरावलोकने आहेत। आम्ही नेहमी वेग, संवाद आणि व्यावसायिक परिणामांवर लक्ष केंद्रित करतो।",
    es: "Aquí hay testimonios de clientes reales con los que hemos trabajado. Siempre nos enfocamos en la velocidad, la comunicación y los resultados de negocio.",
    fr: "Voici les retours de clients réels avec lesquels nous avons travaillé. Nous nous concentrons toujours sur la rapidité, la communication et les résultats."
  },
  contact: {
    en: "Let's build something powerful together! Send us a message here or contact us directly on WhatsApp to get started.",
    hi: "चलिए मिलकर कुछ शक्तिशाली बनाते हैं! शुरू करने के लिए हमें यहाँ संदेश भेजें या सीधे WhatsApp पर संपर्क करें।",
    mr: "चला मिळून काहीतरी शक्तिशाली बनवूया! सुरू करण्यासाठी आम्हाला येथे संदेश पाठवा किंवा थेट WhatsApp वर संपर्क करा.",
    es: "¡Construyamos algo poderoso juntos! Envános un mensaje aquí o contáctanos directamente por WhatsApp para comenzar.",
    fr: "Construisons quelque chose de puissant ensemble! Envoyez-nous un message ici ou contactez-nous directement sur WhatsApp pour commencer."
  }
};

const UI_STRINGS: Record<string, { title: string; langLabel: string; play: string; pause: string; toastErr: string; guideActive: string; guideInactive: string }> = {
  en: {
    title: "Jimmzzz AI Assistant",
    langLabel: "Language",
    play: "Enable Audio Guide",
    pause: "Pause Audio Guide",
    toastErr: "Failed to generate AI voice. Please try again.",
    guideActive: "✨ AI Scroll Guide active — scroll down to explore!",
    guideInactive: "🔊 Click below to enable AI Voice Guide"
  },
  hi: {
    title: "जियमज़ एआई सहायक",
    langLabel: "भाषा",
    play: "ऑडियो गाइड सक्षम करें",
    pause: "ऑडियो गाइड रोकें",
    toastErr: "एआई वॉयस उत्पन्न करने में विफल। कृपया पुन: प्रयास करें।",
    guideActive: "✨ एआई स्क्रॉल गाइड सक्रिय है — एक्सप्लोर करने के लिए स्क्रॉल करें!",
    guideInactive: "🔊 एआई वॉयस गाइड सक्षम करने के लिए नीचे क्लिक करें"
  },
  mr: {
    title: "जियमज़ एआई सहाय्यक",
    langLabel: "भाषा",
    play: "ऑडिओ मार्गदर्शक सुरू करा",
    pause: "ऑडिओ मार्गदर्शक थांबवा",
    toastErr: "एआय व्हॉइस तयार करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
    guideActive: "✨ एआय स्क्रॉल मार्गदर्शक सक्रिय आहे — एक्सप्लोर करण्यासाठी स्क्रॉल करा!",
    guideInactive: "🔊 एआय व्हॉइस मार्गदर्शक सुरू करण्यासाठी खाली क्लिक करा"
  },
  es: {
    title: "Asistente de IA de Jimmzzz",
    langLabel: "Idioma",
    play: "Activar Guía de Voz",
    pause: "Pausar Guía de Voz",
    toastErr: "Error al generar la voz de IA. Inténtalo de nuevo.",
    guideActive: "✨ Guía de IA activa — ¡desplázate para explorar!",
    guideInactive: "🔊 Haz clic abajo para activar la guía de voz"
  },
  fr: {
    title: "Assistant IA de Jimmzzz",
    langLabel: "Langue",
    play: "Activer le guide audio",
    pause: "Pauser le guide audio",
    toastErr: "Échec de la génération vocale IA. Veuillez réessayer.",
    guideActive: "✨ Guide IA actif — faites défiler pour explorer!",
    guideInactive: "🔊 Cliquez ci-dessous pour activer le guide vocal"
  }
};

const getScript = (section: string, lang: string) => {
  const sect = SECTION_SCRIPTS[section] || SECTION_SCRIPTS.top;
  return sect[lang] || sect.en;
};

const getUIStrings = (lang: string) => UI_STRINGS[lang] || UI_STRINGS.en;

export const VoiceAvatar = () => {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGuideEnabled, setIsGuideEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [cachedAudios, setCachedAudios] = useState<Record<string, string>>({});

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const requestIdRef = useRef(0);

  // Intersection Observer to track scroll position
  useEffect(() => {
    const sectionIds = ["top", "about", "work", "process", "services", "stack", "testimonials", "contact"];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: "-10% 0px -40% 0px" } // Trigger in the upper-middle section of viewport
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Show greeting tooltip after load
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open && !isGuideEnabled) setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(t);
  }, [open, isGuideEnabled]);

  // Handle active section change when guide mode is enabled
  useEffect(() => {
    if (isGuideEnabled && activeSection) {
      playSectionAudio(activeSection);
    }
  }, [activeSection, isGuideEnabled, lang]);

  // Handle visualizer animation loop
  useEffect(() => {
    if (isPlaying && canvasRef.current && analyserRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const analyser = analyserRef.current;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const renderFrame = () => {
        if (!canvasRef.current) return;
        animationFrameId.current = requestAnimationFrame(renderFrame);

        analyser.getByteFrequencyData(dataArray);
        
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const baseRadius = 38; // surrounding the w-16 image (32px radius + 6px gap)

        // Draw glowing background rings
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
        const average = sum / bufferLength;
        const pulse = (average / 255) * 12;

        ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 + (average / 255) * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius + pulse, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 + (average / 255) * 0.25})`;
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius + 8 + pulse * 1.5, 0, Math.PI * 2);
        ctx.stroke();

        // Draw frequency waves
        const numBars = 72;
        const grad = ctx.createRadialGradient(cx, cy, baseRadius, cx, cy, baseRadius + 18);
        grad.addColorStop(0, "rgba(6, 182, 212, 0.9)"); // cyan
        grad.addColorStop(0.5, "rgba(139, 92, 246, 0.7)"); // purple
        grad.addColorStop(1, "rgba(236, 72, 153, 0)"); // pink transparent

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";

        for (let i = 0; i < numBars; i++) {
          const angle = (i / numBars) * Math.PI * 2;
          const dataIndex = Math.floor((i / numBars) * bufferLength);
          const value = dataArray[dataIndex] || 0;
          const lineLength = (value / 255) * 14;

          const r1 = baseRadius + 1;
          const r2 = baseRadius + 1 + lineLength;

          const x1 = cx + Math.cos(angle) * r1;
          const y1 = cy + Math.sin(angle) * r1;
          const x2 = cx + Math.cos(angle) * r2;
          const y2 = cy + Math.sin(angle) * r2;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      };

      renderFrame();
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying, open]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSectionAudio = async (sectionId: string) => {
    const currentRequestId = ++requestIdRef.current;

    // Pause any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setIsLoading(true);
    setIsPlaying(false);

    const cacheKey = `${sectionId}_${lang}`;
    let audioUrl = cachedAudios[cacheKey];
    const ui = getUIStrings(lang);

    try {
      if (!audioUrl) {
        const scriptText = getScript(sectionId, lang);
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: scriptText,
          }),
        });

        if (!response.ok) {
          throw new Error(`TTS serverless function failed: ${response.status}`);
        }

        const blob = await response.blob();
        if (currentRequestId !== requestIdRef.current) return; // Scrolled away

        audioUrl = URL.createObjectURL(blob);
        setCachedAudios((prev) => ({ ...prev, [cacheKey]: audioUrl }));
      }

      if (currentRequestId !== requestIdRef.current) return; // Scrolled away

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      audioRef.current.src = audioUrl;

      // Connect visualizer node
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;

        const source = audioCtx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
      }

      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      await audioRef.current.play();
      if (currentRequestId !== requestIdRef.current) {
        audioRef.current.pause(); // Scrolled away during play start
        return;
      }

      setIsPlaying(true);
      setIsLoading(false);

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    } catch (err) {
      console.error(err);
      if (currentRequestId === requestIdRef.current) {
        toast.error(ui.toastErr);
        setIsLoading(false);
      }
    }
  };

  const handleToggleGuide = () => {
    if (isGuideEnabled) {
      audioRef.current?.pause();
      setIsPlaying(false);
      setIsGuideEnabled(false);
    } else {
      setIsGuideEnabled(true);
    }
  };

  const toggleOpen = () => {
    setOpen((o) => !o);
    setShowTooltip(false);
  };

  const script = getScript(activeSection, lang);
  const ui = getUIStrings(lang);

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-3 select-none">
      {/* Expanded Subtitle & Player Card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="w-[310px] sm:w-[360px] glass-strong gradient-border rounded-3xl p-5 shadow-2xl flex flex-col gap-4 mb-2"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon-cyan" />
                <span className="font-display font-semibold text-sm">{ui.title}</span>
              </div>
              <button
                onClick={toggleOpen}
                className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Subtitle / Script Box */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 max-h-[140px] overflow-y-auto text-xs sm:text-sm leading-relaxed text-foreground/80 scrollbar-thin">
              <div className="flex items-center justify-between gap-1.5 mb-2 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                <span className="flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-neon-purple" />
                  {ui.langLabel}: {lang.toUpperCase()}
                </span>
                <span className="text-neon-cyan border border-neon-cyan/20 px-1.5 py-0.5 rounded-md">
                  Section: {activeSection}
                </span>
              </div>
              <p className={isPlaying ? "text-foreground transition-colors" : "text-muted-foreground"}>
                {script}
              </p>
            </div>

            {/* Status Guide Text */}
            <div className="text-[11px] text-center italic transition-colors">
              {isGuideEnabled ? (
                <span className="text-neon-cyan animate-pulse">{ui.guideActive}</span>
              ) : (
                <span className="text-muted-foreground">{ui.guideInactive}</span>
              )}
            </div>

            {/* Player Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleGuide}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${
                  isGuideEnabled
                    ? "bg-white/15 border border-white/10 hover:bg-white/20 text-white"
                    : "bg-gradient-primary text-primary-foreground glow-primary hover:opacity-90"
                }`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : isGuideEnabled ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>{ui.pause}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{ui.play}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Greeting Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            className="absolute bottom-24 right-2 w-[240px] glass-strong border border-white/10 rounded-2xl p-3 shadow-xl text-xs leading-relaxed flex flex-col gap-2 cursor-pointer"
            onClick={toggleOpen}
          >
            <div className="font-semibold text-neon-cyan flex items-center gap-1.5">
              <span>👋 Welcome to Jimmzzz!</span>
            </div>
            <p className="text-muted-foreground">
              Click here to enable our AI Audio Guide. It will introduce sections as you scroll!
            </p>
            <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-card border-r border-b border-white/10 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Button */}
      <button
        onClick={toggleOpen}
        className="group relative w-16 h-16 rounded-full flex items-center justify-center transition-transform active:scale-[0.93] focus:outline-none"
        aria-label="Open AI Voice Introduction"
      >
        {/* Canvas Visualizer Background */}
        <canvas
          ref={canvasRef}
          width={112}
          height={112}
          className="absolute w-28 h-28 pointer-events-none z-0"
        />

        {/* Visual Pulse for Idle/Unplayed State */}
        {!isGuideEnabled && (
          <span className="absolute -inset-1 rounded-full bg-gradient-primary opacity-20 blur-sm animate-pulse-slow group-hover:scale-105 transition-transform" />
        )}

        {/* Inner Glass border */}
        <div className="absolute inset-0 rounded-full border border-white/20 z-20 group-hover:border-neon-cyan/40 transition-colors" />

        {/* Avatar Image */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 bg-background/50 backdrop-blur z-10">
          <img
            src={avatarImg}
            alt="Jimmzzz Developers AI Assistant Avatar"
            width={56}
            height={56}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              isPlaying ? "animate-pulse" : ""
            }`}
          />
        </div>

        {/* Mini Speaking Badge Icon */}
        <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-gradient-primary glow-primary flex items-center justify-center text-primary-foreground z-30 transition-transform group-hover:scale-110">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-primary-foreground/80" />
          )}
        </div>
      </button>
    </div>
  );
};
