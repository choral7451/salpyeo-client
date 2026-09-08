import Link from "next/link";
import { MapPinOff } from "lucide-react";

import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="flex-1 bg-surface-alt">
      <div className="container-page py-16">
        <EmptyState
          icon={<MapPinOff size={26} />}
          title="페이지를 찾을 수 없어요"
          description="주소가 바뀌었거나 삭제된 시설일 수 있어요."
          action={
            <Button asChild>
              <Link href={routes.home()}>홈으로 가기</Link>
            </Button>
          }
        />
      </div>
    </div>
  );
}
