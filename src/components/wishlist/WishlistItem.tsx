import Like from "@/components/shared/Like";
import { getResizedImageUrl } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export function WishlistItem({
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
      <div className="w-42 h-52 rounded overflow-hidden">
        <img
          className="h-full w-full object-center object-cover"
          src={imageUrl}
          srcSet={getResizedImageUrl(
            imageUrl,
            "ar_9:16,c_fill,g_auto,f_auto,q_auto,w_480"
          )}
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
