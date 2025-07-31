import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { getSearchProducts } from "@/lib/api";
import type { Product } from "@/data/productTypes";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const numberOfProducts = 4;
  const navigate = useNavigate();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["search", debouncedSearch],
    queryFn: () =>
      getSearchProducts({ search: debouncedSearch, limit: numberOfProducts }),
    enabled: !!debouncedSearch.trim(),
  });

  return (
    <div className="w-full relative">
      <Input
        className="rounded-full md:w-md lg:w-lg placeholder:text-sm"
        placeholder="Find product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (!search.trim()) return;
          if (e.key === "Enter") {
            navigate({
              to: "/search",
              search: {
                q: search,
              },
            });
            setSearch("");
          }
        }}
      ></Input>
      <SearchIcon className=" absolute top-[6px] right-2 size-5" />
      <div className="fixed left-0 w-full  flex flex-col gap-2 my-4">
        {isLoading && (
          <p className="text-center bg-white/30 backdrop-blur-sm p-2 rounded">
            Loading...
          </p>
        )}
        {products?.length === 0 && (
          <p className="text-center bg-white/30 backdrop-blur-sm p-2 rounded">
            No products found
          </p>
        )}

        {products?.map((product) => (
          <SearchItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function SearchItem({ product }: { product: Product }) {
  return (
    <Link
      to={"/product/$productId"}
      params={{ productId: product.id.toString() }}
    >
      <div className="backdrop-blur-sm bg-white/30 text-black w-full rounded p-2 flex gap-8">
        <div className="h-24 w-16 rounded overflow-hidden">
          <img
            src={product.picture_url}
            alt="product"
            className="object-cover object-center h-full w-full "
          />
        </div>
        <div className="m-4">
          <h1 className="font-semibold">{product.name}</h1>
          <p>${product.price}</p>
        </div>
      </div>
    </Link>
  );
}
