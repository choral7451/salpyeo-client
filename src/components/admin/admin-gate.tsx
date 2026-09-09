"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isLoginEnabled } from "@/lib/api/auth";
import { routes } from "@/lib/routes";
import { useSessionStore } from "@/stores/session-store";

/** 관리자만 안쪽을 그린다. 권한 판단의 실제 주체는 서버(SalpyeoAdminGuard)이고 여기는 화면 안내일 뿐이다. */
export function AdminGate({ children }: { children: React.ReactNode }) {
  const hydrated = useSessionStore((s) => s.hydrated);
  const user = useSessionStore((s) => s.user);

  if (!isLoginEnabled) return <Notice title="로그인이 설정되지 않았습니다" body="NEXT_PUBLIC_GOOGLE_CLIENT_ID 와 NEXT_PUBLIC_SALPYEO_API_URL 을 확인해 주세요." />;
  if (!hydrated) return <Notice title="확인 중…" body="로그인 정보를 불러오고 있습니다." />;
  if (!user) return <Notice title="로그인이 필요합니다" body="헤더의 로그인 버튼으로 구글 로그인 후 다시 시도해 주세요." />;
  if (user.role !== "ADMIN") {
    return <Notice title="관리자만 사용할 수 있습니다" body={`${user.name} 님은 관리자 권한이 없습니다.`} />;
  }

  return <>{children}</>;
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center gap-3 py-24 text-center">
      <h1 className="text-xl font-extrabold text-text">{title}</h1>
      <p className="text-sm text-text-secondary">{body}</p>
      <Button variant="outline" size="sm" asChild className="mt-2">
        <Link href={routes.home()}>홈으로</Link>
      </Button>
    </div>
  );
}
