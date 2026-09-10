"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useCallback, useState } from "react";

import { ImageLightbox } from "@/components/common/image-lightbox";
import { Thumbnail } from "@/components/common/thumbnail";
import { cn } from "@/lib/utils";
import type { FacilityImage } from "@/types/facility";

/**
 * 시설 사진 갤러리 — 대표 사진 + 하단 썸네일 스트립.
 * 좌우 버튼, 썸네일 클릭, 키보드(←/→)로 넘기고, 사진을 누르면 전체 화면으로 크게 봅니다.
 */
export function PhotoGallery({
  images,
  name,
  className,
}: {
  /** 시설 공식 홈페이지에서 가져온 사진. 없으면 플레이스홀더 */
  images: FacilityImage[];
  name: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + images.length) % images.length),
    [images.length],
  );

  if (images.length === 0) {
    return <Thumbnail className={cn("h-[260px] w-full", className)} label="시설 사진" />;
  }

  const current = images[index];

  return (
    <div className={className}>
      <div
        className="group relative h-[260px] w-full overflow-hidden bg-placeholder"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${name} 사진`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
      >
        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label={`${name} ${current.alt} 크게 보기`}
          className="absolute inset-0 z-[1] cursor-zoom-in"
        />
        <Image
          key={current.url}
          src={current.url}
          alt={`${name} ${current.alt}`}
          fill
          sizes="(max-width: 1024px) 100vw, 760px"
          priority={index === 0}
          className="object-cover"
        />

        <span className="pointer-events-none absolute top-3 right-3 z-[2] flex items-center gap-1 rounded-full bg-dark/70 px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100">
          <Expand size={13} strokeWidth={2.5} aria-hidden />
          크게 보기
        </span>

        {images.length > 1 ? (
          <>
            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />
            <div className="pointer-events-none absolute right-3 bottom-3 z-[2] flex items-center gap-2 rounded-full bg-dark/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              <span>{current.alt}</span>
              <span className="tabular text-white/70">
                {index + 1} / {images.length}
              </span>
            </div>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div
          role="tablist"
          aria-label="사진 목록"
          className="flex gap-2 overflow-x-auto border-b border-hairline bg-surface-alt px-4 py-3"
        >
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={img.alt}
              onClick={() => setIndex(i)}
              onDoubleClick={() => setZoomed(true)}
              className={cn(
                "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-[border-color,opacity] duration-150",
                i === index
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image src={img.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      {zoomed ? (
        <ImageLightbox
          images={images}
          index={index}
          title={name}
          onIndexChange={setIndex}
          onClose={() => setZoomed(false)}
        />
      ) : null}
    </div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "이전 사진" : "다음 사진"}
      className={cn(
        "absolute top-1/2 z-[2] flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text shadow-card-hover transition-opacity duration-150 hover:bg-white focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-primary/30 focus-visible:outline-none md:opacity-0 md:group-hover:opacity-100",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon size={18} strokeWidth={2.5} aria-hidden />
    </button>
  );
}
