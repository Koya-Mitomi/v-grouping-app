'use client';

import { Player } from "@/types/player";

export const AddTeamMember = (props: { onClickAdd: (players: Player[]) => void; onClickCancel: () => void }) => {
  const { onClickAdd, onClickCancel } = props;
  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold mb-4">チームメンバー追加</h2>
      <button
        className="h-8 px-3 text-sm font-medium text-white bg-blue-500 border border-blue-300 rounded-md shadow-sm hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 transition-colors cursor-pointer"
      >
        追加
      </button>
      <button 
        className="h-8 px-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 transition-colors cursor-pointer"
        onClick={onClickCancel}
      >
        キャンセル
      </button>
    </div>
  )
}
