import type { Facility } from "@/types/facility";

import { sampleImages } from "./images";

/** 장례식장 — 아직 비활성 버티컬 */
export const FUNERAL_FACILITIES: Facility[] = [
  {
    id: "f1",
    vertical: "funeral",
    name: "하늘숲 장례식장",
    meta: "분당구 · 빈소 8실",
    images: sampleImages("f1", ["건물 외관", "빈소", "접객실"]),
    distance: { label: "차 10분", minutes: 10 },
    badges: { inspection: "가격 공개 인증", feature: "주차 200대" },
    price: 1_650_000,
    rating: 4.5,
    reviewCount: 51,
    vsAvgPercent: -6,
    priceRows: [
      { room: "빈소 사용료 (중형)", note: "1일 · 접객실 포함", price: "165만원" },
      { room: "안치료", note: "1일", price: "12만원" },
      { room: "입관실 사용료", note: "1회", price: "25만원" },
    ],
    inspections: [
      { title: "가격표 공개 확인", date: "e하늘 · 2026.07", result: "일치" },
      { title: "위생 점검", date: "성남시 · 2026.01", result: "지적 없음" },
    ],
    review: {
      meta: "유족 인증 · 2026.05",
      text: "안내 직원이 절차를 차분히 설명해 주셔서 경황없는 중에 큰 도움이 됐습니다. 추가 비용 안내가 투명했어요.",
    },
  },
  {
    id: "f2",
    vertical: "funeral",
    name: "평안 장례문화원",
    meta: "야탑동 · 빈소 12실",
    images: sampleImages("f2", ["건물 외관", "대형 빈소", "유족 대기실"]),
    distance: { label: "차 18분", minutes: 18 },
    badges: { inspection: "가격 공개 인증", feature: "대형 빈소" },
    price: 1_800_000,
    rating: 4.3,
    reviewCount: 44,
    vsAvgPercent: 2,
    priceRows: [
      { room: "빈소 사용료 (중형)", note: "1일", price: "180만원" },
      { room: "안치료", note: "1일", price: "14만원" },
      { room: "유족 대기실", note: "1일", price: "20만원" },
    ],
    inspections: [
      { title: "가격표 공개 확인", date: "e하늘 · 2026.07", result: "일치" },
      { title: "위생 점검", date: "성남시 · 2025.11", result: "지적 없음" },
    ],
    review: {
      meta: "유족 인증 · 2026.04",
      text: "빈소가 넓고 조문객 동선이 좋아요. 식사 단가는 주변보다 조금 높은 편입니다.",
    },
  },
  {
    id: "f3",
    vertical: "funeral",
    name: "온누리 장례식장",
    meta: "구미동 · 빈소 6실",
    images: sampleImages("f3", ["건물 외관", "빈소", "주차장"]),
    distance: { label: "차 14분", minutes: 14 },
    badges: { inspection: "가격 공개 인증", feature: "소형 빈소" },
    price: 1_380_000,
    rating: 4.2,
    reviewCount: 29,
    vsAvgPercent: -17,
    priceRows: [
      { room: "빈소 사용료 (중형)", note: "1일", price: "138만원" },
      { room: "안치료", note: "1일", price: "10만원" },
      { room: "입관실 사용료", note: "1회", price: "22만원" },
    ],
    inspections: [
      { title: "가격표 공개 확인", date: "e하늘 · 2026.06", result: "일치" },
      { title: "위생 점검", date: "성남시 · 2026.03", result: "지적 없음" },
    ],
    review: {
      meta: "유족 인증 · 2026.03",
      text: "규모는 작지만 비용이 합리적이고 상조 없이도 진행이 수월했습니다.",
    },
  },
];
