'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
// import { redirect } from 'next/navigation';

export async function login(email: string, password: string) {
  const supabase = await createSupabaseServerClient();
  console.log('ログイン処理が呼び出されました', { email, password });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return false;
  }

  return true;
}