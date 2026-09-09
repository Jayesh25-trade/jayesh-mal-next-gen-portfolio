import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigProps {
  scrollProgress: { current: number };
}

// Camera path waypoints for 6 scroll stages
const PATH = [
  { pos: new THREE.Vector3(0, 0, 8),   lookAt: new THREE.Vector3(0, 0, 0) },   // Hero
  { pos: new THREE.Vector3(2, -1, 7),  lookAt: new THREE.Vector3(0, -0.5, 0) }, // Stats
  { pos: new THREE.Vector3(-2, -1, 6), lookAt: new THREE.Vector3(0, -1, 0) },   // About
  { pos: new THREE.Vector3(1, -2, 7),  lookAt: new THREE.Vector3(0, -1.5, 0) }, // Featured
  { pos: new THREE.Vector3(-1, -3, 8), lookAt: new THREE.Vector3(0, -2, 0) },   // Work
  { pos: new THREE.Vector3(0, -4, 6),  lookAt: new THREE.Vector3(0, -3, 0) },   // Contact
];

export const CameraRig = ({ scrollProgress }: CameraRigProps) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const t = scrollProgress.current;
    const totalSegments = PATH.length - 1;
    const segIdx = Math.min(Math.floor(t * totalSegments), totalSegments - 1);
    const segT = (t * totalSegments) - segIdx;

    const from = PATH[segIdx];
    const to   = PATH[Math.min(segIdx + 1, totalSegments)];

    targetPos.current.lerpVectors(from.pos, to.pos, segT);
    targetLookAt.current.lerpVectors(from.lookAt, to.lookAt, segT);

    // Smooth damped camera follow
    camera.position.lerp(targetPos.current, 0.05);
    const currentLook = new THREE.Vector3();
    currentLook.lerpVectors(
      camera.position.clone().add(new THREE.Vector3(0, 0, -1)),
      targetLookAt.current,
      0.05
    );
    camera.lookAt(targetLookAt.current.clone().lerp(
      camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(5).add(camera.position),
      0.95
    ));
  });

  return null;
};
