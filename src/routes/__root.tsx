import LostPage from "@/components/LostPage";
import useLikeStore from "@/lib/store/like";
import { createRootRoute } from "@tanstack/react-router";
import { getCartItemsFromDB, getWishlistedProductsIds } from "@/lib/api";
import { isAuthenticated } from "@/lib/utils";
import useCartStore from "@/lib/store/cart";

export const Route = createRootRoute({
  notFoundComponent: LostPage,
  beforeLoad: async () => {
    const isLoggedIn = await isAuthenticated();
    const likes = useLikeStore.getState().likes;
    const carts = useCartStore.getState().cart;

    if (isLoggedIn) {
      // get wishlisted items
      if (likes.length === 0) {
        const wishlistedProductsIds = await getWishlistedProductsIds();
        useLikeStore.getState().setLikes(wishlistedProductsIds);
      }
      // get cart items
      if (carts.length === 0) {
        const cartItems = await getCartItemsFromDB();
        useCartStore.getState().setCart(cartItems);
      }
    } else {
      if (likes.length === 0) {
        useLikeStore
          .getState()
          .setLikes(JSON.parse(localStorage.getItem("liked") || "[]"));
      }
      if (carts.length === 0) {
        useCartStore
          .getState()
          .setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
      }
    }
  },
});
