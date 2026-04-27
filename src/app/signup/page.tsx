'use client';
import { LoginForm } from '@/components/auth/loginForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form';
import { LoginInputs } from '@/types/login';
import { signUp } from '@/actions/loginActions/signup';

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoading(true);
    if (await signUp(data.user_name!, data.email!, data.password!)) {
      alert('メールを確認してください');

  // verify画面を直アクセスされた場合のガード用（送信フロー経由かどうか）
      sessionStorage.setItem('is_send_email', 'true');
      router.push('/signup/verify');
    } else {
      alert('サインアップ失敗');
    }
    setIsLoading(false);
  }

  return (
    <div className="p-4 md:p-10 flex flex-col items-center gap-4">
      <LoginForm formname='サインアップ' fields={['user_name', 'email', 'password']} isLoading={isLoading} onSubmit={onSubmit}></LoginForm>
      <p> すでにアカウントをお持ちの方は <a href="/login" className="text-blue-500 hover:underline">ここ</a> からログインしてください。</p>
    </div>
  )
};

export default SignUp;
