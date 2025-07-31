import { createFileRoute } from "@tanstack/react-router";
import StoreLayout from "@/layouts/StoreLayout";
import { Button } from "@/components/ui/button";
import Like from "@/components/shared/Like";
import { useState } from "react";
import type { Product } from "@/data/productTypes";
import {
  getProductById,
  insertCartItemToDB,
  updateCartItemInDB,
} from "@/lib/api";
import useCartStore from "@/lib/store/cart";
import { useAuth } from "@/context/AuthContext";
import { toastMessage } from "@/lib/toastMessage";
import { getResizedImageUrl } from "@/lib/utils";

export const Route = createFileRoute("/product/$productId")({
  component: Product,
  pendingComponent: () => (
    <div className="flex items-center justify-center h-screen font-bold">
      Loading...
    </div>
  ),
  pendingMs: 0,
  loader: async ({ params }) => {
    return getProductById(params.productId);
  },
});

const imageVariations = [
  { style: "ar_16:9,c_fill,g_auto,f_auto,q_auto,w_480", width: 480 },
  { style: "ar_1:1,c_fill,g_auto,f_auto,q_auto,w_800", width: 800 },
  { style: "ar_4:5,c_fill,g_auto,f_auto,q_auto,w_1200", width: 1200 },
];

function Product() {
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const product = Route.useLoaderData();
  const { addToCart, updateQuantity } = useCartStore();

  if (!product) {
    return <NotFound />;
  }

  const alreadyInCart = useCartStore((state) =>
    state.cart.some((item) => item.product_id === product.id)
  );

  return (
    <StoreLayout>
      <div className="m-12 md:mx-0 flex justify-around flex-col gap-8 md:flex-row ">
        <div className="w-fit md:h-fit md:w-md flex-shrink-0 rounded-2xl overflow-hidden">
          <img
            className="w-full h-full aspect-auto object-cover"
            src={product.picture_url}
            srcSet={imageVariations
              .map(
                (variant) =>
                  `${getResizedImageUrl(product.picture_url, variant.style)} ${variant.width}w`
              )
              .join(",")}
            sizes="(min-width: 1024px) 600px, (min-width: 768px) 400px, 100vw"
            alt={product.name}
          />
        </div>
        <div className="flex flex-col justify-between max-w-md">
          <div>
            <h1 className="text-4xl font-semibold">{product.name}</h1>
            <p className="text-xl font-semibold mt-4">${product.price}</p>
            <p className="mt-4 text-sm text-gray-500">{product.description}</p>
          </div>
          <div className="mt-4">
            <div className="border-2 w-fit  rounded flex items-center gap-2">
              <Button
                className=" rounded-none"
                variant="ghost"
                onClick={() => {
                  if (product.out_of_stock || quantity === 1) return;
                  setQuantity((prev) => prev - 1);
                }}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                className=" rounded-none"
                variant="ghost"
                onClick={() => {
                  if (product.out_of_stock) return;
                  setQuantity((prev) => prev + 1);
                }}
              >
                +
              </Button>
            </div>
            <div className="flex gap-4 w-full items-center justify-center mt-8">
              <Button
                disabled={product.out_of_stock}
                onClick={() => {
                  toastMessage("Product added to cart", "accomplishment");
                  if (alreadyInCart) {
                    updateQuantity(product.id, quantity);
                    if (user) updateCartItemInDB(product.id, quantity);
                  } else {
                    addToCart(product.id, quantity);
                    if (user) insertCartItemToDB(product.id, quantity);
                  }
                }}
                className="w-full px-0 cursor-pointer"
              >
                {product.out_of_stock ? "Out of stock" : "Add to cart"}
              </Button>
              <Like id={product.id} />
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}

export function NotFound() {
  return (
    <StoreLayout>
      <div className="flex items-center justify-center h-screen">
        <p>Error 404: Product not found</p>
      </div>
    </StoreLayout>
  );
}
