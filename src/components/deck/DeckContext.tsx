import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useIsDeck, usePrefersReducedMotion } from "@/hooks/use-deck";

type Slide = { el: HTMLElement; title: string };

type DeckCtx = {
  isDeck: boolean;
  slides: Slide[];
  active: number;
  progress: number;
  goTo: (index: number) => void;
  step: (dir: 1 | -1) => void;
};

const noop = () => {};

const Ctx = createContext<DeckCtx>({
  isDeck: false,
  slides: [],
  active: 0,
  progress: 0,
  goTo: noop,
  step: noop,
});

export const useDeck = () => useContext(Ctx);

/**
 * Marks any section carrying `data-deck-slide` as a chapter of the phone deck and
 * keeps a live index/progress value so the dock can mirror where the reader is.
 */
export const DeckProvider = ({ children }: { children: ReactNode }) => {
  const isDeck = useIsDeck();
  const reduced = usePrefersReducedMotion();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const slidesRef = useRef<Slide[]>([]);
  const frame = useRef(0);

  slidesRef.current = slides;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("deck", isDeck);
    return () => root.classList.remove("deck");
  }, [isDeck]);

  useEffect(() => {
    if (!isDeck) {
      setSlides([]);
      setActive(0);
      setProgress(0);
      return;
    }

    const collect = () => {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-deck-slide]")
      );
      if (!els.length) return false;
      setSlides((prev) =>
        prev.length === els.length && prev[0]?.el === els[0]
          ? prev
          : els.map((el) => ({ el, title: el.dataset.deckTitle || "" }))
      );
      return true;
    };

    collect();
    const poll = window.setInterval(() => {
      if (collect()) window.clearInterval(poll);
    }, 350);
    const stopPoll = window.setTimeout(() => window.clearInterval(poll), 4000);

    const measure = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 4 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);

      const line = doc.clientHeight * 0.4;
      let idx = 0;
      slidesRef.current.forEach((s, i) => {
        if (s.el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    measure();

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(stopPoll);
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDeck]);

  const goTo = useCallback(
    (index: number) => {
      const list = slidesRef.current;
      if (!list.length) return;
      const target = list[Math.min(Math.max(index, 0), list.length - 1)];
      target?.el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduced]
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      goTo(active + dir);
    },
    [active, goTo]
  );

  return (
    <Ctx.Provider value={{ isDeck, slides, active, progress, goTo, step }}>
      {children}
    </Ctx.Provider>
  );
};
