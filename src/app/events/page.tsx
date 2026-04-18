'use server';

import { findAllEvents } from "@/actions/eventActions/findEvents";
import { BackButton } from "@/components/backButton";
import { DeleteEventButton } from "@/components/deleteEventButton";
import { Event } from "@/types/event";

export const Events = async () => {
  const eventList: Event[] = await findAllEvents();

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 pl-4">イベント一覧</h1>
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-[36rem] px-6 py-4 text-sm text-center font-semibold text-gray-600">イベント名</th>
              <th className="w-24 px-6 py-4 text-sm text-center font-semibold text-gray-600">削除</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {eventList.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4 text-sm text-center text-gray-700">
                  <a href={`/events/${event.id}`} className="text-blue-700 text-lg cursor-pointer hover:text-blue-900">
                    {event.title}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <DeleteEventButton id={event.id} title={event.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="/events/add" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer text-center">
        イベントを作成
      </a>
      <BackButton path="/" message="戻る" />
    </div>
  )
}

export default Events;