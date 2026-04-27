import { VerifyEmail } from "@/components/auth/verify";

export default function SignupVerifyPage() {
  // signup直後にだけ見せたい画面（直アクセスはVerifyEmail側で弾く）
  return <VerifyEmail message="登録を完了させてください。" />;
}