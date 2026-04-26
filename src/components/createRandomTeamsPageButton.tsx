'use client';

import { useRouter } from "next/navigation";

export const CreateRandomTeamsPageButton = (props: { eventId: number }) => {
  const { eventId } = props;
  const router = useRouter();

  const onClickButton = () => {
    if (confirm(`ランダムにチームを生成する際、もし既にチームを作成している場合は上書きされます。\n\nプレイヤー選択画面へ移動しますか？`)) {
      router.push(`/events/${eventId}/createTeams`);
    }
  }

  return (
    <button onClick={() => onClickButton()} className="mt-2 inline-block bg-gradient-to-b from-orange-400 to-orange-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-150 cursor-pointer border-2 border-orange-700">
      チームを自動生成
    </button>
  )
}
