import React, { useRef, useState, useCallback, useEffect } from 'react';

interface LineTracerProps {
  modelPath: string;
  viewBox: [number, number];
  threshold?: number;
  disabled?: boolean;
  onComplete: (isCorrect: boolean) => void;
  showResult?: 'correct' | 'wrong' | null;
}

/** Sample points along an SVG path at regular intervals */
function samplePath(pathEl: SVGPathElement, count: number): { x: number; y: number }[] {
  const len = pathEl.getTotalLength();
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= count; i++) {
    const pt = pathEl.getPointAtLength((i / count) * len);
    points.push({ x: pt.x, y: pt.y });
  }
  return points;
}

/** Average minimum distance from drawn points to model path sample points */
function computeAccuracy(
  drawnPoints: { x: number; y: number }[],
  modelPoints: { x: number; y: number }[],
): number {
  if (drawnPoints.length === 0 || modelPoints.length === 0) return Infinity;

  let totalDist = 0;
  for (const mp of modelPoints) {
    let minDist = Infinity;
    for (const dp of drawnPoints) {
      const dx = mp.x - dp.x;
      const dy = mp.y - dp.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) minDist = dist;
    }
    totalDist += minDist;
  }
  return totalDist / modelPoints.length;
}

export const LineTracer: React.FC<LineTracerProps> = ({
  modelPath,
  viewBox,
  threshold = 12,
  disabled = false,
  onComplete,
  showResult,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const modelRef = useRef<SVGPathElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  const [vw, vh] = viewBox;
  const size = 280;

  // Reset when question changes
  useEffect(() => {
    setPoints([]);
    setHasDrawn(false);
    setDrawing(false);
  }, [modelPath]);

  const getSvgPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const svgPt = pt.matrixTransform(ctm.inverse());
    return { x: svgPt.x, y: svgPt.y };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (disabled || showResult) return;
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const pt = getSvgPoint(e.clientX, e.clientY);
    if (pt) {
      setDrawing(true);
      setPoints([pt]);
    }
  }, [disabled, showResult, getSvgPoint]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!drawing) return;
    e.preventDefault();
    const pt = getSvgPoint(e.clientX, e.clientY);
    if (pt) {
      setPoints(prev => [...prev, pt]);
    }
  }, [drawing, getSvgPoint]);

  const handlePointerUp = useCallback(() => {
    if (!drawing) return;
    setDrawing(false);
    setHasDrawn(true);
  }, [drawing]);

  const handleJudge = useCallback(() => {
    if (!modelRef.current || points.length < 5) return;
    const modelPoints = samplePath(modelRef.current, 40);
    const avgDist = computeAccuracy(points, modelPoints);
    onComplete(avgDist <= threshold);
  }, [points, threshold, onComplete]);

  const handleClear = useCallback(() => {
    setPoints([]);
    setHasDrawn(false);
  }, []);

  // Build polyline string from drawn points
  const polylineStr = points.map(p => `${p.x},${p.y}`).join(' ');

  const resultColor = showResult === 'correct' ? '#22c55e' : showResult === 'wrong' ? '#f59e0b' : null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative rounded-xl border-2 overflow-hidden touch-none select-none"
        style={{
          width: size,
          height: size,
          borderColor: resultColor ?? '#e2e8f0',
          background: resultColor ? (showResult === 'correct' ? '#f0fdf4' : '#fffbeb') : '#ffffff',
        }}
      >
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox={`0 0 ${vw} ${vh}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ cursor: disabled || showResult ? 'default' : 'crosshair', display: 'block' }}
        >
          {/* Model path (gray guide) */}
          <path
            ref={modelRef}
            d={modelPath}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 6"
          />

          {/* Drawn line */}
          {points.length > 1 && (
            <polyline
              points={polylineStr}
              fill="none"
              stroke={resultColor ?? '#2563eb'}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>

        {/* Hint overlay when not drawn yet */}
        {!hasDrawn && !showResult && points.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-slate-300 text-sm font-bold">ゆびで なぞってね</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {!showResult && (
        <div className="flex gap-2 w-full" style={{ maxWidth: size }}>
          <button
            className="kid-btn kid-btn-secondary flex-1"
            style={{ minWidth: 0, minHeight: 44, fontSize: 15, padding: '8px 12px' }}
            onClick={handleClear}
            disabled={points.length === 0}
          >
            けす
          </button>
          <button
            className="kid-btn kid-btn-primary flex-1"
            style={{ minWidth: 0, minHeight: 44, fontSize: 15, padding: '8px 12px' }}
            onClick={handleJudge}
            disabled={!hasDrawn || points.length < 5}
          >
            こたえる
          </button>
        </div>
      )}
    </div>
  );
};
