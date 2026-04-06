'use client';
import { login } from '@/actions/login';
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';

type LoginInputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoading(true);
    if (await login(data.email, data.password)) {
      alert('ログイン成功');
    } else {
      alert('ログイン失敗');
    }
    setIsLoading(false);
  }

  const {register, handleSubmit, formState: {errors}} = useForm<LoginInputs>({reValidateMode: 'onSubmit'});
  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
        <input type='text' placeholder='メールアドレス' className='border p-2 rounded w-64' 
        {...register('email', { 
          required: {value: true, message: 'メールアドレスは必須です'}, 
            pattern: { value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 
              message: '有効なメールアドレスを入力してください'
            }
        })} />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        <input type='password' placeholder='パスワード' className='border p-2 rounded w-64' 
        {...register('password', { 
          required: {value: true, message: 'パスワードは必須です'}, 
            pattern: { value: /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
              message: 'パスワードは8文字以上32文字以下で、英字と数字を両方含む必要があります'
            }
        })} />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        <button type='submit' className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400">
          {isLoading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
    </div>
  )
};

export default Login;
