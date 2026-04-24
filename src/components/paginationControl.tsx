'use client';

export const PaginationControl = (props: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const { currentPage, totalPages, onPageChange } = props;

  return (
    <div className="flex items-center gap-4 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-white border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
      >
        前へ
      </button>

      <span className="text-sm font-medium text-gray-700">
        {currentPage} / {totalPages} ページ
      </span>

      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-white border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
      >
        次へ
      </button>
    </div>
  );
};