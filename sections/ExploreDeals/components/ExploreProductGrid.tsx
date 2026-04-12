import Cart from "@/components/Cart";
import { featuredDeals } from "../utils/exploreData";

export function ExploreProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {featuredDeals.map((deal, index) => (
        <Cart key={index} {...deal} />
      ))}
    </div>
  );
}
