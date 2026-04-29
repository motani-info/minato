import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { questions } from './assets/data/questions';
import { GridDisplay } from './components/GridDisplay';
import { CountDisplay } from './components/CountDisplay';
import { LineTracer } from './components/LineTracer';
import { ConfettiEffect } from './components/ConfettiEffect';
import { ResultSummary } from './components/ResultSummary';
import { useLocalStorage } from './hooks/useLocalStorage';
import type {
  Category,
  ChoiceQuestion,
  Difficulty,
  GridQuestion,
  LineQuestion,
  QuestionData,
  SessionState,
} from './store/types';

const initialSession: SessionState = {
  started: false,
  currentQuestionIndex: 0,
  difficulty: 'all',
  category: 'all',
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
  line: 'せんずけい',
} as const;

function shuffleIds(ids: string[]): string[] {
  const copy = [...ids];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

function App() {
  const [session, setSession, resetSession] = useLocalStorage<SessionState>('minato-session', initialSession);
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [showJudge, setShowJudge] = useState(false);

  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all' | ''>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | ''>('all');

  const normalizedSession: SessionState = {
    ...initialSession,
    ...session,
    difficulty: session.difficulty ?? initialSession.difficulty,
    category: session.category ?? initialSession.category,
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

  const progressPercent = totalCount > 0
    ? Math.min(((normalizedSession.currentQuestionIndex + (showJudge ? 1 : 0)) / totalCount) * 100, 100)
    : 0;

  const handleStart = () => {
    if (!selectedDifficulty || !selectedCategory) return;
    const targetIds = questions
      .filter(
        (q) =>
          (selectedDifficulty === 'all' || q.difficulty === selectedDifficulty) &&
          (selectedCategory === 'all' || q.category === selectedCategory)
      )
      .map((q) => q.id);
    if (targetIds.length === 0) return;
    setSession({
      ...initialSession,
      started: true,
      difficulty: selectedDifficulty,
      category: selectedCategory,
      questionOrder: shuffleIds(targetIds),
    });
    setSelectedOptionId('');
    setShowJudge(false);
  };

  const handleSelect = (optionId: string) => {
    if (showJudge) return;
    setSelectedOptionId(optionId);
  };

  const handleJudge = () => {
    if (!currentQuestion || currentQuestion.type === 'line') return;
    if (!selectedOptionId) return;
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
    setSession({
      ...normalizedSession,
      answers: [
        ...normalizedSession.answers,
        { questionId: currentQuestion.id, selectedOptionId, isCorrect },
      ],
    });
    setShowJudge(true);
  };

  const handleLineComplete = (isCorrect: boolean) => {
    if (!currentQuestion) return;
    setSession({
      ...normalizedSession,
      answers: [
        ...normalizedSession.answers,
        { questionId: currentQuestion.id, selectedOptionId: isCorrect ? 'traced' : 'missed', isCorrect },
      ],
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
    setSelectedDifficulty('all');
    setSelectedCategory('all');
    setSelectedOptionId('');
    setShowJudge(false);
  };

  const handleRetry = () => {
    setSession({
      ...initialSession,
      started: true,
      difficulty: normalizedSession.difficulty,
      category: normalizedSession.category,
      questionOrder: shuffleIds([...normalizedSession.questionOrder]),
    });
    setSelectedOptionId('');
    setShowJudge(false);
  };

  const latestAnswer = normalizedSession.answers[normalizedSession.answers.length - 1];
  const isPerfect = isFinished && totalCount > 0 && score === totalCount;
  const isInSession = normalizedSession.started && !shouldShowMenu;

  return (
    <div className="kid-shell">
      <header className="kid-header">
        <div className="kid-header-inner">
          <div>
            <h1>みなトレ</h1>
            <p>こくりつしょう <ruby>入試<rt>にゅうし</rt></ruby> <ruby>対策<rt>たいさく</rt></ruby></p>
          </div>
          {isInSession && (
            <button className="kid-menu-back" onClick={handleRestart} aria-label="メニューへもどる">
              やめる
            </button>
          )}
        </div>
      </header>

      <main className="kid-main">
        <AnimatePresence mode="wait">
          {/* ── メニュー ── */}
          {shouldShowMenu && (
            <motion.section key="start" {...pageTransition} className="kid-card">
              <h2><ruby>最初<rt>さいしょ</rt></ruby>のメニュー</h2>
              <p>なんいど と ぶんるい を えらんで スタート してね。</p>

              <section className="menu-section" aria-label="難易度選択">
                <h3><ruby>難易度<rt>なんいど</rt></ruby></h3>
                <div className="menu-options" role="radiogroup">
                  {(Object.keys(difficultyLabels) as Array<keyof typeof difficultyLabels>).map((d) => (
                    <button
                      key={d}
                      role="radio"
                      className={`menu-option ${selectedDifficulty === d ? 'selected' : ''}`}
                      onClick={() => setSelectedDifficulty(d)}
                      aria-checked={selectedDifficulty === d}
                    >
                      {difficultyLabels[d]}
                    </button>
                  ))}
                </div>
              </section>

              <section className="menu-section" aria-label="問題分類選択">
                <h3><ruby>分類<rt>ぶんるい</rt></ruby></h3>
                <div className="menu-options" role="radiogroup">
                  {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((c) => (
                    <button
                      key={c}
                      role="radio"
                      className={`menu-option ${selectedCategory === c ? 'selected' : ''}`}
                      onClick={() => setSelectedCategory(c)}
                      aria-checked={selectedCategory === c}
                    >
                      {categoryLabels[c]}
                    </button>
                  ))}
                </div>
              </section>

              <div className="mt-8">
                <button
                  className="kid-btn kid-btn-primary w-full"
                  onClick={handleStart}
                  disabled={!selectedDifficulty || !selectedCategory}
                >
                  スタート
                </button>
              </div>
            </motion.section>
          )}

          {/* ── 問題 ── */}
          {normalizedSession.started && !isFinished && currentQuestion && (
            <motion.section key={currentQuestion.id} {...pageTransition} className="kid-card">
              <ConfettiEffect isActive={showJudge && !!latestAnswer?.isCorrect} />

              <div className="kid-progress">
                <span>もんだい {normalizedSession.currentQuestionIndex + 1} / {totalCount}</span>
                <span>せいかい {score}</span>
              </div>
              <div className="kid-progress-track" aria-hidden="true">
                <motion.span
                  className="kid-progress-fill"
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ display: 'block', height: '100%', borderRadius: '999px' }}
                />
              </div>

              <h2>{currentQuestion.title}</h2>
              <p className="kid-prompt">{currentQuestion.prompt}</p>

              {/* グリッド問題 */}
              {currentQuestion.type === 'grid' && (
                <div className="grid-layout">
                  <div className="grid-model">
                    <span className="grid-model-label">おてほん</span>
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
                          aria-label={`せんたくし ${option.id}`}
                          aria-pressed={selected}
                        >
                          <span>{option.id}</span>
                          <GridDisplay pattern={option.pattern} size="sm" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 選択式問題 */}
              {currentQuestion.type === 'choice' && (
                <>
                  {(currentQuestion as ChoiceQuestion).countDisplay && (
                    <CountDisplay
                      itemType={(currentQuestion as ChoiceQuestion).countDisplay!.itemType}
                      count={(currentQuestion as ChoiceQuestion).countDisplay!.count}
                      size="md"
                    />
                  )}
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
                          aria-label={`せんたくし ${option.id}: ${option.label}`}
                          aria-pressed={selected}
                        >
                          <strong>{option.id}</strong>
                          <span>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* 線なぞり問題 */}
              {currentQuestion.type === 'line' && (
                <LineTracer
                  modelPath={(currentQuestion as LineQuestion).modelPath}
                  viewBox={(currentQuestion as LineQuestion).viewBox}
                  threshold={(currentQuestion as LineQuestion).threshold}
                  disabled={showJudge}
                  onComplete={handleLineComplete}
                  showResult={
                    showJudge
                      ? latestAnswer?.isCorrect
                        ? 'correct'
                        : 'wrong'
                      : null
                  }
                />
              )}

              {/* アクション */}
              <div className="kid-actions">
                {!showJudge ? (
                  currentQuestion.type !== 'line' && (
                    <button
                      className="kid-btn kid-btn-primary w-full"
                      onClick={handleJudge}
                      disabled={!selectedOptionId}
                    >
                      こたえる
                    </button>
                  )
                ) : (
                  <>
                    <div
                      className={`kid-feedback-card ${latestAnswer?.isCorrect ? 'ok' : 'ng'}`}
                      aria-live="polite"
                    >
                      {latestAnswer?.isCorrect ? (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          <p className="kid-feedback-text ok">◯ せいかい！ すごい！</p>
                          <p className="kid-feedback-sub">よく できました</p>
                        </motion.div>
                      ) : (
                        <div>
                          <p className="kid-feedback-text ng">△ おしい！</p>
                          <p className="kid-feedback-sub">つぎは できるよ！</p>
                        </div>
                      )}
                    </div>
                    <button className="kid-btn kid-btn-success w-full" onClick={handleNext}>
                      つぎの もんだい →
                    </button>
                  </>
                )}
              </div>
            </motion.section>
          )}

          {/* ── 結果 ── */}
          {isFinished && (
            <motion.section key="result" {...pageTransition} className="kid-card">
              <ConfettiEffect isActive={isPerfect} particleCount={30} duration={2000} />

              <h2 className="text-center">おしまい！</h2>

              <ResultSummary answers={normalizedSession.answers} questionMap={questionMap} />

              <div className="mt-6 flex flex-col gap-3">
                <button className="kid-btn kid-btn-primary w-full" onClick={handleRetry}>
                  もういちど やる
                </button>
                <button className="kid-btn kid-btn-secondary w-full" onClick={handleRestart}>
                  メニューへ もどる
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
