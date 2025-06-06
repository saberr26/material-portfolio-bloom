
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
  theme: string;
}

function Particles({ count, theme }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return [positions, colors];
  }, [count]);

  useEffect(() => {
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color();
      
      switch (theme) {
        case 'material-theme-1':
          color.setHSL(0.73, 0.7, 0.5 + Math.random() * 0.3);
          break;
        case 'material-theme-2':
          color.setHSL(0.55, 0.89, 0.48 + Math.random() * 0.2);
          break;
        case 'material-theme-3':
          color.setHSL(0.39, 0.71, 0.45 + Math.random() * 0.2);
          break;
        case 'material-theme-4':
          color.setHSL(0.95, 0.75, 0.55 + Math.random() * 0.2);
          break;
        default:
          color.setHSL(0.73, 0.7, 0.5 + Math.random() * 0.3);
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    if (mesh.current) {
      mesh.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, [theme, count]);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x -= delta / 10;
      mesh.current.rotation.y -= delta / 15;
    }
  });

  return (
    <mesh rotation={[0, 0, Math.PI / 4]}>
      <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={2}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </mesh>
  );
}

interface ThreeBackgroundProps {
  theme: string;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ theme }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{
          position: [0, 0, 1],
          fov: 100,
        }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <mesh>
          <boxGeometry args={[100, 100, 100]} />
          <meshBasicMaterial color="#0a0a0f" />
        </mesh>
        <Particles count={1000} theme={theme} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
