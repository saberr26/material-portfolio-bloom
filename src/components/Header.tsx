
import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Mail, MessageCircle, MapPin, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  switchTheme: () => void;
  personalInfo: any;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu, switchTheme, personalInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsExpanded(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    toggleMenu();
  };

  return (
    <header className={`notch-header theme-transition ${isExpanded ? 'expanded' : ''}`}>
      <div className="blur-card h-full">
        <div className="flex items-center justify-between p-4 h-full">
          {/* Compact view - just name and theme button */}
          {!isExpanded && (
            <>
              <div className="flex items-center space-x-3">
                <h1 className="text-lg font-bold gradient-text truncate">
                  {personalInfo.name.split(' ')[0]}
                </h1>
              </div>
              <Button 
                onClick={switchTheme} 
                variant="ghost" 
                size="sm"
                className="material-button bg-primary/10 hover:bg-primary/20 text-primary"
              >
                <Palette className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Expanded view - full navigation */}
          {isExpanded && (
            <>
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold gradient-text">
                  {personalInfo.name}
                </h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                  className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium"
                >
                  About
                </a>
                <a 
                  href="#services" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                  className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium"
                >
                  Services
                </a>
                <a 
                  href="#projects" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                  className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium"
                >
                  Projects
                </a>
                <a 
                  href="#reviews" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}
                  className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium"
                >
                  Reviews
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                  className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium"
                >
                  Contact
                </a>
                <Button 
                  onClick={switchTheme} 
                  variant="ghost" 
                  size="sm"
                  className="material-button bg-primary/10 hover:bg-primary/20 text-primary"
                >
                  <Palette className="h-4 w-4" />
                </Button>
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <Button 
                  onClick={switchTheme} 
                  variant="ghost" 
                  size="sm"
                  className="material-button bg-primary/10 hover:bg-primary/20 text-primary"
                >
                  <Palette className="h-4 w-4" />
                </Button>
                <Button onClick={toggleMenu} variant="ghost" size="sm">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && isExpanded && (
          <nav className="md:hidden border-t border-outline-variant/30 p-4 space-y-4">
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="block text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium py-2"
            >
              About
            </a>
            <a 
              href="#services" 
              onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              className="block text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium py-2"
            >
              Services
            </a>
            <a 
              href="#projects" 
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className="block text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium py-2"
            >
              Projects
            </a>
            <a 
              href="#reviews" 
              onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}
              className="block text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium py-2"
            >
              Reviews
            </a>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="block text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium py-2"
            >
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
