'use client';

import { editEventTitle } from "@/actions/eventActions/editEvent";
import { useState } from "react";

export const EventTitle = (props: { eventId: number; initialTitle: string }) => {
  const { eventId, initialTitle } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  const onClickTitleChange = async () => {
    if (await editEventTitle(eventId, title)) {
      setIsEditing(false);
    } else {
      alert('イベントタイトルの変更に失敗しました。');
      setIsEditing(false);
    }
  }

  if (isEditing) {
    return (
      <div className="inline-flex max-w-full items-center justify-center gap-2">
        <input type="text" placeholder="イベントタイトルを入力" value={title} onChange={(e) => setTitle(e.target.value)} className="w-fit max-w-full min-w-0 rounded border p-2 text-center" />
        <button onClick={onClickTitleChange} className="shrink-0 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
          決定
        </button>
      </div>
    )
  }

return (
    <div className="flex flex-wrap w-full items-center justify-center gap-4 md:gap-7 mb-4">
      <h1 className="text-center text-xl md:text-3xl font-bold break-all">{title}</h1>
      <button onClick={() => setIsEditing(true)} className="shrink-0 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
        編集
      </button>
    </div>
  )
}
