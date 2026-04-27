'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function login(email: string, password: string) {
  // 認証情報はサーバー側で処理し、クッキーセッションを確立する
  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error('Error signing in:', error);
    return false;
  }

  return true;
}