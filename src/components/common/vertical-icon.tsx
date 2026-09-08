import {
  Baby,
  BookOpen,
  Building2,
  Flower2,
  GraduationCap,
  type LucideProps,
} from "lucide-react";

import type { VerticalKey } from "@/types/facility";

const ICONS = {
  post: Baby,
  nursing: Building2,
  funeral: Flower2,
  daycare: GraduationCap,
  academy: BookOpen,
} satisfies Record<VerticalKey, React.ComponentType<LucideProps>>;

export function VerticalIcon({
  vertical,
  ...props
}: LucideProps & { vertical: VerticalKey }) {
  const Icon = ICONS[vertical];
  return <Icon strokeWidth={1.8} aria-hidden {...props} />;
}
