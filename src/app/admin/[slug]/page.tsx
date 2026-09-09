"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";

import { AdminGate } from "@/components/admin/admin-gate";
import { NumberField, RowList, TextField } from "@/components/admin/field";
import { Button } from "@/components/ui/button";
import {
  fetchAdminFacility,
  updateAdminFacility,
  uploadAdminFacilityImage,
  type AdminFacility,
  type AdminFacilityPatch,
  type AdminImage,
} from "@/lib/api/admin";
import { routes } from "@/lib/routes";

export default function AdminFacilityPage() {
  return (
    <AdminGate>
      <AdminFacilityEditor />
    </AdminGate>
  );
}

/** 원본과 달라진 필드만 골라 보낸다 (서버가 부분 수정을 받는다) */
function diffPatch(original: AdminFacility, draft: AdminFacility): AdminFacilityPatch {
  const patch: AdminFacilityPatch = {};
  const keys = [
    "name",
    "meta",
    "sido",
    "sigungu",
    "operatorType",
    "address",
    "phone",
    "inspectionBadge",
    "featureBadge",
    "price",
    "priceRows",
    "images",
    "isActive",
  ] as const;

  for (const key of keys) {
    if (JSON.stringify(original[key]) !== JSON.stringify(draft[key])) {
      // 키마다 타입이 달라 한 번에 좁히기 어렵다 — 값은 draft 에서 그대로 옮긴다
      (patch as Record<string, unknown>)[key] = draft[key];
    }
  }
  return patch;
}

