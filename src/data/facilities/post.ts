import type { Facility } from "@/types/facility";

import { sampleImages } from "./images";

export const POST_FACILITIES: Facility[] = [
  {
    id: "p1",
    vertical: "post",
    name: "라온 산후조리원",
    meta: "정자역 도보 6분",
    images: sampleImages("p1", ["건물 외관", "일반실", "신생아실", "식당", "마사지실"]),
    distance: { label: "차 8분", minutes: 8 },
    badges: { inspection: "점검 지적 없음", feature: "모자동실" },
    price: 4_800_000,
    rating: 4.6,
    reviewCount: 128,
    vsAvgPercent: -7,
    priceRows: [
      { room: "일반실", note: "2주 · 모자동실 선택 가능", price: "480만원" },
      { room: "특실", note: "2주 · 가족 숙박 1인 포함", price: "690만원" },
      { room: "연장 1일", note: "일반실 기준", price: "32만원" },
    ],
    inspections: [
      { title: "정기 위생 점검", date: "분당구보건소 · 2026.05", result: "지적 없음" },
      { title: "감염관리 점검", date: "분당구보건소 · 2025.11", result: "지적 없음" },
    ],
    review: {
      meta: "2026.07 이용",
      text: "신생아실 인력이 넉넉하고 밤중 수유 콜 응답이 빨랐어요. 마사지 추가 비용이 미리 안내돼서 좋았습니다.",
    },
  },
  {
    id: "p2",
    vertical: "post",
    name: "포근 산후조리원",
    meta: "미금역 도보 3분",
    images: sampleImages("p2", ["건물 외관", "가족실", "신생아실", "휴게 라운지"]),
    distance: { label: "차 14분", minutes: 14 },
    badges: { inspection: "점검 지적 없음", feature: "가족실" },
    price: 5_200_000,
    rating: 4.4,
    reviewCount: 96,
    vsAvgPercent: -1,
    priceRows: [
      { room: "일반실", note: "2주", price: "520만원" },
      { room: "가족실", note: "2주 · 보호자 상시 숙박", price: "640만원" },
      { room: "연장 1일", note: "일반실 기준", price: "36만원" },
    ],
    inspections: [
      { title: "정기 위생 점검", date: "분당구보건소 · 2026.03", result: "지적 없음" },
      { title: "감염관리 점검", date: "분당구보건소 · 2025.09", result: "지적 없음" },
    ],
    review: {
      meta: "2026.06 이용",
      text: "식단이 훌륭하고 좌욕·마사지 일정 관리가 체계적이에요. 주차 공간이 좁은 점은 아쉬웠어요.",
    },
  },
  {
    id: "p3",
    vertical: "post",
    name: "온새미로 조리원",
    meta: "서현역 도보 5분",
    images: sampleImages("p3", ["건물 외관", "일반실", "간호 스테이션", "식사"]),
    distance: { label: "차 12분", minutes: 12 },
    badges: { inspection: "시정 완료 1건", feature: "24시간 간호" },
    price: 5_450_000,
    rating: 4.3,
    reviewCount: 61,
    vsAvgPercent: 4,
    priceRows: [
      { room: "일반실", note: "2주", price: "545만원" },
      { room: "특실", note: "2주", price: "720만원" },
      { room: "연장 1일", note: "일반실 기준", price: "38만원" },
    ],
    inspections: [
      { title: "정기 위생 점검", date: "분당구보건소 · 2026.04", result: "1건 시정완료" },
      { title: "감염관리 점검", date: "분당구보건소 · 2025.10", result: "지적 없음" },
    ],
    review: {
      meta: "2026.05 이용",
      text: "간호 인력이 24시간 상주해서 안심됐어요. 시설이 살짝 오래된 느낌은 있습니다.",
    },
  },
  {
    id: "p4",
    vertical: "post",
    name: "소풍 산후조리원",
    meta: "수내역 도보 8분",
    images: sampleImages("p4", ["건물 외관", "특실 테라스", "신생아실", "요가룸", "로비"]),
    distance: { label: "차 11분", minutes: 11 },
    badges: { inspection: "점검 지적 없음", feature: "특실 보유" },
    price: 6_100_000,
    rating: 4.7,
    reviewCount: 74,
    vsAvgPercent: 12,
    priceRows: [
      { room: "일반실", note: "2주", price: "610만원" },
      { room: "특실", note: "2주 · 테라스 포함", price: "650만원" },
      { room: "연장 1일", note: "일반실 기준", price: "42만원" },
    ],
    inspections: [
      { title: "정기 위생 점검", date: "분당구보건소 · 2026.06", result: "지적 없음" },
      { title: "감염관리 점검", date: "분당구보건소 · 2025.12", result: "지적 없음" },
    ],
    review: {
      meta: "2026.07 이용",
      text: "신축이라 시설이 쾌적하고 특실 가성비가 좋아요. 식사 시간대가 고정인 건 참고하세요.",
    },
  },
];
