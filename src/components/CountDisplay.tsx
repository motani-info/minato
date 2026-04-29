import React from 'react';

interface CountDisplayProps {
  itemType: 'apple' | 'orange' | 'banana';
  count: number;
  size?: 'sm' | 'md' | 'lg';
}

const itemConfigs = {
  apple: {
    label: 'リンゴ',
    color: '#FF6B6B',
    stemColor: '#8B4513',
    cardClass: 'bg-slate-50 border-slate-200',
  },
  orange: {
    label: 'みかん',
    color: '#FFA500',
    stemColor: '#228B22',
    cardClass: 'bg-slate-50 border-slate-200',
  },
  banana: {
    label: 'バナナ',
    color: '#FFD700',
    stemColor: '#DAA520',
    cardClass: 'bg-slate-50 border-slate-200',
  },
};

const sizeConfigs = {
  sm: { containerSize: 60, itemSize: 45, gapClass: 'gap-2' },
  md: { containerSize: 80, itemSize: 60, gapClass: 'gap-3' },
  lg: { containerSize: 100, itemSize: 75, gapClass: 'gap-4' },
};

export const CountDisplay: React.FC<CountDisplayProps> = ({ itemType, count, size = 'md' }) => {
  const config = itemConfigs[itemType];
  const sizeConfig = sizeConfigs[size];

  const renderItem = (index: number) => {
    if (itemType === 'apple') {
      return (
        <svg
          key={index}
          width={sizeConfig.itemSize}
          height={sizeConfig.itemSize}
          viewBox="0 0 60 60"
          style={{ flex: 'none' }}
        >
          {/* Apple body */}
          <circle cx="30" cy="28" r="20" fill={config.color} />
          <circle cx="22" cy="22" r="18" fill={config.color} />
          <circle cx="38" cy="22" r="18" fill={config.color} />
          
          {/* Stem */}
          <rect x="28" y="10" width="4" height="12" fill={config.stemColor} />
          
          {/* Leaf */}
          <ellipse cx="36" cy="14" rx="6" ry="4" fill="#228B22" transform="rotate(30 36 14)" />
          
          {/* Shine */}
          <ellipse cx="20" cy="20" rx="8" ry="6" fill="rgba(255,255,255,0.3)" />
        </svg>
      );
    }

    if (itemType === 'orange') {
      return (
        <svg
          key={index}
          width={sizeConfig.itemSize}
          height={sizeConfig.itemSize}
          viewBox="0 0 60 60"
          style={{ flex: 'none' }}
        >
          {/* Orange body */}
          <circle cx="30" cy="30" r="22" fill={config.color} />
          
          {/* Texture lines */}
          <circle cx="30" cy="30" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="30" y1="8" x2="30" y2="52" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
          <line x1="8" y1="30" x2="52" y2="30" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
          
          {/* Leaf */}
          <ellipse cx="42" cy="10" rx="5" ry="3" fill="#228B22" transform="rotate(-30 42 10)" />
          
          {/* Shine */}
          <ellipse cx="20" cy="20" rx="8" ry="8" fill="rgba(255,255,255,0.3)" />
        </svg>
      );
    }

    if (itemType === 'banana') {
      return (
        <svg
          key={index}
          width={sizeConfig.itemSize}
          height={sizeConfig.itemSize}
          viewBox="0 0 60 60"
          style={{ flex: 'none' }}
        >
          {/* Banana curve */}
          <path
            d="M 15 45 Q 30 15, 45 20"
            stroke={config.color}
            strokeWidth="16"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Banana end caps */}
          <circle cx="15" cy="45" r="8" fill={config.color} />
          <circle cx="45" cy="20" r="8" fill={config.color} />
          
          {/* Shine */}
          <path
            d="M 15 40 Q 30 20, 40 25"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    return null;
  };

  return (
    <div
      className={`flex justify-center items-center ${sizeConfig.gapClass} p-4 rounded-xl mx-auto my-4 w-fit border shadow-sm ${config.cardClass}`}
    >
      {Array.from({ length: count }).map((_, index) => renderItem(index))}
    </div>
  );
};
