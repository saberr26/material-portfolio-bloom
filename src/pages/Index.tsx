
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import ThreeBackground from '@/components/ThreeBackground';
import { useThemeManager } from '@/hooks/useThemeManager';
import portfolioData from '@/data/portfolio.json';

// WebGL detection utility
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch {
    return false;
  }
};

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const { currentTheme, switchTheme } = useThemeManager();

  useEffect(() => {
    // Check WebGL support
    setWebglSupported(isWebGLAvailable());

    // Add intersection observer for scroll animations
    const observers = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('material-enter');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach((section) => {
      observers.observe(section);
    });

    return () => observers.disconnect();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground theme-transition">
      {/* 3D Background or Fallback */}
      <div className="fixed inset-0 -z-10">
        {webglSupported ? (
          <Canvas
            camera={{
              position: [0, 0, 1],
              fov: 100,
            }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false
            }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
              gl.setClearColor('#000000', 0);
            }}
          >
            <ThreeBackground />
          </Canvas>
        ) : (
          // CSS Fallback Background
          <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-surface-variant">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,77,255,0.1),transparent_50%)]" />
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Header 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        switchTheme={switchTheme}
        personalInfo={portfolioData.personal_info}
      />
      
      <Hero personalInfo={portfolioData.personal_info} />
      
      <section className="frosted-glass mx-4 mb-8 rounded-3xl">
        <About 
          skills={portfolioData.skills}
          valuePropositions={portfolioData.value_propositions}
        />
      </section>
      
      <section className="glass-effect mx-4 mb-8 rounded-3xl">
        <Services services={portfolioData.services} />
      </section>
      
      <section className="blur-card mx-4 mb-8 rounded-3xl">
        <Projects projects={portfolioData.projects} />
      </section>
      
      <section className="frosted-glass mx-4 mb-8 rounded-3xl">
        <Reviews reviews={portfolioData.reviews} />
      </section>
      
      <section className="glass-effect mx-4 mb-8 rounded-3xl">
        <Contact contact={portfolioData.personal_info.contact} />
      </section>
      
      <footer className="py-8 text-center text-on-surface-variant border-t border-outline-variant/30 mx-4 material-card mt-8">
        <div className="p-6">
          <p>&copy; 2025 {portfolioData.personal_info.name}. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Built with React, Three.js & Material You Design
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
