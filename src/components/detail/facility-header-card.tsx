import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatReviewSummary } from "@/lib/format";
import type { Facility } from "@/types/facility";

import { PhotoGallery } from "./photo-gallery";

export function FacilityHeaderCard({ facility }: { facility: Facility }) {
  return (
    <Card className="overflow-hidden">
      <PhotoGallery images={facility.images} name={facility.name} />
      <div className="p-6">
        <div className="flex flex-wrap gap-1.5">
          {facility.badges.inspection ? (
            <Badge variant="positive" className="px-[9px] py-1">
              {facility.badges.inspection}
            </Badge>
          ) : null}
          {facility.badges.feature ? (
            <Badge variant="primary" className="px-[9px] py-1">
              {facility.badges.feature}
            </Badge>
          ) : null}
        </div>
        <h1 className="mt-3 text-[26px] font-extrabold tracking-[-0.5px] text-text">
          {facility.name}
        </h1>
        <p className="mt-1.5 text-[15px] text-text-tertiary">
          {facility.address || facility.meta}
          {facility.distance.label ? ` · 집에서 ${facility.distance.label}` : null}
        </p>
        {facility.phone || facility.website ? (
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-text-tertiary">
            {facility.phone ? (
              <a href={`tel:${facility.phone}`} className="hover:text-text hover:underline">
                {facility.phone}
              </a>
            ) : null}
            {facility.website ? (
              <a
                href={facility.website}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                공식 홈페이지
                <ExternalLink size={13} strokeWidth={2.5} aria-hidden />
              </a>
            ) : null}
          </p>
        ) : null}
        <p className="mt-2.5 text-[15px] font-bold text-text">
          {formatReviewSummary(facility.rating, facility.reviewCount)}
        </p>
      </div>
    </Card>
  );
}
