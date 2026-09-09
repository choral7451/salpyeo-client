"use client";

import { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { rehostFacilityImages } from "@/lib/api/admin";

/** 한 번에 처리할 시설 수 — 서버 상한과 같다 */
const BATCH = 10;

/**
 * 조리원 홈페이지 사진을 우리 S3 로 옮긴다.
 * 실제 다운로드·업로드는 운영 서버가 하고, 여기서는 남은 시설이 0 이 될 때까지 반복 호출만 한다.
 */
export function RehostPanel({ onDone }: { onDone?: () => void }) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<{ moved: number; failed: number; remaining: number } | null>(null);
  const stopped = useRef(false);

  const run = async () => {
    setRunning(true);
    stopped.current = false;
    let moved = 0;
    let failed = 0;

    try {
      for (;;) {
        const result = await rehostFacilityImages(BATCH);
        moved += result.moved;
        failed += result.failed;
        setProgress({ moved, failed, remaining: result.remaining });

        // 남은 시설이 없거나, 이번 회차에 아무것도 못 옮겼으면 멈춘다 (전부 실패하는 상황에서 무한 반복 방지)
        if (result.remaining === 0 || result.facilities === 0 || result.moved === 0) break;
        if (stopped.current) break;
      }
      toast.success(`사진 ${moved}장을 S3 로 옮겼습니다${failed ? ` (실패 ${failed}장은 원래 주소 유지)` : ""}`);
      onDone?.();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "사진 이전에 실패했습니다");
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-hairline bg-surface px-4 py-3">
      <Button variant="outline" size="sm" onClick={running ? () => (stopped.current = true) : run} disabled={false}>
        <CloudUpload size={15} strokeWidth={2.2} aria-hidden />
        {running ? "멈추기" : "사진 S3로 옮기기"}
      </Button>

      <p className="text-[12px] text-text-secondary">
        {progress
          ? `옮김 ${progress.moved}장 · 실패 ${progress.failed}장 · 남은 시설 ${progress.remaining}곳`
          : "조리원 홈페이지에서 불러오던 사진을 우리 서버로 옮깁니다. 오래 걸리니 창을 닫지 마세요."}
      </p>
    </div>
  );
}
