
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Event } from '@/components/event-card';

// Extended Event interface to match Supabase schema if needed, but for now we follow the component's interface
// We might need to map snake_case from DB to camelCase for the component

// Simple in-memory cache
let eventCache: { data: Event[], timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useEvents() {
    const [events, setEvents] = useState<Event[]>(eventCache ? eventCache.data : []);
    const [loading, setLoading] = useState(!eventCache); // If we have cache, we are not "loading" initially
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            // If cache is fresh, we don't need to fetch
            if (eventCache && (Date.now() - eventCache.timestamp < CACHE_DURATION)) {
                setLoading(false);
                return;
            }

            try {
                // If we don't have cache, show loading
                if (!eventCache) setLoading(true);

                // Hardcoded Abhinay Events (bypassing DB for immediate display)
                const hardcodedEvents: Event[] = [
                    {
                        id: '1',
                        title: 'Mood Indigo Golden Ticket - Street Play',
                        date: 'Sunday, October 5, 2025',
                        month: 'OCT',
                        day: '05',
                        time: '09:00 AM',
                        location: 'MIT-WPU, Pune',
                        image: '/images/events/1MoodIPrelims2025.png',
                        description: JSON.stringify([{ heading: "Overview", content: "Abhinay proudly emerged as one of the only two teams selected from among the top 12 participating teams across Pune in the Street Play Competition held at MIT-WPU. With a powerful performance and compelling storytelling, the team secured a Golden Ticket for Mood Indigo, marking a significant achievement and showcasing Abhinay's theatrical excellence on a competitive stage." }]),
                        isFeatured: true,
                        status: 'past'
                    },
                    {
                        id: '2',
                        title: 'First Prize - Street Play',
                        date: 'Sunday, January 25, 2026',
                        month: 'JAN',
                        day: '25',
                        time: '10:00 AM',
                        location: 'VIT PUNE',
                        image: '/images/events/2DASTAAN-E-NUKKAD.png',
                        description: JSON.stringify([{ heading: "Overview", content: "Abhinay secured first prize in Street Play." }]),
                        isFeatured: false,
                        status: 'past'
                    },
                    {
                        id: '3',
                        title: 'Anti-drug & Lymphatic Filariasis Stage Play',
                        date: 'Thursday, February 12, 2026',
                        month: 'FEB',
                        day: '12',
                        time: '05:00 PM',
                        location: 'IIIT PUNE',
                        image: '/images/events/3Anti-drug_stage_play.png',
                        description: JSON.stringify([{ heading: "Overview", content: "Abhinay performed a stage play on Anti-drug and Lymphatic filariasis." }]),
                        isFeatured: false,
                        status: 'past'
                    },
                    {
                        id: '4',
                        title: 'Shivaji Jayanti Stage Play',
                        date: 'Thursday, February 19, 2026',
                        month: 'FEB',
                        day: '19',
                        time: '06:00 PM',
                        location: 'IIIT PUNE',
                        image: '/images/events/4SHIVAJI_JAYANTI.png',
                        description: JSON.stringify([{ heading: "Overview", content: "Stage play by Abhinay on the occasion of Shivaji Jayanti." }]),
                        isFeatured: false,
                        status: 'past'
                    },
                    {
                        id: '5',
                        title: 'Second Prize - Street Play',
                        date: 'Tuesday, February 24, 2026',
                        month: 'FEB',
                        day: '24',
                        time: '11:00 AM',
                        location: 'MIT WPU, Kothrud, Pune',
                        image: '/images/events/5DASTAK_WPU.png',
                        description: JSON.stringify([{ heading: "Overview", content: "Abhinay secured second prize in Street Play." }]),
                        isFeatured: false,
                        status: 'past'
                    }
                ];

                // Note: Fetching from Supabase is temporarily commented out to ensure 
                // the hardcoded events show immediately without needing DB admin access.
                /*
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data && data.length > 0) { ... map data ... }
                */

                // Sort by date visually 
                const sortedEvents = hardcodedEvents.sort((a, b) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });

                setEvents(sortedEvents);

                // Update Cache
                eventCache = {
                    data: sortedEvents,
                    timestamp: Date.now()
                };
                
            } catch (err: any) {
                console.error('Error fetching events:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    return { events, loading, error };
}
