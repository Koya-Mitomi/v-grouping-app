'use server';

import { findEventById } from "@/actions/eventActions/findEvents";
import { EventTitle } from "@/components/eventTitle";

export const DisplayEvent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const eventId = parseInt(resolvedParams.id);
  const event = await findEventById(eventId);

  if (event === null) {
    return <div className="flex items-center flex-col gap-4 p-10">イベントが見つかりませんでした。</div>;
  }

  return (
    <EventTitle eventId={event.id} initialTitle={event.title} />
  )
}

export default DisplayEvent;
