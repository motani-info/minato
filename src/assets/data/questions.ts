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
  // ── 202604-01 追加問題 ──
  {
    id: 'grid-09',
    type: 'grid',
    difficulty: 'easy',
    category: 'shape',
    title: 'L がた を みつけよう',
    prompt: 'おてほん と おなじ かたち を えらんでね',
    modelPattern: [
      [true, false, false],
      [true, false, false],
      [true, true, true],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [true, false, false],
          [true, false, false],
          [true, true, true],
        ],
      },
      {
        id: 'B',
        pattern: [
          [false, false, true],
          [false, false, true],
          [true, true, true],
        ],
      },
      {
        id: 'C',
        pattern: [
          [true, true, true],
          [true, false, false],
          [true, false, false],
        ],
      },
      {
        id: 'D',
        pattern: [
          [true, false, false],
          [true, true, false],
          [true, true, true],
        ],
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'grid-10',
    type: 'grid',
    difficulty: 'normal',
    category: 'shape',
    title: 'T がた を みつけよう',
    prompt: 'おてほん と ぴったり おなじ ものは どれ？',
    modelPattern: [
      [true, true, true],
      [false, true, false],
      [false, true, false],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [true, true, true],
          [false, true, false],
          [false, true, false],
        ],
      },
      {
        id: 'B',
        pattern: [
          [false, true, false],
          [false, true, false],
          [true, true, true],
        ],
      },
      {
        id: 'C',
        pattern: [
          [true, true, true],
          [true, false, false],
          [true, false, false],
        ],
      },
      {
        id: 'D',
        pattern: [
          [false, true, false],
          [true, true, true],
          [false, true, false],
        ],
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'choice-05',
    type: 'choice',
    difficulty: 'easy',
    category: 'classification',
    title: 'のりもの の なかま',
    prompt: 'のりもの じゃない もの を えらんでね',
    options: [
      { id: 'A', label: 'バス' },
      { id: 'B', label: 'ひこうき' },
      { id: 'C', label: 'いちご' },
      { id: 'D', label: 'ふね' },
    ],
    correctOptionId: 'C',
  },
  {
    id: 'choice-06',
    type: 'choice',
    difficulty: 'normal',
    category: 'classification',
    title: 'かずを かぞえよう 2',
    prompt: 'みかん が いくつ あるか かぞえてね',
    options: [
      { id: 'A', label: 'みかん 3 こ' },
      { id: 'B', label: 'みかん 4 こ' },
      { id: 'C', label: 'みかん 5 こ' },
      { id: 'D', label: 'みかん 6 こ' },
    ],
    correctOptionId: 'C',
    countDisplay: {
      itemType: 'orange',
      count: 5,
    },
  },
  {
    id: 'grid-11',
    type: 'grid',
    difficulty: 'easy',
    category: 'shape',
    title: 'まんなか の もよう',
    prompt: 'おてほん と おなじ もよう を えらんでね',
    modelPattern: [
      [false, true, false],
      [true, true, true],
      [false, true, false],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [false, true, false],
          [true, true, true],
          [false, true, false],
        ],
      },
      {
        id: 'B',
        pattern: [
          [true, false, true],
          [false, true, false],
          [true, false, true],
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
          [true, true, false],
          [false, false, false],
        ],
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'choice-07',
    type: 'choice',
    difficulty: 'easy',
    category: 'classification',
    title: 'いろ の なかま',
    prompt: 'あか の なかま じゃない もの を えらんでね',
    options: [
      { id: 'A', label: 'トマト' },
      { id: 'B', label: 'いちご' },
      { id: 'C', label: 'レモン' },
      { id: 'D', label: 'りんご' },
    ],
    correctOptionId: 'C',
  },
  {
    id: 'grid-12',
    type: 'grid',
    difficulty: 'normal',
    category: 'shape',
    title: 'かいだん の かたち',
    prompt: 'おてほん と おなじ かたち を えらんでね',
    modelPattern: [
      [true, false, false],
      [true, true, false],
      [true, true, true],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [true, false, false],
          [true, true, false],
          [true, true, true],
        ],
      },
      {
        id: 'B',
        pattern: [
          [false, false, true],
          [false, true, true],
          [true, true, true],
        ],
      },
      {
        id: 'C',
        pattern: [
          [true, true, true],
          [true, true, false],
          [true, false, false],
        ],
      },
      {
        id: 'D',
        pattern: [
          [true, true, false],
          [true, true, false],
          [true, true, true],
        ],
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'choice-08',
    type: 'choice',
    difficulty: 'normal',
    category: 'classification',
    title: 'おおきさ くらべ',
    prompt: 'いちばん おおきい どうぶつ を えらんでね',
    options: [
      { id: 'A', label: 'ネズミ' },
      { id: 'B', label: 'ゾウ' },
      { id: 'C', label: 'ネコ' },
      { id: 'D', label: 'イヌ' },
    ],
    correctOptionId: 'B',
  },
  {
    id: 'grid-13',
    type: 'grid',
    difficulty: 'normal',
    category: 'shape',
    title: 'はんたい の かたち',
    prompt: 'おてほん を さゆう はんたい にした かたちは どれ？',
    modelPattern: [
      [true, true, false],
      [true, false, false],
      [true, false, false],
    ],
    options: [
      {
        id: 'A',
        pattern: [
          [false, true, true],
          [false, false, true],
          [false, false, true],
        ],
      },
      {
        id: 'B',
        pattern: [
          [true, true, false],
          [true, false, false],
          [true, false, false],
        ],
      },
      {
        id: 'C',
        pattern: [
          [false, false, true],
          [false, false, true],
          [false, true, true],
        ],
      },
      {
        id: 'D',
        pattern: [
          [true, false, false],
          [true, false, false],
          [true, true, false],
        ],
      },
    ],
    correctOptionId: 'A',
  },
  {
    id: 'choice-09',
    type: 'choice',
    difficulty: 'easy',
    category: 'classification',
    title: 'バナナを かぞえよう',
    prompt: 'バナナ が いくつ あるか かぞえてね',
    options: [
      { id: 'A', label: 'バナナ 3 こ' },
      { id: 'B', label: 'バナナ 2 こ' },
      { id: 'C', label: 'バナナ 4 こ' },
      { id: 'D', label: 'バナナ 5 こ' },
    ],
    correctOptionId: 'C',
    countDisplay: {
      itemType: 'banana',
      count: 4,
    },
  },
  // ── 線なぞり問題 ──
  {
    id: 'line-01',
    type: 'line',
    difficulty: 'easy',
    category: 'line',
    title: 'せん を なぞろう 1',
    prompt: 'はいいろ の せん を ゆびで なぞってね',
    viewBox: [100, 100] as [number, number],
    modelPath: 'M 10 90 L 50 10 L 90 90',
  },
  {
    id: 'line-02',
    type: 'line',
    difficulty: 'easy',
    category: 'line',
    title: 'せん を なぞろう 2',
    prompt: 'はいいろ の せん を ゆびで なぞってね',
    viewBox: [100, 100] as [number, number],
    modelPath: 'M 10 50 L 50 10 L 90 50 L 50 90 Z',
  },
  {
    id: 'line-03',
    type: 'line',
    difficulty: 'normal',
    category: 'line',
    title: 'せん を なぞろう 3',
    prompt: 'はいいろ の せん を ゆびで なぞってね',
    viewBox: [100, 100] as [number, number],
    modelPath: 'M 10 90 L 10 10 L 50 50 L 90 10 L 90 90',
  },
  {
    id: 'line-04',
    type: 'line',
    difficulty: 'normal',
    category: 'line',
    title: 'せん を なぞろう 4',
    prompt: 'はいいろ の せん を ゆびで なぞってね',
    viewBox: [100, 100] as [number, number],
    modelPath: 'M 10 90 Q 50 10 90 90',
    threshold: 14,
  },
  {
    id: 'line-05',
    type: 'line',
    difficulty: 'normal',
    category: 'line',
    title: 'せん を なぞろう 5',
    prompt: 'はいいろ の せん を ゆびで なぞってね',
    viewBox: [100, 100] as [number, number],
    modelPath: 'M 10 70 L 30 30 L 50 70 L 70 30 L 90 70',
  },
  {
    id: 'line-06',
    type: 'line',
    difficulty: 'normal',
    category: 'line',
    title: 'ほし を なぞろう',
    prompt: 'はいいろ の ほし の せん を ゆびで なぞってね',
    viewBox: [100, 100] as [number, number],
    modelPath: 'M 50 10 L 70 45 L 95 45 L 75 65 L 85 95 L 50 70 L 15 95 L 25 65 L 5 45 L 30 45 Z',
    threshold: 15,
  },
  {
    id: 'line-07',
    type: 'line',
    difficulty: 'normal',
    category: 'line',
    title: 'W の かたち を なぞろう',
    prompt: 'はいいろ の W の かたち を ゆびで なぞってね',
    viewBox: [110, 100] as [number, number],
    modelPath: 'M 10 30 L 25 80 L 40 40 L 55 80 L 70 40 L 85 80 L 100 30',
    threshold: 14,
  },
  {
    id: 'line-08',
    type: 'line',
    difficulty: 'normal',
    category: 'line',
    title: 'ふたつの アーク を なぞろう',
    prompt: 'はいいろ の アーク を ゆびで なぞってね',
    viewBox: [100, 100] as [number, number],
    modelPath: 'M 10 50 Q 50 10 90 50 Q 90 90 50 90 Q 10 90 10 50',
    threshold: 16,
  },
  {
    id: 'line-09',
    type: 'line',
    difficulty: 'normal',
    category: 'line',
    title: 'S の カーブ を なぞろう',
    prompt: 'はいいろ の S の カーブ を ゆびで なぞってね',
    viewBox: [100, 100] as [number, number],
    modelPath: 'M 10 30 Q 50 10 90 50 Q 50 90 10 70',
    threshold: 15,
  },
  {
    id: 'line-10',
    type: 'line',
    difficulty: 'normal',
    category: 'line',
    title: 'ぎざぎざ・じぐざぐ を なぞろう',
    prompt: 'はいいろ の ぎざぎざ の せん を ゆびで なぞってね',
    viewBox: [100, 100] as [number, number],
    modelPath: 'M 10 50 L 30 30 L 50 70 L 70 30 L 90 70',
    threshold: 12,
  },
];
