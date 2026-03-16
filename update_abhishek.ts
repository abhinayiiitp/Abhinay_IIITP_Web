import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xojgazsikkvzickbiltf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_p49HzDwWPnbjreM5XeZHww_TL5rtj03';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
    console.log("Fetching team members...");
    const { data, error } = await supabase.from('team_members').select('*');
    if (error) {
        console.error("Error fetching:", error);
        return;
    }
    
    const abhishek = data.find(m => m.name.toLowerCase().includes('abhishek'));
    
    if (abhishek) {
        console.log("Found Abhishek:", abhishek);
        console.log("Updating image_url to /team/abhishek.jpg");
        const { error: updateError } = await supabase.from('team_members').update({ image_url: '/team/abhishek.jpg' }).eq('id', abhishek.id);
        if (updateError) console.error("Update error:", updateError);
        else console.log("Successfully updated!");
    } else {
        console.log("Abhishek not found in DB. Creating new entry...");
        const newMember = {
            name: 'Abhishek',
            role: 'Acting Head',
            category: 'Vertical Head', // Assuming category based on role
            bio: 'Acting Head of Abhinay.',
            image_url: '/team/abhishek.jpg',
            order_index: 10
        };
        const { error: insertError } = await supabase.from('team_members').insert([newMember]);
        if (insertError) console.error("Insert error:", insertError);
        else console.log("Successfully inserted!");
    }
}

main();
