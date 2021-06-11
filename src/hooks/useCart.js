import { useContext } from "react";
import { CartContext } from "../providers/CartProvider";

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
