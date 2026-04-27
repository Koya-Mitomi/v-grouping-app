'use client';

import { Player } from "@/types/player";

export const TeamViewWithDetail = (props: { teamName: string; teamMembers: Player[] }) => {
  const { teamName, teamMembers } = props;
return (
    <div className="w-full max-w-[26rem] h-[30rem] rounded-xl border border-blue-200 p-3 shadow-lg flex flex-col bg-white">
      <h2 className="text-lg font-bold text-center text-gray-800 my-2 pb-1 border-b-2 border-blue-300 truncate">
        {teamName}
      </h2>
      
      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {teamMembers.length > 0 ? (
          teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="flex items-start gap-2 rounded-lg border border-blue-100 bg-white px-2 py-2 shadow-sm transition-colors"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full text-xs font-semibold flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-800 font-bold truncate">{member.name}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] md:text-[11px] font-medium text-blue-700">
                    {member.position}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-[10px] md:text-[11px] font-medium text-orange-700">
                    Lv.{member.level}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[10px] md:text-[11px] font-medium text-green-700">
                    {member.year}年
                  </span>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] md:text-[11px] font-medium text-gray-700">
                    {member.gender}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">メンバーが登録されていません</p>
        )}
      </div>
    </div>
  )
}
