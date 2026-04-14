'use client';

import { PlayerForm } from "@/components/playerForm";
import { SubmitHandler } from "react-hook-form";
import { PlayerInputs } from "@/types/player";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/backButton";
import { editPlayer } from "@/actions/playerActions/editPlayer";

export const EditPlayerForm = (props: { playerId: number; formname: string; defaults: PlayerInputs}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<PlayerInputs> = async (data) => {
    setIsLoading(true);
    if (await editPlayer(data, props.playerId)) {
      alert('プレイヤーが編集されました');
      router.refresh();
      router.push('/players');
    } else {
      alert('プレイヤーの編集に失敗しました。');
    }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center flex-col gap-4 p-10">
      <PlayerForm formname={props.formname} defaults={props.defaults} isLoading={isLoading} onSubmit={onSubmit} />
      <BackButton path="/players" />
    </div>
  )
}

export default EditPlayerForm;
