'use client'; // ブラウザ側で動くプログラムであることを宣言します

import { useState } from 'react';
import { supabase } from '@/lib/supabase'; // 先ほど作った設定ファイルを読み込みます

export default function TestAuthPage() {
  const [message, setMessage] = useState('ボタンを押してテスト登録を開始');
  const [loading, setLoading] = useState(false);

  const handleTestSignup = async () => {
    setLoading(true);
    setMessage('登録中...');

    // 1. Supabase Auth にユーザーを登録する（テスト用のアドレスとパスワード）
    // 本来は入力フォームを作りますが、今回は確認のため固定値にします
    const testEmail = `test@example.com`; // 重複しないように現在の時刻を混ぜます
    const testPassword = 'password123';

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (authError) {
      setMessage(`Authエラー: ${authError.message}`);
      setLoading(false);
      return;
    }

    const user = authData.user;

    if (user) {
      // 2. Auth登録に成功したら、そのIDを使って profiles テーブルにデータを追加する
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: user.id, // Authが発行した世界に一つだけのID
            user_name: 'テストユーザー', 
            email: testEmail 
          },
        ]);

      if (profileError) {
        setMessage(`DBエラー: ${profileError.message}`);
      } else {
        setMessage(`成功！ 登録メール: ${testEmail}`);
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-10 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">疎通確認用ページ</h1>
      <p className="p-4 bg-gray-100 rounded">{message}</p>
      <button
        onClick={handleTestSignup}
        disabled={loading}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? '処理中...' : 'テストユーザーを登録してみる'}
      </button>
    </div>
  );
}