import Link from 'next/link';

export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
      <div className="bg-white border border-red-50 rounded-3xl shadow-xl shadow-red-500/5 p-4 md:p-10 max-w-md w-full animate-in fade-in zoom-in duration-500">
        
        {/* エラーアイコン */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6">
          <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
          認証に失敗しました
        </h1>
        
        <p className="text-gray-600 leading-relaxed mb-8">
          認証リンクの期限が切れているか、すでに使用されています。<br />
          お手数ですが、再度ログインまたは会員登録からやり直してください。
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            href="/login"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            ログイン画面へ戻る
          </Link>
          
          <Link 
            href="/"
            className="w-full py-3 text-sm text-gray-500 hover:text-gray-700 transition-colors underline underline-offset-4"
          >
            トップページへ
          </Link>
        </div>

        <div className="text-xs text-gray-400 border-t border-gray-50 pt-6 mt-6">
          <p>
            解決しない場合は、ブラウザのキャッシュをクリアして再度お試しください。
          </p>
        </div>
      </div>
    </div>
  );
}