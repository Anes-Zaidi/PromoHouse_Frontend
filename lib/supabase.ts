import { createClient } from '@supabase/supabase-js';
import { logger } from './logger';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


if (!supabaseUrl) {
  logger.error("ERREUR: Variables Supabase manquantes dans .env.local");

  throw new Error("ERREUR: Variables manquantes");
}

if (!supabaseAnonKey) {
  logger.error("ERREUR: Variables Supabase manquantes dans .env.local");

  throw new Error("ERREUR: Variables manquantes");
}

export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey
); 