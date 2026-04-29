import type { QuestionData } from '../../store/types';

// plans/mondai の画像を参考に、画面表示ではなく問題データとして再構成
export const questions: QuestionData[] = [
  {
    id: 'grid-01',
    type: 'grid',
    difficulty: 'easy',
    category: 'shape',
    title: 'かたちを みつけよう 1',
    prompt: 'おてほん と おなじ もよう を えらんでね',
    modelPattern: [
      [true, true, false],
      [true, false, false],
      [true, true, true],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [true, true, false],
          [true, false, false],
          [true, true, true],
        ],
      },
      {
        id: 'B',
        pattern: [
          [true, false, true],
          [true, false, false],
          [true, true, true],
        ],
      },
      {
        id: 'C',
        pattern: [
          [true, true, false],
          [false, false, false],
          [true, true, true],
        ],
      },
      {
        id: 'D',
        pattern: [
          [true, true, false],
          [true, false, true],
          [true, true, true],
        ],
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'choice-01',
    type: 'choice',
    difficulty: 'easy',
    category: 'classification',
    title: 'なかまは どれ？',
    prompt: 'どうぶつ の なかま を 1つ えらんでね',
    options: [
      { id: 'A', label: 'ネコ' },
      { id: 'B', label: 'イヌ' },
      { id: 'C', label: 'デンシャ' },
      { id: 'D', label: 'ウサギ' },
    ],
    correctOptionId: 'C',
  },
  {
    id: 'grid-02',
    type: 'grid',
    difficulty: 'normal',
    category: 'shape',
    title: 'かたちを みつけよう 2',
    prompt: 'おてほん と ぴったり おなじ ものは どれ？',
    modelPattern: [
      [false, true, true],
      [true, true, false],
      [true, false, false],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [false, true, true],
          [true, true, false],
          [true, false, false],
        ],
      },
      {
        id: 'B',
        pattern: [
          [false, true, true],
          [true, false, false],
          [true, false, false],
        ],
      },
      {
        id: 'C',
        pattern: [
          [false, true, false],
          [true, true, false],
          [true, false, false],
        ],
      },
      {
        id: 'D',
        pattern: [
          [true, true, true],
          [true, true, false],
          [true, false, false],
        ],
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'choice-02',
    type: 'choice',
    difficulty: 'normal',
    category: 'classification',
    title: 'おなじ つかいみちは どれ？',
    prompt: 'たべもの の なかま じゃない もの を えらんでね',
    options: [
      { id: 'A', label: 'リンゴ' },
      { id: 'B', label: 'パン' },
      { id: 'C', label: 'えんぴつ' },
      { id: 'D', label: 'バナナ' },
    ],
    correctOptionId: 'C',
  },
  {
    id: 'grid-05',
    type: 'grid',
    difficulty: 'easy',
    category: 'shape',
    title: 'たいかくせん を みつけよう',
    prompt: 'つぎの かたちを ぜんぶ えらびましょう',
    modelPattern: [
      [true, false, false],
      [false, true, false],
      [false, false, true],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [true, false, false],
          [false, true, false],
          [false, false, true],
        ],
      },
      {
        id: 'B',
        pattern: [
          [true, true, true],
          [false, false, false],
          [false, false, false],
        ],
      },
      {
        id: 'C',
        pattern: [
          [false, false, true],
          [false, true, false],
          [true, false, false],
        ],
      },
      {
        id: 'D',
        pattern: [
          [true, true, false],
          [true, false, false],
          [false, false, false],
        ],
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'choice-03',
    type: 'choice',
    difficulty: 'easy',
    category: 'classification',
    title: 'かずを かぞえよう',
    prompt: 'リンゴ が いくつ あるか かぞえてね',
    options: [
      { id: 'A', label: 'リンゴ 3 こ' },
      { id: 'B', label: 'リンゴ 5 こ' },
      { id: 'C', label: 'リンゴ 2 こ' },
      { id: 'D', label: 'リンゴ 4 こ' },
    ],
    correctOptionId: 'A',
    countDisplay: {
      itemType: 'apple',
      count: 3,
    },
  },
  {
    id: 'grid-06',
    type: 'grid',
    difficulty: 'normal',
    category: 'shape',
    title: 'ぎゃくぞえ の かたち',
    prompt: 'ひっくり かえした かたちは どれ？',
    modelPattern: [
      [true, true, false],
      [false, true, false],
      [false, true, true],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [false, true, true],
          [false, true, false],
          [true, true, false],
        ],
      },
      {
        id: 'B',
        pattern: [
          [true, true, false],
          [false, true, false],
          [false, true, true],
        ],
      },
      {
        id: 'C',
        pattern: [
          [false, false, true],
          [false, true, true],
          [true, true, false],
        ],
      },
      {
        id: 'D',
        pattern: [
          [true, false, false],
          [false, true, false],
          [true, true, true],
        ],
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'grid-07',
    type: 'grid',
    difficulty: 'normal',
    category: 'shape',
    title: 'えんの もよう を みつけよう',
    prompt: 'おてほん と おなじ まる の ならび を えらんでね',
    modelPattern: [
      [true, false, true],
      [false, true, false],
      [true, false, true],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [true, false, true],
          [false, true, false],
          [true, false, true],
        ],
      },
      {
        id: 'B',
        pattern: [
          [true, true, true],
          [false, true, false],
          [false, false, false],
        ],
      },
      {
        id: 'C',
        pattern: [
          [false, true, false],
          [true, false, true],
          [false, true, false],
        ],
      },
      {
        id: 'D',
        pattern: [
          [true, true, false],
          [false, true, true],
          [false, true, false],
        ],
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'choice-04',
    type: 'choice',
    difficulty: 'normal',
    category: 'classification',
    title: 'なかまじゃない もの は どれ？',
    prompt: 'かたちが ちがう もの を えらんでね',
    options: [
      { id: 'A', label: '▲' },
      { id: 'B', label: '▲' },
      { id: 'C', label: '●' },
      { id: 'D', label: '▲' },
    ],
    correctOptionId: 'C',
  },
  {
    id: 'grid-08',
    type: 'grid',
    difficulty: 'normal',
    category: 'shape',
    title: 'くろ しろ の もよう',
    prompt: 'つぎに くる かたちは どれでしょう？',
    modelPattern: [
      [true, false, true],
      [true, true, false],
      [false, true, true],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [true, false, true],
          [true, true, false],
          [false, true, true],
        ],
      },
      {
        id: 'B',
        pattern: [
          [false, true, false],
          [false, false, true],
          [true, false, false],
        ],
      },
      {
        id: 'C',
        pattern: [
          [true, true, true],
          [false, false, false],
          [true, true, true],
        ],
      },
      {
        id: 'D',
        pattern: [
          [false, true, false],
          [true, false, true],
          [true, true, false],
        ],
      },
    ],
    correctOptionId: 'A',
  },
];
