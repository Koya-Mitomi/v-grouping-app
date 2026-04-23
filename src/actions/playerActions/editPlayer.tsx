'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { PlayerInputs } from '@/types/player';

export async function editPlayer(playerData: PlayerInputs, id: number) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  let gender: boolean = true;

  if (playerData.gender === 'female') {
    gender = false;
  }

  if (user) {

    const { error: editPlayerError } = await supabase.from('players').update({
      name: playerData.name,
      year: playerData.year,
      level: playerData.level,
      position: playerData.position,
      gender: gender,
      is_active: false,
    }).eq('user_id', user.id).eq('id', id);

    if (editPlayerError) {
      console.error('Error editing player:', editPlayerError);
      return false;
    }
  } else {
    console.error('No user found');
    return false;
  }

  return true;
}
