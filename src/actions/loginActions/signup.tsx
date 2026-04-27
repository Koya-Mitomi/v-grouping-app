'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getURL } from '@/lib/utils';

/**
 * サインアップを実行するServer Action
 * プロフィール作成はDB側のトリガーで自動実行されるため、ここではAuth登録のみを行う
 */
export async function signUp(user_name: string, email: string, password: string) {
  const supabase = await createSupabaseServerClient();

  // Supabase Authにユーザーを作成
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // raw_user_meta_dataに保存され、DBトリガーから参照可能になる
      data: {
        user_name: user_name,
      },
      // メール認証後のリダイレクト先を指定
      emailRedirectTo: `${getURL()}auth/callback?next=/`
    }
  });

  if (signUpError) {
    console.error('Error signing up:', signUpError);
    return false;
  }

  // プロフィール（profilesテーブル）の挿入はDBトリガーが自動で行うため
  // ここでの insert 処理は不要になりました。

  return true;
}