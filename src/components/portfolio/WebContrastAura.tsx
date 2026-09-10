import { ReactNode } from "react";
import { motion } from "framer-motion";

interface WebContrastAuraProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

/**
 * WebContrastAura
 * Creates a glowing contrast backdrop spotlight behind text blocks
 * whenever web lines land over them, guaranteeing 100% legibility.
 */
export const WebContrastAura = ({
  children,
  className = "",
  glowColor = "var(--acid)",
}: WebContrastAuraProps) => {
  return (
    <div className={`relative group/web-aura ${className}`}>
      {/* Web Color-Spray Backdrop Dark Contrast Veil */}
      <motion.div
        initial={{ opacity: 0.85, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -inset-4 rounded-2xl pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(12, 12, 12, 0.92) 20%, rgba(12, 12, 12, 0.6) 80%, transparent 100%)",
          boxShadow: `0 0 30px -5px ${glowColor}25`,
        }}
      >
        {/* Subtle Web Grid Texture Spray */}
        <div
          className="absolute inset-0 opacity-15 rounded-2xl"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, ${glowColor}30 0%, transparent 60%),
              linear-gradient(to right, ${glowColor}20 1px, transparent 1px),
              linear-gradient(to bottom, ${glowColor}20 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 32px 32px, 32px 32px",
          }}
        />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
