import React from 'react';
import { motion } from 'framer-motion';

interface GridDisplayProps {
  pattern: boolean[][];
  size?: 'sm' | 'md' | 'lg';
}

export const GridDisplay: React.FC<GridDisplayProps> = ({
  pattern,
  size = 'md',
}) => {
  const cellSizeMap = {
    sm: 36,
    md: 52,
    lg: 72,
  };

  const cellSize = cellSizeMap[size];
  const gridSize = 3;
  const gap = 1;
  const totalSize = cellSize * gridSize + gap * (gridSize + 1);

  const flat = pattern.flat();

  return (
    <motion.svg
      width={totalSize}
      height={totalSize}
      viewBox={`0 0 ${totalSize} ${totalSize}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* 外枠 */}
      <rect
        x={0}
        y={0}
        width={totalSize}
        height={totalSize}
        fill="#e2e8f0"
        rx={2}
        ry={2}
      />

      {/* グリッドセル */}
      {flat.map((filled, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const x = gap + col * (cellSize + gap);
        const y = gap + row * (cellSize + gap);

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            fill={filled ? '#1e293b' : '#ffffff'}
          />
        );
      })}
    </motion.svg>
  );
};
