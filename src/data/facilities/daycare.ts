import type { Facility } from "@/types/facility";

import { sampleImages } from "./images";

/** 어린이집·유치원 — 아직 비활성 버티컬 */
export const DAYCARE_FACILITIES: Facility[] = [
  {
    id: "d1",
    vertical: "daycare",
    name: "숲속 어린이집",
    meta: "정자동 · 정원 92명",
    images: sampleImages("d1", ["건물 외관", "교실", "놀이터"]),
    distance: { label: "도보 7분", minutes: 7 },
    badges: { inspection: "평가인증 A", feature: "대기 12명" },
    price: 280_000,
    rating: 4.6,
    reviewCount: 87,
    vsAvgPercent: 0,
    priceRows: [
      { room: "기본 보육료", note: "월 · 정부지원 후 부담금", price: "0원" },
      { room: "특별활동비", note: "월 · 체육·음악 포함", price: "18만원" },
      { room: "현장학습·급식비", note: "월", price: "10만원" },
    ],
    inspections: [
      { title: "평가인증", date: "아이사랑 · 2025", result: "A등급" },
      { title: "급식위생 점검", date: "2026.04", result: "지적 없음" },
    ],
    review: {
      meta: "학부모 인증 · 2026.06",
      text: "교사 대 아동 비율이 좋고 알림장이 상세해요. 특별활동비 내역이 투명하게 공개됩니다.",
    },
  },
  {
    id: "d2",
    vertical: "daycare",
    name: "해맑은 유치원",
    meta: "수내동 · 정원 120명",
    images: sampleImages("d2", ["건물 외관", "교실", "통학버스"]),
    distance: { label: "차 6분", minutes: 6 },
    badges: { inspection: "평가인증 A", feature: "통학버스" },
    price: 340_000,
    rating: 4.4,
    reviewCount: 63,
    vsAvgPercent: 8,
    priceRows: [
      { room: "기본 교육비", note: "월 · 지원 후 부담금", price: "6만원" },
      { room: "특성화 활동비", note: "월 · 영어·체육", price: "20만원" },
      { room: "급식·통학비", note: "월", price: "8만원" },
    ],
    inspections: [
      { title: "유치원알리미 공시", date: "2026.03", result: "공시 완료" },
      { title: "급식위생 점검", date: "2026.02", result: "지적 없음" },
    ],
    review: {
      meta: "학부모 인증 · 2026.05",
      text: "통학버스 노선이 촘촘하고 방과후 프로그램이 알차요. 대기 기간은 긴 편이에요.",
    },
  },
  {
    id: "d3",
    vertical: "daycare",
    name: "아람 어린이집",
    meta: "서현동 · 정원 60명",
    images: sampleImages("d3", ["건물 외관", "교실", "급식실"]),
    distance: { label: "차 9분", minutes: 9 },
    badges: { inspection: "평가인증 B", feature: "대기 3명" },
    price: 240_000,
    rating: 4.2,
    reviewCount: 38,
    vsAvgPercent: -14,
    priceRows: [
      { room: "기본 보육료", note: "월 · 지원 후 부담금", price: "0원" },
      { room: "특별활동비", note: "월", price: "15만원" },
      { room: "현장학습·급식비", note: "월", price: "9만원" },
    ],
    inspections: [
      { title: "평가인증", date: "아이사랑 · 2025", result: "B등급" },
      { title: "급식위생 점검", date: "2026.01", result: "지적 없음" },
    ],
    review: {
      meta: "학부모 인증 · 2026.04",
      text: "소규모라 아이 개별 케어가 좋아요. 야외 놀이 공간이 작은 점은 아쉽습니다.",
    },
  },
];
