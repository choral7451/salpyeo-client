import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind 클래스 병합 유틸 (shadcn/ui 관례) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 목록 필터 줄 컨트롤(지역 선택·검색·정렬)의 공통 높이.
 * 모바일 44px(터치 타깃), 데스크탑 36px. 한 곳에서 바꾸면 셋이 함께 움직인다.
 */
export const FILTER_CONTROL_HEIGHT = "h-11 lg:h-9";
