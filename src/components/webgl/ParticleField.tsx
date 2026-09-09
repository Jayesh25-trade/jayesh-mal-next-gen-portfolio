import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  scrollProgress: { current: number };
  count?: number;
}

export const ParticleField = ({ scrollProgress, count = 2000 }: ParticleFieldProps) => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Galaxy-like distribution
      const radius = Math.random() * 12 + 1;
      const spinAngle = radius * 0.8;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;
      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)) * 0.5;
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)) * 0.5;
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)) * 0.5;

      positions[i * 3]     = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i * 3 + 1] = randomY * 1.5;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color gradient from cyan to purple to pink
      const t = i / count;
      if (t < 0.33) {
        colors[i * 3] = 0.0; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 1.0;  // cyan
      } else if (t < 0.66) {
        colors[i * 3] = 0.5; colors[i * 3 + 1] = 0.2; colors[i * 3 + 2] = 0.95; // purple
      } else {
        colors[i * 3] = 0.9; colors[i * 3 + 1] = 0.1; colors[i * 3 + 2] = 0.7;  // pink
      }
    }
    return { positions, colors };
  }, [count]);

  const vertexShader = `
    attribute vec3 color;
    varying vec3 vColor;
    uniform float uTime;
    uniform float uScroll;
    
    void main() {
      vColor = color;
      vec3 pos = position;
      
      // Subtle wave based on time
      pos.y += sin(pos.x * 0.5 + uTime * 0.3) * 0.15;
      pos.x += cos(pos.z * 0.4 + uTime * 0.2) * 0.1;
      
      // Scroll-driven expansion
      float expand = 1.0 + uScroll * 0.4;
      pos.xz *= expand;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (1.8 / -mvPosition.z) * 120.0;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float strength = 1.0 - (dist * 2.0);
      strength = pow(strength, 3.0);
      gl_FragColor = vec4(vColor, strength * 0.85);
    }
  `;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
  }), []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.025 + scrollProgress.current * Math.PI * 0.5;
      meshRef.current.rotation.x = scrollProgress.current * 0.3;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uScroll.value = scrollProgress.current;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
};
