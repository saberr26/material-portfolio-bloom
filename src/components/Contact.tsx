
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Github, MapPin, Clock } from 'lucide-react';

interface ContactProps {
  contact: any;
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to automate your workflow or need a custom solution? 
            Let's discuss your project requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-6 w-6 mr-3 text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For project inquiries and collaboration opportunities
              </p>
              <Button asChild className="w-full rounded-xl">
                <a href={`mailto:${contact.email}`}>
                  Send Email
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-6 w-6 mr-3 text-primary" />
                Discord
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Quick questions and real-time communication
              </p>
              <p className="text-primary font-mono mb-4">{contact.discord}</p>
              <Button variant="outline" className="w-full rounded-xl">
                Copy Discord Tag
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="h-6 w-6 mr-3 text-primary" />
                GitHub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View my code samples and open-source contributions
              </p>
              <Button asChild variant="outline" className="w-full rounded-xl">
                <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer">
                  View GitHub Profile
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-primary" />
                Location & Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {contact.location}
                </p>
                <p className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  CET (GMT+1) • Response within 2-4 hours
                </p>
                <div className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></div>
                <span className="text-green-500 font-medium">Available for new projects</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
