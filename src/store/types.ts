export type QuestionType = 'grid' | 'choice' | 'line';
export type Difficulty = 'easy' | 'normal';
export type Category = 'shape' | 'classification' | 'line';

export interface QuestionBase {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  category: Category;
  title: string;
  prompt: string;
}

export interface GridOption {
  id: string;
  pattern: boolean[][];
}

export interface GridQuestion extends QuestionBase {
  type: 'grid';
  modelPattern: boolean[][];
  options: GridOption[];
  correctOptionId: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
}

export interface ChoiceQuestion extends QuestionBase {
  type: 'choice';
  options: ChoiceOption[];
  correctOptionId: string;
  countDisplay?: {
    itemType: 'apple' | 'orange' | 'banana';
    count: number;
  };
}

export interface LineQuestion extends QuestionBase {
  type: 'line';
  /** SVG path d attribute for the model line */
  modelPath: string;
  /** viewBox dimensions [width, height] */
  viewBox: [number, number];
  /** Distance threshold in SVG units for a "correct" trace */
  threshold?: number;
}

export type QuestionData = GridQuestion | ChoiceQuestion | LineQuestion;

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface SessionState {
  started: boolean;
  currentQuestionIndex: number;
  difficulty: Difficulty | 'all' | '';
  category: Category | 'all' | '';
  questionOrder: string[];
  answers: UserAnswer[];
}
