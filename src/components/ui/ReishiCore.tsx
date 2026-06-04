"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ReishiParticles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const ref = useRef<THREE.Points>(null);
  
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      const mouseX = mousePosition.x * 5;
      const mouseY = -mousePosition.y * 5;
      
      const dx = mouseX - x;
      const dy = mouseY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 3) {
        positions[i3] += dx * 0.05;
        positions[i3 + 1] += dy * 0.05;
      }
      
      positions[i3 + 1] += Math.sin(time + x) * 0.002;
      positions[i3] += Math.cos(time + y) * 0.002;
      positions[i3 + 2] = Math.sin(time * 0.5 + i * 0.1) * 2;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.z = time * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FF3E00"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function ReishiCore() {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePosition.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  };

  return (
    <div 
      className="absolute inset-0 z-0"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ReishiParticles mousePosition={mousePosition.current} />
      </Canvas>
    </div>
  );
}
