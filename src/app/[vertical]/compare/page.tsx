import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { BackLink } from "@/components/common/back-link";
import { CompareReportView } from "@/components/report/compare-report-view";
import { getFacilities } from "@/lib/api/facilities";
import { routes } from "@/lib/routes";
import { resolveVertical, verticalStaticParams } from "@/lib/vertical-params";

type Props = { params: Promise<{ vertical: string }> };

export function generateStaticParams() {
  return verticalStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vertical = resolveVertical((await params).vertical);
  return { title: `${vertical.label} 비교 리포트` };
}

export default async function ComparePage({ params }: Props) {
  const vertical = resolveVertical((await params).vertical);
  if (!vertical.enabled) redirect(routes.list(vertical.key));

  const facilities = await getFacilities(vertical.key);

  return (
    <div className="flex-1 bg-surface-alt">
      <div className="mx-auto w-full max-w-[880px] px-6 pt-7 pb-24">
        <BackLink href={routes.list(vertical.key)}>목록으로</BackLink>
        <CompareReportView vertical={vertical} facilities={facilities} />
      </div>
    </div>
  );
}
