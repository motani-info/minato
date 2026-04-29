# Problem Creation Skill

**Purpose**: Create structured problem data from visual materials (photos, sketches, reference images) and add them to the quiz application.

**When to use**: Adding new problems to `src/assets/data/questions.ts` for the 5-year-old entrance exam prep app.

**Not for**: Modifying existing problem data, changing problem types, or refactoring the problem model.

---

## Workflow

### Phase 1: Image Analysis

1. **Visual Inspection**
   - Examine the source image (photo, scan, or sketch)
   - Identify problem type:
     - **GridQuestion**: 3×3 grid pattern matching (e.g., "What comes next?")
     - **ChoiceQuestion**: Select correct answer from text options (e.g., "Which one is correct?")
   - Note the visual elements (shapes, colors, quantities, relationships)

2. **Extract Problem Intent**
   - Read any text/instructions in Japanese (with furigana if present)
   - Identify the question being asked
   - Note any hints or visual clues
   - If an answer image exists, extract correct answer and validate

3. **Determine Difficulty & Category**
   - **Difficulty**: 'easy' (obvious pattern) or 'normal' (requires reasoning)
   - **Category**: 'grid' (pattern match) or 'choice' (selection)
   - Logic: First time problems default to 'easy'; adjust after validation

### Phase 2: Data Structure

Create a problem object matching TypeScript types in `src/store/types.ts`:

#### GridQuestion Template
```typescript
{
  id: 'grid-NNN',                          // Unique ID (NNN = sequential)
  type: 'grid',
  title: 'かたちを みつけよう NNN',       // Problem title with furigana
  prompt: 'つぎの かたちは なんでしょう？', // Question prompt
  pattern: [
    [true, false, true],                   // 3×3 grid of booleans
    [false, true, false],                  // true = filled, false = empty
    [true, false, true],
  ],
  correctOptionId: 'A',                    // Visual position (A/B/C/D)
  options: [
    { id: 'A', pattern: [[true, false, true], [false, true, false], [true, false, true]] },
    { id: 'B', pattern: [[true, true, true], [true, true, true], [true, true, true]] },
    { id: 'C', pattern: [[false, true, false], [true, true, true], [false, true, false]] },
    { id: 'D', pattern: [[true, true, false], [false, true, true], [false, true, true]] },
  ],
  difficulty: 'easy',                      // 'easy' or 'normal'
  category: 'grid',                        // Problem category
}
```

#### ChoiceQuestion Template
```typescript
{
  id: 'choice-NNN',
  type: 'choice',
  title: 'ただしい ものは どれでしょう？',  // Problem title with furigana
  prompt: 'つぎの なか で、ただしい ものは どれでしょう？', // Question prompt
  correctOptionId: 'A',                    // Correct option ID (A/B/C/D)
  options: [
    { id: 'A', label: 'りんご 3 こ' },    // Option text (with furigana)
    { id: 'B', label: 'りんご 5 こ' },
    { id: 'C', label: 'みかん 2 こ' },
    { id: 'D', label: 'バナナ 1 本 ほん' }, // Katakana allowed
  ],
  difficulty: 'easy',
  category: 'choice',
}
```

**Rules for Text**:
- Always include furigana using HTML ruby tags: `<ruby>漢字<rt>かんじ</rt></ruby>`
- Hiragana for instruction text
- Katakana is allowed (mark with furigana if uncommon)
- No voice-over or audio hints
- Maximum 1 sentence per prompt (keep it simple for 5yo)

### Phase 3: Integration & Testing

1. **Add to questions.ts**
   - Open `src/assets/data/questions.ts`
   - Copy new problem object to the `PROBLEMS` array
   - Ensure TypeScript compilation passes: `npm run type-check`

2. **Local Testing**
   - Start dev server: `npm run dev`
   - Open http://localhost:5173/ in browser
   - Navigate to menu (difficulty/category selection)
   - Start quiz, verify:
     - ✅ Problem renders without errors
     - ✅ GridQuestion: 3×3 grid displays, options render correctly
     - ✅ ChoiceQuestion: Text options display with correct furigana
     - ✅ Selection works (click/tap)
     - ✅ Scoring updates (◯ or ✕ displays correctly)
     - ✅ localStorage persists session

3. **Validation Checklist**
   - [ ] Problem ID is unique (no duplicates)
   - [ ] Title includes furigana for all kanji
   - [ ] Prompt is simple, 1 sentence max
   - [ ] Correct answer option is accurately marked
   - [ ] All 4 options are distinct and plausible
   - [ ] Difficulty/category are appropriate
   - [ ] Build passes: `npm run build`
   - [ ] No TypeScript errors: `npm run type-check`
   - [ ] App launches without errors

### Phase 4: Batch & Document

- Repeat Phases 1–3 for each new image
- Record problem source (e.g., "mondai/202604/photo-01.jpg")
- Update `plans/gaiyou.md` with new problem count / feature additions

---

## File Locations

- **Problem Data**: `src/assets/data/questions.ts`
- **Type Definitions**: `src/store/types.ts`
- **Main App Logic**: `src/App.tsx`
- **Design Document**: `plans/gaiyou.md`

---

## Example: From Image to Problem

### Image: mondai/202604/grid-example.jpg
**Visual Content**: 3×3 grid with pattern [top-left, center, bottom-right filled], options showing variations

**Analysis**:
- Type: GridQuestion
- Intent: Pattern recognition (diagonal line)
- Difficulty: easy (pattern is obvious)
- Correct Answer: Option A (diagonal line)

**Generated Problem**:
```typescript
{
  id: 'grid-05',
  type: 'grid',
  title: 'たいかくせん を みつけよう',
  prompt: 'つぎの かたちを ぜんぶ え らびましょう。',
  pattern: [[true, false, false], [false, true, false], [false, false, true]],
  correctOptionId: 'A',
  options: [
    { id: 'A', pattern: [[true, false, false], [false, true, false], [false, false, true]] },
    { id: 'B', pattern: [[true, true, true], [false, false, false], [false, false, false]] },
    { id: 'C', pattern: [[false, false, true], [false, true, false], [true, false, false]] },
    { id: 'D', pattern: [[true, true, false], [true, false, false], [false, false, false]] },
  ],
  difficulty: 'easy',
  category: 'grid',
}
```

**Testing**:
- Launch app → Menu → Select difficulty "ぜんぶ" + category "かたち" → Start
- Verify pattern renders as 3×3 grid with filled cells
- Click option A → ◯ せいかい! → Result shows score updated
- localStorage persists selection

---

## Quick Reference: Problem ID Sequence

Current IDs in use:
- `grid-01`, `grid-02`, `grid-03`, `grid-04` (grid questions)
- `choice-01`, `choice-02` (choice questions)

Next available:
- `grid-05` (next grid)
- `choice-03` (next choice)

**Always increment sequentially** to avoid conflicts.

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| GridQuestion 3×3 renders incorrectly | Check `pattern: boolean[][]` — each row must have exactly 3 elements |
| ChoiceQuestion text is cut off | Shorten label or ensure viewport width ≥ 320px |
| localStorage not persisting | Check browser console for errors; clear storage and reload |
| Build fails after adding problem | Run `npm run type-check` to find TypeScript errors |
| Problem not appearing in quiz | Verify `id` matches `correctOptionId` logic; check category/difficulty filters |

---

## References

- **App Architecture**: See `plans/gaiyou.md` for full system design
- **Copilot Instructions**: See `.github/copilot-instructions.md` for code style & UX rules
- **Type System**: `src/store/types.ts` defines all interfaces
- **Problem Examples**: `src/assets/data/questions.ts` (4 sample problems)

