'use server';

import { findAllPlayers, findPlayersByEventId, findPlayersByTeamId } from "@/actions/playerActions/findPlayers";
import { AddTeamMember } from "@/components/addTeamMember";
import { Player } from "@/types/player";

export const AddMembers = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const playerIds: number[] = (resolvedSearchParams.memberIds as string)?.split(',').map( str => parseInt(str, 10) ).filter(id => !isNaN(id)) ?? [];
  const teamName: string = (resolvedSearchParams.teamName as string) || '';
  const teamId: number | null = resolvedSearchParams.teamId ? parseInt(resolvedSearchParams.teamId as string, 10) : null;
  const eventId: number = parseInt(resolvedParams.id);
  const allPlayers: Player[] = await findAllPlayers();
  const playersInThisEvent: Player[] = await findPlayersByEventId(eventId);
  const playersInThisTeam: Player[] = [];

  if (teamId !== null) {
    playersInThisTeam.push(...await findPlayersByTeamId(teamId));
  }

  const availablePlayers = allPlayers.filter(player => {
    const isInEvent = playersInThisEvent.some(eventPlayer => eventPlayer.id === player.id);
    const isInTeam = playersInThisTeam.some(teamPlayer => teamPlayer.id === player.id);
    return !isInEvent || isInTeam; // イベント内の他のチームにいないプレイヤーは表示する
  });

  return (
    <AddTeamMember eventId={eventId} teamName={teamName} playerIds={playerIds} allPlayers={availablePlayers} />
  )
}

export default AddMembers;
