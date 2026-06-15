'use client';

import { Player } from "@/types/player";

export const TeamView = (props: { teamName: string; teamMembers: Player[] }) => {
  const { teamName, teamMembers } = props;
  const sortedMembers = [...teamMembers].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-lg p-2 w-full max-w-[20rem] h-82 flex flex-col bg-white resize overflow-auto">
      <h2 className="text-lg font-bold text-center text-gray-800 my-2 pb-1 border-b-2 border-blue-300 truncate px-2">{teamName}</h2>

      <div className="space-y-1 flex-1 overflow-y-auto px-2">
        {sortedMembers.length > 0 ? (
          sortedMembers.map((member, index) => (
            <div
              key={member.id}
              className="flex items-center gap-2 p-1.5 bg-white rounded-lg transition-colors border border-blue-100 shadow-sm"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full text-[10px] font-semibold flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-700 font-medium truncate text-sm">{member.name}</span>
              <span className="text-gray-500 text-sm">学年: {member.year}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8 text-sm">メンバー未登録</p>
        )}
      </div>
    </div>
  )
}
