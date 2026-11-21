import type { ReactNode } from "react";
import { useIsDeck } from "@/hooks/use-deck";
import { cn } from "@/lib/utils";

/**
 * Gives a section the phone-deck chapter attributes. On desktop it returns
 * nothing at all, so the existing layout is untouched.
 */
export function useDeckChapter(title: string) {
  const isDeck = useIsDeck();

  return {
    isDeck,
    attrs: isDeck
      ? ({ "data-deck-slide": "", "data-deck-title": title } as Record<string, string>)
      : {},
    /** Vertical padding only outside deck mode — the deck owns its own rhythm. */
    flow: (node: ReactNode) => node,
    slideClass: isDeck ? "deck-slide" : "",
  };
}

/**
 * Explicit full-screen slide wrapper, for chapters that need their own element
 * (for example a section that splits into two slides on a phone).
 */
export const DeckSlide = ({
  title,
  children,
  className,
  style,
  id,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) => {
  const isDeck = useIsDeck();

  return (
    <section
      id={id}
      data-deck-slide={isDeck ? "" : undefined}
      data-deck-title={isDeck ? title : undefined}
      className={cn(className, isDeck && "deck-slide")}
      style={style}
    >
      {children}
    </section>
  );
};
