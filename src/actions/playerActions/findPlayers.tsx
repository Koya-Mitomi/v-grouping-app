'use server';
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
      var position: "セッター" | "レフト" | "ライト" | "センター" | "リベロ" | "未定" = "未定";
      var gender: "男性" | "女性" = "男性";

      switch (player_raw.position) {
        case 'S':
          position = "セッター";
          break;
        case 'OH':
          position = "レフト";
          break;
        case 'OP':
          position = "ライト";
          break;
        case 'MB':
          position = "センター";
          break;
        case 'L':
          position = "リベロ";
          break;
        default:
          position = "未定";
      }

      if (player_raw.gender === false) {
        gender = "女性";
      }

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