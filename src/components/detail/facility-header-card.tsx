import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatRating } from "@/lib/format";
import type { Facility } from "@/types/facility";

import { PhotoGallery } from "./photo-gallery";

export function FacilityHeaderCard({ facility }: { facility: Facility }) {
  return (
    <Card className="overflow-hidden">
      <PhotoGallery images={facility.images} name={facility.name} />
      <div className="p-6">
        <div className="flex gap-1.5">
          <Badge variant="positive" className="px-[9px] py-1">
            {facility.badges.inspection}
          </Badge>
          <Badge variant="primary" className="px-[9px] py-1">
            {facility.badges.feature}
          </Badge>
        </div>
        <h1 className="mt-3 text-[26px] font-extrabold tracking-[-0.5px] text-text">
          {facility.name}
        </h1>
        <p className="mt-1.5 text-[15px] text-text-tertiary">
          {facility.meta} · 집에서 {facility.distance.label}
        </p>
        <p className="mt-2.5 text-[15px] font-bold text-text">
          인증 후기 {formatRating(facility.rating)}{" "}
          <span className="font-normal text-text-muted">
            · 실제 이용자 {facility.reviewCount}건
          </span>
        </p>
      </div>
    </Card>
  );
}
