import Cart from "@/components/Cart";
import { cartData } from "../utils/cartData";

export function CartGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
      {cartData.map((item, index) => (
        <Cart key={index} {...item} />
      ))}
    </div>
  );
}
