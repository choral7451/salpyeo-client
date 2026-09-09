"use client";

import { useEffect } from "react";

import { useCompareStore } from "@/stores/compare-store";
import { useSessionStore } from "@/stores/session-store";

/** localStorage에 저장된 zustand 스토어를 클라이언트 마운트 후 복원 (비교함 + 로그인 세션) */
export function StoreHydrator() {
  useEffect(() => {
    void useCompareStore.persist.rehydrate();
    void useSessionStore.getState().restore();
  }, []);
  return null;
}
