/**
 * 구글 웹 로그인 — Google Identity Services 의 토큰 클라이언트.
 * 팝업으로 access token 만 받아 서버(/salpyeo/auths/login)에 넘기면 서버가 userinfo 로 검증한다.
 * 필요: Google Cloud 콘솔 "웹 애플리케이션" OAuth 클라이언트 + 승인된 JavaScript 원본에 사이트 주소 등록.
 * 리디렉션을 쓰지 않으므로 클라이언트 보안 비밀번호(client secret)는 필요 없다.
 */
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

const GIS_SRC = "https://accounts.google.com/gsi/client";

interface TokenResponse {
  access_token?: string;
  error?: string;
}

interface TokenClient {
  requestAccessToken: (overrides?: { prompt?: string }) => void;
}

interface GoogleAccounts {
  accounts: {
    oauth2: {
      initTokenClient: (config: {
        client_id: string;
        scope: string;
        callback: (response: TokenResponse) => void;
        error_callback?: (error: { type: string }) => void;
      }) => TokenClient;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleAccounts;
  }
}

/** 사용자가 팝업을 닫거나 동의를 거부한 경우 — 에러 토스트를 띄우지 않는다 */
export class GoogleSignInCancelled extends Error {
  constructor() {
    super("구글 로그인을 취소했습니다.");
    this.name = "GoogleSignInCancelled";
  }
}

let loading: Promise<void> | null = null;

function loadGis(): Promise<void> {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = GIS_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        loading = null;
        reject(new Error("구글 로그인 스크립트를 불러오지 못했습니다."));
      };
      document.head.appendChild(script);
    });
  }
  return loading;
}

export async function getGoogleAccessToken(): Promise<string> {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("구글 로그인이 아직 설정되지 않았습니다. (NEXT_PUBLIC_GOOGLE_CLIENT_ID)");
  }
  await loadGis();

  return new Promise<string>((resolve, reject) => {
    const client = window.google!.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      callback: (response) => {
        if (response.access_token) resolve(response.access_token);
        else if (response.error === "access_denied") reject(new GoogleSignInCancelled());
        else reject(new Error("구글 로그인에 실패했습니다."));
      },
      error_callback: (error) => {
        if (error.type === "popup_closed") reject(new GoogleSignInCancelled());
        else reject(new Error("구글 로그인 창을 열 수 없습니다. 팝업 차단을 확인해 주세요."));
      },
    });
    client.requestAccessToken();
  });
}
