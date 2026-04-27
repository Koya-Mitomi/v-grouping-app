'use server';
import { mapDbGenderToPlayerGender, mapDbPositionToPlayerPosition } from '@/lib/functions/playerMapping';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Player } from '@/types/player';
import { Team, TeamMember } from '@/types/team';
import { findTeamMembersByTeamId, findTeamsByEventId } from '../teamActions/findTeams';

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
    const { data, error: findPlayerByIdError } = await supabase.from('players').select('*').eq('user_id', user.id).eq('id', id);

    if (findPlayerByIdError) {
      console.error('Error finding player:', findPlayerByIdError);
      return null;
    }

    if (!data || data.length === 0) {
      console.warn('Player not found');
      return null;
    }

    const playerData = data[0];
    const position = mapDbPositionToPlayerPosition(playerData.position);
    const gender = mapDbGenderToPlayerGender(playerData.gender);

    return {
      id: playerData.id,
      user_id: playerData.user_id,
      name: playerData.name,
      position: position,
      level: playerData.level,
      year: playerData.year,
      gender: gender,
      is_active: playerData.is_active
    };
  } else {
    console.error('No user found');
    return null;
  }
}

export async function findPlayersByIds(ids: number[]) {
  const players: Player[] = [];
  await Promise.all(
    ids.map(async (id) => {
      const player = await findPlayerById(id);
      if (player) players.push(player);
    })
  );
  return players;
}

export async function findPlayersByTeamId(teamId: number) {
  const players: Player[] = [];

  const teamMembers: TeamMember[] = await findTeamMembersByTeamId(teamId);
  const playerIds: number[] = teamMembers.map(member => member.player_id);
  players.push(...await findPlayersByIds(playerIds));

  return players;
}

export async function findPlayersByEventId(eventId: number) {
  const players: Player[] = [];

  const teams: Team[] = await findTeamsByEventId(eventId);
  await Promise.all(
    teams.map(async (team) => {
      const teamPlayers = await findPlayersByTeamId(team.id);
      players.push(...teamPlayers);
    })
  );

  return players;
}

export async function findActivePlayers() {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  const players: Player[] = [];

  if (user) {
    const { data, error: findActivePlayersError } = await supabase.from('players').select('*').eq('user_id', user.id).eq('is_active', true);

    if (findActivePlayersError) {
      console.error('Error finding active players:', findActivePlayersError);
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
