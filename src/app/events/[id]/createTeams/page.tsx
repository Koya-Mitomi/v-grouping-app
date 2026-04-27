'use server';
import { findActivePlayers, findAllPlayers } from "@/actions/playerActions/findPlayers";
import { Player } from "@/types/player";
import { CreateRandomTeams } from '@/components/teams/createRandomTeams';

export const CreateTeams = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const eventId = parseInt(resolvedParams.id);
  const allPlayers: Player[] = await findAllPlayers();
  const activePlayers: Player[] = await findActivePlayers();
  const activePlayerIds: number[] = activePlayers.map(player => player.id);

  return (
    <CreateRandomTeams eventId={eventId} playerIds={activePlayerIds} allPlayers={allPlayers} />
  )
}

export default CreateTeams;