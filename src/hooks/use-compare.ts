"use client";

import { useCallback } from "react";
import { toast } from "sonner";

import { MAX_COMPARE, useCompareStore } from "@/stores/compare-store";
import type { VerticalKey } from "@/types/facility";

const EMPTY: readonly string[] = [];

/** 특정 버티컬의 비교함 상태와 토글 핸들러 */
export function useCompare(vertical: VerticalKey) {
  const ids = useCompareStore((s) => s.selected[vertical] ?? EMPTY);
  const hydrated = useCompareStore((s) => s.hydrated);
  const toggleInStore = useCompareStore((s) => s.toggle);
  const clearInStore = useCompareStore((s) => s.clear);

  const toggle = useCallback(
    (id: string) => {
      const result = toggleInStore(vertical, id);
      if (result === "full") {
        toast.error(`최대 ${MAX_COMPARE}곳까지 담을 수 있어요`, {
          description: "비교함에서 한 곳을 빼고 다시 담아 주세요.",
        });
      }
      return result;
    },
    [toggleInStore, vertical],
  );

  const clear = useCallback(() => clearInStore(vertical), [clearInStore, vertical]);

  return {
    ids,
    hydrated,
    count: ids.length,
    isSelected: (id: string) => ids.includes(id),
    canCompare: ids.length >= 2,
    toggle,
    clear,
  };
}
