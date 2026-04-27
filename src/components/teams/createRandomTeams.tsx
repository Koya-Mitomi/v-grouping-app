'use client';

import { Player } from "@/types/player";
import { BackButton } from "../common/backButton";
import { PlayerSelect } from "../lists/playerSelect";
import { useRouter } from "next/navigation";
import { findPlayersByIds } from "@/actions/playerActions/findPlayers";
import { randomDivideTeams, randomDivideTeamsByYear } from "@/lib/functions/teamDivider";
import { useState } from "react";
import { upsertTeam } from "@/actions/teamActions/addTeam";
import { findTeamsByEventId } from "@/actions/teamActions/findTeams";
import { deleteTeam } from "@/actions/teamActions/deleteTeam";
import { TeamViewWithDetail } from "./teamViewWithDetail";
import { editPlayerActivations } from "@/actions/playerActions/editPlayer";

export const CreateRandomTeams = ( props: {eventId: number; playerIds: number[]; allPlayers: Player[]; page?: string; limit?: string} ) => {
  const { eventId, playerIds, allPlayers, page = '1', limit = '20' } = props;
  const baseUrl: string = `/events/${eventId}`;
  const cancelUrl: string = `${baseUrl}?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [generatedTeams, setGeneratedTeams] = useState<Player[][]>([]);

  const [isConsiderPosition, setIsConsiderPosition] = useState(false);
  const [isConsiderLevel, setIsConsiderLevel] = useState(false);
  const [isConsiderYear, setIsConsiderYear] = useState(false);
  const [isConsiderGender, setIsConsiderGender] = useState(false);
  const [isEachYear, setIsEachYear] = useState(false);
  const [teamNum, setTeamNum] = useState<number | undefined>(undefined);

  const onConfirm = async (selectedIds: number[]) => {
    const selectedPlayers: Player[] = await findPlayersByIds(selectedIds);
    if (selectedPlayers.length === 0) {
      alert("プレイヤーが選択されていません。");
      return;
    }
    if (teamNum !== undefined && (teamNum <= 0 || teamNum > selectedPlayers.length)) {
      alert("有効なチーム数を入力してください。");
      return;
    }

    const teams: Player[][] = [];
    if (isEachYear) {
      teams.push(...randomDivideTeamsByYear(selectedPlayers, isConsiderPosition, isConsiderLevel, isConsiderGender));
    } else {
      teams.push(...randomDivideTeams(selectedPlayers, isConsiderPosition, isConsiderLevel, isConsiderYear, isConsiderGender, teamNum));
    }
    setGeneratedTeams(teams);
  };

const onClickSaveButton = async () => {
  setIsLoading(true);
  const oldTeams = await findTeamsByEventId(eventId);
  const selectedPlayers = generatedTeams.flat();
  const selectedPlayerIds = selectedPlayers.map(player => player.id);
  const restPlayers = allPlayers.filter(player => !selectedPlayerIds.includes(player.id));
  const restPlayerIds = restPlayers.map(player => player.id);

  for (const team of oldTeams) {
    await deleteTeam(team.id);
  }

  for (const [index, members] of generatedTeams.entries()) {
    const teamName = `チーム ${index + 1}`;
    const memberIds = members.map((player) => player.id);
    await upsertTeam(eventId, teamName, memberIds);
  }

  await editPlayerActivations(restPlayerIds, false);
  await editPlayerActivations(selectedPlayerIds, true);

  router.push(cancelUrl);
};

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <div className="w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isConsiderPosition}
              onChange={(e) => setIsConsiderPosition(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            ポジションの偏りを考慮する
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isConsiderLevel}
              onChange={(e) => setIsConsiderLevel(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            レベルの偏りを考慮する
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isConsiderYear}
              onChange={(e) => setIsConsiderYear(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            学年の偏りを考慮する
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isConsiderGender}
              onChange={(e) => setIsConsiderGender(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            性別の偏りを考慮する
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isEachYear}
              onChange={(e) => setIsEachYear(e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            学年ごとにチームを生成
          </label>
        </div>

        <div className="mt-4 flex w-full flex-col items-center gap-2">
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <label className="text-sm font-medium text-gray-700" htmlFor="teamNum">
              チーム数
            </label>
            <input
              id="teamNum"
              type="number"
              min={1}
              inputMode="numeric"
              placeholder={isEachYear ? "（学年ごと生成時は指定不可）" : "未指定可"}
              value={teamNum ?? ''}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '') {
                  setTeamNum(undefined);
                  return;
                }
                setTeamNum(Number(raw));
              }}
              disabled={isEachYear}
              className="w-40 rounded border border-gray-300 bg-white px-3 py-2 text-center text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>
          <p className="text-xs text-gray-600 text-center">
            チーム数を未指定の場合は「選択されたプレイヤー数 ÷ 6（少数切り捨て）」を目安に自動でチーム数が決まります。学年ごとにチームを生成する場合、チーム数の指定は無効です。
          </p>
        </div>
      </div>

      <PlayerSelect initialSelectedIds={playerIds} players={allPlayers} submitButtonLabel="ランダムにチームを生成" onConfirm={onConfirm} />
      {generatedTeams.length > 0 && 
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-16">
            {generatedTeams.map((members, index) => (
              <div key={index} className="flex flex-col items-center">
                <TeamViewWithDetail key={index} teamName={`チーム ${index + 1}`} teamMembers={members} />
              </div>
            ))}
          </div>
          <button disabled={isLoading} onClick={onClickSaveButton} className="bg-green-500 hover:bg-green-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded">
            {isLoading ? "処理中..." : "チームを確定"}
          </button>
        </div>
      }
      <BackButton path={cancelUrl} message="キャンセル" />
    </div>
  )
}
