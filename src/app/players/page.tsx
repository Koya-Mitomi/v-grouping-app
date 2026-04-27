'use server';

import { findAllPlayers } from "@/actions/playerActions/findPlayers";
import { BackButton } from "@/components/common/backButton";
import { PlayerList } from "@/components/lists/playerList";
import { Player } from "@/types/player";

export const Players = async ({searchParams} : {searchParams: { [key: string]: string | string[] | undefined }}) => {
  const resolvedSearchParams = await searchParams;
  const initialCurrentPage = parseInt(resolvedSearchParams.page as string) || 1;
  const initialPageLimit = parseInt(resolvedSearchParams.limit as string) || 20;
  const playerList: Player[] = await findAllPlayers();

  return (
    <div className="p-4 md:p-10 flex flex-col items-center gap-4">
      <PlayerList playerList={playerList} initialCurrentPage={initialCurrentPage} initialPageLimit={initialPageLimit} />
      <BackButton path="/" message="戻る" />
    </div>
  )
}

export default Players;