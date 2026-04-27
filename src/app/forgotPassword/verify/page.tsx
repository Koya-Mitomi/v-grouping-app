import { VerifyEmail } from "@/components/auth/verify";

export default function ForgotPasswordVerifyPage() {
  // resetメール送信直後にだけ見せたい画面（直アクセスはVerifyEmail側で弾く）
  return <VerifyEmail message="パスワードの再設定を行ってください。" />;
}