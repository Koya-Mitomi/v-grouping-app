'use client';

import { EventInputs } from "@/types/event";
import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitButton } from "./submitButton";

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
            placeholder="イベント名" 
            {...defaults.title && { defaultValue: defaults.title }}
            className="border p-2 rounded w-64" 
            {...register("title", { required: { value: true, message: "イベント名は必須です" },
              pattern: { value: /^[^\s]+$/, message: 'そのイベント名は無効です' } })}
          />
          {errors.title && <p className='text-red-500 text-sm'>{errors.title?.message}</p>}
        </div>
        <SubmitButton label={formname} isLoading={isLoading} className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer" />
      </form>
    </div>
  )
}

export default EventForm;
