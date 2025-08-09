import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const ContactScene = () => {
  const consoleRef = useRef<THREE.Group>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useFrame((state) => {
    if (consoleRef.current) {
      consoleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      <group ref={consoleRef}>
        {/* Title */}
        <Text
          fontSize={1.2}
          position={[0, 2.5, 0]}
          color="#a855f7"
          anchorX="center"
          anchorY="middle"
        >
          Get In Touch
        </Text>
        
        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
          {/* Console background */}
          <mesh position={[0, 0, -0.2]}>
            <planeGeometry args={[6, 4]} />
            <meshStandardMaterial 
              color="#1e1b4b" 
              transparent 
              opacity={0.1}
            />
          </mesh>
          
          {/* Contact form */}
          <Html
            position={[0, 0, 0]}
            center
            distanceFactor={4}
            transform
            sprite
          >
            <div className="floating-card p-6 max-w-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg 
                             text-foreground placeholder-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg 
                             text-foreground placeholder-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg 
                             text-foreground placeholder-muted-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Your message..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="cosmic-button w-full py-3 rounded-lg font-medium"
                >
                  Send Message
                </button>
              </form>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Or connect with me on:
                </p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="#" 
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="#" 
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    GitHub
                  </a>
                  <a 
                    href="#" 
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </Html>
        </Float>
        
        {/* Floating communication icons */}
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh position={[-3, 1, -1]}>
            <octahedronGeometry args={[0.3]} />
            <meshStandardMaterial color="#06b6d4" />
          </mesh>
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={[3, -1, -1]}>
            <tetrahedronGeometry args={[0.4]} />
            <meshStandardMaterial color="#fbbf24" wireframe />
          </mesh>
        </Float>
        
        <Float speed={1} rotationIntensity={0.4} floatIntensity={0.2}>
          <mesh position={[0, -2.5, -2]}>
            <torusKnotGeometry args={[0.5, 0.1, 64, 8]} />
            <meshStandardMaterial color="#a855f7" />
          </mesh>
        </Float>
      </group>
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};