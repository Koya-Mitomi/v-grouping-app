'use client';

import { Player } from "@/types/player";
import { useState } from "react";

export const PlayerSelect = (props: { initialSelectedIds: number[]; players: Player[]; onConfirm: (selectedIds: number[]) => void }) => {
  const { initialSelectedIds, players, onConfirm } = props;
  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelectedIds);

  const handleSelectPlayer = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(players.map((player) => player.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onConfirm(selectedIds);
    }}>
      <div className="p-10 flex flex-col items-center gap-4">
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
              {players.map((player) => (
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
        <button type="submit"
          className="h-8 px-3 text-sm font-medium text-white bg-blue-500 border border-blue-300 rounded-md shadow-sm hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 transition-colors cursor-pointer"
        >
          確定
        </button>
      </div>
    </form>
  )
}
