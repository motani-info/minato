/**
 * 正答率に応じた称号テキストとアイコンを返す
 */
export function getResultTitle(
  score: number,
  total: number,
): { text: string; emoji: string } {
  const rate = total > 0 ? score / total : 0;
  if (rate === 1) return { text: 'パーフェクト！すごい！', emoji: '🏆' };
  if (rate >= 0.8) return { text: 'とっても よくできました！', emoji: '⭐' };
  if (rate >= 0.5) return { text: 'がんばったね！', emoji: '😊' };
  return { text: 'もういちど やってみよう！', emoji: '💪' };
}
