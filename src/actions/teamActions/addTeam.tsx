'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function upsertTeam(eventId: number, teamName: string, memberIds: number[], teamId: number | null = null): Promise<boolean> {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  let teamIdToUse: number | null = teamId;

  if (user) {
    if (teamId) {
      const { error: upsertTeamError } = await supabase.from('teams').update({
        id: teamId,
        user_id: user.id,
        event_id: eventId,
        team_name: teamName,
      }).eq('user_id', user.id).eq('id', teamId);
      if (upsertTeamError) {
        console.error('Error upserting team:', upsertTeamError);
        return false;
      }
      const { error: deleteTeamMembersError } = await supabase.from('team_members').delete().eq('user_id', user.id).eq('team_id', teamId);
      if (deleteTeamMembersError) {
        console.error('Error deleting old team members:', deleteTeamMembersError);
        return false;
      }
    } else {
      const { data, error: insertTeamError } = await supabase.from('teams').insert({
        user_id: user.id,
        event_id: eventId,
        team_name: teamName,
      }).select().single();
      teamIdToUse = data.id;
      if (insertTeamError) {
        console.error('Error inserting team:', insertTeamError);
        return false;
      }
    }

    const { error: upsertTeamMembersError } = await supabase.from('team_members').upsert(
      memberIds.map(memberId => ({
        user_id: user.id,
        team_id: teamIdToUse,
        player_id: memberId,
      }))
    );

    if (upsertTeamMembersError) {
      console.error('Error upserting team members:', upsertTeamMembersError);
      return false;
    }
  } else {
    console.error('No user found');
    return false;
  }

  return true;
}