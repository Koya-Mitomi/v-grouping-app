'use client';

import { useFormStatus } from 'react-dom';

export const SubmitButton = (props: { label: string; className?: string; isLoading?: boolean }) => {
  const { label, className, isLoading } = props;
  const { pending } = useFormStatus();
  const disabled = pending || isLoading;

  return (
    <button
      type="submit"
      disabled={disabled}
      className={className || "px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-center transition-colors"}
    >
      {disabled ? '処理中...' : label}
    </button>
  );
};