
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Terminal, Zap } from 'lucide-react';

interface AboutProps {
  skills: any;
  valuePropositions: string[];
}

const About: React.FC<AboutProps> = ({ skills, valuePropositions }) => {
  const skillIcons = {
    'Programming': Code,
    'Linux & Systems': Terminal,
    'Automation & Tools': Zap
  };

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specialized in Python automation and Linux systems with a passion for creating efficient, 
            reliable solutions that save time and reduce complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {Object.values(skills).map((skill: any, index) => {
            const Icon = skillIcons[skill.category as keyof typeof skillIcons];
            return (
              <Card key={index} className="glass-card scale-on-hover theme-transition">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Icon className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-semibold">{skill.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {skill.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="glass-card">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-6 text-center">Why Choose Me</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {valuePropositions.map((proposition, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{proposition}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
