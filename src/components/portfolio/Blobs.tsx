export const Blobs = () => (
  <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="blob animate-blob bg-neon-purple/30 w-[420px] h-[420px] -top-20 -left-20" />
    <div className="blob animate-blob bg-neon-cyan/25 w-[480px] h-[480px] top-1/3 -right-32" style={{ animationDelay: "-6s" }} />
    <div className="blob animate-blob bg-neon-pink/20 w-[420px] h-[420px] bottom-0 left-1/4" style={{ animationDelay: "-12s" }} />
  </div>
);
