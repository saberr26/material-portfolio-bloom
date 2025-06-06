
import React, { useState, useEffect } from 'react';
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

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme, switchTheme } = useThemeManager();

  useEffect(() => {
    // Add intersection observer for scroll animations
    const observers = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });

    // Observe all sections
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
      <ThreeBackground theme={currentTheme} />
      
      <Header 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        switchTheme={switchTheme}
        personalInfo={portfolioData.personal_info}
      />
      
      <Hero personalInfo={portfolioData.personal_info} />
      
      <About 
        skills={portfolioData.skills}
        valuePropositions={portfolioData.value_propositions}
      />
      
      <Services services={portfolioData.services} />
      
      <Projects projects={portfolioData.projects} />
      
      <Reviews reviews={portfolioData.reviews} />
      
      <Contact contact={portfolioData.personal_info.contact} />
      
      <footer className="py-8 text-center text-muted-foreground border-t border-border/50">
        <p>&copy; 2025 {portfolioData.personal_info.name}. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Built with React, Three.js & Material You Design
        </p>
      </footer>
    </div>
  );
};

export default Index;
