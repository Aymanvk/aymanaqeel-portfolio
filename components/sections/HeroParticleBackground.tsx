'use client';

import { useRef, useMemo, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HeroParticleBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 800;

  // Pre-compute particles
  const { positions, originalPositions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const origPos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);

    const colorAmber = new THREE.Color('#C8956C');
    const colorCream = new THREE.Color('#F5F0E6');

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;

      // 10% amber, 90% cream
      const color = Math.random() > 0.9 ? colorAmber : colorCream;
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    return { positions: pos, originalPositions: origPos, colors: cols };
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Constant drift
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;

    // Mouse repulsion
    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    const mouseX = (state.mouse.x * state.viewport.width) / 2;
    const mouseY = (state.mouse.y * state.viewport.height) / 2;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];

      const px = positionsArray[idx];
      const py = positionsArray[idx + 1];
      
      const dx = px - mouseX;
      const dy = py - mouseY;
      const distSq = dx * dx + dy * dy;
      
      const repulsionWorldRadius = 4.0;
      
      if (distSq < repulsionWorldRadius * repulsionWorldRadius) {
        const dist = Math.sqrt(distSq);
        const force = (repulsionWorldRadius - dist) / repulsionWorldRadius;
        positionsArray[idx] += (dx / dist) * force * 0.1;
        positionsArray[idx + 1] += (dy / dist) * force * 0.1;
      } else {
        positionsArray[idx] += (ox - px) * 0.05;
        positionsArray[idx + 1] += (oy - py) * 0.05;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </Points>
  );
}

const Points = forwardRef(({ positions, colors, children, ...props }: any, ref: any) => {
  return (
    <points ref={ref} {...props}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      {children}
    </points>
  );
});
