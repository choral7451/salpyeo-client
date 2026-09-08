import { Hero } from "@/components/home/hero";
import { TrustPoints } from "@/components/home/trust-points";
import { VerticalGrid } from "@/components/home/vertical-grid";

export default function HomePage() {
  return (
    <div className="flex-1">
      <Hero />
      <div className="container-page pt-6 pb-24">
        <VerticalGrid />
        <div className="mt-16">
          <TrustPoints />
        </div>
      </div>
    </div>
  );
}
