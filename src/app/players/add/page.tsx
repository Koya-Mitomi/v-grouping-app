'use client';

import { PlayerForm } from "@/components/forms/playerForm";
import { SubmitHandler } from "react-hook-form";
import { PlayerInputs } from "@/types/player";
import { addPlayer } from "@/actions/playerActions/addPlayer";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BackButton } from "@/components/common/backButton";

const defaultValues: PlayerInputs = {
  name: "",
  position: "S",
  level: 1,
  year: 1,
  gender: "male",
}

export const AddPlayer = () => {
  // 一覧(/players)のpage/limitを引き回して、追加後に元のページへ戻せるようにする
  const page = useSearchParams().get('page');
  const limit = useSearchParams().get('limit');
  const sorted = useSearchParams().get('sorted');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const onSubmit: SubmitHandler<PlayerInputs> = async (data) => {
    setIsLoading(true);
    if (await addPlayer(data)) {
      alert('プレイヤーが追加されました');
      router.refresh();
      router.push(`/players?page=${page}&limit=${limit}&sorted=${sorted}`);
    } else {
      alert('プレイヤーの追加に失敗しました。');
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center flex-col gap-4 p-4 md:p-10">
      <PlayerForm formname="追加" defaults={defaultValues} isLoading={isLoading} onSubmit={onSubmit} />
      <BackButton path={`/players?page=${page}&limit=${limit}&sorted=${sorted}`} message="キャンセル" />
    </div>
  )
}

export default AddPlayer;
