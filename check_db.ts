import { createClient } from '@supabase/supabase-js';

// Replace with actual values from src/lib/supabaseConfig.ts
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
    console.log("Data:");
    console.log(data);
}

main();
