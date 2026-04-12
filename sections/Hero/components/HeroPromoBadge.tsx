import { Badge } from "@/components/ui/badge";

export function HeroPromoBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full pr-4 p-1.5 mb-8 border border-white/20">
      <Badge className="bg-brand-orange hover:bg-brand-orange-hover text-white px-3 py-1 text-[10px] rounded-full uppercase border-none">
        NEW
      </Badge>
      <span className="text-xs font-semibold mr-2">Save Food, Save Money, Save Planet</span>
    </div>
  );
}
