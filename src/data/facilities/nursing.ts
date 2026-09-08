import type { Facility } from "@/types/facility";

import { sampleImages } from "./images";

/** 요양원 — 아직 비활성 버티컬. 활성화 시 그대로 사용 가능한 샘플 데이터 */
export const NURSING_FACILITIES: Facility[] = [
  {
    id: "n1",
    vertical: "nursing",
    name: "늘푸른 요양원",
    meta: "정자동 · 정원 64명",
    images: sampleImages("n1", ["건물 외관", "생활실", "물리치료실"]),
    distance: { label: "차 9분", minutes: 9 },
    badges: { inspection: "평가 A등급", feature: "간호사 상주" },
    price: 1_280_000,
    rating: 4.5,
    reviewCount: 42,
    vsAvgPercent: -5,
    priceRows: [
      { room: "월 본인부담금", note: "장기요양 3등급 기준", price: "62만원" },
      { room: "식대 (비급여)", note: "월 · 공개 의무 항목", price: "42만원" },
      { room: "상급침실 차액", note: "2인실 기준", price: "24만원" },
    ],
    inspections: [
      { title: "장기요양기관 정기평가", date: "건보공단 · 2025", result: "A등급" },
      { title: "급식위생 점검", date: "분당구보건소 · 2026.02", result: "지적 없음" },
    ],
    review: {
      meta: "보호자 인증 · 2026.04",
      text: "요양보호사 교체가 적어 어머니가 안정적으로 지내세요. 면회 예약 시스템이 편리합니다.",
    },
  },
  {
    id: "n2",
    vertical: "nursing",
    name: "가온 실버케어",
    meta: "서현동 · 정원 48명",
    images: sampleImages("n2", ["건물 외관", "치매전담실", "식당"]),
    distance: { label: "차 15분", minutes: 15 },
    badges: { inspection: "평가 A등급", feature: "치매전담실" },
    price: 1_420_000,
    rating: 4.4,
    reviewCount: 35,
    vsAvgPercent: 0,
    priceRows: [
      { room: "월 본인부담금", note: "장기요양 3등급 기준", price: "64만원" },
      { room: "식대 (비급여)", note: "월", price: "48만원" },
      { room: "치매전담실 가산", note: "월", price: "30만원" },
    ],
    inspections: [
      { title: "장기요양기관 정기평가", date: "건보공단 · 2025", result: "A등급" },
      { title: "급식위생 점검", date: "2026.01", result: "지적 없음" },
    ],
    review: {
      meta: "보호자 인증 · 2026.03",
      text: "치매전담실 프로그램이 다양하고 상태 공유가 꼼꼼해요. 대기가 긴 편입니다.",
    },
  },
  {
    id: "n3",
    vertical: "nursing",
    name: "청솔 요양원",
    meta: "수내동 · 정원 80명",
    images: sampleImages("n3", ["건물 외관", "2인실", "정원"]),
    distance: { label: "차 13분", minutes: 13 },
    badges: { inspection: "평가 B등급", feature: "물리치료실" },
    price: 1_150_000,
    rating: 4.1,
    reviewCount: 28,
    vsAvgPercent: -12,
    priceRows: [
      { room: "월 본인부담금", note: "장기요양 3등급 기준", price: "60만원" },
      { room: "식대 (비급여)", note: "월", price: "38만원" },
      { room: "상급침실 차액", note: "2인실 기준", price: "17만원" },
    ],
    inspections: [
      { title: "장기요양기관 정기평가", date: "건보공단 · 2025", result: "B등급" },
      { title: "급식위생 점검", date: "2025.12", result: "1건 시정완료" },
    ],
    review: {
      meta: "보호자 인증 · 2026.02",
      text: "가격 대비 만족스럽고 물리치료 횟수가 많아요. 2인실은 대기가 있습니다.",
    },
  },
];
