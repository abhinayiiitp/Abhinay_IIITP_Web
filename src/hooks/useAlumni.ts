import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface AlumniMember {
    id: string;
    name: string;
    batch_year: string;
    current_role: string;
    bio: string;
    image_url: string;
    linkedin_url: string;
    instagram_url: string;
}

export interface AlumniAnnouncement {
    id: string;
    title: string;
    date: string;
    content: string;
    link_url: string;
}

export function useAlumni() {
    const [alumni, setAlumni] = useState<AlumniMember[]>([]);
    const [announcements, setAnnouncements] = useState<AlumniAnnouncement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAlumniData() {
            setLoading(true);
            try {
                // Fetch Members
                const { data: membersData, error: membersError } = await supabase
                    .from('alumni_members')
                    .select('*')
                    .order('order_index', { ascending: true })
                    .order('created_at', { ascending: false });

                // We won't strictly fail right now if the table doesn't exist, to prevent breaking the UI immediately before SQL is run
                if (membersError && membersError.code !== '42P01') throw membersError; 

                // Fetch Announcements
                const { data: announcementsData, error: announcementsError } = await supabase
                    .from('alumni_announcements')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (announcementsError && announcementsError.code !== '42P01') throw announcementsError;

                if (membersData) setAlumni(membersData);
                if (announcementsData) setAnnouncements(announcementsData);

            } catch (err: any) {
                console.error("Error fetching alumni data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAlumniData();
    }, []);

    return { alumni, announcements, loading, error };
}
