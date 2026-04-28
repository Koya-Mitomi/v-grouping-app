'use server';
import { findActivePlayers, findAllPlayers } from "@/actions/playerActions/findPlayers";
import { Player } from "@/types/player";
import { CreateRandomTeams } from '@/components/teams/createRandomTeams';

export const CreateTeams = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ page?: string; limit?: string; sorted?: string }>;
}) => {
  const resolvedParams = await params;
  const eventId = parseInt(resolvedParams.id);
  const allPlayers: Player[] = await findAllPlayers();
  const activePlayers: Player[] = await findActivePlayers();
  const activePlayerIds: number[] = activePlayers.map(player => player.id);

  const resolvedSearchParams = (await searchParams) ?? {};
  const page = resolvedSearchParams.page ?? '1';
  const limit = resolvedSearchParams.limit ?? '20';
  const sorted = resolvedSearchParams.sorted ?? 'initial';
  return (
    <CreateRandomTeams eventId={eventId} playerIds={activePlayerIds} allPlayers={allPlayers} page={page} limit={limit} sorted={sorted} />
  )
}

export default CreateTeams;