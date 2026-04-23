'use client';

import { useState } from "react";

export const TeamNameLink = (props: { initialTeamName: string; eventId: number; memberIds: number[] }) => {
  const { initialTeamName, eventId, memberIds } = props;
  const [teamName, setTeamName] = useState(initialTeamName);
  const editUrl = `/events/${eventId}/teamDetail/addMembers?teamName=${teamName}&memberIds=${memberIds.join(',')}`;

  return (
  <div className="flex flex-col items-center gap-4">
      <input 
        type="text" 
        name="teamName"
        placeholder="チーム名を入力"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)} 
        className="w-fit max-w-full min-w-120 rounded border p-2 text-center" 
      />
      <a
        href={editUrl}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer text-center"
      >
        チームメンバー編集
      </a>
    </div>
  )
}
