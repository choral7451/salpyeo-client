import { SERVICE_REGION } from "@/data/verticals";

/**
 * 목록 제목 + 시설 수.
 * 서버(프리렌더)에서는 전체 수를, 클라이언트에서는 필터로 좁힌 수를 보여 준다 —
 * 같은 컴포넌트를 Suspense fallback 과 본문이 함께 써서 제목이 HTML 에 남는다(SEO).
 */
export function FacilityListHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2.5">
      <h1 className="text-[28px] font-extrabold tracking-[-0.6px] text-text max-sm:text-[24px]">
        {SERVICE_REGION.label} {label}
      </h1>
      <span aria-live="polite" className="text-[17px] font-bold text-text-tertiary max-sm:text-[15px]">
        {count}곳
      </span>
    </div>
  );
}
