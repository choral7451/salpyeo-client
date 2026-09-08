"use client";

import { useEffect } from "react";

import { useCompareStore } from "@/stores/compare-store";

/** localStorage에 저장된 zustand 스토어를 클라이언트 마운트 후 복원 */
export function StoreHydrator() {
  useEffect(() => {
    void useCompareStore.persist.rehydrate();
  }, []);
  return null;
}
