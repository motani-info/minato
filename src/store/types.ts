export type QuestionType = 'grid' | 'choice';
export type Difficulty = 'easy' | 'normal';
export type Category = 'shape' | 'classification';

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
}

export type QuestionData = GridQuestion | ChoiceQuestion;

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
