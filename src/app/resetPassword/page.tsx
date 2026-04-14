'use client';
import { LoginForm } from '@/components/loginForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form';
import { LoginInputs } from '@/types/login';
import { resetPassword } from '@/actions/loginActions/resetPassword';

export const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoading(true);
    if (await resetPassword(data.password!)) {
      alert('パスワードのリセットに成功しました');
      router.push('/');
    } else {
      alert('パスワードのリセットに失敗しました。');
    }
    setIsLoading(false);
  }

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <LoginForm formname='新しいパスワードを入力' fields={['password']} isLoading={isLoading} onSubmit={onSubmit}></LoginForm>
    </div>
  )
};

export default ResetPassword;
