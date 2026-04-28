'use server';

import { findAllEvents } from "@/actions/eventActions/findEvents";
import { BackButton } from "@/components/common/backButton";
import { EventList } from "@/components/lists/eventList";
import { Event } from "@/types/event";

type EventsPageProps = {
  searchParams?: Promise<{ page?: string; limit?: string; sorted?: string }>;
};

export const Events = async ({ searchParams }: EventsPageProps) => {
  const eventList: Event[] = await findAllEvents();

  // 一覧のページ状態（page/limit）をURLに持たせて、画面遷移後に戻ってきても保持できるようにする
  const resolvedSearchParams = (await searchParams) ?? {};
  const initialCurrentPage = Math.max(1, Number(resolvedSearchParams.page ?? 1));
  const initialPageLimit = Math.max(1, Number(resolvedSearchParams.limit ?? 20));
  const initialSortedState = (resolvedSearchParams.sorted as string) || "initial";

  return (
    <div className="p-4 md:p-10 flex flex-col gap-4 w-full">
      <div className="w-full max-w-4xl mx-auto">
        <EventList eventList={eventList} initialCurrentPage={initialCurrentPage} initialPageLimit={initialPageLimit} initialSortedState={initialSortedState} />
      </div>
      <div className="mx-auto">
        <BackButton path="/" message="戻る" />
      </div>
    </div>
  )
}

export default Events;