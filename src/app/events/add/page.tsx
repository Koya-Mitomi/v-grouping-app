'use client';

import { addEvent } from "@/actions/eventActions/addEvent";
import { BackButton } from "@/components/common/backButton";
import EventForm from "@/components/forms/eventFrom";
import { EventInputs } from "@/types/event";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const AddEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '20';
  
  const onSubmit: SubmitHandler<EventInputs> = async (data) => {
    setIsLoading(true);
    const eventId: number | null = await addEvent(data);
    if (eventId !== null) {
      alert('イベントが追加されました');
      router.refresh();
      router.push(`/events/${eventId}?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`);
    } else {
      alert('イベントの追加に失敗しました。');
    }
    setIsLoading(false);
  }

  return (
    <div className="p-4 md:p-10 flex flex-col items-center gap-4">
      <EventForm formname="イベントを作成" defaults={{ title: "" }} isLoading={isLoading} onSubmit={onSubmit} />
      <BackButton path={`/events?page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`} message="キャンセル" />
    </div>
  )
}

export default AddEvent;
