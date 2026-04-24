'use server';

import { findAllPlayers } from "@/actions/playerActions/findPlayers";
import { BackButton } from "@/components/backButton";
import { PlayerList } from "@/components/playerList";
import { Player } from "@/types/player";

export const Players = async ({searchParams} : {searchParams: { [key: string]: string | string[] | undefined }}) => {
  const resolvedSearchParams = await searchParams;
  const initialCurrentPage = parseInt(resolvedSearchParams.page as string) || 1;
  const initialPageLimit = parseInt(resolvedSearchParams.limit as string) || 20;
  const playerList: Player[] = await findAllPlayers();

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <PlayerList playerList={playerList} initialCurrentPage={initialCurrentPage} initialPageLimit={initialPageLimit} />
      <a href={`/players/add?page=${initialCurrentPage}&limit=${initialPageLimit}`} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer text-center">
        プレイヤーを追加する
      </a>
      <BackButton path="/" message="戻る" />
    </div>
  )
}

export default Players;