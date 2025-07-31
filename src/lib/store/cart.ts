import { create } from "zustand";

export interface CartItem {
  product_id: number;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  setCart: (cart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    set({ cart });
  },
  addToCart: (id: number, quantity: number) =>
    set((state) => {
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.cart, { product_id: id, quantity }])
      );
      return { cart: [...state.cart, { product_id: id, quantity }] };
    }),
  removeFromCart: (id: number) =>
    set((state) => {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          state.cart.filter((item: CartItem) => item.product_id !== id)
        )
      );
      return {
        cart: state.cart.filter((item: CartItem) => item.product_id !== id),
      };
    }),
  updateQuantity: (id: number, quantity: number) =>
    set((state) => {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          state.cart.map((item: CartItem) =>
            item.product_id === id ? { ...item, quantity } : item
          )
        )
      );
      return {
        cart: state.cart.map((item: CartItem) =>
          item.product_id === id ? { ...item, quantity } : item
        ),
      };
    }),
}));

export default useCartStore;
