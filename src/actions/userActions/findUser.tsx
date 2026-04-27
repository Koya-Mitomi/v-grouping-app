'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function findUserName() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (user) {
    const {data, error: findUserNameError} = await supabase.from('profiles').select('user_name').eq('id', user.id).single();
    if (findUserNameError) {
      console.error('Error finding user name:', findUserNameError);
      return null;
    }
    return data.user_name;
  } else {
    console.error('No user found');
    return null;
  }
}