
import React, { useState, useEffect } from 'react';
import { Menu, X, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  switchTheme: () => void;
  personalInfo: any;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu, switchTheme, personalInfo }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      // Header starts expanded, becomes notch when scrolling
      setIsExpanded(newScrollY < 50);
    };

    handleScroll(); // Set initial state
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (isMenuOpen) toggleMenu();
  };

  return (
    <>
      <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
        isExpanded 
          ? 'w-[95%] max-w-6xl h-16 rounded-2xl' 
          : 'w-48 h-12 rounded-full'
      }`}>
        {/* Notch background with enhanced blur */}
        <div className="absolute inset-0 backdrop-blur-3xl bg-surface-container/40 border border-outline-variant/20 rounded-inherit">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary-accent/5 rounded-inherit" />
        </div>

        <div className="relative h-full flex items-center justify-between px-6">
          {/* Notch mode - minimal */}
          {!isExpanded && (
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm font-bold gradient-text truncate">
                {personalInfo.name.split(' ')[0]}
              </h1>
              <Button 
                onClick={switchTheme} 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0 bg-primary/10 hover:bg-primary/20 text-primary rounded-full"
              >
                <Palette className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Expanded mode - full navigation */}
          {isExpanded && (
            <>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary-accent flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {personalInfo.name.charAt(0)}
                  </span>
                </div>
                <h1 className="text-lg font-bold gradient-text">
                  {personalInfo.name}
                </h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                  className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer font-medium relative group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
                <a 
                  href="#services" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                  className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer font-medium relative group"
                >
                  Services
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
                <a 
                  href="#projects" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                  className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer font-medium relative group"
                >
                  Projects
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
                <a 
                  href="#reviews" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}
                  className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer font-medium relative group"
                >
                  Reviews
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                  className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer font-medium relative group"
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </nav>

              <div className="flex items-center space-x-3">
                <Button 
                  onClick={switchTheme} 
                  variant="ghost" 
                  size="sm"
                  className="h-10 w-10 p-0 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Palette className="h-4 w-4" />
                </Button>
                
                {/* Mobile Menu Button */}
                <Button 
                  onClick={toggleMenu} 
                  variant="ghost" 
                  size="sm"
                  className="md:hidden h-10 w-10 p-0 bg-surface-variant/50 hover:bg-surface-variant/70 rounded-full"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && isExpanded && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 backdrop-blur-3xl bg-surface-container/90 border border-outline-variant/30 rounded-2xl overflow-hidden">
            <nav className="p-4 space-y-3">
              {['about', 'services', 'projects', 'reviews', 'contact'].map((section) => (
                <a 
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
                  className="block text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer font-medium py-3 px-4 rounded-xl hover:bg-primary/10 capitalize"
                >
                  {section}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
