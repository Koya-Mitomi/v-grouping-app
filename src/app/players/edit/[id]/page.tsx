'use server';

import { PlayerInputs } from "@/types/player";
import { findPlayerById } from "@/actions/playerActions/findPlayers";
import EditPlayerForm from "@/components/editPlayerForm";
import { mapPlayerGenderToInputGender, mapPlayerPositionToInputPosition } from "@/lib/functions/playerMapping";

export const EditPlayer = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const playerId = parseInt(resolvedParams.id);
  const player = await findPlayerById(playerId);
  if (player === null) {
    return <div className="flex items-center flex-col gap-4 p-10">プレイヤーが見つかりませんでした。</div>;
  }
  const defaultValues: PlayerInputs = {
    name: player.name,
    position: await mapPlayerPositionToInputPosition(player.position),
    level: player.level,
    year: player.year,
    gender: await mapPlayerGenderToInputGender(player.gender),
  };

  return (
    <EditPlayerForm playerId={playerId} formname="編集" defaults={defaultValues} />
  )
}

export default EditPlayer;
