import type { FacilityImage } from "@/types/facility";

/**
 * 예시 이미지 생성 헬퍼.
 * picsum.photos의 seed 기반 URL이라 같은 seed면 항상 같은 사진이 나옵니다.
 * 실제 사진 연동 시 이 함수 호출을 실제 URL 배열로 교체하세요.
 */
export function sampleImages(seed: string, captions: string[]): FacilityImage[] {
  return captions.map((alt, i) => ({
    url: `https://picsum.photos/seed/salpyeo-${seed}-${i + 1}/1200/800`,
    alt,
    width: 1200,
    height: 800,
  }));
}