function AdminFacilityEditor() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";

  const [original, setOriginal] = useState<AdminFacility | null>(null);
  const [draft, setDraft] = useState<AdminFacility | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetchAdminFacility(slug)
      .then((facility) => {
        if (cancelled) return;
        setOriginal(facility);
        setDraft(facility);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "시설을 불러오지 못했습니다");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const update = useCallback(
    (patch: Partial<AdminFacility>) => setDraft((d) => (d ? { ...d, ...patch } : d)),
    [],
  );

  const uploadImages = async (files: FileList | null) => {
    if (!files?.length || !draft) return;

    setUploading(true);
    try {
      const uploaded: AdminImage[] = [];
      // 한 장씩 순서대로 — 실패한 장이 있어도 앞서 올라간 것은 목록에 남는다
      for (const file of Array.from(files)) {
        uploaded.push(await uploadAdminFacilityImage(draft.slug, file));
      }
      update({ images: [...draft.images, ...uploaded] });
      toast.success(`${uploaded.length}장 올렸습니다 — 저장을 눌러야 반영됩니다`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "업로드에 실패했습니다");
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const save = async () => {
    if (!original || !draft) return;
    const patch = diffPatch(original, draft);
    if (Object.keys(patch).length === 0) {
      toast("바뀐 내용이 없습니다");
      return;
    }

    setSaving(true);
    try {
      const saved = await updateAdminFacility(draft.slug, patch);
      setOriginal(saved);
      setDraft(saved);
      toast.success("저장했습니다");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "저장에 실패했습니다");
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return (
      <div className="container-page flex flex-1 flex-col items-center justify-center gap-3 py-24 text-center">
        <p className="text-sm text-text-secondary">{error}</p>
        <Button variant="outline" size="sm" asChild>
          <Link href={routes.admin()}>목록으로</Link>
        </Button>
      </div>
    );
  }

  if (!draft || !original) {
    return <p className="container-page py-24 text-center text-sm text-text-secondary">불러오는 중…</p>;
  }

  const dirty = Object.keys(diffPatch(original, draft)).length > 0;

  return (
    <div className="flex-1 bg-surface-alt">
      <div className="container-page flex max-w-[820px] flex-col gap-6 pt-8 pb-24">
        <div>
          <Link href={routes.admin()} className="text-sm text-text-secondary hover:text-primary">
            ← 목록으로
          </Link>
          <h1 className="mt-2 text-[26px] font-extrabold tracking-[-0.6px] text-text">{original.name}</h1>
          <p className="mt-1 text-sm text-text-tertiary">
            {original.slug} · 마지막 수정 {new Date(original.updatedAt).toLocaleString("ko-KR")}
          </p>
        </div>

        <section className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="이름" value={draft.name} onChange={(name) => update({ name })} />
            <TextField
              label="위치 요약"
              value={draft.meta}
              onChange={(meta) => update({ meta })}
              hint="목록·카드에 나오는 짧은 위치 (예: 서울 종로구)"
            />
            <TextField label="시도" value={draft.sido} onChange={(sido) => update({ sido })} />
            <TextField label="시군구" value={draft.sigungu} onChange={(sigungu) => update({ sigungu })} />
            <TextField
              label="운영주체"
              value={draft.operatorType}
              onChange={(operatorType) => update({ operatorType })}
              hint="민간 / 지자체"
            />
            <TextField label="전화" value={draft.phone} onChange={(phone) => update({ phone })} />
            <TextField
              label="주소"
              value={draft.address}
              onChange={(address) => update({ address })}
              className="sm:col-span-2"
            />
            <NumberField
              label="대표 가격 (원)"
              value={draft.price}
              onChange={(price) => update({ price })}
              hint="0 이면 화면에 '요금 미공개'로 나옵니다"
            />
            <TextField
              label="특성 배지"
              value={draft.featureBadge}
              onChange={(featureBadge) => update({ featureBadge })}
              hint="카드의 파란 배지 (예: 민간 운영)"
            />
            <TextField
              label="점검·평가 배지"
              value={draft.inspectionBadge}
              onChange={(inspectionBadge) => update({ inspectionBadge })}
              hint="초록 배지. 비워 두면 표시되지 않습니다"
              className="sm:col-span-2"
            />
          </div>
        </section>

        <section className="rounded-2xl border border-hairline bg-surface p-5">
          <RowList
            label="요금표"
            hint="상세 페이지의 요금 표. 가격은 표시할 문자열 그대로 (예: 470만원)"
            rows={draft.priceRows}
            onChange={(priceRows) => update({ priceRows })}
            makeEmpty={() => ({ room: "", note: "", price: "" })}
            renderRow={(row, updateRow) => (
              <>
                <input
                  aria-label="객실"
                  value={row.room}
                  onChange={(e) => updateRow({ room: e.target.value })}
                  placeholder="일반실"
                  className="w-[110px] rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  aria-label="설명"
                  value={row.note}
                  onChange={(e) => updateRow({ note: e.target.value })}
                  placeholder="2주 기준"
                  className="min-w-[160px] flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  aria-label="가격"
                  value={row.price}
                  onChange={(e) => updateRow({ price: e.target.value })}
                  placeholder="470만원"
                  className="w-[110px] rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </>
            )}
          />
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-5">
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => void uploadImages(e.target.files)}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
            >
              <ImagePlus size={15} strokeWidth={2.2} aria-hidden />
              {uploading ? "올리는 중…" : "사진 올리기"}
            </Button>
            <span className="text-[11px] text-text-muted">
              jpg · png · webp, 한 장당 10MB까지. 올린 뒤 저장을 눌러야 반영됩니다
            </span>
          </div>

          <RowList
            label="사진"
            hint="올린 사진은 우리 S3, 예전 사진은 조리원 홈페이지 URL 을 그대로 참조합니다"
            rows={draft.images}
            onChange={(images) => update({ images })}
            makeEmpty={() => ({ url: "", alt: "", width: 0, height: 0 })}
            renderRow={(row, updateRow) => (
              <>
                {row.url ? (
                  <Image
                    src={row.url}
                    alt=""
                    width={56}
                    height={42}
                    unoptimized
                    className="h-[42px] w-14 shrink-0 rounded-md border border-hairline object-cover"
                  />
                ) : null}
                <input
                  aria-label="이미지 URL"
                  value={row.url}
                  onChange={(e) => updateRow({ url: e.target.value })}
                  placeholder="https://…/room.jpg"
                  className="min-w-[220px] flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  aria-label="설명"
                  value={row.alt}
                  onChange={(e) => updateRow({ alt: e.target.value })}
                  placeholder="신생아실"
                  className="w-[120px] rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  aria-label="가로"
                  type="number"
                  min={0}
                  value={row.width}
                  onChange={(e) => updateRow({ width: Number(e.target.value) })}
                  className="w-[90px] rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  aria-label="세로"
                  type="number"
                  min={0}
                  value={row.height}
                  onChange={(e) => updateRow({ height: Number(e.target.value) })}
                  className="w-[90px] rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </>
            )}
          />
        </section>

        <section className="flex items-center justify-between rounded-2xl border border-hairline bg-surface p-5">
          <label className="flex items-center gap-2.5 text-sm font-bold text-text">
            <input
              type="checkbox"
              checked={draft.isActive}
              onChange={(e) => update({ isActive: e.target.checked })}
              className="size-4 accent-[var(--primary)]"
            />
            공개
          </label>
          <p className="text-xs text-text-muted">끄면 목록·상세에서 사라집니다 (관리자 목록에는 남습니다)</p>
        </section>

        <div className="sticky bottom-4 flex items-center justify-end gap-3 rounded-2xl border border-hairline bg-surface/95 p-4 backdrop-blur">
          {dirty ? <span className="mr-auto text-sm text-text-secondary">저장하지 않은 변경이 있습니다</span> : null}
          <Button variant="outline" size="sm" onClick={() => setDraft(original)} disabled={!dirty || saving}>
            되돌리기
          </Button>
          <Button size="sm" onClick={save} disabled={!dirty || saving}>
            {saving ? "저장 중…" : "저장"}
          </Button>
        </div>
      </div>
    </div>
  );
}
