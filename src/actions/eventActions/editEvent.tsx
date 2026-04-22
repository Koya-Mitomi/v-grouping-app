'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function editEventTitle(id: number, title: string) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  let gender: boolean = true;

  if (user) {
    const { error: editEventError } = await supabase.from('events').update({
      title: title,
    }).eq('user_id', user.id).eq('id', id);

    if (editEventError) {
      console.error('Error editing event:', editEventError);
      return false;
    }
  } else {
    console.error('No user found');
    return false;
  }

  return true;
}
