'use server';

import { findAllPlayers } from "@/actions/playerActions/findPlayers";
import { AddTeamMember } from "@/components/addTeamMember";
import { Player } from "@/types/player";

export const AddMembers = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const playerIds: number[] = (resolvedSearchParams.memberIds as string)?.split(',').map( str => parseInt(str, 10) ).filter(id => !isNaN(id)) ?? [];
  const teamName: string = (resolvedSearchParams.teamName as string) || '';
  const eventId: number = parseInt(resolvedParams.id);
  const allPlayers: Player[] = await findAllPlayers();

  return (
    <AddTeamMember eventId={eventId} teamName={teamName} playerIds={playerIds} allPlayers={allPlayers} />
  )
}

export default AddMembers;