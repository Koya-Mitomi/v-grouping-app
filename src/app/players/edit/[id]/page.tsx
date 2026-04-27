'use server';

import { PlayerInputs } from "@/types/player";
import { findPlayerById } from "@/actions/playerActions/findPlayers";
import EditPlayerForm from "@/components/forms/editPlayerForm";
import { mapPlayerGenderToInputGender, mapPlayerPositionToInputPosition } from "@/lib/functions/playerMapping";

export const EditPlayer = async ({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: { [key: string]: string | string[] | undefined } }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  // 一覧のページ状態（page/limit）を保持して、編集完了後に同じ位置へ戻す
  const page = parseInt(resolvedSearchParams.page as string) || 1;
  const limit = parseInt(resolvedSearchParams.limit as string) || 20;
  const playerId = parseInt(resolvedParams.id);
  const player = await findPlayerById(playerId);
  if (player === null) {
    return <div className="flex items-center flex-col gap-4 p-4 md:p-10">プレイヤーが見つかりませんでした。</div>;
  }
  const defaultValues: PlayerInputs = {
    name: player.name,
    position: await mapPlayerPositionToInputPosition(player.position),
    level: player.level,
    year: player.year,
    gender: await mapPlayerGenderToInputGender(player.gender),
  };

  return (
    <EditPlayerForm playerId={playerId} formname="編集" defaults={defaultValues} page={page} limit={limit} />
  )
}

export default EditPlayer;
