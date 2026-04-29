# Problem Creation Workflow

このファイルは、新しい問題を作成・追加するための実用的なステップバイステップガイドです。

## クイックスタート

### 1. 問題画像の取得と分析

```bash
# mondai/202604/ に問題画像を配置
cp /path/to/problem-image.jpg mondai/202604/
```

**分析チェックリスト**:
- [ ] 画像は何を示しているか？（グリッド問題 or 選択肢問題）
- [ ] 正解は何か？（回答画像がある場合は確認）
- [ ] 難易度は？（obvious = easy, reasoning = normal）
- [ ] カテゴリは？（shape = grid, classification = choice）

### 2. 問題データの作成

`src/assets/data/questions.ts` を編集して、新しい問題オブジェクトを追加します。

#### Grid Question の例

```typescript
{
  id: 'grid-07',  // 次の利用可能なID
  type: 'grid',
  difficulty: 'easy',  // 'easy' or 'normal'
  category: 'shape',   // 'shape' or 'classification'
  title: 'かたち を みつけよう 3',
  prompt: 'つぎの かたちを ぜんぶ えらびましょう',
  modelPattern: [
    [true, true, false],
    [false, true, false],
    [false, true, false],
  ],
  options: [
    { id: 'A', pattern: [[true, true, false], [false, true, false], [false, true, false]] },
    { id: 'B', pattern: [[true, false, false], [true, false, false], [true, false, false]] },
    { id: 'C', pattern: [[true, true, true], [false, false, false], [false, false, false]] },
    { id: 'D', pattern: [[false, true, false], [false, true, false], [false, true, false]] },
  ],
  correctOptionId: 'A',
}
```

#### Choice Question の例

```typescript
{
  id: 'choice-04',
  type: 'choice',
  difficulty: 'normal',
  category: 'classification',
  title: 'どうぶつ の なかま は？',
  prompt: 'どうぶつ の グループ に は い らない もの を え ら んでね',
  options: [
    { id: 'A', label: 'ネコ' },
    { id: 'B', label: 'イヌ' },
    { id: 'C', label: 'トマト' },
    { id: 'D', label: 'ウサギ' },
  ],
  correctOptionId: 'C',
}
```

**重要なルール**:
- ✅ すべての漢字に ふりがな をつける（ruby タグ使用）
- ✅ カタカナ は利用可能
- ✅ Prompt は簡潔に（1文まで）
- ✅ ID は連番（重複なし）
- ✅ correctOptionId は options 配列内の id と一致すること

### 3. ビルド・型チェック

```bash
cd /Users/motani/Develop/github/minato

# ビルド実行（TypeScript チェック含む）
npm run build
```

エラーが出た場合：
- `id` が一意か確認
- `correctOptionId` が options 内に存在するか確認
- `pattern` が 3×3 boolean 配列か確認

### 4. ローカルテスト

```bash
# 開発サーバー起動（既に起動している場合はスキップ）
npm run dev
```

ブラウザで http://localhost:5173/ を開く：

1. **メニュー画面**: 難易度と分類を選択
2. **問題画面**: 新しい問題が表示されているか確認
3. **回答テスト**:
   - 正解をクリック → 「◯ せいかい！」が表示されるか
   - 不正解をクリック → 「✕ ざんねん」が表示されるか
4. **localStorage 確認**: ページをリロードして、進捗が保持されるか

### 5. トラブルシューティング

| 問題 | 原因 | 解決策 |
|------|------|---------|
| 問題が表示されない | ID が次のシーケンスと合わない | ID を確認、PROBLEMS 配列に追加されているか確認 |
| Grid が正しく描画されない | pattern が 3×3 でない | モデルとすべてのオプションで正確に 3×3 を確認 |
| テキストが切れる | ラベルが長すぎる | 短縮するか、複数行に分割 |
| 正解が反映されない | correctOptionId の typo | 大文字 A/B/C/D か確認 |
| ビルド失敗 | TypeScript エラー | `npm run build` でエラー箇所を確認 |

---

## 問題 ID の割り当て

**現在使用中**:
- `grid-01` ~ `grid-06` ✅
- `choice-01` ~ `choice-03` ✅

**次に使用可能**:
- `grid-07`
- `choice-04`

**ルール**: 常に連番を使用。削除された ID を再利用しない。

---

## 実装例: mondai/202604 からの問題抽出

### Image 1: 「対角線パターン」
**ファイル**: `mondai/202604/diagonal.jpg`

**分析**:
- タイプ: GridQuestion
- モデル: 左上→右下の対角線
- 難易度: easy
- カテゴリ: shape

**問題データ**:
```typescript
{
  id: 'grid-07',
  type: 'grid',
  difficulty: 'easy',
  category: 'shape',
  title: 'たいかくせん を みつけよう',
  prompt: 'つぎの かたちは どれ？',
  modelPattern: [
    [true, false, false],
    [false, true, false],
    [false, false, true],
  ],
  options: [
    { id: 'A', pattern: [[true, false, false], [false, true, false], [false, false, true]] },
    { id: 'B', pattern: [[true, true, true], [false, false, false], [false, false, false]] },
    { id: 'C', pattern: [[false, false, true], [false, true, false], [true, false, false]] },
    { id: 'D', pattern: [[true, true, false], [false, true, true], [false, false, true]] },
  ],
  correctOptionId: 'A',
}
```

---

## スキル連携

このワークフローは、以下の AI スキルと統合されています：

- **Problem Creation Skill** (`.github/skills/problem-creation/SKILL.md`): 詳細な手順書
- **Copilot Instructions** (`.github/copilot-instructions.md`): コード スタイルと UX ルール

**新しい問題を追加する際は、常にこの README + SKILL.md を参照してください。**

---

## よくある質問

**Q: 正解が複数ある場合は？**  
A: `correctOptionId` は1つだけです。教育的に最適な正解を1つ選んでください。

**Q: 問題の難易度をどう決める？**  
A: `easy` = 直感的に解ける（5歳が30秒以内）、`normal` = 少し考える必要あり（60秒以内）

**Q: ふりがなはどこまで必要？**  
A: 小学生までの常用漢字に ふりがな をつけてください。ひらがな・カタカナは不要。

**Q: localStorage 永続化のテストは？**  
A: ブラウザの DevTools → Application → Local Storage → `http://localhost:5173` で確認できます。

---

## 次のステップ

1. ✅ このワークフローを理解する
2. ⏳ `mondai/202604/` の各画像を分析
3. ⏳ 問題データを生成
4. ⏳ ローカルテスト実施
5. ⏳ 修正・最適化

**サポート**: わからないことがあれば、Copilot に問い合わせてください。

