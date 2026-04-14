'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginInputs } from '@/types/login';

export const LoginForm = (props: { formname: string; fields: (keyof LoginInputs)[]; isLoading: boolean; onSubmit: SubmitHandler<LoginInputs> }) => {
  const { formname, fields, isLoading, onSubmit } = props;
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>();
  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">{formname}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
          {fields.map((field) => (
            <div key={field} className='flex flex-col items-center w-full'>
              <input 
                type={field === 'password' ? 'password' : 'text'} 
                placeholder={field === 'user_name' ? 'ユーザー名' : field === 'email' ? 'メールアドレス' : 'パスワード'}
                className='border p-2 rounded w-64' 
                {...register(field, {
                  required: { value: true, message: `${field === 'user_name' ? 'ユーザー名' : field === 'email' ? 'メールアドレス' : 'パスワード'}は必須です` },
                  pattern: field === 'user_name' ? { value: /^[0-9a-zA-Zぁ-んァ-ヶ一-龠々ー]+$/, message: 'そのユーザー名は無効です' } :
                          field === 'email' ? { value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, message: '有効なメールアドレスを入力してください' } :
                          field === 'password' ? { value: /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/, message: 'パスワードは8文字以上32文字以下で、英字と数字を両方含む必要があります' } : undefined
                })}
              />
              {errors[field] && <p className='text-red-500 text-sm'>{errors[field]?.message}</p>}
            </div>
          ))}
          <button type='submit' className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 cursor-pointer">
            {isLoading ? '処理中...' : formname}
          </button>
        </form>
    </div>
  )
}
