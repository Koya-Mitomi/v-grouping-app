'use server';
import { mapDbGenderToPlayerGender, mapDbPositionToPlayerPosition } from '@/lib/functions/playerMapping';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Player } from '@/types/player';

export async function findAllPlayers() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  const players: Player[] = [];

  if (user) {
    const { data, error: findAllPlayersError } = await supabase.from('players').select('*').eq('user_id', user.id);

    if (findAllPlayersError) {
      console.error('Error finding player:', findAllPlayersError);
      return players;
    }

    data.forEach((player_raw) => {
      const position = mapDbPositionToPlayerPosition(player_raw.position);
      const gender = mapDbGenderToPlayerGender(player_raw.gender);

      players.push({
        id: player_raw.id,
        user_id: player_raw.user_id,
        name: player_raw.name,
        position: position,
        level: player_raw.level,
        year: player_raw.year,
        gender: gender,
        is_active: player_raw.is_active
      });
    });

  } else {
    console.error('No user found');
    return players;
  }

  return players;
}

export async function findPlayerById(id: number) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (user) {
    const { data, error: findPlayerByIdError } = await supabase.from('players').select('*').eq('user_id', user.id).eq('id', id).single();

    if (findPlayerByIdError) {
      console.error('Error finding player:', findPlayerByIdError);
      return null;
    }

    if (!data) {
      console.error('Player not found');
      return null;
    }

    const position = mapDbPositionToPlayerPosition(data.position);
    const gender = mapDbGenderToPlayerGender(data.gender);

    return {
      id: data.id,
      user_id: data.user_id,
      name: data.name,
      position: position,
      level: data.level,
      year: data.year,
      gender: gender,
      is_active: data.is_active
    };
  } else {
    console.error('No user found');
    return null;
  }
}