import { Hero } from "@/components/home/hero";
import { TrustPoints } from "@/components/home/trust-points";
import { VerticalGrid } from "@/components/home/vertical-grid";
import { getVerticals } from "@/lib/api/facilities";

export default async function HomePage() {
  const verticals = await getVerticals();
  // 지금 데이터가 있는 건 산후조리원뿐 — 배지에 그 수를 보여 준다
  const facilityCount = verticals.find((v) => v.key === "post")?.count ?? 0;

  return (
    <div className="flex-1">
      <Hero facilityCount={facilityCount} />
      <div className="container-page pt-6 pb-24">
        <VerticalGrid verticals={verticals} />
        <div className="mt-16">
          <TrustPoints />
        </div>
      </div>
    </div>
  );
}
