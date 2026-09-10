"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { AdminGate } from "@/components/admin/admin-gate";
import { ImageLightbox } from "@/components/common/image-lightbox";
import { Button } from "@/components/ui/button";
import { fetchAdminInquiries, setInquiryResolved, type Inquiry } from "@/lib/api/inquiry";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export default function AdminInquiriesPage() {
  return (
    <AdminGate>
      <InquiryList />
    </AdminGate>
  );
}

function InquiryList() {
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** 크게 보고 있는 첨부 — 문의별로 사진 목록이 달라 함께 들고 있는다 */
  const [zoom, setZoom] = useState<{ images: string[]; index: number; title: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchAdminInquiries()
      .then((items) => {
        if (!cancelled) setInquiries(items);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "문의를 불러오지 못했습니다");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleResolved = async (inquiry: Inquiry) => {
    try {
      const updated = await setInquiryResolved(inquiry.id, !inquiry.isResolved);
      setInquiries((current) => (current ?? []).map((i) => (i.id === updated.id ? updated : i)));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "상태를 바꾸지 못했습니다");
    }
  };

  const pending = (inquiries ?? []).filter((i) => !i.isResolved).length;

  return (
    <div className="flex-1 bg-surface-alt">
      <div className="container-page max-w-[860px] pt-8 pb-20">
        <Link href={routes.admin()} className="text-sm text-text-secondary hover:text-primary">
          ← 시설 관리
        </Link>

        <div className="mt-2 flex flex-wrap items-baseline gap-3">
          <h1 className="text-[28px] font-extrabold tracking-[-0.6px] text-text">문의</h1>
          <span className="text-[15px] text-text-tertiary">
            {inquiries === null ? "불러오는 중…" : `${inquiries.length}건 · 미처리 ${pending}건`}
          </span>
        </div>

        {error ? <p className="mt-8 text-sm text-text-secondary">{error}</p> : null}

        {inquiries !== null && inquiries.length === 0 ? (
          <p className="mt-10 text-center text-sm text-text-secondary">접수된 문의가 없습니다</p>
        ) : null}

        <ul className="mt-5 flex flex-col gap-3">
          {(inquiries ?? []).map((inquiry) => (
            <li
              key={inquiry.id}
              className={cn(
                "rounded-2xl border border-hairline bg-surface p-5",
                inquiry.isResolved && "opacity-60",
              )}
            >
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-xs font-bold text-text-muted">#{inquiry.id}</span>
                <h2 className="text-[17px] font-bold text-text">{inquiry.title}</h2>
                {inquiry.isResolved ? (
                  <span className="rounded-sm bg-hairline px-1.5 py-0.5 text-[11px] font-bold text-text-muted">처리 완료</span>
                ) : null}
                <span className="ml-auto text-xs text-text-muted">
                  {new Date(inquiry.createdAt).toLocaleString("ko-KR")}
                </span>
              </div>

              <p className="mt-3 text-[15px] leading-relaxed whitespace-pre-wrap text-text-body">{inquiry.content}</p>

              {inquiry.images.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {inquiry.images.map((url, index) => (
                    <li key={url}>
                      <button
                        type="button"
                        onClick={() => setZoom({ images: inquiry.images, index, title: inquiry.title })}
                        aria-label={`첨부 ${index + 1} 크게 보기`}
                        className="cursor-zoom-in overflow-hidden rounded-lg border border-hairline transition-opacity hover:opacity-80"
                      >
                        {/* 첨부 미리보기는 편집용이라 최적화 없이 원본을 그대로 */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt="" width={88} height={66} className="h-[66px] w-22 object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-hairline pt-3">
                <a
                  href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`[살펴] ${inquiry.title}`)}`}
                  className="text-sm font-bold text-primary underline-offset-2 hover:underline"
                >
                  {inquiry.email}
                </a>
                <Button variant="outline" size="sm" onClick={() => toggleResolved(inquiry)} className="ml-auto">
                  {inquiry.isResolved ? "미처리로 되돌리기" : "처리 완료"}
                </Button>
              </div>
            </li>
          ))}
        </ul>

        {zoom ? (
          <ImageLightbox
            images={zoom.images.map((url) => ({ url, alt: "" }))}
            index={zoom.index}
            title={zoom.title}
            unoptimized
            onIndexChange={(index) => setZoom({ ...zoom, index })}
            onClose={() => setZoom(null)}
          />
        ) : null}
      </div>
    </div>
  );
}
