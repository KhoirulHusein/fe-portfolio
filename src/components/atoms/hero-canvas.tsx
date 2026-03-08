"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";

const PARTICLE_COUNT = 160;

type ParticlesProps = {
  mouse: React.RefObject<{ x: number; y: number }>;
  color: string;
};

function Particles({ mouse, color }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);
  const { size, camera } = useThree();

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      speeds[i] = 0.004 + Math.random() * 0.008;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, []);

  // Sync color to Three.js material when theme changes
  useEffect(() => {
    if (ref.current) {
      (ref.current.material as THREE.PointsMaterial).color.set(color);
    }
  }, [color]);

  useFrame((state) => {
    if (!ref.current) return;

    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    const mx = (mouse.current.x / size.width - 0.5) * 2;
    const my = -(mouse.current.y / size.height - 0.5) * 2;

    const aspect = size.width / size.height;
    const fovRad = ((camera as THREE.PerspectiveCamera).fov * Math.PI) / 180;
    const dist = (camera as THREE.PerspectiveCamera).position.z;
    const wHalf = Math.tan(fovRad / 2) * dist;
    const hHalf = wHalf / aspect;

    const worldMx = mx * wHalf;
    const worldMy = my * hHalf;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 1] += speeds[i];
      pos[i * 3 + 0] += Math.sin(t * 0.4 + phases[i]) * 0.003;

      const dx = pos[i * 3 + 0] - worldMx;
      const dy = pos[i * 3 + 1] - worldMy;
      const dist2 = dx * dx + dy * dy;
      const repulseRadius = 2.5;
      if (dist2 < repulseRadius * repulseRadius && dist2 > 0.001) {
        const force = (1 - Math.sqrt(dist2) / repulseRadius) * 0.04;
        pos[i * 3 + 0] += (dx / Math.sqrt(dist2)) * force;
        pos[i * 3 + 1] += (dy / Math.sqrt(dist2)) * force;
      }

      if (pos[i * 3 + 1] > 7) {
        pos[i * 3 + 1] = -7;
        pos[i * 3 + 0] = (Math.random() - 0.5) * 22;
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = Math.sin(t * 0.05) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={color}
        opacity={0.5}
        transparent
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function HeroCanvas() {
  const mouse = useRef({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();

  // dark: warm white particles; light: warm black particles
  const particleColor = resolvedTheme === "dark" ? "#F5F4F0" : "#0C0C0B";

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Particles mouse={mouse} color={particleColor} />
      </Canvas>
    </div>
  );
}
