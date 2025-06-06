
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code, Globe, Terminal, BarChart3 } from 'lucide-react';

interface ServicesProps {
  services: any[];
}

const Services: React.FC<ServicesProps> = ({ services }) => {
  const serviceIcons = [Code, Globe, Terminal, BarChart3];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 px-4 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional automation and development services tailored to your specific needs. 
            From simple scripts to complex systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <Card key={index} className="glass-card scale-on-hover theme-transition group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4 text-sm">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <p className="text-primary font-semibold">{service.price_range}</p>
                    <p className="text-sm text-muted-foreground">
                      Delivery: {service.delivery_time}
                    </p>
                  </div>
                  <Button 
                    onClick={scrollToContact}
                    variant="outline" 
                    className="w-full rounded-xl border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
