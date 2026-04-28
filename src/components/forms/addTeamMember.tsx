'use client';

import { Player } from "@/types/player";
import { BackButton } from "../common/backButton";
import { PlayerSelect } from "../lists/playerSelect";
import { useRouter } from "next/navigation";

export const AddTeamMember = ( props: {eventId: number; teamName: string; playerIds: number[]; allPlayers: Player[]; page: string; limit: string; sorted: string; teamId: number | null} ) => {
  const { eventId, teamName, playerIds, allPlayers, page, limit, sorted, teamId } = props;

  // ここは「メンバー選択」専用画面。確定後はteamDetailにmemberIdsを載せて戻す。
  const baseUrl: string = `/events/${eventId}/teamDetail?teamName=${teamName}`;
  let cancelUrl: string = `${baseUrl}&memberIds=${playerIds.join(',')}&page=${page}&limit=${limit}&sorted=${sorted}`;
  if (teamId !== null) {
    cancelUrl += `&teamId=${teamId}`;
  }
  const router = useRouter();
  const onConfirm = (selectedIds: number[]) => {
    // 選択されたプレイヤーIDをクエリに載せ、teamDetail側でメンバー一覧を復元する
    let redirectUrl: string = `${baseUrl}&memberIds=${selectedIds.join(',')}&page=${page}&limit=${limit}&sorted=${sorted}`;
    if (teamId !== null) {
      redirectUrl += `&teamId=${teamId}`;
    }
    router.push(redirectUrl);
  };
  return (
    <div className="p-4 md:p-10 flex flex-col gap-4 w-full">
      <div className="w-full max-w-4xl mx-auto text-center">
        <PlayerSelect initialSelectedIds={playerIds} players={allPlayers} submitButtonLabel="確定" onConfirm={onConfirm} />
      </div>
      <div className="mx-auto">
        <BackButton path={cancelUrl} message="キャンセル" />
      </div>
    </div>
  )
}
