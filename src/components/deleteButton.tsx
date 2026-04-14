'use client';

import { deletePlayer } from "@/actions/playerActions/deletePlayer";

export const DeleteButton = (props: { id: number; name: string }) => {
  const onClickDelete = async (id: number) => {
    if (confirm(`本当に${props.name}を削除しますか？`)) {
      if (await deletePlayer(id)) {
        location.reload();
      }
    }
  }

  return (
    <button onClick={() => onClickDelete(props.id)} className="text-red-500 cursor-pointer hover:text-red-700">
      削除
    </button>
  )
}
