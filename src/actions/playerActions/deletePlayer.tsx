'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function deletePlayer(id: number) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (user) {
    const { error: deletePlayerError } = await supabase.from('players').delete().eq('user_id', user.id).eq('id', id);
    if (deletePlayerError) {
      console.error('Error deleting player:', deletePlayerError);
      return false;
    }
  } else {
    console.error('No user found');
    return false;
  }

  return true;
}