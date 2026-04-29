# みなトレ - 国立小学入試対策 PWA

5 歳児向けの国立小学入試対策アプリ。タッチ操作のしやすさと安心感のあるフィードバックを重視した学習用 PWA です。

## 🚀 クイックスタート

### 開発サーバーを起動
```bash
npm install
npm run dev
```

ブラウザで http://localhost:5173/ にアクセスしてください。

### ビルド（本番化）
```bash
npm run build
```

`dist/` ディレクトリに本番用ファイルが生成されます。

## 📦 GitHub Pages への公開

### 前提条件
- GitHub リポジトリ https://github.com/motani-info/minato が作成済み
- SSH キーまたは Personal Access Token (PAT) が設定済み

### デプロイ手順

1. **初回のみ**: GitHub に push
```bash
git push -u origin main
```

2. GitHub Actions が自動実行
   - `.github/workflows/deploy.yml` が `main` ブランチ更新時に起動
   - `npm run build` でビルド実行
   - 結果を GitHub Pages にデプロイ

3. デプロイ完了後
   - **公開 URL**: https://motani-info.github.io/minato/
   - Settings → Pages で確認可能

### トラブルシューティング

| エラー | 原因 | 解決策 |
|-------|------|--------|
| `Repository not found` | GitHub リポジトリ未作成 | https://github.com/new で新規作成 |
| Permission denied | 認証情報なし | SSH キーまたは PAT を設定 |
| Actions 実行されない | Pages 設定が無効 | Settings → Pages → `Deploy from a branch` → `gh-pages` |

## 📋 プロジェクト構成

```
src/
  ├── App.tsx                    # メインアプリ（メニュー・クイズ・結果）
  ├── components/
  │   └── GridDisplay.tsx       # 3×3 グリッド描画
  ├── hooks/
  │   └── useLocalStorage.ts    # localStorage 管理
  ├── store/
  │   └── types.ts              # 型定義
  └── assets/data/
      └── questions.ts          # 問題データ
mondai/
  ├── README.md                 # 問題作成ワークフロー
  └── 202604/                   # 問題用画像フォルダ
.github/
  ├── skills/
  │   └── problem-creation/
  │       └── SKILL.md          # 問題作成スキル
  └── workflows/
      └── deploy.yml            # GitHub Actions ワークフロー
```

## 🎮 アプリ機能

- **メニュー**: 難易度（やさしい/ふつう）と分類（かたち/なかまわけ）を選択
- **ランダム化**: 選択した問題をシャッフルして出題
- **グリッド問題**: 3×3 パターン認識
- **選択問題**: テキストオプションから正解を選択
- **フィードバック**: 正解時「◯ せいかい！」、不正解時「✕ ざんねん」
- **スコア表示**: リアルタイム更新
- **localStorage**: 学習進捗を自動保存

## 📝 新しい問題を追加する

`.github/skills/problem-creation/SKILL.md` または `mondai/README.md` を参照してください。

### クイック例

`src/assets/data/questions.ts` に以下を追加：

```typescript
{
  id: 'choice-04',
  type: 'choice',
  difficulty: 'easy',
  category: 'classification',
  title: 'なかまは どれ？',
  prompt: 'どうぶつ の グループに はいらない もの を えらんでね',
  options: [
    { id: 'A', label: 'ネコ' },
    { id: 'B', label: 'イヌ' },
    { id: 'C', label: 'トマト' },
    { id: 'D', label: 'ウサギ' },
  ],
  correctOptionId: 'C',
}
```

その後 `npm run build && npm run dev` でテストしてください。

## 🛠️ 技術スタック

- **React 19** + Vite 6 + TypeScript 5.x
- **Framer Motion**: アニメーション
- **Tailwind CSS 4**: スタイリング
- **localStorage**: データ永続化
- **SVG**: グリッド描画

## ♿ アクセシビリティ

- WCAG 2.1 AA 準拠
- iOS Safari 対応（100dvh、safe-area-inset）
- タップ領域 56×56px 以上
- 最小フォント 16px

## 📖 設計ドキュメント

詳細な仕様は `plans/gaiyou.md` を参照してください。

---

**開発者向け**: `.github/copilot-instructions.md` でコード規約を確認してください。
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
