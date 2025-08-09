import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Stars, OrbitControls } from '@react-three/drei';

import * as THREE from 'three';

export const HeroScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Background stars */}
      <Stars radius={300} depth={60} count={1000} factor={7} />
      
      {/* Main content group */}
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          {/* Main title */}
          <Text
            fontSize={2}
            position={[0, 1, 0]}
            color="#a855f7"
            anchorX="center"
            anchorY="middle"
          >
            ALEX PORTFOLIO
          </Text>
          
          {/* Subtitle */}
          <Text
            fontSize={0.5}
            position={[0, 0, 0]}
            color="#06b6d4"
            anchorX="center"
            anchorY="middle"
          >
            Full Stack Developer & 3D Enthusiast
          </Text>
          
          {/* Call to action */}
          <Text
            fontSize={0.3}
            position={[0, -1, 0]}
            color="#fbbf24"
            anchorX="center"
            anchorY="middle"
          >
            Scroll to explore • Click navigation to jump
          </Text>
        </Float>
        
        {/* Floating geometric elements */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[-3, 0, -2]}>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial color="#a855f7" wireframe />
          </mesh>
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <mesh position={[3, 0, -2]}>
            <icosahedronGeometry args={[0.3]} />
            <meshStandardMaterial color="#06b6d4" />
          </mesh>
        </Float>
        
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={[0, 2, -3]}>
            <torusGeometry args={[0.4, 0.1, 16, 32]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
        </Float>
      </group>
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};