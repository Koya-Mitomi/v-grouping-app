'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function logout() {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return false;
  }

  return true;
}