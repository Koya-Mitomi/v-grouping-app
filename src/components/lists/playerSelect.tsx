'use client';

import { Player } from "@/types/player";
import { useState } from "react";
import { SubmitButton } from "../buttons/submitButton";
import { PaginationControl } from "./paginationControl";

export const PlayerSelect = (props: { initialSelectedIds: number[]; players: Player[]; submitButtonLabel: string; onConfirm: (selectedIds: number[]) => void }) => {
  const { initialSelectedIds, players, submitButtonLabel, onConfirm } = props;
  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelectedIds);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>(players);
  const [isNameSortButtonClicked, setIsNameSortButtonClicked] = useState(false);
  const [isPositionSortButtonClicked, setIsPositionSortButtonClicked] = useState(false);
  const [isLevelSortButtonClicked, setIsLevelSortButtonClicked] = useState(false);
  const [isYearSortButtonClicked, setIsYearSortButtonClicked] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const totalPages = Math.ceil(sortedPlayers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayList = sortedPlayers.slice(startIndex, startIndex + itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const handleSelectPlayer = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((prev) => {
      const set = new Set(prev);
      sortedPlayers.forEach((p) => set.add(p.id));
      return Array.from(set);
    });
  };

  const handleDeselectAll = () => {
  setSelectedIds((prev) => prev.filter((id) => !sortedPlayers.some((p) => p.id === id)));
  };

  const handleSortByName = () => {
    const sortedPlayers = [...players].sort((a, b) => a.name.localeCompare(b.name));
    setSortedPlayers(sortedPlayers);
    setIsNameSortButtonClicked(true);
    setIsPositionSortButtonClicked(false);
    setIsLevelSortButtonClicked(false);
    setIsYearSortButtonClicked(false);
    setCurrentPage(1);
  };

  const handleSortByPosition = () => {
    const sortedPlayers = [...players].sort((a, b) => a.position.localeCompare(b.position));
    setSortedPlayers(sortedPlayers);
    setIsNameSortButtonClicked(false);
    setIsPositionSortButtonClicked(true);
    setIsLevelSortButtonClicked(false);
    setIsYearSortButtonClicked(false);
    setCurrentPage(1);
  };

  const handleSortByLevel = () => {
    const sortedPlayers = [...players].sort((a, b) => a.level - b.level);
    setSortedPlayers(sortedPlayers);
    setIsNameSortButtonClicked(false);
    setIsPositionSortButtonClicked(false);
    setIsLevelSortButtonClicked(true);
    setIsYearSortButtonClicked(false);
    setCurrentPage(1);
  };

  const handleSortByYear = () => {
    const sortedPlayers = [...players].sort((a, b) => a.year - b.year);
    setSortedPlayers(sortedPlayers);
    setIsNameSortButtonClicked(false);
    setIsPositionSortButtonClicked(false);
    setIsLevelSortButtonClicked(false);
    setIsYearSortButtonClicked(true);
    setCurrentPage(1);
  };

  const handleResetSort = () => {
    setSortedPlayers(players);
    setIsNameSortButtonClicked(false);
    setIsPositionSortButtonClicked(false);
    setIsLevelSortButtonClicked(false);
    setIsYearSortButtonClicked(false);
    setCurrentPage(1);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onConfirm(selectedIds);
    }}>
      <div className="p-10 flex flex-col items-center gap-4">
        <div className="w-full max-w-4xl">
          <div className="mb-4 flex gap-2 flex-wrap justify-between items-center">
            <div className="flex gap-2 flex-wrap">
              <button type="button"  onClick={isNameSortButtonClicked ? handleResetSort : handleSortByName} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer">
                {isNameSortButtonClicked ? "元に戻す" : "名前でソート"}
              </button>
              <button type="button" onClick={isPositionSortButtonClicked ? handleResetSort : handleSortByPosition} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer">
                {isPositionSortButtonClicked ? "元に戻す" : "ポジションでソート"}
              </button>
              <button type="button" onClick={isLevelSortButtonClicked ? handleResetSort : handleSortByLevel} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer">
                {isLevelSortButtonClicked ? "元に戻す" : "レベルでソート"}
              </button>
              <button type="button" onClick={isYearSortButtonClicked ? handleResetSort : handleSortByYear} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer">
                {isYearSortButtonClicked ? "元に戻す" : "学年でソート"}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="limit" className="text-xs font-medium text-gray-600">
                表示数:
              </label>
              <select
                id="limit"
                value={itemsPerPage}
                onChange={(e) => handleLimitChange(Number(e.target.value))}
                className="px-1 py-1 text-xs bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {[10, 20, 30, 40, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}件
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th colSpan={4} className="px-6 py-4 text-sm text-center font-semibold text-gray-600">プレイヤーを選択</th>
                <th>
                  <button type="button" onClick={handleSelectAll} className="px-6 py-4 text-sm text-center font-semibold text-gray-600 bg-blue-100 hover:bg-blue-200 cursor-pointer">
                    全て選択
                  </button>
                </th>
                <th>
                  <button type="button" onClick={handleDeselectAll} className="px-6 py-4 text-sm text-center font-semibold text-gray-600 bg-red-100 hover:bg-red-200 cursor-pointer">
                    全て解除
                  </button>
                </th>
              </tr>
            </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">選択</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">名前</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">ポジション</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">レベル</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">学年</th>
                  <th className="px-6 py-4 text-sm text-center font-semibold text-gray-600">性別</th>
                </tr>
                  {displayList.map((player) => (
                  <tr key={player.id}>
                    <td className="px-6 py-4 text-sm text-center font-medium text-gray-900">
                      <input type="checkbox" checked={selectedIds.includes(player.id)} value={player.id} onChange={() => handleSelectPlayer(player.id)} />
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{player.name}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{player.position}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{player.level}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{player.year}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">{player.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <PaginationControl currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        <SubmitButton label={submitButtonLabel} className="h-8 px-3 text-sm font-medium text-white bg-blue-500 border border-blue-300 rounded-md shadow-sm hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed" />
      </div>
    </form>
  )
}
