import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type SwipeDeckProps = {
  /** Each child becomes one card on the rail. */
  children: ReactNode;
  ariaLabel: string;
  /** Extend the rail to the screen edges (section already carries the gutter). */
  bleed?: boolean;
  className?: string;
  itemClassName?: string;
  /** Show the page dots underneath. */
  dots?: boolean;
  /** Lets a section react to the visible card (e.g. draw a progress path). */
  onActiveChange?: (index: number) => void;
};

/**
 * Momentum horizontal rail with native scroll snapping — no JS drag logic, so it
 * keeps the phone's own flick physics and stays at 60fps.
 */
export const SwipeDeck = ({
  children,
  ariaLabel,
  bleed = true,
  className,
  itemClassName,
  dots = true,
  onActiveChange,
}: SwipeDeckProps) => {
  const railRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const activeChange = useRef(onActiveChange);
  activeChange.current = onActiveChange;

  useEffect(() => {
    activeChange.current?.(active);
  }, [active]);


  const onScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail || !rail.clientWidth) return;
    const next = Math.round(rail.scrollLeft / rail.clientWidth);
    setActive((prev) => (prev === next ? prev : next));
  }, []);

  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    setTouched(true);
    rail.scrollBy({ left: dir * rail.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={railRef}
        role="group"
        aria-label={ariaLabel}
        onScroll={onScroll}
        className={cn("deck-swipe", bleed && "deck-swipe--bleed", className)}
      >
        {items.map((child, i) => (
          <div key={i} className={cn("deck-swipe-item", itemClassName)}>
            {child}
          </div>
        ))}
      </div>

      {dots && items.length > 1 && (
        <div className="mt-5 flex items-center gap-2 px-1">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => nudge(i > active ? 1 : -1)}
              aria-label={`Go to slide ${i + 1} of ${items.length}`}
              aria-current={i === active}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 22 : 8,
                background: i === active ? "var(--acid)" : "var(--wire-2)",
              }}
            />
          ))}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-ed">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
      )}

      {items.length > 1 && !touched && (
        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest text-acid/70">
          swipe
        </span>
      )}
    </div>
  );
};
