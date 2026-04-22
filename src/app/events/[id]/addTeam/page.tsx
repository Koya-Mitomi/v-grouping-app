'use server';
import { getPlayersByIds } from '@/actions/playerActions/findPlayers';
import { TeamForm } from '@/components/teamForm';
import { Player } from '@/types/player';

export const AddTeam = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const playerIds: number[] = (resolvedSearchParams.memberIds as string)?.split(',').map( str => parseInt(str, 10) ).filter(id => !isNaN(id)) ?? [];
  const teamName: string = (resolvedSearchParams.teamName as string) || '';
  const eventId = parseInt(resolvedParams.id);

  const getDefaultValues = async () => {
    let teamMembers: Player[] = [];
    if (playerIds.length > 0) {
      teamMembers = await getPlayersByIds(playerIds);
    }
    return {
      teamName,
      teamMembers
    };
  };

  const defaultValues: {
    teamName: string; 
    teamMembers: Player[] 
  } = await getDefaultValues();

  return (
    <TeamForm eventId={eventId} defaultValues={defaultValues} />
  )
}

export default AddTeam;
