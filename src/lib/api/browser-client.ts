/**
 * 브라우저에서 쓰는 살펴 백엔드 클라이언트 (로그인 관련 요청).
 * 시설 조회는 서버 컴포넌트에서 lib/api/client.ts 로 부르고, 여기는 토큰이 필요한 요청만 다룬다.
 * 응답은 공용 봉투 `{ code, message, item }` 이라 item 만 풀어서 돌려주고,
 * 401 이면 refresh 를 한 번 시도한 뒤 그래도 실패하면 onUnauthorized 로 세션을 끝낸다.
 */
import { clearTokens, getTokens, saveTokens, type AuthTokens } from "@/lib/api/token";

/** 브라우저에서 부르는 주소 — 서버 전용 SALPYEO_API_URL 과 달리 공개 변수여야 한다 */
export const BROWSER_API_BASE_URL =
  process.env.NEXT_PUBLIC_SALPYEO_API_URL?.replace(/\/$/, "") ?? "";

interface Envelope<T> {
  code: string;
  message: string | null;
  item: T;
}

export class BrowserApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "BrowserApiError";
  }
}

let onUnauthorized: (() => void) | null = null;
export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

let refreshPromise: Promise<boolean> | null = null;

function doFetch(path: string, init?: RequestInit): Promise<Response> {
  const tokens = getTokens();
  return fetch(`${BROWSER_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(tokens ? { Authorization: `Bearer ${tokens.accessToken}` } : {}),
      ...init?.headers,
    },
  });
}

async function parse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `요청에 실패했습니다 (${res.status})`;
    let code: string | undefined;
    try {
      const body = (await res.json()) as { message?: unknown; code?: unknown };
      if (typeof body.message === "string" && body.message) message = body.message;
      if (typeof body.code === "string") code = body.code;
    } catch {
      // 본문이 JSON 이 아니면 상태 코드 메시지를 그대로 쓴다
    }
    throw new BrowserApiError(message, res.status, code);
  }
  const envelope = (await res.json()) as Envelope<T>;
  return envelope.item;
}

async function refreshTokens(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const tokens = getTokens();
      if (!tokens) return false;
      try {
        const res = await fetch(`${BROWSER_API_BASE_URL}/salpyeo/auths/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tokens),
        });
        if (!res.ok) return false;
        const envelope = (await res.json()) as Envelope<AuthTokens>;
        saveTokens({
          accessToken: envelope.item.accessToken,
          refreshToken: envelope.item.refreshToken,
        });
        return true;
      } catch {
        return false;
      }
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export async function browserRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BROWSER_API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_SALPYEO_API_URL 이 설정되지 않았습니다.");
  }

  let res = await doFetch(path, init);

  if (res.status === 401 && getTokens()) {
    const renewed = await refreshTokens();
    if (renewed) {
      res = await doFetch(path, init);
    } else {
      clearTokens();
      onUnauthorized?.();
    }
  }

  return parse<T>(res);
}

export function browserPost<T>(path: string, body?: unknown): Promise<T> {
  return browserRequest<T>(path, {
    method: "POST",
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
