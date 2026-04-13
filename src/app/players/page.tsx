'use server';

import { findAllPlayers } from "@/actions/playerActions/findPlayers";
import { BackButton } from "@/components/backButton";
import { Player } from "@/types/player";

export const Players = async () => {
  const playerList: Player[] = await findAllPlayers();

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 pl-4">プレイヤー一覧</h1>
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">名前</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">ポジション</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">レベル</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">学年</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">性別</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {playerList.length > 0 ? (
              playerList.map((player) => (
                <tr key={player.id} className="transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{player.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{player.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{player.level}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{player.year}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{player.gender}</td>
                  <td className="px-6 py-4">
                    <a href={`/players/edit/${player.id}`} className="text-blue-500 hover:text-blue-700">
                      編集
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">まだプレイヤーが登録されていません。「プレイヤーを追加する」からプレイヤーを追加してください。</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <a href="/players/add" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer text-center">
        プレイヤーを追加する
      </a>
      <BackButton />
    </div>
  )
}

export default Players;