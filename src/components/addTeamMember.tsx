'use server';

import { BackButton } from "./backButton";

export const AddTeamMember = async ( props: {eventId: number; teamName: string; playerIds: number[]} ) => {
  const { eventId, teamName, playerIds } = props;
  const cancel_url: string = `/events/${eventId}/addTeam?teamName=${teamName}&memberIds=${playerIds.join(',')}`;
  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold mb-4">チームメンバー編集</h2>
      <button
        className="h-8 px-3 text-sm font-medium text-white bg-blue-500 border border-blue-300 rounded-md shadow-sm hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 transition-colors cursor-pointer"
      >
        確定
      </button>
      <BackButton path={cancel_url} message="キャンセル" />
    </div>
  )
}
