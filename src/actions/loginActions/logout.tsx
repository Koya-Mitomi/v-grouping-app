'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function logout() {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error logging out:', error);
    return false;
  }

  return true;
}