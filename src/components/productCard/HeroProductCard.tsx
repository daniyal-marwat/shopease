import { getResizedImageUrl } from "@/lib/utils";
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
  const imageVariations = [
    { style: "c_fill,g_auto,f_auto,q_auto,w_480", width: 480 },
    { style: "c_fill,g_auto,f_auto,q_auto,w_768", width: 768 },
    { style: "c_fill,g_auto,f_auto,q_auto,w_1024", width: 1024 },
    { style: "c_fill,g_auto,f_auto,q_auto,w_1440,ar_16:9", width: 1440 },
    { style: "c_fill,g_auto,f_auto,q_auto,w_1920", width: 1920 },
  ];

  return (
    <Link
      to={`/product/$productId`}
      params={{ productId: id.toString() }}
      preload="intent"
      preloadDelay={500}
    >
      <div className="m-auto bg-black/40 overflow-hidden rounded-xl relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh]">
        <img
          className="w-full h-full object-cover object-center"
          src={picture_url}
          srcSet={imageVariations
            .map(
              (variation) =>
                `${getResizedImageUrl(picture_url, variation.style)} ${variation.width}w`
            )
            .join(", ")}
          sizes="(min-width: 1280px) 1440px, (min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw"
          alt="Product preview"
          loading="lazy"
        />
        <h1 className="absolute w-full p-3 md:p-4 font-semibold backdrop-blur-xs text-center bottom-0 text-white text-md md:text-xl rounded-b-xl shadow-md">
          {name}
        </h1>
      </div>
    </Link>
  );
}
