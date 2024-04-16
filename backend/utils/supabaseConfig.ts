import { createClient, SupabaseClient } from "@supabase/supabase-js";
require('dotenv').config();

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey: string = process.env.REACT_APP_SUPABASE_KEY!;

// Gives us a useful variable for one connection to the database, minimises the need for writing a few extra lines of code when doing DB operations.
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
