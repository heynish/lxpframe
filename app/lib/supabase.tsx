import { createClient } from '@supabase/supabase-js'

// Initialize the Supabase client
const supabaseUrl = process.env.SUPABASE_URL!; // Replace with your Supabase URL
const supabaseKey = process.env.SUPABASE_ANON_KEY!; // Replace with your Supabase anon/public key
export const supabase = createClient(supabaseUrl, supabaseKey);