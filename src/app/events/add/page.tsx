'use client';

import { addEvent } from "@/actions/eventActions/addEvent";
import EventForm from "@/components/eventFrom";
import { EventInputs } from "@/types/event";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const AddEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const onSubmit: SubmitHandler<EventInputs> = async (data) => {
    setIsLoading(true);
    if (await addEvent(data)) {
      alert('イベントが追加されました');
      router.refresh();
      router.push('/events');
    } else {
      alert('イベントの追加に失敗しました。');
    }
    setIsLoading(false);
  }

  return (
    <EventForm formname="イベントを作成" defaults={{ title: "" }} isLoading={isLoading} onSubmit={onSubmit} />
  )
}

export default AddEvent;
