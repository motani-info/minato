# 幼児教育アプリ（国立小入試向け）実装用詳細設計書

## 1. プロジェクト概要
- 目的: 5歳児向けの国立小学校入試対策アプリ
- 対象: iPad / タブレット（ブラウザ利用）
- 形式: PWA
- 配信: Cloudflare Pages / Vercel / GitHub Pages
- バックエンド: 不要（フロントエンド完結）

## 2. 技術スタック
- React + Vite + TypeScript
- Konva.js（将来のCanvas問題拡張）
- Tailwind CSS + Framer Motion
- Zustand（状態管理）
- localStorage（学習記録）
- Vitest + Playwright（品質確認）

## 3. UI/UX要件（5歳児向け）
- タップ領域は最小 56x56px
- 誤タップ防止の余白を十分に確保
- テキスト最小化、音声・視覚優先
- 不正解はバツ表示を避け、励まし文言を表示
- iOS Safariでズーム・意図しないジェスチャーを抑制
- 小学生までの漢字は使用可。ただし必ずふりがな（`<ruby><rt>`）を付ける
- 読み上げ機能は不要

## 4. 問題形式
1. 数の整理・マトリクス型
2. 常識・仲間分け型
3. 図形の構成・グリッド型
4. 位置の移動型

## 5. 推奨フォルダ構成
```text
src/
  assets/
    audio/
    images/
    data/
  components/
    Canvas/
    UI/
  hooks/
  pages/
  store/
  utils/
```

## 6. Phase 1（MVP）
- 3x3グリッド問題を1問実装
- 選択式で正誤判定
- localStorage保存
- iPadタッチ操作確認

## 7. 実装時チェック
- `npm run dev` で起動
- `npm run build` 成功
- `npm run type-check` 成功
- 実機（iPad）でタップ操作確認

## 8. 備考
- 画像素材は `plans/mondai/` に配置
- 素材差し替え後に問題データへ反映

## 9. 実装方針（追記）
- `plans/mondai/` 配下の画像は「問題生成の参考資料」として扱う
- 画像をそのまま画面表示することを目的にせず、画像内容を解析してアプリ内問題データを生成する
- 問題データは `src/assets/data` 配下の構造化データ（JSON/TS）へ落とし込み、UIはデータ駆動で描画する
- デザインは子どもが親しみやすい方向を前提とする
- UIテンプレートは、Webで一般公開され再利用実績のあるテンプレートを採用する
- テンプレート利用時はライセンス条件（MIT等）を確認し、必要なクレジットや利用条件を満たす
