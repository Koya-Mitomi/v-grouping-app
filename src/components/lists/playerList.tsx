'use client';

import { Player } from "@/types/player";
import { DeletePlayerButton } from "../buttons/deletePlayerButton";
import { useEffect, useState } from "react";
import { PaginationControl } from "./paginationControl";

export const PlayerList = (props: { playerList: Player[]; initialCurrentPage: number; initialPageLimit: number; initialSortedState: string }) => {
  const { playerList, initialCurrentPage, initialPageLimit, initialSortedState } = props;
  const sortedPlayerListById = [...playerList].sort((a, b) => a.id - b.id);
  const sortedPlayerListByName = [...playerList].sort((a, b) => a.name !== b.name ? a.name.localeCompare(b.name) : a.id - b.id);
  const sortedPlayerListByPosition = [...playerList].sort((a, b) => a.position !== b.position ? a.position.localeCompare(b.position) : a.id - b.id);
  const sortedPlayerListByLevel = [...playerList].sort((a, b) => a.level !== b.level ? a.level - b.level : a.id - b.id);
  const sortedPlayerListByYear = [...playerList].sort((a, b) => a.year !== b.year ? a.year - b.year : a.id - b.id);
  const initialSortedList = initialSortedState === "name" ? sortedPlayerListByName
    : initialSortedState === "position" ? sortedPlayerListByPosition
    : initialSortedState === "level" ? sortedPlayerListByLevel
    : initialSortedState === "year" ? sortedPlayerListByYear
    : sortedPlayerListById;
  const [sortedPlayerList, setSortedPlayerList] = useState<Player[]>(initialSortedList);
  const [isNameSortButtonClicked, setIsNameSortButtonClicked] = useState(initialSortedState === "name");
  const [isPositionSortButtonClicked, setIsPositionSortButtonClicked] = useState(initialSortedState === "position");
  const [isLevelSortButtonClicked, setIsLevelSortButtonClicked] = useState(initialSortedState === "level");
  const [isYearSortButtonClicked, setIsYearSortButtonClicked] = useState(initialSortedState === "year");
  const [sortedState, setSortedState] = useState(initialSortedState);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPageLimit);
  const totalPages = Math.ceil(sortedPlayerList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayList = sortedPlayerList.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (sortedPlayerList.length === 0) {
      setCurrentPage(1);
    }
  }, [sortedPlayerList.length, itemsPerPage, totalPages, currentPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const handleSortByName = () => {
    setSortedPlayerList(sortedPlayerListByName);
    setIsNameSortButtonClicked(true);
    setIsPositionSortButtonClicked(false);
    setIsLevelSortButtonClicked(false);
    setIsYearSortButtonClicked(false);
    setSortedState("name");
    setCurrentPage(1);
  };

  const handleSortByPosition = () => {
    setSortedPlayerList(sortedPlayerListByPosition);
    setIsNameSortButtonClicked(false);
    setIsPositionSortButtonClicked(true);
    setIsLevelSortButtonClicked(false);
    setIsYearSortButtonClicked(false);
    setSortedState("position");
    setCurrentPage(1);
  };

  const handleSortByLevel = () => {
    setSortedPlayerList(sortedPlayerListByLevel);
    setIsNameSortButtonClicked(false);
    setIsPositionSortButtonClicked(false);
    setIsLevelSortButtonClicked(true);
    setIsYearSortButtonClicked(false);
    setSortedState("level");
    setCurrentPage(1);
  };

  const handleSortByYear = () => {
    setSortedPlayerList(sortedPlayerListByYear);
    setIsNameSortButtonClicked(false);
    setIsPositionSortButtonClicked(false);
    setIsLevelSortButtonClicked(false);
    setIsYearSortButtonClicked(true);
    setSortedState("year");
    setCurrentPage(1);
  };

  const handleResetSort = () => {
    setSortedPlayerList(sortedPlayerListById);
    setIsNameSortButtonClicked(false);
    setIsPositionSortButtonClicked(false);
    setIsLevelSortButtonClicked(false);
    setIsYearSortButtonClicked(false);
    setSortedState("initial");
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-10 flex flex-col gap-4 w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 text-center">プレイヤー一覧</h1>

      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-4 flex gap-4 flex-wrap justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            <button type="button" onClick={isNameSortButtonClicked ? handleResetSort : handleSortByName} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-colors">
              {isNameSortButtonClicked ? "元に戻す" : "名前順"}
            </button>
            <button type="button" onClick={isPositionSortButtonClicked ? handleResetSort : handleSortByPosition} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-colors">
              {isPositionSortButtonClicked ? "元に戻す" : "ポジション順"}
            </button>
            <button type="button" onClick={isLevelSortButtonClicked ? handleResetSort : handleSortByLevel} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-colors">
              {isLevelSortButtonClicked ? "元に戻す" : "レベル順"}
            </button>
            <button type="button" onClick={isYearSortButtonClicked ? handleResetSort : handleSortByYear} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer transition-colors">
              {isYearSortButtonClicked ? "元に戻す" : "学年順"}
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
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white w-full">
          <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-4 text-sm text-center font-semibold text-gray-600">名前</th>
                <th className="px-4 md:px-6 py-4 text-sm text-center font-semibold text-gray-600">ポジション</th>
                <th className="px-4 md:px-6 py-4 text-sm text-center font-semibold text-gray-600">レベル</th>
                <th className="px-4 md:px-6 py-4 text-sm text-center font-semibold text-gray-600">学年</th>
                <th className="px-4 md:px-6 py-4 text-sm text-center font-semibold text-gray-600">性別</th>
                <th colSpan={2} className="px-4 md:px-6 py-4 text-sm text-center font-semibold text-gray-600">編集 / 削除</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayList.length > 0 ? (
                displayList.map((player) => (
                  <tr key={player.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 text-sm text-center font-medium text-gray-900 whitespace-nowrap">{player.name}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-center text-gray-600 whitespace-nowrap">{player.position}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-center text-gray-600 whitespace-nowrap">{player.level}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-center text-gray-600 whitespace-nowrap">{player.year}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-center text-gray-600 whitespace-nowrap">{player.gender}</td>
                    <td className="px-4 md:px-6 py-4 text-center">
                      <a href={`/players/edit/${player.id}?page=${currentPage}&limit=${itemsPerPage}&sorted=${sortedState}`} className="text-blue-500 cursor-pointer hover:text-blue-700 whitespace-nowrap">
                        編集
                      </a>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center">
                      <DeletePlayerButton id={player.id} name={player.name} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 italic">まだプレイヤーが登録されていません。「プレイヤーを追加する」からプレイヤーを追加してください。</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full mt-2">
        <PaginationControl currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        <a href={`/players/add?page=${currentPage}&limit=${itemsPerPage}&sorted=${sortedState}`} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer text-center font-semibold shadow-md">
          プレイヤーを追加する
        </a>
      </div>
    </div>
  )
}
