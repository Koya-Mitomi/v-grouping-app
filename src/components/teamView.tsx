'use client';

import { Player } from "@/types/player";

export const TeamView = (props: { teamName: string; teamMembers: Player[] }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-lg p-6 w-80 h-96 flex flex-col">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 pb-4 border-b-2 border-blue-300 truncate">{props.teamName}</h2>
      
      <div className="space-y-2 flex-1 overflow-y-auto">
        {props.teamMembers.length > 0 ? (
          props.teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="flex items-center gap-4 p-3 bg-white rounded-lg transition-colors border border-blue-100 shadow-sm"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-semibold flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-gray-700 font-medium truncate">{member.name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">メンバーが登録されていません</p>
        )}
      </div>
    </div>
  )
}
