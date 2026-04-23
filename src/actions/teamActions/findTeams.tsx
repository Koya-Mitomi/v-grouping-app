'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Team, TeamMember } from '@/types/team';

export async function findTeamsByEventId(eventId: number) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  const teams: Team[] = [];

  if (user) {
    const { data, error: findTeamsByEventIdError } = await supabase.from('teams').select('*').eq('event_id', eventId).eq('user_id', user.id);

    if (findTeamsByEventIdError) {
      console.error('Error finding teams:', findTeamsByEventIdError);
      return teams;
    }

    data.forEach((team_raw) => {
      teams.push({
        id: team_raw.id,
        team_name: team_raw.team_name,
        event_id: team_raw.event_id,
        user_id: team_raw.user_id
      });
    });

    return teams;
  } else {
    console.error('No user found');
    return teams;
  }
}

export async function findTeamMembersByTeamId(teamId: number) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  const members: TeamMember[] = [];

  if (user) {
    const { data, error: findTeamMembersByTeamIdError } = await supabase.from('team_members').select('*').eq('team_id', teamId).eq('user_id', user.id);

    if (findTeamMembersByTeamIdError) {
      console.error('Error finding team members:', findTeamMembersByTeamIdError);
      return members;
    }

    data.forEach((member_raw) => {
      members.push({
        id: member_raw.id,
        user_id: member_raw.user_id,
        team_id: member_raw.team_id,
        player_id: member_raw.player_id
      });
    });

    return members;
  } else {
    console.error('No user found');
    return members;
  }
}