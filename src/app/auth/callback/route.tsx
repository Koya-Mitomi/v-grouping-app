import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createSupabaseServerClient();

  // Supabaseから返ってきた認証コードをセッションに交換する（主にパスワード再設定フロー）
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }

  // リカバリーセッションが張れたら、（パスワード入力の）reset画面へ誘導
    return NextResponse.redirect(new URL('/resetPassword', request.url));
  }
  console.error('No code found in the URL');
  return NextResponse.redirect(new URL('/auth/authCodeError', request.url));
}