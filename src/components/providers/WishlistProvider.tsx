import { getWishlistedProductsIds } from "@/lib/api";
import useLikeStore from "@/lib/store/like";
import { useEffect } from "react";
import supabase from "@/lib/supabase";

export default function WishlistProvider() {
  const { setLikes } = useLikeStore();

  async function fetchWishlistedProductsIds() {
    const { data: user } = await supabase.auth.getSession();
    if (user.session) {
      const ids = await getWishlistedProductsIds();
      localStorage.setItem("liked", JSON.stringify(ids));
      setLikes(ids);
    }
  }

  useEffect(() => {
    fetchWishlistedProductsIds();
  }, []);

  return null;
}
