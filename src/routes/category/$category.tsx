import ProductCard from "@/components/productCard/ProductCard";
import StoreLayout from "@/layouts/StoreLayout";
import { createFileRoute } from "@tanstack/react-router";
import { getCatergoryProducts } from "@/lib/api";
import Filter from "@/components/Filter";
import { filterParamsSchema } from "@/schemas/filter";
import useOnScreen from "@/hooks/useOnScreen";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toastMessage } from "@/lib/toastMessage";

export const Route = createFileRoute("/category/$category")({
  component: RouteComponent,
  validateSearch: (search) => filterParamsSchema.parse(search),
  pendingComponent: () => (
    <div className="flex items-center justify-center h-screen">
      <p className="font-bold">Loading...</p>
    </div>
  ),
  pendingMs: 0,
});

function RouteComponent() {
  const { isInViewport, ref } = useOnScreen();
  const { category } = Route.useParams();
  const { sort, priceRange } = Route.useSearch();

  const limit = 20;

  const { data, fetchNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ["category", category, sort, priceRange],
      queryFn: ({ pageParam = 0 }) =>
        getCatergoryProducts({
          category,
          offset: pageParam,
          limit,
          sort,
          priceRange,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < limit) return undefined; // No more pages
        return allPages.length * limit; // Next offset
      },
    });

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
      <div className="my-8">
        <div className="flex justify-end mr-4">
          <Filter route={"/category/$category"} />
        </div>
        <div className="flex items-center justify-center flex-wrap gap-8">
          {data?.pages.flat().length === 0 && (
            <div className="flex items-center justify-center h-screen">
              <p className="text-center font-semibold ">
                No products found for this category
              </p>
            </div>
          )}
          {data?.pages.flat().map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div
          key={`${sort}-${priceRange}`}
          ref={ref}
          className="text-center font-semibold my-4"
        >
          {isFetchingNextPage ? "Loading..." : ""}
        </div>
      </div>
    </StoreLayout>
  );
}
