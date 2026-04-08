'use client';
import { Form } from '@/components/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form';
import { Inputs } from '@/components/form';
import { resetPassword } from '@/actions/loginActions/resetPassword';

export const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
      <Form formname='新しいパスワードを入力' fields={['password']} isLoading={isLoading} onSubmit={onSubmit}></Form>
    </div>
  )
};

export default ResetPassword;
