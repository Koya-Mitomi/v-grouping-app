'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Verify = () => {
  const [checking, isChecking] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem('is_send_email') !== 'true') {
      router.push('/');
    } else {
      isChecking(false);
    }
  }, [router]);

  if (checking) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
      
      <div className="bg-white border border-blue-100 rounded-3xl shadow-xl shadow-blue-500/5 p-10 max-w-md w-full animate-in fade-in zoom-in duration-500">
        
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-6">
          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          メールを確認してください
        </h1>
        
        <p className="text-gray-600 leading-relaxed mb-8">
          ご入力いただいたメールアドレスに確認用リンクを送信しました。<br />
          <span className="font-semibold text-blue-600">メール内のリンクをクリック</span>して、登録を完了させてください。
        </p>

        <div className="text-xs text-gray-400 border-t border-gray-50 pt-6">
          <p>
            メールが届かない場合は、迷惑メールフォルダを<br />
            ご確認いただくか、再度お試しください。
          </p>
        </div>
      </div>
    </div>
  )
}

export default Verify;
