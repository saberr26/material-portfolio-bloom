
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Mail } from 'lucide-react';

interface HeroProps {
  personalInfo: any;
}

const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        <div className="slide-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
            {personalInfo.name}
          </h1>
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-4">
            {personalInfo.title}
          </h2>
        </div>
        
        <div className="slide-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {personalInfo.tagline}
          </p>
        </div>
        
        <div className="slide-up flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: '0.8s' }}>
          <Button 
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-2xl scale-on-hover"
          >
            <Mail className="mr-2 h-5 w-5" />
            Get In Touch
          </Button>
          
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg rounded-2xl scale-on-hover"
            asChild
          >
            <a href={`https://${personalInfo.contact.github}`} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View Projects
            </a>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 floating-animation">
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
