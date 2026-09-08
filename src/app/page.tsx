import { Hero } from "@/components/home/hero";
import { TrustPoints } from "@/components/home/trust-points";
import { VerticalGrid } from "@/components/home/vertical-grid";
import { getVerticals } from "@/lib/api/facilities";

export default async function HomePage() {
  const verticals = await getVerticals();
  return (
    <div className="flex-1">
      <Hero />
      <div className="container-page pt-6 pb-24">
        <VerticalGrid verticals={verticals} />
        <div className="mt-16">
          <TrustPoints />
        </div>
      </div>
    </div>
  );
}
