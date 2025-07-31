import StoreLayout from "@/layouts/StoreLayout";
import { createFileRoute } from "@tanstack/react-router";
import { getProductsByIds } from "@/lib/api";
import useLikeStore from "@/lib/store/like";
import { WishlistItem } from "@/components/wishlist/WishlistItem";

export const Route = createFileRoute("/wishlist")({
  component: Wishlist,
  loader: async () => {
    const likes = useLikeStore.getState().likes;
    if (likes.length > 0) {
      const products = await getProductsByIds(likes);
      return products;
    }
    return [];
  },
  pendingComponent: () => (
    <div className="flex items-center justify-center h-screen">
      <p className="font-bold">Loading...</p>
    </div>
  ),
  pendingMs: 0,
});

function Wishlist() {
  const products = Route.useLoaderData();

  return (
    <StoreLayout>
      <div className="my-8 mx-2 max-w-4xl md:mx-auto">
        {products?.length === 0 && (
          <p className="text-center">No products in wishlist</p>
        )}
        {products?.map((product) => (
          <WishlistItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.picture_url}
          />
        ))}
      </div>
    </StoreLayout>
  );
}
