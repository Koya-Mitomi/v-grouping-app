# V-GROUPING App（バレーボールチーム管理アプリ）

バレーボールの大会・練習・イベントで使える、<strong>プレイヤー管理<strong>と<strong>チーム分け（手動/自動）</strong>を行うためのWebアプリです。  
過去イベントのチーム構成を保存して見返すこともできます。

---

## 主な機能

- <strong>プレイヤー管理<strong>
  - プレイヤーの追加 / 編集 / 削除
  - 一覧表示（ページネーション、ソート）

- <strong>イベント管理<strong>
  - イベントの作成 / 編集 / 削除
  - 一覧表示（ページネーション、ソート）

- <strong>チーム分け<strong>
  - 参加プレイヤーの選択
  - <strong>手動でチームを作成<strong>（メンバー追加・削除）
  - <strong>自動でチームを生成<strong>（ランダム生成）
    - 生成し直し（再生成）可能
    - 条件（ポジション/レベル/学年/性別などの偏り考慮）

- <strong>履歴<strong>
  - イベントごとのチーム構成を保存して後から確認

---

## 画面/ルーティング（例）

- ホーム: `/`
- 使い方: `/howToUse`
- プレイヤー一覧: `/players`
- イベント一覧: `/events`
- イベント詳細: `/events/[id]`

---

## 技術スタック

- Next.js（App Router）
- TypeScript
- Tailwind CSS
- Supabase（Auth / Database）

---

## セットアップ

### 1) 依存関係のインストール

```bash
npm install
```

### 2) 環境変数の設定

Supabaseを利用している場合、`.env.local` を作成し、必要な値を設定してください。

例：

```bash
NEXT_PUBLIC_SUPABASE_URL=xxxx
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=xxxx
```

### 3) 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。