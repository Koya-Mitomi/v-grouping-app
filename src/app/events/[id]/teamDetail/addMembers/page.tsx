'use server';

import { findAllPlayers, findPlayersByEventId, findPlayersByTeamId } from "@/actions/playerActions/findPlayers";
import { AddTeamMember } from "@/components/forms/addTeamMember";
import { Player } from "@/types/player";

export const AddMembers = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const playerIds: number[] = (resolvedSearchParams.memberIds as string)?.split(',').map( str => parseInt(str, 10) ).filter(id => !isNaN(id)) ?? [];
  const teamName: string = (resolvedSearchParams.teamName as string) || '';
  const teamId: number | null = resolvedSearchParams.teamId ? parseInt(resolvedSearchParams.teamId as string, 10) : null;
  const eventId: number = parseInt(resolvedParams.id);
  const page: string = (resolvedSearchParams.page as string) || '1';
  const limit: string = (resolvedSearchParams.limit as string) || '20';
  const allPlayers: Player[] = await findAllPlayers();
  const playersInThisEvent: Player[] = await findPlayersByEventId(eventId);
  const playersInThisTeam: Player[] = [];

  if (teamId !== null) {
    playersInThisTeam.push(...await findPlayersByTeamId(teamId));
  }

  const availablePlayers = allPlayers.filter(player => {
    const isInEvent = playersInThisEvent.some(eventPlayer => eventPlayer.id === player.id);
    const isInTeam = playersInThisTeam.some(teamPlayer => teamPlayer.id === player.id);
  // イベント内の別チームに所属しているプレイヤーは二重所属になるため除外。
  // ただし、今編集中のチームに所属しているプレイヤーは選び直せるように残す。
  return !isInEvent || isInTeam;
  });

  return (
    <AddTeamMember eventId={eventId} teamName={teamName} playerIds={playerIds} allPlayers={availablePlayers} page={page} limit={limit} />
  )
}

export default AddMembers;
