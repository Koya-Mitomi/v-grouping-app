'use client';

import { EventInputs } from "@/types/event";
import { SubmitHandler, useForm } from "react-hook-form";

export const EventForm = (props: {formname: string; defaults: EventInputs; isLoading: boolean; onSubmit: SubmitHandler<EventInputs>}) => {
  const { formname, defaults, isLoading, onSubmit } = props;
  const { register, handleSubmit, formState: { errors } } = useForm<EventInputs>();
  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">{formname}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
        <div className='flex flex-col items-center w-full'>
          <input 
            type="text" 
            placeholder="タイトル" 
            {...defaults.title && { defaultValue: defaults.title }}
            className="border p-2 rounded w-64" 
            {...register("title", { required: { value: true, message: "タイトルは必須です" },
              pattern: { value: /^[^\s]+$/, message: 'そのタイトルは無効です' } })}
          />
          {errors.title && <p className='text-red-500 text-sm'>{errors.title?.message}</p>}
        </div>
        <button type='submit' className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer">
          {isLoading ? '処理中...' : formname}
        </button>
      </form>
    </div>
  )
}

export default EventForm;
