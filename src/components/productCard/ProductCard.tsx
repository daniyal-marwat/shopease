import { Card, CardContent, CardDescription } from "../ui/card";
import { Link } from "@tanstack/react-router";
import Like from "../shared/Like";
import type { Ref } from "react";

interface ProductCardProps {
  id: number;
  picture_url: string;
  name: string;
  price: number;
  item_left?: number;
  new_arrival?: boolean;
  out_of_stock?: boolean;
  ref?: Ref<HTMLDivElement>;
}

export default function ProductCard({
  id,
  picture_url,
  name,
  price,
  item_left,
  new_arrival,
  out_of_stock,
  ref,
}: ProductCardProps) {
  return (
    <Link
      className="inline-block rounded-xl"
      to={"/product/$productId"}
      params={{ productId: id.toString() }}
      preload="intent"
      preloadDelay={500}
    >
      <Card
        className="w-2xs h-80 p-0 overflow-hidden justify-between relative "
        ref={ref}
      >
        <CardContent className="p-0  relative">
          <img
            src={picture_url}
            alt="img"
            className="object-cover h-48 w-full"
          />
          {(out_of_stock || item_left === 0) && (
            <div className="absolute h-full w-full top-0 flex items-center justify-center text-white font-semibold bg-black/50">
              Out of Stock
            </div>
          )}
        </CardContent>
        <CardDescription className="px-2 pb-4">
          <div className="flex justify-between">
            <p className=" font-medium">{name}</p>
            <Like id={id} />
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg mt-2">${price}</p>
            {item_left !== undefined && item_left <= 10 && item_left > 0 && (
              <div className="text-xs text-red-500 translate-y-1">
                {item_left} items left!
              </div>
            )}
          </div>
          {new_arrival && (
            <div className=" absolute top-1 rounded-2xl shadow font-medium p-1.5 text-xs bg-cyan-500 text-white">
              <p className=" inline mr-1">•</p>New Arrival
            </div>
          )}
        </CardDescription>
      </Card>
    </Link>
  );
}
