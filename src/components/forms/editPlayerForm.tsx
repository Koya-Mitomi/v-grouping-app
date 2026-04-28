'use client';

import { PlayerForm } from "@/components/forms/playerForm";
import { SubmitHandler } from "react-hook-form";
import { PlayerInputs } from "@/types/player";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/common/backButton";
import { editPlayer } from "@/actions/playerActions/editPlayer";

export const EditPlayerForm = (props: { playerId: number; formname: string; defaults: PlayerInputs; page: number; limit: number; sorted: string }) => {
  const { playerId, formname, defaults, page, limit, sorted } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<PlayerInputs> = async (data) => {
    setIsLoading(true);
    if (await editPlayer(data, playerId)) {
      alert('プレイヤーが編集されました');
      router.refresh();
      // 編集後は一覧のpage/limit/sortedを維持したまま戻す
      router.push(`/players?page=${page}&limit=${limit}&sorted=${sorted}`);
    } else {
      alert('プレイヤーの編集に失敗しました。');
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center flex-col gap-4 p-4 md:p-10">
      <PlayerForm formname={formname} defaults={defaults} isLoading={isLoading} onSubmit={onSubmit} />
      <BackButton path={`/players?page=${page}&limit=${limit}&sorted=${sorted}`} message="キャンセル" />
    </div>
  )
}

export default EditPlayerForm;
