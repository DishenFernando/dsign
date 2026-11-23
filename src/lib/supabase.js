import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const publishableKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY)?.trim();
export const isSupabaseConfigured = Boolean(url && publishableKey);

// A publishable/anon key is safe in the browser WITH properly applied RLS.
// Never put a service_role key, database password or admin password in Vite env.
export const supabase = isSupabaseConfigured
  ? createClient(url, publishableKey, {
    auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: false }
  })
  : null;
