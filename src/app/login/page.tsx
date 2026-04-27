'use client';
import { login } from '@/actions/loginActions/login';
import { LoginForm } from '@/components/auth/loginForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form';
import { LoginInputs } from '@/types/login';

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoading(true);
    if (await login(data.email!, data.password!)) {
      alert('ログイン成功');
      router.refresh();
      // ログイン状態で表示が変わるため、トップへ戻して再描画させる
      router.push('/');
    } else {
      alert('メールアドレスまたはパスワードが正しくありません。');
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-10 flex flex-col items-center gap-4">
      <LoginForm formname='ログイン' fields={['email', 'password']} isLoading={isLoading} onSubmit={onSubmit}></LoginForm>
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
