"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  createInquiry,
  INQUIRY_CONTENT_MAX,
  INQUIRY_MAX_FILES,
  INQUIRY_MAX_FILE_SIZE,
  INQUIRY_TITLE_MAX,
} from "@/lib/api/inquiry";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface Attachment {
  file: File;
  /** 미리보기용 objectURL — 보낸 뒤 정리한다 */
  preview: string;
}

const fieldClass =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-[15px] text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary";

export function InquiryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState<Attachment[]>([]);
  const [sending, setSending] = useState(false);
  const [doneId, setDoneId] = useState<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const addFiles = (selected: FileList | null) => {
    if (!selected?.length) return;

    const room = INQUIRY_MAX_FILES - files.length;
    const accepted: Attachment[] = [];
    for (const file of Array.from(selected).slice(0, room)) {
      if (file.size > INQUIRY_MAX_FILE_SIZE) {
        toast.error(`${file.name} 은 5MB를 넘습니다`);
        continue;
      }
      accepted.push({ file, preview: URL.createObjectURL(file) });
    }
    if (Array.from(selected).length > room) toast(`사진은 ${INQUIRY_MAX_FILES}장까지 첨부할 수 있어요`);

    setFiles((current) => [...current, ...accepted]);
    if (fileInput.current) fileInput.current.value = "";
  };

  const removeFile = (index: number) =>
    setFiles((current) => {
      URL.revokeObjectURL(current[index].preview);
      return current.filter((_, i) => i !== index);
    });

  const submit = async () => {
    if (!title.trim() || !content.trim() || !email.trim()) {
      toast.error("제목·내용·이메일을 모두 입력해 주세요");
      return;
    }

    setSending(true);
    try {
      const inquiry = await createInquiry({
        title: title.trim(),
        content: content.trim(),
        email: email.trim(),
        files: files.map((f) => f.file),
      });
      for (const f of files) URL.revokeObjectURL(f.preview);
      setFiles([]);
      setDoneId(inquiry.id);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "문의를 보내지 못했습니다");
    } finally {
      setSending(false);
    }
  };

  if (doneId !== null) {
    return (
      <div role="status" aria-live="polite" className="mt-8 rounded-2xl border border-hairline bg-surface p-8 text-center">
        <h2 className="text-lg font-extrabold text-text">문의를 접수했습니다</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          접수번호 <span className="font-bold text-text">#{doneId}</span> · 남겨 주신 이메일{" "}
          <span className="font-bold text-text">{email}</span> 로 답변드리겠습니다.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={routes.home()}>홈으로</Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDoneId(null);
              setTitle("");
              setContent("");
            }}
          >
            문의 더 남기기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-hairline bg-surface p-6">
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-text-secondary">제목</span>
        <input
          type="text"
          value={title}
          maxLength={INQUIRY_TITLE_MAX}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 올리비움산후조리원 요금이 실제와 달라요"
          autoComplete="off"
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="flex items-baseline justify-between text-[13px] font-bold text-text-secondary">
          내용
          <span className={cn("text-[11px] font-medium", content.length > INQUIRY_CONTENT_MAX - 100 ? "text-primary" : "text-text-muted")}>
            {content.length} / {INQUIRY_CONTENT_MAX}
          </span>
        </span>
        <textarea
          value={content}
          maxLength={INQUIRY_CONTENT_MAX}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          placeholder="어떤 점이 궁금하신지, 어느 시설의 어떤 정보가 잘못됐는지 알려 주시면 빠르게 확인하겠습니다."
          autoComplete="off"
          className={cn(fieldClass, "resize-y leading-relaxed")}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-bold text-text-secondary">답변받을 이메일</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mom@example.com"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          className={fieldClass}
        />
      </label>

      <section className="flex flex-col gap-2.5">
        <span className="text-[13px] font-bold text-text-secondary">
          사진 첨부 <span className="font-medium text-text-muted">(선택 · 최대 {INQUIRY_MAX_FILES}장, 각 5MB)</span>
        </span>

        {files.length > 0 ? (
          <ul className="flex flex-wrap gap-2.5">
            {files.map((f, index) => (
              <li key={f.preview} className="relative">
                <Image
                  src={f.preview}
                  alt={f.file.name}
                  width={76}
                  height={76}
                  unoptimized
                  className="size-19 rounded-xl border border-hairline object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  aria-label={`${f.file.name} 첨부 취소`}
                  className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-dark/80 text-white transition-colors hover:bg-dark"
                >
                  <X size={13} strokeWidth={2.8} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {files.length < INQUIRY_MAX_FILES ? (
          <>
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => addFiles(e.target.files)}
              className="hidden"
            />
            <Button variant="outline" size="sm" onClick={() => fileInput.current?.click()} className="self-start">
              <ImagePlus size={15} strokeWidth={2.2} aria-hidden />
              사진 고르기
            </Button>
          </>
        ) : null}
      </section>

      <Button size="block" onClick={submit} disabled={sending} className="mt-1">
        {sending ? "보내는 중…" : "문의 보내기"}
      </Button>

      <p className="text-center text-[12px] leading-relaxed text-text-muted">
        보내주신 이메일은 답변 목적으로만 사용합니다.
      </p>
    </div>
  );
}
