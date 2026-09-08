import "server-only";

/**
 * 살펴 백엔드(artinfo-server /salpyeo/*) HTTP 클라이언트.
 * 응답은 공용 봉투 `{ code, message, item }` 로 내려오므로 item 만 풀어서 반환한다.
 */

export const API_BASE_URL = process.env.SALPYEO_API_URL?.replace(/\/$/, "") ?? null;

/** SALPYEO_API_URL 이 없으면 목데이터로 동작 (백엔드 없이 프론트만 개발할 때) */
export const isApiEnabled = API_BASE_URL !== null;

interface Envelope<T> {
  code: string;
  message: string | null;
  item: T | null;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | undefined>,
  init?: { revalidate?: number },
): Promise<T> {
  if (!API_BASE_URL) throw new Error("SALPYEO_API_URL 이 설정되지 않았습니다.");

  const url = new URL(`${API_BASE_URL}${path}`);
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== "") url.searchParams.set(key, value);
  }

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: init?.revalidate ?? 60 },
  });

  const body = (await res.json().catch(() => null)) as Envelope<T> | null;

  if (!res.ok || !body || body.code !== "OK") {
    throw new ApiError(
      res.status,
      body?.code ?? "UNKNOWN",
      body?.message ?? `API 요청 실패 (${res.status})`,
    );
  }
  return body.item as T;
}
