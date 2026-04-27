export const HomeWithNotLoggedIn = () => {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-8 shadow-sm sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              V-GROUPING App
            </p>
            <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              バレーボールチーム管理アプリへようこそ！
            </h1>
            <p className="mt-6 text-pretty text-base leading-7 text-gray-700 sm:text-lg">
              このアプリでは、バレーボール大会またはイベントでのチーム分け、過去大会のチーム保存などができ、
              バレーボールサークルでの普段のチーム分けや大会のチーム分け、チーム管理など汎用的に使うことができます
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/howToUse"
                className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto"
              >
                詳しい機能や使い方はこちら
              </a>
              <p className="text-xs text-gray-500">
                ※ 詳細ページは準備中です
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-gray-900">チーム分け</p>
              <ol className="pl-4 mt-1 text-sm text-gray-600 list-decimal list-outside space-y-1">
                <li>イベントごとにメンバーを選んで手動でチーム分け。</li>
                <li>参加プレイヤーを選択し、自動でサクッとチーム分け。</li>
              </ol>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-gray-900">チームの保存</p>
              <p className="mt-1 text-sm text-gray-600">過去のチーム構成を後から見返せます。</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-semibold text-gray-900">汎用的に利用</p>
              <p className="mt-1 text-sm text-gray-600">普段の練習から大会まで幅広く活用可能。</p>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200 pt-6">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
              <a
                href="/login"
                className="font-semibold text-blue-700 hover:text-blue-900 hover:underline"
              >
                ログイン
              </a>
              <span className="text-gray-500">初めての方は</span>
              <a
                href="/signup"
                className="font-semibold text-blue-700 hover:text-blue-900 hover:underline"
              >
                新規登録
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
