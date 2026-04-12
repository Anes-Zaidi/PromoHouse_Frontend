import { Button } from "@/components/ui/button";
import { ArrowRight, Store } from "lucide-react";

export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
      <Button className="w-full sm:w-auto bg-brand-orange hover:bg-brand-orange-hover text-white rounded-full px-8 py-6 text-base font-bold flex items-center justify-center gap-2 border-none">
        Start Shopping <ArrowRight size={20} />
      </Button>
      <Button variant="outline" className="w-full sm:w-auto border-white/30 hover:bg-white/10 hover:text-white bg-white/5 text-white rounded-full px-8 py-6 text-base font-bold flex items-center justify-center gap-2">
        <Store size={20} />
        Become a Dealer
      </Button>
    </div>
  );
}
