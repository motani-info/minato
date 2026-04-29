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
    sm: 40,
    md: 60,
    lg: 80,
  };

  const cellSize = cellSizeMap[size];
  const gridSize = 3; // 3x3
  const totalSize = cellSize * gridSize;
  const borderWidth = 2;

  return (
    <motion.svg
      width={totalSize + borderWidth * 2}
      height={totalSize + borderWidth * 2}
      viewBox={`0 0 ${totalSize + borderWidth * 2} ${totalSize + borderWidth * 2}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="border-2 border-gray-800 rounded-lg"
    >
      {/* 外枠 */}
      <rect
        x={borderWidth}
        y={borderWidth}
        width={totalSize}
        height={totalSize}
        fill="white"
        stroke="gray"
        strokeWidth="1"
      />

      {/* グリッドセル */}
      {pattern.flat().map((filled, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const x = borderWidth + col * cellSize;
        const y = borderWidth + row * cellSize;

        return (
          <g key={index}>
            {/* セル枠線 */}
            <rect
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              fill="white"
              stroke="#999"
              strokeWidth="1"
            />
            {/* 塗りつぶし */}
            {filled && (
              <motion.rect
                x={x + 2}
                y={y + 2}
                width={cellSize - 4}
                height={cellSize - 4}
                fill="#333"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              />
            )}
          </g>
        );
      })}
    </motion.svg>
  );
};
