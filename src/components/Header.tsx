
import React from 'react';
import { Menu, X, Github, Mail, MessageCircle, MapPin, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  switchTheme: () => void;
  personalInfo: any;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu, switchTheme, personalInfo }) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    toggleMenu();
  };

  return (
    <header className="sticky top-4 z-50 mx-4 mb-8 theme-transition">
      <div className="material-card-elevated">
        <div className="flex items-center justify-between p-4">
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
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
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
