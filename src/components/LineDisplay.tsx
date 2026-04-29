import React from 'react';
import { motion } from 'framer-motion';

interface LineDisplayProps {
  path: string;
  viewBox: [number, number];
  size?: 'sm' | 'md';
}

const sizeMap = {
  sm: 110,
  md: 160,
};

export const LineDisplay: React.FC<LineDisplayProps> = ({
  path,
  viewBox,
  size = 'md',
}) => {
  const dim = sizeMap[size];
  const [vw, vh] = viewBox;

  return (
    <motion.svg
      width={dim}
      height={dim}
      viewBox={`0 0 ${vw} ${vh}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="block"
    >
      {/* 背景 */}
      <rect x={0} y={0} width={vw} height={vh} fill="#ffffff" rx={4} ry={4} />
      {/* 線 */}
      <path
        d={path}
        fill="none"
        stroke="#1e293b"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};
