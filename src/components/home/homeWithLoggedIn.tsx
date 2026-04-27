import Link from 'next/link';

type HomeLinkCardProps = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

const HomeLinkCard = ({ title, description, href, cta }: HomeLinkCardProps) => {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
      <p className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 group-hover:text-blue-900 group-hover:underline">
        {cta}
        <span aria-hidden className="ml-1">
          →
        </span>
      </p>
    </Link>
  );
};

export const HomeWithLoggedIn = () => {
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
            <p className="mt-4 text-pretty text-sm leading-6 text-gray-700 sm:text-base">
              まずはプレイヤーを登録して、イベントを作って、チーム分けを始めましょう。
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3">
            <HomeLinkCard
              title="このアプリの機能と使い方"
              description="できること・基本的な流れを確認できます。"
              href="/howToUse"
              cta="使い方を見る"
            />
            <HomeLinkCard
              title="プレイヤー一覧"
              description="プレイヤーの追加・編集・削除ができます。"
              href="/players"
              cta="プレイヤー一覧へ"
            />
            <HomeLinkCard
              title="イベント一覧"
              description="イベント作成・参加メンバー選択・チーム分けに進めます。"
              href="/events"
              cta="イベント一覧へ"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
