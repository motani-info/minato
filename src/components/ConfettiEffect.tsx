import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ConfettiEffectProps {
  isActive: boolean;
  particleCount?: number;
  duration?: number;
}

interface Particle {
  id: number;
  x: number;
  color: string;
  rotation: number;
  rotationEnd: number;
  scale: number;
  delay: number;
  isCircle: boolean;
}

const PASTEL_COLORS = [
  '#f9a8d4', // ピンク
  '#93c5fd', // ブルー
  '#86efac', // グリーン
  '#fde68a', // イエロー
  '#fdba74', // オレンジ
  '#c4b5fd', // パープル
  '#a5f3fc', // シアン
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
    rotation: Math.random() * 360,
    rotationEnd: 360 + Math.random() * 180,
    scale: 0.6 + Math.random() * 0.6,
    delay: Math.random() * 0.3,
    isCircle: Math.random() > 0.5,
  }));
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  isActive,
  particleCount = 20,
  duration = 1500,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const effectiveCount = prefersReducedMotion ? 0 : particleCount;

  const particles = useMemo(
    () => generateParticles(effectiveCount),
    [effectiveCount],
  );

  const durationSec = duration / 1000;

  return (
    <AnimatePresence>
      {isActive && particles.length > 0 && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                x: `${p.x}vw`,
                y: '-5vh',
                rotate: p.rotation,
                scale: p.scale,
                opacity: 1,
              }}
              animate={{
                y: '110vh',
                rotate: p.rotation + p.rotationEnd,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: durationSec,
                delay: p.delay,
                ease: 'easeIn',
              }}
              style={{
                position: 'absolute',
                width: 12,
                height: 12,
                borderRadius: p.isCircle ? '50%' : '2px',
                backgroundColor: p.color,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};
