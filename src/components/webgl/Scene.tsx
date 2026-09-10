import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { FloatingGrid } from "./FloatingGrid";
import { CameraRig } from "./CameraRig";
import { LiquidMesh } from "./LiquidMesh";

export const Scene = () => {
  const scrollProgress = useRef(0);
  const mousePos = useRef<[number, number]>([0, 0]);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setMobile(window.innerWidth < 768);
    };
    checkMobile();

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mousePos.current = [
          (touch.clientX / window.innerWidth) * 2 - 1,
          -(touch.clientY / window.innerHeight) * 2 + 1,
        ];
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", checkMobile, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ isolation: "isolate" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={mobile ? [1, 1] : [1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CameraRig scrollProgress={scrollProgress} />
          <LiquidMesh scrollProgress={scrollProgress} mousePos={mousePos} />
          <ParticleField scrollProgress={scrollProgress} count={mobile ? 600 : 1600} />
          <FloatingGrid scrollProgress={scrollProgress} />
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#00e5ff" />
          <pointLight position={[-5, -3, 3]} intensity={0.4} color="#a855f7" />
        </Suspense>
      </Canvas>
    </div>
  );
};
