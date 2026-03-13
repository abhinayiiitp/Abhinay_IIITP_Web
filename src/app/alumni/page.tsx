"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Instagram, Calendar, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { useAlumni, AlumniMember } from '@/hooks/useAlumni';
import { format } from 'date-fns';

const AlumniProfile = ({ member }: { member: AlumniMember }) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-primary/10">
      <div className="aspect-[4/5] relative w-full bg-muted">
        {member.image_url ? (
          <Image
            src={member.image_url}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-primary/5 text-muted-foreground">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-left">
          <h3 className="font-headline text-2xl font-bold">{member.name}</h3>
          <p className="text-primary font-medium mb-1">Batch of {member.batch_year}</p>
          <p className="text-sm text-gray-300 line-clamp-2">{member.current_role}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 min-h-[60px]">
          {member.bio || "No biography provided."}
        </p>
        <div className="flex gap-3">
          {member.linkedin_url && (
            <Link href={member.linkedin_url} target="_blank" className="text-muted-foreground hover:text-[#0A66C2] transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
          )}
          {member.instagram_url && (
            <Link href={member.instagram_url} target="_blank" className="text-muted-foreground hover:text-[#E1306C] transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function AlumniPage() {
  const { alumni, announcements, loading, error } = useAlumni();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">

        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Connect with the Legacy
            </div>
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Abhinay <span className="text-primary">Alumni Core</span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Once an artist, always an artist. This space is dedicated to our seniors and pass-outs who have shaped the legacy of Abhinay. Stay connected, join our annual meets, and see where our alumni are today.
            </p>
          </div>
        </section>

        {loading ? (
           <div className="flex justify-center p-24">
             <Loader2 className="w-10 h-10 animate-spin text-primary" />
           </div>
        ) : error && error.includes('42P01') ? (
            <div className="container mx-auto py-24 text-center">
                 <h2 className="text-2xl font-bold mb-4">Database Not Configured</h2>
                 <p className="text-muted-foreground">The Alumni page database tables haven't been created yet. Please run the provided SQL script in your Supabase dashboard.</p>
            </div>
        ) : (
          <>
            {/* Announcements Section */}
            {announcements && announcements.length > 0 && (
              <section className="py-12 border-b">
                <div className="container mx-auto px-4 md:px-6">
                  <div className="flex items-center gap-3 mb-8">
                    <Calendar className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-headline font-bold">Alumni Meets & Announcements</h2>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {announcements.map((announcement) => (
                      <Card key={announcement.id} className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-3">
                          <CardDescription className="font-medium text-primary">
                             {format(new Date(announcement.date), 'MMMM d, yyyy')}
                          </CardDescription>
                          <CardTitle className="text-xl">{announcement.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{announcement.content}</p>
                          {announcement.link_url && (
                             <Button variant="link" className="p-0 h-auto font-medium" asChild>
                               <Link href={announcement.link_url} target="_blank">View Details <ArrowRight className="ml-1 w-4 h-4" /></Link>
                             </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Alumni Grid */}
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl mb-4">Meet Our Alumni</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    A directory of our past members. Reach out, network, and see how the skills learned on stage translate to the real world.
                  </p>
                </div>
                
                {alumni && alumni.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {alumni.map((member) => (
                      <AlumniProfile key={member.id} member={member} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground border rounded-lg bg-card/50">
                    No alumni profiles have been added yet. check back later!
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
