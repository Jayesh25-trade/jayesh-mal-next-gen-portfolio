import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X, Play, Pause, Sparkles, Languages } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import avatarImg from "@/assets/jayesh-avatar.png";
import { toast } from "sonner";

const VOICE_ID = "pNInz6obpgqjMhk4HpMu"; // Adam - deep male voice
const API_KEY = "sk_ef13adfe5cbf044c61eba8806196a2e515f27bfd64e6811b";

const SCRIPTS: Record<string, string> = {
  en: "Hi! I'm Jayesh Mal, a full-stack developer. I design and build next-generation websites and web apps that load fast, look premium, and help grow your business. Tell me about your project, and let's build something powerful together!",
  hi: "नमस्ते! मैं जयेश माल हूँ, एक फुल-स्टैक डेवलपर। मैं अगली पीढ़ी की वेबसाइट्स और वेब ऐप्स डिज़ाइन और विकसित करता हूँ जो तेज़ी से लोड होते हैं, दिखने में प्रीमियम हैं और आपके बिज़नेस को बढ़ने में मदद करते हैं। अपने प्रोजेक्ट के बारे में बताएँ, और चलिए मिलकर कुछ शक्तिशाली बनाते हैं!",
  mr: "नमस्कार! मी जयेश माल आहे, एक फुल-स्टॅक डेव्हलपर. मी पुढच्या पिढीच्या वेबसाइट्स आणि वेब अ‍ॅप्स डिझाइन आणि विकसित करतो ज्या वेगाने लोड होतात, प्रीमियम दिसतात आणि तुमचा व्यवसाय वाढवण्यास मदत करतात. मला तुमच्या प्रोजेक्टबद्दल सांगा, आणि चला मिळून काहीतरी शक्तिशाली बनवूया!",
  es: "¡Hola! Soy Jayesh Mal, un desarrollador full-stack. Diseño y construyo sitios web y aplicaciones web de última generación que se cargan rápido, se ven premium y ayudan a hacer crecer tu negocio. ¡Cuéntame sobre tu proyecto y construyamos algo poderoso juntos!",
  fr: "Salut! Je suis Jayesh Mal, un développeur spécialisé. Je conçois et construis des sites web et des applications web de nouvelle génération qui se chargent rapidement, ont un aspect premium et aident à développer votre entreprise. Parlez-moi de votre projet et construisons quelque chose de puissant ensemble!",
  de: "Hallo! Ich bin Jayesh Mal, ein Full-Stack-Entwickler. Ich entwerfe und baue Websites und Web-Apps der nächsten Generation, die schnell geladen werden, hochwertig aussehen und Ihr Unternehmen beim Wachstum unterstützen. Erzählen Sie mir von Ihrem Projekt, und lassen Sie uns gemeinsam etwas Mächtiges aufbauen!",
  it: "Ciao! Sono Jayesh Mal, uno sviluppatore full-stack. Progetto e creo siti Web e app Web di nuova generazione che si caricano velocemente, hanno un aspetto premium e aiutano a far crescere la tua attività. Parlami del tuo progetto e costruiamo qualcosa di potente insieme!",
  pt: "Olá! Sou Jayesh Mal, um desenvolvedor full-stack. Eu projeto e construo sites e web apps de última geração que carregam rápido, têm aparência premium e ajudam a expandir seus negócios. Fale-me sobre o seu projeto e vamos construir algo poderoso juntos!"
};

const getScript = (lang: string) => SCRIPTS[lang] || SCRIPTS.en;

export const VoiceAvatar = () => {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cachedAudios, setCachedAudios] = useState<Record<string, string>>({});

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Show greeting tooltip after load
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open && !isPlaying) setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(t);
  }, [open, isPlaying]);

  // Handle visualizer loop
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
        
        // Match high-DPI displays
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

        // Draw frequency bars
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
      // Clear canvas
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

  const handlePlayVoice = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    let audioUrl = cachedAudios[lang];

    try {
      if (!audioUrl) {
        const scriptText = getScript(lang);
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
          method: "POST",
          headers: {
            "xi-api-key": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: scriptText,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`ElevenLabs returned status: ${response.status}`);
        }

        const blob = await response.blob();
        audioUrl = URL.createObjectURL(blob);
        setCachedAudios((prev) => ({ ...prev, [lang]: audioUrl }));
      }

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
      setIsPlaying(true);
      setIsLoading(false);

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate AI voice introduction. Please verify your connection.");
      setIsLoading(false);
    }
  };

  const toggleOpen = () => {
    setOpen((o) => !o);
    setShowTooltip(false);
  };

  const script = getScript(lang);

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
                <span className="font-display font-semibold text-sm">Jayesh's AI Assistant</span>
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
              <div className="flex items-center gap-1.5 mb-2 text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                <Languages className="w-3.5 h-3.5 text-neon-purple" />
                <span>Language: {lang.toUpperCase()}</span>
              </div>
              <p className={isPlaying ? "text-foreground transition-colors" : "text-muted-foreground"}>
                {script}
              </p>
            </div>

            {/* Player Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayVoice}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${
                  isPlaying
                    ? "bg-white/15 border border-white/10 hover:bg-white/20 text-white"
                    : "bg-gradient-primary text-primary-foreground glow-primary hover:opacity-90"
                }`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Intro</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Listen to Intro</span>
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
              <span>👋 Hi, I'm Jayesh!</span>
            </div>
            <p className="text-muted-foreground">
              Click here to hear my voice introduction in your selected language!
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
        {!isPlaying && (
          <span className="absolute -inset-1 rounded-full bg-gradient-primary opacity-20 blur-sm animate-pulse-slow group-hover:scale-105 transition-transform" />
        )}

        {/* Inner Glass border */}
        <div className="absolute inset-0 rounded-full border border-white/20 z-20 group-hover:border-neon-cyan/40 transition-colors" />

        {/* Avatar Image */}
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 bg-background/50 backdrop-blur z-10">
          <img
            src={avatarImg}
            alt="Jayesh 3D Avatar"
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
