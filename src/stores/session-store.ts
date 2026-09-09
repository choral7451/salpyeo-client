import { create } from "zustand";

import { fetchMe, signOut as signOutApi, type AuthUser } from "@/lib/api/auth";
import { setUnauthorizedHandler } from "@/lib/api/browser-client";
import { loadTokens } from "@/lib/api/token";

/** 저장된 토큰으로 내 정보를 되찾는 데 이보다 오래 걸리면 그냥 비로그인으로 그린다 */
const RESTORE_TIMEOUT_MS = 8_000;

interface SessionState {
  /** localStorage 토큰으로 세션 복원 중 — 복원 전에는 로그인/로그아웃 어느 쪽도 그리지 않는다 */
  hydrated: boolean;
  user: AuthUser | null;
  restore: () => Promise<void>;
  setUser: (user: AuthUser) => void;
  signOut: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  hydrated: false,
  user: null,

  restore: async () => {
    try {
      if (!loadTokens()) return;
      const user = await Promise.race([
        fetchMe(),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), RESTORE_TIMEOUT_MS),
        ),
      ]);
      set({ user });
    } catch (e) {
      // 타임아웃은 네트워크 문제일 수 있으니 토큰을 지우지 않는다 (401 이면 클라이언트가 이미 정리한다)
      if (!(e instanceof Error && e.message === "timeout")) signOutApi();
    } finally {
      set({ hydrated: true });
    }
  },

  setUser: (user) => set({ user, hydrated: true }),

  signOut: () => {
    signOutApi();
    set({ user: null });
  },
}));

// refresh 까지 실패한 세션은 즉시 로그아웃 — 에러만 뿌리는 좀비 상태 방지
setUnauthorizedHandler(() => {
  if (useSessionStore.getState().user) useSessionStore.getState().signOut();
});
