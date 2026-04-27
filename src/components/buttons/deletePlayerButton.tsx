'use client';

import { deletePlayer } from "@/actions/playerActions/deletePlayer";

export const DeletePlayerButton = (props: { id: number; name: string }) => {
  const { id, name } = props;
  const onClickDelete = async (id: number) => {
    if (confirm(`本当に${name}を削除しますか？`)) {
      if (await deletePlayer(id)) {
        location.reload();
      }
    }
  }

  return (
    <button onClick={() => onClickDelete(id)} className="text-red-500 cursor-pointer hover:text-red-700 whitespace-nowrap">
      削除
    </button>
  )
}
