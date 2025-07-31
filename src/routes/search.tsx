import Filter from "@/components/Filter";
import ProductCard from "@/components/productCard/ProductCard";
import StoreLayout from "@/layouts/StoreLayout";
import { createFileRoute } from "@tanstack/react-router";
import { getSearchProducts } from "@/lib/api";
import * as z from "zod";
import { filterParamsSchema } from "@/schemas/filter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toastMessage } from "@/lib/toastMessage";
import useOnScreen from "@/hooks/useOnScreen";
import { useEffect } from "react";

const searchParamsSchema = z.object({
  q: z.string(),
  ...filterParamsSchema.shape,
});

export const Route = createFileRoute("/search")({
  component: RouteComponent,

  validateSearch: (search) => searchParamsSchema.parse(search),

  // loaderDeps: ({ search }) => ({ search }),

  // loader: ({ deps }) => {
  //   const query = deps.search.q;
  //   const sort = deps.search.sort;
  //   const priceRange = deps.search.priceRange;

  //   const products = getSearchProducts({ search: query, sort, priceRange });

  //   return products;
  // },
  pendingComponent: () => (
    <div className="flex items-center justify-center h-screen">
      <p className="font-bold">Loading...</p>
    </div>
  ),
  pendingMs: 0,
});

function RouteComponent() {
  // const products = Route.useLoaderData();
  const { q, sort, priceRange } = Route.useSearch();

  let limit = 20;

  const { data, fetchNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ["search", q, sort, priceRange],
      queryFn: ({ pageParam = 0 }) =>
        getSearchProducts({ search: q, sort, priceRange, offset: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < limit) return undefined;
        return allPages.length * limit;
      },
    });

  const { isInViewport, ref } = useOnScreen();

  useEffect(() => {
    if (isInViewport) {
      fetchNextPage();
    }
    error && toastMessage(error.message, "error");
  }, [isInViewport, fetchNextPage]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="font-bold">Loading...</p>
      </div>
    );

  return (
    <StoreLayout>
      <div className="my-4">
        {data?.pages.flat().length !== 0 && (
          <div className="flex justify-end mr-4">
            <Filter route={"/search"} />
          </div>
        )}
        <div className="flex items-center justify-center flex-wrap gap-6 my-8">
          {data?.pages.flat().length === 0 && <p>No products found</p>}
          {data?.pages.flat().map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div ref={ref}>
          {isFetchingNextPage && (
            <p className="text-center font-semibold">Loading...</p>
          )}
        </div>
      </div>
    </StoreLayout>
  );
}
