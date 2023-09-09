import { useQuery } from "@tanstack/react-query";
import { getBook } from "../../helpers/apis";

export function useBook(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookmarks", id],
    queryFn: () => getBook(id),
  });
  return { data, isLoading, error };
}
