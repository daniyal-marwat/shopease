import LostPage from "@/components/LostPage";
import useLikeStore from "@/lib/store/like";
import { createRootRoute } from "@tanstack/react-router";
import supabase from "@/lib/supabase";
import { getWishlistedProductsIds } from "@/lib/api";

async function isAuthenticated(): Promise<boolean> {
  const { data: user } = await supabase.auth.getSession();
  if (user.session) return true;
  return false;
}

export const Route = createRootRoute({
  notFoundComponent: LostPage,
  beforeLoad: async () => {
    const isLoggedIn = await isAuthenticated();
    const likes = useLikeStore.getState().likes;
    if (isLoggedIn) {
      // get wishlisted items
      if (likes.length > 0) return;
      const wishlistedProductsIds = await getWishlistedProductsIds();
      useLikeStore.getState().setLikes(wishlistedProductsIds);
    } else {
      if (likes.length > 0) return;
      useLikeStore
        .getState()
        .setLikes(JSON.parse(localStorage.getItem("liked") || "[]"));
    }
  },
});
