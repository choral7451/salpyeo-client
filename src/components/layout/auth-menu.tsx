"use client";

import { useState } from "react";
import Image from "next/image";
import { DropdownMenu } from "radix-ui";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { isLoginEnabled, signInWithGoogle } from "@/lib/api/auth";
import { GoogleSignInCancelled } from "@/lib/api/google";
import { useSessionStore } from "@/stores/session-store";

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AuthMenu() {
  const hydrated = useSessionStore((s) => s.hydrated);
  const user = useSessionStore((s) => s.user);
  const setUser = useSessionStore((s) => s.setUser);
  const signOut = useSessionStore((s) => s.signOut);
  const [pending, setPending] = useState(false);

  const handleSignIn = async () => {
    setPending(true);
    try {
      setUser(await signInWithGoogle());
    } catch (e) {
      // 사용자가 팝업을 닫은 건 실패가 아니다
      if (!(e instanceof GoogleSignInCancelled)) {
        toast.error(e instanceof Error ? e.message : "로그인에 실패했습니다");
      }
    } finally {
      setPending(false);
    }
  };

  if (!isLoginEnabled) return null;

  // 세션 복원 전에는 로그인/로그아웃 어느 쪽도 그리지 않는다 (깜빡임 방지). 자리만 잡아 둔다.
  if (!hydrated) return <div aria-hidden className="h-9 w-[92px]" />;

  if (!user) {
    return (
      <Button variant="outline" size="sm" onClick={handleSignIn} disabled={pending}>
        <GoogleMark />
        {pending ? "로그인 중" : "로그인"}
      </Button>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="flex h-9 shrink-0 items-center gap-2 rounded-md pr-2 pl-1 text-sm font-bold text-text-secondary transition-colors duration-150 hover:bg-hairline focus-visible:ring-3 focus-visible:ring-primary/30 outline-none"
        >
          <Avatar key={user.avatarUrl ?? "no-avatar"} user={user} />
          <span className="max-w-[7rem] truncate">{user.name}</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-30 min-w-[200px] rounded-lg border border-line bg-surface p-1 shadow-card-hover"
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm font-bold text-text">{user.name}</p>
            {user.email && (
              <p className="truncate text-xs text-text-muted">{user.email}</p>
            )}
          </div>
          <DropdownMenu.Separator className="my-1 h-px bg-hairline" />
          <DropdownMenu.Item
            onSelect={() => {
              signOut();
              toast("로그아웃했습니다");
            }}
            className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-text-secondary outline-none data-[highlighted]:bg-hairline"
          >
            <LogOut size={15} strokeWidth={2.2} aria-hidden />
            로그아웃
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function Avatar({ user }: { user: { name: string; avatarUrl: string | null } }) {
  // 구글 프로필 이미지는 만료되거나 막히는 경우가 있어 실패하면 이름 첫 글자로 떨어뜨린다
  // (URL 이 바뀌면 호출부의 key 로 이 상태가 초기화된다)
  const [failed, setFailed] = useState(false);

  if (user.avatarUrl && !failed) {
    return (
      <Image
        src={user.avatarUrl}
        alt=""
        width={28}
        height={28}
        unoptimized
        onError={() => setFailed(true)}
        className="size-7 rounded-full object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="flex size-7 items-center justify-center rounded-full bg-primary-tint text-xs font-extrabold text-primary"
    >
      {user.name.trim().charAt(0) || "살"}
    </span>
  );
}
