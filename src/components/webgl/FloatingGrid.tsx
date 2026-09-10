import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingGridProps {
  scrollProgress: { current: number };
}

export const FloatingGrid = ({ scrollProgress }: FloatingGridProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uScroll;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Distortion wave
      float wave = sin(pos.x * 0.3 + uTime * 0.4) * cos(pos.y * 0.3 + uTime * 0.3) * 0.6;
      pos.z += wave * (1.0 + uScroll * 0.5);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uScroll;
    
    void main() {
      // Grid lines
      vec2 grid = abs(fract(vUv * 20.0 - 0.5) - 0.5) / fwidth(vUv * 20.0);
      float line = min(grid.x, grid.y);
      float gridMask = 1.0 - min(line, 1.0);
      
      // Color shift with scroll
      vec3 cyan   = vec3(0.0, 0.9, 1.0);
      vec3 purple = vec3(0.5, 0.2, 0.95);
      vec3 pink   = vec3(0.9, 0.1, 0.7);
      
      float t = uScroll;
      vec3 color = mix(mix(cyan, purple, t), pink, max(0.0, t - 0.5) * 2.0);
      
      // Fade from center + edge vignette
      float dist = length(vUv - 0.5) * 2.0;
      float alpha = gridMask * (1.0 - smoothstep(0.4, 1.2, dist)) * 0.55;
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
  }), []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI * 0.35 + scrollProgress.current * 0.2;
      meshRef.current.position.y = -1.5 + scrollProgress.current * -3.5;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uScroll.value = scrollProgress.current;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.35, 0, 0]} position={[0, -1.5, -2]}>
      <planeGeometry args={[30, 30, 40, 40]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};
