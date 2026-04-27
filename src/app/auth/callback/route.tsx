import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // 遷移先を取得（指定がなければ '/'）
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createSupabaseServerClient();

    // コードをセッションに交換
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    console.error('Error exchanging code for session:', error);
    return NextResponse.redirect(`${origin}/login`);
  }

  console.error('No code found in the URL');
  return NextResponse.redirect(`${origin}/auth/authCodeError`);
}