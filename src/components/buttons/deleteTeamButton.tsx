'use client';

import { deleteTeam } from "@/actions/teamActions/deleteTeam";

export const DeleteTeamButton = (props: { id: number; name: string }) => {
  const { id, name } = props;
  const onClickDelete = async (id: number) => {
    if (confirm(`本当に${name}を削除しますか？`)) {
      if (await deleteTeam(id)) {
        location.reload();
      }
    }
  }

  return (
    <button onClick={() => onClickDelete(id)} className="mt-2 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
      削除
    </button>
  )
}
