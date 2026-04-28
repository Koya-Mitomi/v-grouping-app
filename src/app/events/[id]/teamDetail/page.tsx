'use server';
import { findPlayersByIds } from '@/actions/playerActions/findPlayers';
import { BackButton } from '@/components/common/backButton';
import { TeamForm } from '@/components/forms/teamForm';
import { Player } from '@/types/player';

export const TeamDetail = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  // teamDetailは「新規作成」と「既存チーム編集」を同じ画面で扱うため、URLクエリから状態を復元する
  const playerIds: number[] = (resolvedSearchParams.memberIds as string)?.split(',').map( str => parseInt(str, 10) ).filter(id => !isNaN(id)) ?? [];
  const teamName: string = (resolvedSearchParams.teamName as string) || '';
  const eventId = parseInt(resolvedParams.id);
  const teamId: number | null = resolvedSearchParams.teamId ? parseInt(resolvedSearchParams.teamId as string, 10) : null; 

  // 一覧(/events)のpage/limitを引き回して、どの画面から戻っても一覧の状態が崩れないようにする
  const page = (resolvedSearchParams.page as string) || '1';
  const limit = (resolvedSearchParams.limit as string) || '20';
  const sorted = (resolvedSearchParams.sorted as string) || 'initial';

  const getDefaultValues = async () => {
    let teamMembers: Player[] = [];
    if (playerIds.length > 0) {
      teamMembers = await findPlayersByIds(playerIds);
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
    <div className='px-4 py-8 md:p-10 flex flex-col items-center gap-4'>
      <TeamForm eventId={eventId} defaultValues={defaultValues} teamId={teamId} page={page} limit={limit} sorted={sorted} />
      <BackButton path={`/events/${eventId}?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}&sorted=${encodeURIComponent(sorted)}`} {...teamId !== null ? { message: "戻る" } : { message: "キャンセル" }} />
    </div>
  )
}

export default TeamDetail;