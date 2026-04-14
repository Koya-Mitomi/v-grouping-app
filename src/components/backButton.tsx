'use client';
import { useRouter } from 'next/navigation';

export const BackButton = (props: { path: string }) => {
  const router = useRouter();

  const handleClickBack = () => {
    router.replace(props.path);
  }
  return (
  <div className="inline-block">
    <button
      onClick={handleClickBack}
      className="h-8 px-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 transition-colors cursor-pointer"
    >
      戻る
    </button>
  </div>
  )
}
