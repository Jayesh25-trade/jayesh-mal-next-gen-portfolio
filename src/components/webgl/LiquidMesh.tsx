import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface LiquidMeshProps {
  scrollProgress: { current: number };
  mousePos: { current: [number, number] };
  mobile?: boolean;
}

export const LiquidMesh = ({ scrollProgress, mousePos, mobile = false }: LiquidMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
  }), [viewport]);

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uMouse;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Distance from cursor in world coords
      float dist = distance(pos.xy, uMouse * 5.0);
      float wave = sin(dist * 3.0 - uTime * 2.5) * exp(-dist * 0.4);

      // Ripple displacement
      pos.z += wave * 0.8;
      pos.z += sin(pos.x * 1.8 + uTime * 1.0) * 0.25;
      pos.z += cos(pos.y * 1.8 + uTime * 0.8) * 0.25;

      // Scroll wave displacement
      pos.z += sin(pos.y * 2.5 + uScroll * 8.0) * 0.35;

      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uScroll;
    uniform vec2 uMouse;

    void main() {
      // Iridescent vibrant palette: Cyan -> Magenta -> Acid Green -> Neon Purple
      vec3 colorCyan   = vec3(0.0, 0.95, 1.0);
      vec3 colorPurple = vec3(0.70, 0.25, 1.0);
      vec3 colorAcid   = vec3(0.85, 1.0, 0.0);
      vec3 colorPink   = vec3(1.0, 0.2, 0.6);

      float t = vPosition.z * 1.5 + sin(uTime * 0.6) * 0.5 + uScroll * 1.0;
      
      vec3 color = mix(colorCyan, colorPurple, clamp(t + 0.5, 0.0, 1.0));
      color = mix(color, colorAcid, clamp(sin(t * 2.2 + uTime * 0.4) * 0.5 + 0.5, 0.0, 1.0));
      color = mix(color, colorPink, clamp(cos(t * 1.8) * 0.4 + 0.4, 0.0, 1.0));

      // Cursor light specular highlight
      float cursorDist = distance(vUv, (uMouse + 1.0) * 0.5);
      float cursorGlow = exp(-cursorDist * 3.5) * 1.0;
      color += vec3(cursorGlow * 0.6);

      // Liquid crystal grid wireframe outline (more prominent wavy mesh)
      float gridX = abs(sin(vUv.x * 48.0));
      float gridY = abs(sin(vUv.y * 48.0));
      float gridLine = smoothstep(0.92, 1.0, max(gridX, gridY)) * 0.45;

      float alpha = clamp(0.35 + abs(vPosition.z) * 0.25 + gridLine + cursorGlow * 0.4, 0.15, 0.85);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uScroll.value = scrollProgress.current;
      materialRef.current.uniforms.uMouse.value.set(mousePos.current[0], mousePos.current[1]);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1.2]}>
      <planeGeometry args={[26, 18, mobile ? 32 : 64, mobile ? 32 : 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
