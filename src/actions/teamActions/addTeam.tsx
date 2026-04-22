'use server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function upsertTeam(eventId: number, teamName: string, memberIds: number[]) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase.auth.getUser();

  const user = data.user;

  if (user) {
    const { data, error: upsertTeamError } = await supabase.from('teams').upsert({
      user_id: user.id,
      event_id: eventId,
      team_name: teamName,
    }).select().single();

    if (upsertTeamError) {
      console.error('Error upserting team:', upsertTeamError);
      return false;
    }

    const { error: upsertTeamMembersError } = await supabase.from('team_members').upsert(
      memberIds.map(memberId => ({
        user_id: user.id,
        team_id: data.id,
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