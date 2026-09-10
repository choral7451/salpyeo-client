/**
 * 지금 실제로 하고 있는 것만 적는다.
 * 점검·평가·후기는 아직 연동 전이라 "있다"고 말하지 않고, 없는 것을 비워 둔다는 점을 오히려 근거로 쓴다.
 */
const POINTS = [
  {
    title: "숨은 가격이 없어요",
    body: "요금 공개가 법으로 의무화된 시설만 다룹니다. 전화 없이 실제 가격을 확인하세요.",
  },
  {
    title: "공개된 자료 그대로",
    body: "요금과 연락처를 가공하지 않고 그대로 보여드려요. 공식 홈페이지와 다르면 홈페이지를 따릅니다.",
  },
  {
    title: "모르는 건 비워 둡니다",
    body: "보건소 점검 결과와 이용 후기는 아직 준비 중이에요. 확인되지 않은 정보로 순위를 매기지 않습니다.",
  },
] as const;

export function TrustPoints() {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
      {POINTS.map((p) => (
        <div key={p.title} className="border-t-2 border-dark px-1 pt-5">
          <h3 className="text-base font-bold text-text">{p.title}</h3>
          <p className="mt-1.5 text-sm leading-[1.6] text-text-tertiary">{p.body}</p>
        </div>
      ))}
    </section>
  );
}
