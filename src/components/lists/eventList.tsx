'use client';
import { Event } from "@/types/event";
import { DeleteEventButton } from "../buttons/deleteEventButton";
import { useState } from "react";
import { PaginationControl } from "./paginationControl";

export const EventList = (props: { eventList: Event[]; initialCurrentPage: number; initialPageLimit: number; initialSortedState: string }) => {
  const { eventList, initialCurrentPage, initialPageLimit, initialSortedState } = props;
  const sortedEventListById = [...eventList].sort((a, b) => a.id - b.id);
  const sortedEventListByName = [...eventList].sort((a, b) => a.title !== b.title ? a.title.localeCompare(b.title) : a.id - b.id);
  const initialSortedList = initialSortedState === "name" ? sortedEventListByName : sortedEventListById;
  const [sortedEventList, setSortedEventList] = useState<Event[]>(initialSortedList);
  const [isClicked, setIsClicked] = useState(initialSortedState === "name");
  const [sortedState, setSortedState] = useState(initialSortedState);

  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPageLimit);
  const totalPages = Math.ceil(sortedEventList.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayList = sortedEventList.slice(startIndex, startIndex + itemsPerPage);

  // /events/add や /events/[id] に page/limit を渡して、戻ってきた時に同じ状態で表示する

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  };

  const handleSortByName = () => {
    setSortedEventList(sortedEventListByName);
    setIsClicked(true);
    setSortedState("name");
    setCurrentPage(1);
  };

  const handleResetSort = () => {
    setSortedEventList(sortedEventListById);
    setIsClicked(false);
    setSortedState("initial");
    setCurrentPage(1);
  };

  return (
    <div className="p-4 md:p-10 flex flex-col gap-4 w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 text-center">イベント一覧</h1>

      <a
        href={`/events/add?page=${currentPage}&limit=${itemsPerPage}&sorted=${sortedState}`}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer text-center w-full max-w-xs mx-auto"
      >
        イベントを作成
      </a>

      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-4 flex gap-2 flex-wrap items-center">
          <button
            type="button"
            onClick={isClicked ? handleResetSort : handleSortByName}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
          >
            {isClicked ? "元に戻す" : "イベント名でソート"}
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <label htmlFor="event-limit" className="text-sm font-medium text-gray-600">
              表示数:
            </label>
            <select
              id="event-limit"
              value={itemsPerPage}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="px-2 py-2 text-sm bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {[10, 20, 30, 40, 50].map((num) => (
                <option key={num} value={num}>
                  {num}件
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white w-full">
          <table className="w-full text-left border-collapse min-w-[30rem] md:min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-auto md:w-[36rem] px-6 py-4 text-sm text-center font-semibold text-gray-600 whitespace-nowrap">イベント名</th>
                <th className="w-24 px-6 py-4 text-sm text-center font-semibold text-gray-600">削除</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayList.length > 0 ? (
                displayList.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-center text-gray-700 whitespace-nowrap">
                      <a
                        href={`/events/${event.id}?page=${currentPage}&limit=${itemsPerPage}&sorted=${sortedState}`}
                        className="text-blue-700 text-lg cursor-pointer hover:text-blue-900"
                      >
                        {event.title}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <DeleteEventButton id={event.id} title={event.title} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center text-gray-500 italic">
                    まだイベントが登録されていません。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mx-auto mt-2">
        <PaginationControl currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  );
};