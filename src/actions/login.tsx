'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function login(email: string, password: string) {
  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return false;
  }

  return true;
}