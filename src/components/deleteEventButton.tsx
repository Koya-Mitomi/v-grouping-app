'use client';

import { deleteEvent } from "@/actions/eventActions/deleteEvent";

export const DeleteEventButton = (props: { id: number; title: string }) => {
  const { id, title } = props;
  const onClickDelete = async (id: number) => {
    if (confirm(`本当に${title}を削除しますか？`)) {
      if (await deleteEvent(id)) {
        location.reload();
      }
    }
  }

  return (
    <button onClick={() => onClickDelete(id)} className="text-red-500 cursor-pointer hover:text-red-700">
      削除
    </button>
  )
}
