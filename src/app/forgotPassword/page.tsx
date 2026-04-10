'use client';
import { LoginForm } from '@/components/loginForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form';
import { LoginInputs } from '@/components/loginForm';
import { sendResetEmail } from '@/actions/loginActions/resetPassword';

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoading(true);
    if (await sendResetEmail(data.email!)) {
      alert('確認メールを送信しました。メールを確認してください。');
      sessionStorage.setItem('is_send_email', 'true');
      router.push('/forgotPassword/verify');
    } else {
      alert('メールの送信に失敗しました。もう一度お試しください。');
    }
    setIsLoading(false);
  }

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <LoginForm formname='確認メール送信' fields={['email']} isLoading={isLoading} onSubmit={onSubmit}></LoginForm>
      <p> パスワード再設定用の確認メールを送信します。 </p>
      <p> 登録済みのメールアドレスを入力し、「確認メールを送信」ボタンをクリックしてください。 </p>
    </div>
  )
};

export default ForgotPassword;
