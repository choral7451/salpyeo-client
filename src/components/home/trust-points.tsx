const POINTS = [
  {
    title: "숨은 가격이 없어요",
    body: "요금 공개가 법으로 의무화된 시설만 다룹니다. 전화 없이 실제 가격을 확인하세요.",
  },
  {
    title: "점검·평가 결과로 거릅니다",
    body: "보건소 점검, 건보공단 평가등급 같은 공식 결과를 후기와 함께 보여드려요.",
  },
  {
    title: "후기는 인증된 것만",
    body: "실제 이용을 인증한 후기만 받아 광고성 리뷰를 걸러냅니다.",
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
