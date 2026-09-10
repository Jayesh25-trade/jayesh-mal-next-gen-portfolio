import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface LiquidMeshProps {
  scrollProgress: { current: number };
  mousePos: { current: [number, number] };
}

export const LiquidMesh = ({ scrollProgress, mousePos }: LiquidMeshProps) => {
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
      pos.z += wave * 0.6;
      pos.z += sin(pos.x * 2.0 + uTime * 0.8) * 0.15;
      pos.z += cos(pos.y * 2.0 + uTime * 0.6) * 0.15;

      // Scroll wave displacement
      pos.z += sin(pos.y * 3.0 + uScroll * 10.0) * 0.25;

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
      // Base iridescent gradient: Cyan -> Purple -> Acid Green -> Pink
      vec3 colorCyan = vec3(0.0, 0.9, 1.0);
      vec3 colorPurple = vec3(0.66, 0.33, 0.98);
      vec3 colorAcid = vec3(0.87, 1.0, 0.0);
      vec3 colorPink = vec3(0.95, 0.2, 0.65);

      float t = vPosition.z * 1.2 + sin(uTime * 0.5) * 0.5 + uScroll * 0.8;
      
      vec3 color = mix(colorCyan, colorPurple, clamp(t + 0.5, 0.0, 1.0));
      color = mix(color, colorAcid, clamp(sin(t * 2.0 + uTime * 0.3) * 0.5 + 0.5, 0.0, 1.0));
      color = mix(color, colorPink, clamp(cos(t * 1.5) * 0.3 + 0.3, 0.0, 1.0));

      // Cursor light specular highlight
      float cursorDist = distance(vUv, (uMouse + 1.0) * 0.5);
      float cursorGlow = exp(-cursorDist * 4.0) * 0.8;
      color += vec3(cursorGlow);

      // Liquid crystal grid wireframe outline
      float gridX = abs(sin(vUv.x * 60.0));
      float gridY = abs(sin(vUv.y * 60.0));
      float grid = smoothstep(0.96, 1.0, max(gridX, gridY)) * 0.15;

      float alpha = clamp(0.22 + abs(vPosition.z) * 0.2 + grid + cursorGlow * 0.35, 0.08, 0.65);

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
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[20, 14, 64, 64]} />
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
