'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { PlayerInputs } from '@/types/player';

export async function addPlayer(playerData: PlayerInputs) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  var gender: boolean = true;

  if (playerData.gender === 'female') {
    gender = false;
  }

  if (user) {
    const { error: addPlayerError } = await supabase.from('players').insert({
      user_id: user.id,
      name: playerData.name,
      year: playerData.year,
      level: playerData.level,
      position: playerData.position,
      gender: gender,
      is_active: false,
    });

    if (addPlayerError) {
      console.error('Error adding player:', addPlayerError);
      return false;
    }
  } else {
    console.error('No user found');
    return false;
  }

  return true;
}