import Like from "@/components/shared/Like";
import StoreLayout from "@/layouts/StoreLayout";
import { Link, createFileRoute } from "@tanstack/react-router";
import { getProductByIds, getWishlistedProductsIds } from "@/lib/api";
import supabase from "@/lib/supabase";

export const Route = createFileRoute("/wishlist")({
  component: Wishlist,
  loader: async () => {
    const { data: user } = await supabase.auth.getSession();
    if (user.session) {
      const wishlistedProductsIds = await getWishlistedProductsIds();
      localStorage.setItem("liked", JSON.stringify(wishlistedProductsIds));

      const products = await getProductByIds(wishlistedProductsIds);
      return products;
    }
    const likes = localStorage.getItem("liked")
      ? JSON.parse(localStorage.getItem("liked") || "[]")
      : [];

    if (likes.length > 0) {
      const products = await getProductByIds(likes);
      return products;
    }
    return [];
  },
});

function Wishlist() {
  const products = Route.useLoaderData();

  return (
    <StoreLayout>
      <div className="my-12 mx-2 max-w-4xl md:mx-auto">
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

function WishlistItem({
  id,
  name,
  price,
  imageUrl,
}: {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}) {
  return (
    <Link
      className="flex pb-4 border-b"
      to={"/product/$productId"}
      preload="intent"
      params={{ productId: id.toString() }}
    >
      <div className="w-32 h-32 rounded overflow-hidden">
        <img
          className="h-full w-full object-center object-cover"
          src={imageUrl}
          alt=""
        />
      </div>
      <div className="flex  justify-between items-center w-full p-4">
        <h1>{name}</h1>
        <div className="flex items-center gap-8">
          <p>${price}</p>
          <Like id={id} />
        </div>
      </div>
    </Link>
  );
}
