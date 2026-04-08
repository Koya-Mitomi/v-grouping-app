'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function sendResetEmail(email: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error: sendEmailError } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}auth/callback`,
  });

  if (sendEmailError) {
    console.error('Error sending reset email:', sendEmailError);
    return false;
  }

  return true;
}

export async function resetPassword(new_password: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error: resetPasswordError } = await supabase.auth.updateUser({
    password: new_password,
  });

  if (resetPasswordError) {
    console.error('Error resetting password:', resetPasswordError);
    return false;
  }

  return true;
}

const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    "http://localhost:3000/";
  url = url.startsWith("http") ? url : `https://${url}`;
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};