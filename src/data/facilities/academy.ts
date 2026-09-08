import type { Facility } from "@/types/facility";

import { sampleImages } from "./images";

/** 학원 — 아직 비활성 버티컬 */
export const ACADEMY_FACILITIES: Facility[] = [
  {
    id: "a1",
    vertical: "academy",
    name: "한빛수학학원",
    meta: "정자동 · 중등 전문",
    images: sampleImages("a1", ["학원 입구", "강의실", "자습실"]),
    distance: { label: "도보 10분", minutes: 10 },
    badges: { inspection: "교습비 공개 일치", feature: "반 정원 8명" },
    price: 380_000,
    rating: 4.5,
    reviewCount: 52,
    vsAvgPercent: -3,
    priceRows: [
      { room: "중등 정규반", note: "월 · 주 3회", price: "38만원" },
      { room: "교재비", note: "분기", price: "6만원" },
      { room: "클리닉 추가", note: "월 · 주 1회", price: "12만원" },
    ],
    inspections: [
      { title: "교습비 공개 확인", date: "나이스 · 2026.07", result: "일치" },
      { title: "학원 등록 상태", date: "성남교육지원청", result: "정상" },
    ],
    review: {
      meta: "학부모 인증 · 2026.06",
      text: "소수정예라 질문 기회가 많고 월별 성취 리포트를 보내줘요. 자리가 빨리 차는 편입니다.",
    },
  },
  {
    id: "a2",
    vertical: "academy",
    name: "그린영어학원",
    meta: "서현동 · 초·중등",
    images: sampleImages("a2", ["학원 입구", "원어민 강의실", "라운지"]),
    distance: { label: "차 8분", minutes: 8 },
    badges: { inspection: "교습비 공개 일치", feature: "원어민 수업" },
    price: 420_000,
    rating: 4.3,
    reviewCount: 41,
    vsAvgPercent: 7,
    priceRows: [
      { room: "초등 정규반", note: "월 · 주 3회", price: "42만원" },
      { room: "교재비", note: "분기", price: "8만원" },
      { room: "레벨테스트", note: "1회", price: "무료" },
    ],
    inspections: [
      { title: "교습비 공개 확인", date: "나이스 · 2026.07", result: "일치" },
      { title: "학원 등록 상태", date: "성남교육지원청", result: "정상" },
    ],
    review: {
      meta: "학부모 인증 · 2026.05",
      text: "원어민 수업 비중이 높고 숙제 관리가 철저해요. 셔틀이 없는 게 단점입니다.",
    },
  },
  {
    id: "a3",
    vertical: "academy",
    name: "다온코딩아카데미",
    meta: "수내동 · 초·중등",
    images: sampleImages("a3", ["학원 입구", "실습실", "프로젝트 발표"]),
    distance: { label: "차 7분", minutes: 7 },
    badges: { inspection: "교습비 공개 일치", feature: "1인 1노트북" },
    price: 350_000,
    rating: 4.6,
    reviewCount: 33,
    vsAvgPercent: -5,
    priceRows: [
      { room: "정규반", note: "월 · 주 2회", price: "35만원" },
      { room: "교구비", note: "분기", price: "5만원" },
      { room: "대회 준비반", note: "월 · 선택", price: "15만원" },
    ],
    inspections: [
      { title: "교습비 공개 확인", date: "나이스 · 2026.06", result: "일치" },
      { title: "학원 등록 상태", date: "성남교육지원청", result: "정상" },
    ],
    review: {
      meta: "학부모 인증 · 2026.06",
      text: "아이가 스스로 프로젝트를 완성하게 이끌어줘요. 결과물 공유회가 만족스럽습니다.",
    },
  },
];
