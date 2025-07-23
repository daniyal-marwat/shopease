import { useQueryClient } from "@tanstack/react-query";

export default function usePrefetch<TData, TId>(
  queryKey: any[],
  fetchFn: (id: TId) => Promise<TData>
) {
  const queryClient = useQueryClient();
  return (id: TId) => {
    if (!queryClient.getQueryData(queryKey)) {
      queryClient.prefetchQuery({
        queryKey,
        queryFn: () => fetchFn(id),
      });
    }
  };
}
