/** 원 단위 금액을 "480만원" 형태로 표시 */
export function formatWon(amount: number): string {
  if (amount === 0) return "0원";
  if (amount % 10_000 === 0) {
    return `${(amount / 10_000).toLocaleString("ko-KR")}만원`;
  }
  if (amount >= 10_000) {
    const man = Math.floor(amount / 10_000);
    const rest = amount % 10_000;
    return `${man.toLocaleString("ko-KR")}만 ${rest.toLocaleString("ko-KR")}원`;
  }
  return `${amount.toLocaleString("ko-KR")}원`;
}

/** 평균 대비 퍼센트를 "7% 저렴" / "4% 비쌈" / "평균 수준" 으로 표시 */
export function formatVsAvg(percent: number): string {
  if (percent === 0) return "평균 수준";
  return percent < 0 ? `${Math.abs(percent)}% 저렴` : `${percent}% 비쌈`;
}

/** 대표 가격. 0 은 미공개 */
export function formatPrice(amount: number): string {
  return amount > 0 ? formatWon(amount) : "요금 미공개";
}

/** "인증 후기 4.6 · 128건", 후기가 없으면 "인증 후기 아직 없음" */
export function formatReviewSummary(rating: number, reviewCount: number): string {
  if (reviewCount === 0) return "인증 후기 아직 없음";
  return `인증 후기 ${formatRating(rating)} · ${reviewCount}건`;
}

/** 데이터 기준일 "2023-12-31" → "2023.12.31" */
export function formatAsOf(asOf: string): string {
  return asOf.replace(/-/g, ".");
}

/** 평점을 소수 한 자리로 고정 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
