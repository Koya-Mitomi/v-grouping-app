'use server';
import { getPlayersByIds } from '@/actions/playerActions/findPlayers';
import { BackButton } from '@/components/backButton';
import { TeamForm } from '@/components/teamForm';
import { Player } from '@/types/player';

export const TeamDetail = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const playerIds: number[] = (resolvedSearchParams.memberIds as string)?.split(',').map( str => parseInt(str, 10) ).filter(id => !isNaN(id)) ?? [];
  const teamName: string = (resolvedSearchParams.teamName as string) || '';
  const eventId = parseInt(resolvedParams.id);
  const teamId: number | null = resolvedSearchParams.teamId ? parseInt(resolvedSearchParams.teamId as string, 10) : null; 

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
    <div className='p-10 flex flex-col items-center gap-4'>
      <TeamForm eventId={eventId} defaultValues={defaultValues} teamId={teamId} />
      <BackButton path={`/events/${eventId}`} {...teamId !== null ? { message: "戻る" } : { message: "キャンセル" }} />
    </div>
  )
}

export default TeamDetail;
