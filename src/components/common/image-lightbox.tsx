"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface LightboxImage {
  url: string;
  alt: string;
}

/**
 * 사진 전체 화면 보기 — 상세 갤러리와 관리자 편집 폼이 함께 쓴다.
 * ESC 로 닫고 ←/→ 로 넘긴다. 열려 있는 동안 배경 스크롤은 막는다.
 */
export function ImageLightbox({
  images,
  index,
  title,
  onIndexChange,
  onClose,
  unoptimized,
}: {
  images: LightboxImage[];
  index: number;
  /** 스크린 리더용 이름 (시설명 등) */
  title: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** 관리자 화면처럼 최적화가 필요 없을 때 */
  unoptimized?: boolean;
}) {
  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  const current = images[index];
  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} 사진 크게 보기`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 p-4 backdrop-blur-sm"
    >
      {/* 사진은 원본 비율 그대로 보여 준다 (잘라내지 않음) */}
      <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
        <Image
          key={current.url}
          src={current.url}
          alt={`${title} ${current.alt}`}
          fill
          sizes="100vw"
          unoptimized={unoptimized}
          className="object-contain"
        />
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        autoFocus
        className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={20} strokeWidth={2.5} aria-hidden />
      </button>

      {images.length > 1 ? (
        <>
          <LightboxNav side="left" onClick={() => go(-1)} />
          <LightboxNav side="right" onClick={() => go(1)} />
          <div className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
            {current.alt ? <span>{current.alt}</span> : null}
            <span className="tabular text-white/70">
              {index + 1} / {images.length}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}

function LightboxNav({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "이전 사진" : "다음 사진"}
      className={cn(
        "absolute top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20",
        side === "left" ? "left-4" : "right-4",
      )}
    >
      <Icon size={24} strokeWidth={2.5} aria-hidden />
    </button>
  );
}
