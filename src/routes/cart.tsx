import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import StoreLayout from "@/layouts/StoreLayout";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "@/lib/store/cart";
import { useEffect, useState } from "react";
import {
  deleteCartItemFromDB,
  getProductsByIds,
  updateCartItemInDB,
} from "@/lib/api";
import type { CartItem } from "@/lib/store/cart";
import { useAuth } from "@/context/AuthContext";
import { getResizedImageUrl } from "@/lib/utils";
import type { Product } from "@/data/productTypes";

export const Route = createFileRoute("/cart")({
  component: Cart,
  loader: async () => {
    let cart = useCartStore.getState().cart;

    if (cart.length === 0) return [];

    const products = await getProductsByIds(
      cart.map((item) => item.product_id)
    );

    return products;
  },
  pendingComponent: () => (
    <div className="flex items-center justify-center h-screen">
      <p className="font-bold">Loading...</p>
    </div>
  ),
  pendingMs: 0,
});

function Cart() {
  const { cart } = useCartStore();
  const products = Route.useLoaderData();
  const [data, setData] = useState<(Product & { quantity: number })[] | []>([]);

  useEffect(() => {
    const productswithquantity = products.map((product) => ({
      ...product,
      quantity: cart.find((item) => item.product_id === product.id)
        ?.quantity as number,
    }));
    setData(productswithquantity);
  }, [cart, products]);

  return (
    <StoreLayout>
      <div className="flex flex-col my-8 ">
        <div className="font-semibold text-2xl p-4 text-center m-auto">
          <p className="border-b-2 border-transparent transition inline-block hover:border-black">
            Cart
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {data.length === 0 && (
            <p className="m-8 text-center">No products in cart</p>
          )}
          {data.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </StoreLayout>
  );
}

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  picture_url: string;
  quantity: number;
}

function CartItem({ id, name, price, picture_url, quantity }: CartItemProps) {
  const router = useRouter();
  const { removeFromCart, updateQuantity } = useCartStore();
  const [quantity_, setQuantity] = useState(quantity);
  const [initialRerender, setInitialRerender] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (initialRerender) {
      setInitialRerender(false);
      return;
    }
    const time = setTimeout(() => {
      if (user) updateCartItemInDB(id, quantity_);
    }, 500);
    return () => clearTimeout(time);
  }, [quantity_]);

  return (
    <Link
      preload="intent"
      to={"/product/$productId"}
      params={{ productId: String(id) }}
      className="flex flex-row h-52 gap-8 border-b m-auto  sm:w-xl md:w-3xl xl:w-7xl lg:w-5xl "
    >
      <div className="w-42 h-full rounded overflow-hidden">
        <img
          className=" h-full w-full object-cover object-center"
          src={picture_url}
          srcSet={getResizedImageUrl(
            picture_url,
            "ar_9:16,c_fill,g_auto,f_auto,q_auto,w_480"
          )}
        />
      </div>
      <div className="w-full flex flex-col gap-8 sm:p-4 md:p-8">
        <h1 className=" text-xl font-semibold">{name}</h1>
        <div className="flex flex-col sm:flex-row gap-8 justify-between ">
          <div className="flex gap-4 items-center">
            <Trash2
              size={18}
              className="cursor-pointer hover:text-red-500 transition"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFromCart(id);
                if (user) await deleteCartItemFromDB(id);
                router.invalidate();
              }}
            />
            <div className="border-2 w-fit  rounded flex items-center gap-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (quantity_ > 1) {
                    updateQuantity(id, quantity_ - 1);
                    setQuantity(quantity_ - 1);
                  }
                }}
                className=" rounded-none"
                variant="ghost"
              >
                -
              </Button>
              <span>{quantity_}</span>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateQuantity(id, quantity_ + 1);
                  setQuantity(quantity_ + 1);
                }}
                className=" rounded-none"
                variant="ghost"
              >
                +
              </Button>
            </div>
          </div>
          <h1 className="text-xl font-semibold ml-2">
            ${(price * quantity_).toFixed(2)}
          </h1>
        </div>
      </div>
    </Link>
  );
}
