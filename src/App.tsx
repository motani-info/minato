import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { questions } from './assets/data/questions';
import { GridDisplay } from './components/GridDisplay';
import { useLocalStorage } from './hooks/useLocalStorage';
import type {
  Category,
  ChoiceQuestion,
  Difficulty,
  GridQuestion,
  QuestionData,
  SessionState,
} from './store/types';
import './App.css';

const initialSession: SessionState = {
  started: false,
  currentQuestionIndex: 0,
  difficulty: '',
  category: '',
  questionOrder: [],
  answers: [],
};

const difficultyLabels = {
  all: 'ぜんぶ',
  easy: 'やさしい',
  normal: 'ふつう',
} as const;

const categoryLabels = {
  all: 'ぜんぶ',
  shape: 'かたち',
  classification: 'なかまわけ',
} as const;

function shuffleIds(ids: string[]): string[] {
  const copy = [...ids];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function App() {
  const [session, setSession, resetSession] = useLocalStorage<SessionState>('minato-session', initialSession);
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [showJudge, setShowJudge] = useState(false);

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all' | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | ''>('');

  const normalizedSession: SessionState = {
    ...initialSession,
    ...session,
    difficulty: session.difficulty ?? '',
    category: session.category ?? '',
    questionOrder: session.questionOrder ?? [],
    answers: session.answers ?? [],
  };

  const questionMap = useMemo(() => {
    const map = new Map<string, QuestionData>();
    questions.forEach((q) => map.set(q.id, q));
    return map;
  }, []);

  const totalCount = normalizedSession.questionOrder.length;
  const currentQuestionId = normalizedSession.questionOrder[normalizedSession.currentQuestionIndex];
  const currentQuestion = currentQuestionId ? questionMap.get(currentQuestionId) : undefined;
  const shouldShowMenu = !normalizedSession.started || totalCount === 0;
  const isFinished =
    normalizedSession.started && totalCount > 0 && normalizedSession.currentQuestionIndex >= totalCount;

  const score = useMemo(
    () => normalizedSession.answers.filter((a) => a.isCorrect).length,
    [normalizedSession.answers]
  );

  const handleStart = () => {
    if (!selectedDifficulty || !selectedCategory) {
      return;
    }

    const targetIds = questions
      .filter(
        (q) =>
          (selectedDifficulty === 'all' || q.difficulty === selectedDifficulty) &&
          (selectedCategory === 'all' || q.category === selectedCategory)
      )
      .map((q) => q.id);

    const randomized = shuffleIds(targetIds);
    setSession({
      ...initialSession,
      started: true,
      difficulty: selectedDifficulty,
      category: selectedCategory,
      questionOrder: randomized,
    });
    setSelectedOptionId('');
    setShowJudge(false);
  };

  const handleSelect = (optionId: string) => {
    if (showJudge) {
      return;
    }
    setSelectedOptionId(optionId);
  };

  const handleJudge = () => {
    if (!currentQuestion || !selectedOptionId) {
      return;
    }
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    const nextAnswers = [
      ...normalizedSession.answers,
      {
        questionId: currentQuestion.id,
        selectedOptionId,
        isCorrect,
      },
    ];

    setSession({
      ...normalizedSession,
      answers: nextAnswers,
    });
    setShowJudge(true);
  };

  const handleNext = () => {
    setSession({
      ...normalizedSession,
      currentQuestionIndex: normalizedSession.currentQuestionIndex + 1,
    });
    setSelectedOptionId('');
    setShowJudge(false);
  };

  const handleRestart = () => {
    resetSession();
    setSelectedDifficulty('');
    setSelectedCategory('');
    setSelectedOptionId('');
    setShowJudge(false);
  };

  const latestAnswer = normalizedSession.answers[normalizedSession.answers.length - 1];

  return (
    <div className="kid-shell">
      <header className="kid-header">
        <div className="kid-header-inner">
          <div>
            <h1>
              みなトレ
            </h1>
            <p>こくりつしょう <ruby>入試<rt>にゅうし</rt></ruby> <ruby>対策<rt>たいさく</rt></ruby></p>
          </div>
          <button className="kid-menu-back" onClick={handleRestart}>
            めにゅーへ
          </button>
        </div>
      </header>

      <main className="kid-main">
        <AnimatePresence mode="wait">
          {shouldShowMenu && (
            <motion.section
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="kid-card"
            >
              <h2>
                <ruby>最初<rt>さいしょ</rt></ruby>のめにゅー
              </h2>
              <p>なんいど と ぶんるい を えらんでね。</p>

              <section className="menu-section" aria-label="難易度選択">
                <h3>
                  <ruby>難易度<rt>なんいど</rt></ruby>
                </h3>
                <div className="menu-options">
                  {(Object.keys(difficultyLabels) as Array<keyof typeof difficultyLabels>).map((difficulty) => (
                    <button
                      key={difficulty}
                      className={`menu-option ${selectedDifficulty === difficulty ? 'selected' : ''}`}
                      onClick={() => setSelectedDifficulty(difficulty)}
                    >
                      {difficultyLabels[difficulty]}
                    </button>
                  ))}
                </div>
              </section>

              <section className="menu-section" aria-label="問題分類選択">
                <h3>
                  <ruby>分類<rt>ぶんるい</rt></ruby>
                </h3>
                <div className="menu-options">
                  {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((category) => (
                    <button
                      key={category}
                      className={`menu-option ${selectedCategory === category ? 'selected' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {categoryLabels[category]}
                    </button>
                  ))}
                </div>
              </section>

              <button
                className="kid-btn kid-btn-primary"
                onClick={handleStart}
                disabled={!selectedDifficulty || !selectedCategory}
              >
                スタート
              </button>
            </motion.section>
          )}

          {normalizedSession.started && !isFinished && currentQuestion && (
            <motion.section
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="kid-card"
            >
              <div className="kid-progress">
                <span>もんだい {normalizedSession.currentQuestionIndex + 1} / {totalCount}</span>
                <span>せいかい {score}</span>
              </div>

              <h2>{currentQuestion.title}</h2>
              <p className="kid-prompt">{currentQuestion.prompt}</p>

              {currentQuestion.type === 'grid' && (
                <div className="grid-layout">
                  <div className="grid-model">
                    <p>おてほん</p>
                    <GridDisplay pattern={(currentQuestion as GridQuestion).modelPattern} size="md" />
                  </div>
                  <div className="grid-options">
                    {(currentQuestion as GridQuestion).options.map((option) => {
                      const selected = selectedOptionId === option.id;
                      const correct = showJudge && option.id === currentQuestion.correctOptionId;
                      const wrong = showJudge && selected && !correct;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelect(option.id)}
                          className={`grid-option ${selected ? 'selected' : ''} ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}
                        >
                          <span>{option.id}</span>
                          <GridDisplay pattern={option.pattern} size="sm" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentQuestion.type === 'choice' && (
                <div className="choice-options">
                  {(currentQuestion as ChoiceQuestion).options.map((option) => {
                    const selected = selectedOptionId === option.id;
                    const correct = showJudge && option.id === currentQuestion.correctOptionId;
                    const wrong = showJudge && selected && !correct;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        className={`choice-option ${selected ? 'selected' : ''} ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}
                      >
                        <strong>{option.id}</strong>
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="kid-actions">
                {!showJudge ? (
                  <button
                    className="kid-btn kid-btn-primary"
                    onClick={handleJudge}
                    disabled={!selectedOptionId}
                  >
                    できた！
                  </button>
                ) : (
                  <>
                    <p className={`kid-feedback ${latestAnswer?.isCorrect ? 'ok' : 'ng'}`}>
                      {latestAnswer?.isCorrect ? '◯ せいかい！' : '✕ ざんねん！'}
                    </p>
                    <button className="kid-btn kid-btn-secondary" onClick={handleNext}>
                      つぎへ
                    </button>
                  </>
                )}
              </div>
            </motion.section>
          )}

          {isFinished && (
            <motion.section
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="kid-card"
            >
              <h2>おしまい！</h2>
              <p className="kid-result">{totalCount}もんちゅう {score}もん せいかい</p>
              <button className="kid-btn kid-btn-primary" onClick={handleRestart}>
                もういちど
              </button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
