'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function deleteTeam(id: number) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (user) {
    const { error: deleteTeamError } = await supabase.from('teams').delete().eq('user_id', user.id).eq('id', id);
    if (deleteTeamError) {
      console.error('Error deleting team:', deleteTeamError);
      return false;
    }
  } else {
    console.error('No user found');
    return false;
  }

  return true;
}