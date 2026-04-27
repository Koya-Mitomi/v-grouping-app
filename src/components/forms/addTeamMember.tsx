'use client';

import { Player } from "@/types/player";
import { BackButton } from "../common/backButton";
import { PlayerSelect } from "../lists/playerSelect";
import { useRouter } from "next/navigation";

export const AddTeamMember = ( props: {eventId: number; teamName: string; playerIds: number[]; allPlayers: Player[]; page: string; limit: string;} ) => {
  const { eventId, teamName, playerIds, allPlayers, page, limit } = props;
  const baseUrl: string = `/events/${eventId}/teamDetail?teamName=${teamName}`;
  const cancelUrl: string = `${baseUrl}&memberIds=${playerIds.join(',')}&page=${page}&limit=${limit}`;
  const router = useRouter();
  const onConfirm = (selectedIds: number[]) => {
    const redirectUrl: string = `${baseUrl}&memberIds=${selectedIds.join(',')}&page=${page}&limit=${limit}`;
    router.push(redirectUrl);
  };
  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <PlayerSelect initialSelectedIds={playerIds} players={allPlayers} submitButtonLabel="確定" onConfirm={onConfirm} />
      <BackButton path={cancelUrl} message="キャンセル" />
    </div>
  )
}
