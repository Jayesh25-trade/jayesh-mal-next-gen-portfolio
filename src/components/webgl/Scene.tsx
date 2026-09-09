import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { FloatingGrid } from "./FloatingGrid";
import { CameraRig } from "./CameraRig";

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

export const Scene = () => {
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (isMobile()) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isMobile()) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ isolation: "isolate" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CameraRig scrollProgress={scrollProgress} />
          <ParticleField scrollProgress={scrollProgress} count={1800} />
          <FloatingGrid scrollProgress={scrollProgress} />
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#00e5ff" />
          <pointLight position={[-5, -3, 3]} intensity={0.3} color="#a855f7" />
        </Suspense>
      </Canvas>
    </div>
  );
};
