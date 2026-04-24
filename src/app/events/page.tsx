'use server';

import { findAllEvents } from "@/actions/eventActions/findEvents";
import { BackButton } from "@/components/backButton";
import { DeleteEventButton } from "@/components/deleteEventButton";
import { EventList } from "@/components/eventList";
import { Event } from "@/types/event";

export const Events = async () => {
  const eventList: Event[] = await findAllEvents();

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <EventList eventList={eventList} />
      <a href="/events/add" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer text-center">
        イベントを作成
      </a>
      <BackButton path="/" message="戻る" />
    </div>
  )
}

export default Events;