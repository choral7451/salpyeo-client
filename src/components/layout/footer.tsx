export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="container-page flex flex-wrap items-center gap-4 py-7 text-[13px] text-text-disabled">
        <span className="text-[15px] font-extrabold text-text-muted">살펴</span>
        <span>
          가격·평가 정보 출처: 보건복지부, 건보공단, e하늘, 아이사랑, 나이스
          (법정 공개 데이터)
        </span>
        <span className="ml-auto">
          요양병원 정보는 안내만 제공하며 중개하지 않습니다.
        </span>
      </div>
    </footer>
  );
}
