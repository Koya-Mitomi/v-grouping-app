'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function signUp(user_name: string, email: string, password: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password
  });

  if (signUpError) {
    return false;
  }

  const user = data.user;

  if (user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: user.id,
      user_name: user_name,
      email: email
    });

    if (profileError) {
      return false;
    }
  }

  return true;
}