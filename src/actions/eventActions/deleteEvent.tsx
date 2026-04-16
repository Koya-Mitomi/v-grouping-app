'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function deleteEvent(id: number) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (user) {
    const { error: deleteEventError } = await supabase.from('events').delete().eq('user_id', user.id).eq('id', id);
    if (deleteEventError) {
      console.error('Error deleting event:', deleteEventError);
      return false;
    }
  } else {
    console.error('No user found');
    return false;
  }

  return true;
}