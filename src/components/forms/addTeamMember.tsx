'use client';

import { Player } from "@/types/player";
import { BackButton } from "../common/backButton";
import { PlayerSelect } from "../lists/playerSelect";
import { useRouter } from "next/navigation";

export const AddTeamMember = ( props: {eventId: number; teamName: string; playerIds: number[]; allPlayers: Player[]} ) => {
  const { eventId, teamName, playerIds, allPlayers } = props;
  const baseUrl: string = `/events/${eventId}/teamDetail?teamName=${teamName}`;
  const cancelUrl: string = `${baseUrl}&memberIds=${playerIds.join(',')}`;
  const router = useRouter();
  const onConfirm = (selectedIds: number[]) => {
    const redirectUrl: string = `${baseUrl}&memberIds=${selectedIds.join(',')}`;
    router.push(redirectUrl);
  };
  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <PlayerSelect initialSelectedIds={playerIds} players={allPlayers} submitButtonLabel="確定" onConfirm={onConfirm} />
      <BackButton path={cancelUrl} message="キャンセル" />
    </div>
  )
}
