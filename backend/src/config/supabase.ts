import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

// Client for public operations (uses row-level security)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Admin client for backend operations (bypasses row-level security)
export const supabaseAdmin = supabaseServiceRoleKey 
    ? createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : supabase;

export default supabase;
