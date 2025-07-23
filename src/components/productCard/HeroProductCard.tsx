import { Link } from "@tanstack/react-router";

export default function HeroProductCard({
  name,
  picture_url,
  id,
}: {
  name: string;
  picture_url: string;
  id: number;
}) {
  return (
    <Link
      to={`/product/$productId`}
      params={{ productId: id.toString() }}
      preload="intent"
      preloadDelay={1000}
    >
      <div className="h-48 md:h-[520px] m-auto bg-black/40 overflow-hidden rounded-xl relative">
        <img
          className="object-cover object-center h-full w-full"
          src={picture_url}
        />

        <h1 className="absolute w-full p-3 md:p-4 font-semibold backdrop-blur-xs text-center bottom-0 text-white text-md md:text-xl rounded-b-xl shadow-md">
          {name}
        </h1>
      </div>
    </Link>
  );
}
