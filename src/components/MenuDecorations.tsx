import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Decoration {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'star';
  floatDuration: number;
  floatDelay: number;
  floatDistance: number;
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

const DECORATION_COUNT = 7;

function generateDecorations(count: number): Decoration[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 85,
    y: 5 + Math.random() * 85,
    size: 16 + Math.random() * 24,
    color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
    shape: Math.random() > 0.5 ? 'circle' : 'star',
    floatDuration: 2 + Math.random() * 2,
    floatDelay: Math.random() * 2,
    floatDistance: 6 + Math.random() * 10,
  }));
}

function StarSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
    </svg>
  );
}

export const MenuDecorations: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const decorations = useMemo(
    () => generateDecorations(DECORATION_COUNT),
    [],
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {decorations.map((d) => {
        const content =
          d.shape === 'circle' ? (
            <div
              style={{
                width: d.size,
                height: d.size,
                borderRadius: '50%',
                backgroundColor: d.color,
                opacity: 0.5,
              }}
            />
          ) : (
            <div style={{ opacity: 0.5 }}>
              <StarSvg size={d.size} color={d.color} />
            </div>
          );

        if (prefersReducedMotion) {
          return (
            <div
              key={d.id}
              style={{
                position: 'absolute',
                left: `${d.x}%`,
                top: `${d.y}%`,
              }}
            >
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={d.id}
            style={{
              position: 'absolute',
              left: `${d.x}%`,
              top: `${d.y}%`,
            }}
            animate={{
              y: [0, -d.floatDistance, 0],
            }}
            transition={{
              duration: d.floatDuration,
              delay: d.floatDelay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
};
