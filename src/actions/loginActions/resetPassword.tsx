'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getURL } from '@/lib/utils';

export async function sendResetEmail(email: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error: sendEmailError } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getURL()}auth/callback?next=/resetPassword`,
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