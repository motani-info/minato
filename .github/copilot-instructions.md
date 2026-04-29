# Project Guidelines

## Overview
- このリポジトリは、5歳児向け国立小学校入試対策のPWAを対象とする
- 主要要件は「タッチ操作のしやすさ」「安心感のあるフィードバック」「オフライン寄り運用」

## Code Style
- TypeScriptを優先し、`any` を極力避ける
- 小さなコンポーネントに分割し、UIと判定ロジックを分離する
- 命名は意味を優先し、略語を避ける

## Build & Test
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run type-check`（存在する場合）
- `npm run test`（存在する場合）

## iPad / Touch Requirements
- viewportでズーム抑止
- `touch-action` で意図しないジェスチャー抑制
- タップ領域は最小56x56px
- 最小フォント16px（iOS拡大防止）

## UX Principles
- 正解時: 明るい演出 + 短い称賛
- 不正解時: バツを強調せず、再挑戦を促す
- 子ども向けにボタン数を最小化
- 小学生までの漢字は使用可。ただし必ずふりがな（`<ruby><rt>`）を付ける

## Data Handling
- 学習進捗はlocalStorageへ保存
- 復元失敗時は安全側（初期状態）にフォールバック

## Architecture
- 画面表示: `src/components` / `src/pages`
- 状態管理: `src/store`
- データ定義: `src/assets/data`
- 判定ロジック: `src/utils`

## Notes
- 詳細仕様は `plans/gaiyou.md` を参照
- 既存ルールにない設計判断は、理由をコメントかPR説明に残す

## Implementation Policy (Added)
- `plans/mondai/` の画像は「問題の参考資料」として扱い、画像そのものを表示することを主目的にしない
- 画像内容を解析して、問題データを `src/assets/data` の構造化データとして生成する
- UIは問題データ駆動で構築し、画像依存の固定実装を避ける
- デザインは子どもが親しみやすい見た目と操作性を優先する
- デザインテンプレートは、一般公開され再利用実績のあるテンプレートを採用する
- テンプレートはライセンス適合（MIT等）を確認して利用し、必要な表示要件を守る
- 読み上げ機能は不要（実装しない）
