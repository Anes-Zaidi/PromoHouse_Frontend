import DealerCard from "@/components/DealerCard";
import { dealerData } from "../utils/dealerData";

export function DealerGrid() {
  return (
    <div className="flex flex-wrap gap-15 justify-center max-w-7xl mx-auto">
      {dealerData.map((dealer, index) => (
        <DealerCard key={index} {...dealer} />
      ))}
    </div>
  );
}
