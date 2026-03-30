import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// On vérifie AVANT d'initialiser le client
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ERREUR: Variables Supabase manquantes dans .env.local");
}

// L'initialisation ne se fera que si les valeurs existent, 
// sinon l'erreur de la console sera plus explicite que le crash actuel.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);