
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
    <header className="fixed top-0 left-0 right-0 z-50 glass-card m-4 theme-transition">
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
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            About
          </a>
          <a 
            href="#services" 
            onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Services
          </a>
          <a 
            href="#projects" 
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Projects
          </a>
          <a 
            href="#reviews" 
            onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Reviews
          </a>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Contact
          </a>
          <Button onClick={switchTheme} variant="ghost" size="sm">
            <Palette className="h-4 w-4" />
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Button onClick={switchTheme} variant="ghost" size="sm">
            <Palette className="h-4 w-4" />
          </Button>
          <Button onClick={toggleMenu} variant="ghost" size="sm">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border/50 p-4 space-y-4">
          <a 
            href="#about" 
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            About
          </a>
          <a 
            href="#services" 
            onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
            className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Services
          </a>
          <a 
            href="#projects" 
            onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
            className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Projects
          </a>
          <a 
            href="#reviews" 
            onClick={(e) => { e.preventDefault(); scrollToSection('reviews'); }}
            className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Reviews
          </a>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="block text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
