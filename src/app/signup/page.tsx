'use client';
import { Form } from '@/components/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form';
import { Inputs } from '@/components/form';
import { signUp } from '@/actions/loginActions/signup';

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    if (await signUp(data.user_name!, data.email!, data.password!)) {
      alert('メールを確認してください');
      sessionStorage.setItem('is_send_email', 'true');
      router.push('/signup/verify');
    } else {
      alert('サインアップ失敗');
    }
    setIsLoading(false);
  }

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <Form formname='サインアップ' fields={['user_name', 'email', 'password']} isLoading={isLoading} onSubmit={onSubmit}></Form>
      <p> すでにアカウントをお持ちの方は <a href="/login" className="text-blue-500 hover:underline">こちら</a> からログインしてください。</p>
    </div>
  )
};

export default SignUp;
