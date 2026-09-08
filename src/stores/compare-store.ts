import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { VerticalKey } from "@/types/facility";

export const MAX_COMPARE = 3;

export type ToggleResult = "added" | "removed" | "full";

interface CompareState {
  /** 버티컬별 비교함 (시설 id 목록, 최대 MAX_COMPARE개) */
  selected: Partial<Record<VerticalKey, string[]>>;
  /** localStorage 복원 완료 여부 — 복원 전에는 UI에서 비교함 상태를 그리지 않음 */
  hydrated: boolean;
  toggle: (vertical: VerticalKey, id: string) => ToggleResult;
  clear: (vertical: VerticalKey) => void;
  setHydrated: (value: boolean) => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      selected: {},
      hydrated: false,

      toggle: (vertical, id) => {
        const current = get().selected[vertical] ?? [];
        if (current.includes(id)) {
          set((state) => ({
            selected: {
              ...state.selected,
              [vertical]: current.filter((x) => x !== id),
            },
          }));
          return "removed";
        }
        if (current.length >= MAX_COMPARE) return "full";
        set((state) => ({
          selected: { ...state.selected, [vertical]: [...current, id] },
        }));
        return "added";
      },

      clear: (vertical) =>
        set((state) => ({ selected: { ...state.selected, [vertical]: [] } })),

      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: "salpyeo:compare",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selected: state.selected }),
      // SSR 하이드레이션 불일치를 막기 위해 클라이언트에서 수동 복원 (StoreHydrator 참고)
      skipHydration: true,
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    },
  ),
);
