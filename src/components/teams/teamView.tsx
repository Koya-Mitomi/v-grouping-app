'use client';

import { Player } from "@/types/player";

export const TeamView = (props: { teamName: string; teamMembers: Player[] }) => {
  const { teamName, teamMembers } = props;
return (
    <div className="from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-lg p-3 w-full max-w-[20rem] h-82 flex flex-col">
      <h2 className="text-lg font-bold text-center text-gray-800 my-2 pb-1 border-b-2 border-blue-300 truncate">
        {teamName}
      </h2>
      
      <div className="space-y-1 flex-1 overflow-y-auto pr-1">
        {teamMembers.length > 0 ? (
          teamMembers.map((member, index) => (
            <div key={member.id} className="flex items-center gap-2 p-1 bg-white rounded-lg border border-blue-100 shadow-sm">
              <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full text-[10px] font-semibold flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-sm text-gray-700 font-medium truncate">{member.name}</span>
              <span className="ml-auto text-[10px] text-gray-400">Lv.{member.level}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8 text-sm">メンバーなし</p>
        )}
      </div>
    </div>
  )
}
