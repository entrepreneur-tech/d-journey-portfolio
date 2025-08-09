import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: 'React', color: '#61dafb', position: [2, 1, 0] as const },
  { name: 'TypeScript', color: '#3178c6', position: [-2, 1, 0] as const },
  { name: 'Node.js', color: '#339933', position: [0, 2, -1] as const },
  { name: 'Three.js', color: '#ffffff', position: [3, -1, 0] as const },
  { name: 'Python', color: '#3776ab', position: [-3, -1, 0] as const },
  { name: 'MongoDB', color: '#47a248', position: [0, -2, -1] as const },
  { name: 'PostgreSQL', color: '#336791', position: [1, 0, 1] as const },
  { name: 'Docker', color: '#2496ed', position: [-1, 0, 1] as const },
];

export const SkillsScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      
      <group ref={groupRef}>
        {/* Title */}
        <Text
          fontSize={1.2}
          position={[0, 3, 0]}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
        >
          Skills & Technologies
        </Text>
        
        {/* Orbiting skills */}
        <group ref={orbitRef}>
          {skills.map((skill, index) => (
            <Float
              key={skill.name}
              speed={1 + index * 0.1}
              rotationIntensity={0.2}
              floatIntensity={0.3}
            >
              <group position={skill.position}>
                {/* Skill icon/sphere */}
                <mesh>
                  <sphereGeometry args={[0.3]} />
                  <meshStandardMaterial 
                    color={skill.color} 
                    emissive={skill.color}
                    emissiveIntensity={0.2}
                  />
                </mesh>
                
                {/* Skill label */}
                <Html
                  position={[0, -0.8, 0]}
                  center
                  distanceFactor={6}
                  transform
                  sprite
                >
                  <div className="bg-card/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-border">
                    <span className="text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                  </div>
                </Html>
              </group>
            </Float>
          ))}
        </group>
        
        {/* Central core */}
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <mesh>
            <icosahedronGeometry args={[0.5]} />
            <meshStandardMaterial 
              color="#a855f7" 
              wireframe 
              transparent 
              opacity={0.8}
            />
          </mesh>
        </Float>
        
        {/* Connecting rings */}
        <group>
          {[1, 1.5, 2].map((radius, index) => (
            <mesh key={index} rotation={[Math.PI / 4, 0, index * Math.PI / 3]}>
              <torusGeometry args={[radius, 0.02, 8, 32]} />
              <meshStandardMaterial 
                color="#06b6d4" 
                transparent 
                opacity={0.3}
              />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
};