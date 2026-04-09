'use client';
import { login } from '@/actions/loginActions/login';
import { Form } from '@/components/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form';
import { Inputs } from '@/components/form';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    if (await login(data.email!, data.password!)) {
      alert('ログイン成功');
      router.refresh();
      router.push('/');
    } else {
      alert('メールアドレスまたはパスワードが正しくありません。');
    }
    setIsLoading(false);
  }

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <Form formname='ログイン' fields={['email', 'password']} isLoading={isLoading} onSubmit={onSubmit}></Form>
      <p>
        初めての方は <a href="/signup" className="text-blue-500 hover:underline">ここ</a> から新規登録してください。
      </p>
      <p>
        パスワードをお忘れの方は <a href="/forgotPassword" className="text-blue-500 hover:underline">ここ</a> からパスワードをリセットしてください。
      </p>
    </div>
  )
};

export default Login;
