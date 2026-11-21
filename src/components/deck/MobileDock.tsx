import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useDeck } from "@/components/deck/DeckContext";

const R = 13;
const CIRC = 2 * Math.PI * R;

/**
 * Thumb-height chapter bar. Only mounted in deck mode.
 */
export const MobileDock = () => {
  const { isDeck, slides, active, progress, goTo, step } = useDeck();

  if (!isDeck || !slides.length) return null;

  const title = slides[active]?.title || "";

  return (
    <div className="deck-dock" role="navigation" aria-label="Chapter navigation">
      <div className="deck-dock-inner">
        <button
          type="button"
          onClick={() => goTo(0)}
          aria-label={`Chapter ${active + 1} of ${slides.length}. Back to top`}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center"
        >
          <svg viewBox="0 0 32 32" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="16" cy="16" r={R} fill="none" stroke="var(--wire-2)" strokeWidth="2" />
            <circle
              cx="16"
              cy="16"
              r={R}
              fill="none"
              stroke="var(--acid)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={CIRC * (1 - progress)}
              style={{ transition: "stroke-dashoffset 120ms linear" }}
            />
          </svg>
          <span className="font-mono text-[9px] font-bold leading-none text-cream">
            {String(active + 1).padStart(2, "0")}
          </span>
        </button>

        <span
          className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "var(--muted-label)" }}
        >
          {title}
        </span>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={active === 0}
            aria-label="Previous chapter"
            className="flex h-10 w-9 items-center justify-center rounded-lg text-cream disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={active >= slides.length - 1}
            aria-label="Next chapter"
            className="flex h-10 w-9 items-center justify-center rounded-lg text-cream disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <a
            href="#contact"
            aria-label="Message us on WhatsApp"
            className="ml-1 flex h-10 items-center gap-1.5 rounded-lg px-3 font-display text-[11px] font-bold"
            style={{ background: "var(--acid)", color: "var(--ink)" }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Hello
          </a>
        </div>
      </div>
    </div>
  );
};
