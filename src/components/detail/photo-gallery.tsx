"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Thumbnail } from "@/components/common/thumbnail";
import { cn } from "@/lib/utils";
import type { FacilityImage } from "@/types/facility";

/**
 * 시설 사진 갤러리 — 대표 사진 + 하단 썸네일 스트립.
 * 좌우 버튼, 썸네일 클릭, 키보드(←/→)로 넘길 수 있습니다.
 */
export function PhotoGallery({
  images,
  name,
  className,
}: {
  images: FacilityImage[];
  name: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return <Thumbnail className={cn("h-[260px] w-full", className)} label="시설 사진" />;
  }

  const current = images[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + images.length) % images.length);

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
        <Image
          key={current.url}
          src={current.url}
          alt={`${name} ${current.alt}`}
          fill
          sizes="(max-width: 1024px) 100vw, 760px"
          priority={index === 0}
          className="object-cover"
        />

        {images.length > 1 ? (
          <>
            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />
            <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-full bg-dark/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
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
        "absolute top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text shadow-card-hover transition-opacity duration-150 hover:bg-white focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-primary/30 focus-visible:outline-none md:opacity-0 md:group-hover:opacity-100",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon size={18} strokeWidth={2.5} aria-hidden />
    </button>
  );
}
