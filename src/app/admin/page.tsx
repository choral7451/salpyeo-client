"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminGate } from "@/components/admin/admin-gate";
import { RehostPanel } from "@/components/admin/rehost-panel";
import { FacilitySearch } from "@/components/facility/facility-search";
import { fetchAdminFacilities, type AdminFacility } from "@/lib/api/admin";
import { formatPrice } from "@/lib/format";
import { routes } from "@/lib/routes";
import { useSessionStore } from "@/stores/session-store";

/** 한 번에 그리는 행 수 — 456건을 통째로 그리면 무겁다 */
const PAGE_SIZE = 50;

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminFacilityList />
    </AdminGate>
  );
}

function AdminFacilityList() {
  const user = useSessionStore((s) => s.user);
  const [keyword, setKeyword] = useState("");
  const [facilities, setFacilities] = useState<AdminFacility[] | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // 검색은 화면에서 한다 — 456건이라 전부 받아 와도 가볍고, 타이핑마다 요청하지 않아도 된다
    fetchAdminFacilities("post")
      .then((items) => {
        if (!cancelled) setFacilities(items);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "목록을 불러오지 못했습니다");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const search = (value: string) => {
    setKeyword(value);
    setVisible(PAGE_SIZE); // 검색어가 바뀌면 다시 처음부터 보여준다
  };

  const q = keyword.trim().toLowerCase();
  const filtered = (facilities ?? []).filter((f) =>
    q ? [f.name, f.meta, f.address].some((v) => v.toLowerCase().includes(q)) : true,
  );

  return (
    <div className="flex-1 bg-surface-alt">
      <div className="container-page pt-8 pb-20">
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-[28px] font-extrabold tracking-[-0.6px] text-text">산후조리원 관리</h1>
          <span className="text-[15px] text-text-tertiary">
            {facilities === null ? "불러오는 중…" : `${facilities.length}곳`}
            {user ? ` · ${user.name}` : null}
          </span>
          <Link
            href={routes.adminInquiries()}
            className="ml-auto text-sm font-bold text-text-secondary underline-offset-2 hover:text-primary hover:underline"
          >
            문의 보기 →
          </Link>
        </div>

        <div className="mt-5">
          <RehostPanel onDone={() => window.location.reload()} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <FacilitySearch value={keyword} onChange={search} />
          {q ? <span className="text-sm text-text-secondary">{filtered.length}곳</span> : null}
        </div>

        {error ? (
          <p className="mt-8 text-sm text-text-secondary">{error}</p>
        ) : (
          <>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-hairline bg-surface">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-hairline text-xs font-bold text-text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3">이름</th>
                    <th scope="col" className="px-4 py-3">지역</th>
                    <th scope="col" className="px-4 py-3">전화</th>
                    <th scope="col" className="px-4 py-3 text-right">대표 가격</th>
                    <th scope="col" className="px-4 py-3">노출</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, visible).map((f) => (
                    <tr key={f.slug} className="border-b border-hairline last:border-0 hover:bg-surface-alt">
                      <td className="px-4 py-3">
                        <Link
                          href={routes.adminFacility(f.slug)}
                          className="font-bold text-text underline-offset-2 hover:text-primary hover:underline"
                        >
                          {f.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{f.meta}</td>
                      <td className="px-4 py-3 text-text-secondary">{f.phone || "—"}</td>
                      <td className="px-4 py-3 text-right text-text-secondary">
                        {f.price > 0 ? formatPrice(f.price) : "미공개"}
                      </td>
                      <td className="px-4 py-3">
                        {f.isActive ? (
                          <span className="text-text-secondary">공개</span>
                        ) : (
                          <span className="font-bold text-text-muted">숨김</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {facilities !== null && filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-text-secondary">
                        검색 결과가 없습니다
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            {filtered.length > visible ? (
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="mt-4 w-full rounded-xl border border-line bg-surface py-3 text-sm font-bold text-text-secondary hover:bg-surface-alt"
              >
                {filtered.length - visible}곳 더 보기
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
