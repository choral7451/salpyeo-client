import { browserPost, browserRequest, BROWSER_API_BASE_URL } from "@/lib/api/browser-client";
import { getGoogleAccessToken, GOOGLE_CLIENT_ID } from "@/lib/api/google";
import { clearTokens, saveTokens, type AuthTokens } from "@/lib/api/token";

export type UserRole = "USER" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  provider: string;
  email: string | null;
  avatarUrl: string | null;
  /** 관리자 승격은 백엔드 DB 에서 직접 한다 */
  role: UserRole;
}

interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

/** 구글 클라이언트 ID 와 API 주소가 모두 있어야 로그인 UI 를 노출한다 */
export const isLoginEnabled = Boolean(GOOGLE_CLIENT_ID) && Boolean(BROWSER_API_BASE_URL);

/** 구글 로그인 — 미가입이면 서버가 자동 가입한다 (살펴 웹은 구글만 제공) */
export async function signInWithGoogle(): Promise<AuthUser> {
  const token = await getGoogleAccessToken();
  const result = await browserPost<LoginResponse>("/salpyeo/auths/login", {
    provider: "google",
    token,
  });
  saveTokens(result.tokens);
  return result.user;
}

export function fetchMe(): Promise<AuthUser> {
  return browserRequest<AuthUser>("/salpyeo/users/me");
}

export function signOut(): void {
  clearTokens();
}
