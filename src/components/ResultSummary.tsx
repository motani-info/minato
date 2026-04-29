import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getResultTitle } from './resultUtils';
import type { UserAnswer, QuestionData } from '../store/types';

export interface ResultSummaryProps {
  answers: UserAnswer[];
  questionMap: Map<string, QuestionData>;
}

function AnimatedScore({
  score,
  total,
  reducedMotion,
}: {
  score: number;
  total: number;
  reducedMotion: boolean;
}) {
  const motionValue = useMotionValue(reducedMotion ? score : 0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) {
      if (displayRef.current) displayRef.current.textContent = String(score);
      return;
    }

    const unsubscribe = rounded.on('change', (v) => {
      if (displayRef.current) displayRef.current.textContent = String(v);
    });

    const controls = animate(motionValue, score, {
      duration: 1,
      ease: 'easeOut',
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [score, motionValue, rounded, reducedMotion]);

  return (
    <div className="flex items-baseline justify-center gap-2 text-center py-6">
      <span
        ref={displayRef}
        className="text-6xl font-extrabold text-blue-600"
        aria-hidden="true"
      >
        {reducedMotion ? score : 0}
      </span>
      <span className="text-2xl text-slate-400 font-semibold">
        / {total}
      </span>
      <span className="sr-only">
        {total}もんちゅう {score}もん せいかい
      </span>
    </div>
  );
}

export function ResultSummary({ answers, questionMap }: ResultSummaryProps) {
  const prefersReducedMotion = useReducedMotion();
  const total = answers.length;
  const score = answers.filter((a) => a.isCorrect).length;
  const title = getResultTitle(score, total);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <AnimatedScore score={score} total={total} reducedMotion={prefersReducedMotion} />

      <motion.p
        className="text-center text-xl font-bold text-slate-700"
        aria-live="polite"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 0.8, duration: 0.3 }}
      >
        {title.text}
      </motion.p>

      <ul className="flex flex-col gap-2 mt-2" role="list">
        {answers.map((answer, index) => {
          const question = questionMap.get(answer.questionId);
          const label = question?.title ?? `もんだい ${index + 1}`;

          return (
            <motion.li
              key={answer.questionId}
              className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 1 + index * 0.06,
                duration: 0.2,
              }}
            >
              {answer.isCorrect ? (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-sm font-bold" aria-label="せいかい">
                  ◯
                </span>
              ) : (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-sm font-bold" aria-label="ふせいかい">
                  △
                </span>
              )}
              <span className="text-slate-600 text-sm leading-snug">{label}</span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
