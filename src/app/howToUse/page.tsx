import { BackButton } from '@/components/common/backButton';

const Step = ({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {step}
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <div className="mt-2 text-sm leading-6 text-gray-700">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default function HowToUsePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-white justify-center min-h-[80vh] p-4">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-8 shadow-sm sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              GUIDE
            </p>
            <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              このアプリの機能と使い方
            </h1>
            <p className="mt-6 text-pretty text-sm leading-6 text-gray-700 sm:text-base">
              バレーボールのイベント（大会・練習など）ごとに、参加者からチームを作成・保存できるアプリです。
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12">
            <Step step={1} title="プレイヤーを登録する（プレイヤー一覧）">
              <ol className="list-decimal space-y-1 pl-5">
                <li>
                  <span className="font-semibold">
                    プレイヤー一覧
                  </span>
                  へ移動します。
                </li>
                <li>「プレイヤーを追加する」から、名前などを入力してプレイヤーを作成します。</li>
                <li>作成したプレイヤーは編集・削除もできます。</li>
              </ol>
              <p className="mt-3 text-gray-600">
                ※ チーム分けは「プレイヤー」が揃っているとスムーズです。
              </p>
            </Step>

            <Step step={2} title="イベントを作成する（イベント一覧）">
              <ol className="list-decimal space-y-1 pl-5">
                <li>
                  <span className="font-semibold">
                    イベント一覧
                  </span>
                  へ移動します。
                </li>
                <li>「イベントを作成」から、イベント名を登録します。</li>
                <li>イベントを作ると、そのイベントの詳細ページに進めます。</li>
                <li>イベント一覧からイベント名をクリックすることで、詳細ページに移動し、編集することができます。</li>
              </ol>
            </Step>

            <Step step={3} title="参加メンバーを選ぶ → チームを作る（手動 / 自動）">
              <p>
                イベント詳細ページでは、参加するプレイヤーを選んでチームを作成できます。
                手動でチーム分けをする方法と、ランダムで自動分けする方法の両方が使えます。
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700">
                <li>手動分けの場合、「チームを追加」→「チーム名やメンバーの編集」→「保存」の流れでチームを作成できます。</li>
                <li>
                  自動分けの場合、「チームを自動生成」→「参加プレイヤーの選択と条件の設定」→「ランダムにチームを生成」→「チームを確定」の流れでチームを作成できます。
                  <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700">
                    <li>「ランダムにチームを生成」を押し直すことで、チームを再生成できます。</li>
                    <li>ポジションの偏り考慮、レベルの偏り考慮、学年の偏り考慮、性別の偏り考慮などの条件をつけることが可能です。</li>
                    <li>ただし、条件の優先順位は「セッター、リベロなどの特殊ポジション」→「レベル」→「性別」→「学年」→「その他のポジション」となるため、複数条件付けをする場合は優先度の低いものは多少偏る可能性があります。</li>
                    <li>学年ごとにチーム分けをすることも可能です。</li>
                    <li>チームを自動生成して確定したあと、手動で微調整することも可能です。</li>
                  </ul>
                </li>
              </ul>
            </Step>

            <Step step={4} title="チームを保存して、あとから見返す">
              <p>
                作成したチームはイベントに紐づけて保存できます。過去のイベントを開くことで、当時のチーム構成をいつでも見返せます。
              </p>
              <p className="mt-3 text-gray-600">
                大会の履歴管理や、いつも同じメンバーに偏らないチーム分けの参考にもなります。
              </p>
            </Step>
          </div>
        </div>
      </div>
      <BackButton path='/' message='戻る' />
    </div>
  );
}
