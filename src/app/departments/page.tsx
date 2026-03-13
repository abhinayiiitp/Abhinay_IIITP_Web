import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clapperboard, PenTool, Megaphone, Video, Paintbrush, Lightsbulb, Music } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Departments | Abhinay IIIT Pune',
  description: 'Explore the different creative departments of Abhinay, the Acting Society of IIIT Pune.',
};

const departments = [
  {
    title: 'Acting',
    icon: <Clapperboard className="w-10 h-10 text-primary mb-4" />,
    description: 'The soul of Abhinay. Our actors bring stories to life on stage and screen, mastering expressions, voice modulation, and stage presence.',
    activities: ['Stage Plays', 'Street Plays (Nukkad Natak)', 'Monologues', 'Improv Sessions']
  },
  {
    title: 'Writing & Direction',
    icon: <PenTool className="w-10 h-10 text-primary mb-4" />,
    description: 'The architects of our stories. Writers craft compelling scripts, while directors envision and execute the final performance, guiding actors to perfection.',
    activities: ['Scriptwriting', 'Screenplay', 'Directing', 'Storyboarding']
  },
  {
    title: 'Production & Management',
    icon: <Megaphone className="w-10 h-10 text-primary mb-4" />,
    description: 'The backbone of every event. This team handles logistics, scheduling, budgeting, and ensures every performance runs smoothly behind the scenes.',
    activities: ['Event Management', 'Logistics', 'Scheduling', 'Resource Allocation']
  },
  {
    title: 'Cinematography & Editing',
    icon: <Video className="w-10 h-10 text-primary mb-4" />,
    description: 'Capturing the magic. For screen productions and promotions, this department handles camera work, lighting, video editing, and post-production.',
    activities: ['Shooting', 'Video Editing', 'Color Grading', 'Visual Effects']
  },
  {
    title: 'Set & Costume Design',
    icon: <Paintbrush className="w-10 h-10 text-primary mb-4" />,
    description: 'Creating the visual world. The design team is responsible for props, stage setup, costumes, and makeup, adding realism and depth to performances.',
    activities: ['Prop Making', 'Stage Setup', 'Costume Sourcing', 'Makeup']
  },
  {
    title: 'Sound & Music',
    icon: <Music className="w-10 h-10 text-primary mb-4" />,
    description: 'Setting the mood. Sound designers handle background scores, sound effects, voiceovers, and live audio mixing during performances.',
    activities: ['Background Scoring', 'Foley', 'Live Audio Mixing', 'Voiceovers']
  }
];

export default function DepartmentsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Our <span className="text-primary">Departments</span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Abhinay operates through several specialized wings. Whether you love being in the spotlight or working behind the scenes, there is a place for your creative talents.
            </p>
          </div>
        </section>

        {/* Departments Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10 hover:border-primary/30">
                  <CardHeader>
                    {dept.icon}
                    <CardTitle className="text-2xl font-headline">{dept.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {dept.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-sm text-foreground/80 mb-3 uppercase tracking-wider">Key Activities</h4>
                    <ul className="space-y-2">
                      {dept.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2"></span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-20 text-center max-w-3xl mx-auto bg-card p-8 rounded-2xl border shadow-sm">
              <h3 className="text-2xl font-bold font-headline mb-4">How to Join a Department?</h3>
              <p className="text-muted-foreground mb-6">
                Recruitments usually happen at the beginning of the academic year. Depending on the department, you might be asked to audition, submit writing samples, or showcase past work. Keep an eye on our events and announcements!
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
