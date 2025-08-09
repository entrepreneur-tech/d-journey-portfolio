import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HeroScene } from './scenes/HeroScene';
import { AboutScene } from './scenes/AboutScene';
import { SkillsScene } from './scenes/SkillsScene';
import { ProjectsScene } from './scenes/ProjectsScene';
import { ContactScene } from './scenes/ContactScene';
import { Navigation } from './Navigation';
import { LoadingScreen } from './LoadingScreen';

const sections = [
  { id: 'hero', label: 'Home', component: HeroScene },
  { id: 'about', label: 'About', component: AboutScene },
  { id: 'skills', label: 'Skills', component: SkillsScene },
  { id: 'projects', label: 'Projects', component: ProjectsScene },
  { id: 'contact', label: 'Contact', component: ContactScene },
];

export const Portfolio3D = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const CurrentScene = sections[currentSection].component;

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
  };

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full"
      >
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 5], fov: 75 }}
          onWheel={handleScroll}
          className="w-full h-full"
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <CurrentScene />
          </Suspense>
        </Canvas>

        <Navigation
          sections={sections}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />
      </motion.div>
    </div>
  );
};