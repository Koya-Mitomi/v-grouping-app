'use server';

import { findEventById } from "@/actions/eventActions/findEvents";
import { BackButton } from "@/components/backButton";
import { EventTitle } from "@/components/eventTitle";

export const DisplayEvent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const eventId = parseInt(resolvedParams.id);
  const event = await findEventById(eventId);

  if (event === null) {
    return <div className="flex items-center flex-col gap-4 p-10">イベントが見つかりませんでした。</div>;
  }

  return (
    <div className="flex items-center flex-col gap-4 p-10">
      <EventTitle eventId={event.id} initialTitle={event.title} />
      <a href={`/events/${event.id}/addTeam`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        チームを追加
      </a>
      <BackButton path="/events" message="戻る" />
    </div>
  )
}

export default DisplayEvent;
