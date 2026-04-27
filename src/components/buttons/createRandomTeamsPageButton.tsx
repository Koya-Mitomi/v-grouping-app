'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { set } from "react-hook-form";

export const CreateRandomTeamsPageButton = (props: { eventId: number }) => {
  const { eventId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClickButton = () => {
    setIsLoading(true);
    if (confirm(`ランダムにチームを生成する際、もし既にチームを作成している場合は上書きされます。\n\nプレイヤー選択画面へ移動しますか？`)) {
      router.push(`/events/${eventId}/createTeams`);
    } else {
      setIsLoading(false);
    }
  }

  return (
    <button disabled={isLoading} onClick={() => onClickButton()} className="mt-2 inline-block bg-orange-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-150 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-400 border-2 border-orange-700">
      {isLoading ? '処理中...' : 'チームを自動生成'}
    </button>
  )
}
