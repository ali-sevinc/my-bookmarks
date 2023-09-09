import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../helpers/apis";
import { useSearchParams } from "react-router-dom";

export function useBooks() {
  const [searchParams] = useSearchParams();

  const filterByStatus = searchParams.get("favorite");
  const statusFilter =
    !filterByStatus || filterByStatus === "all"
      ? null
      : { field: "favorite", value: filterByStatus, method: "eq" };

  const filterByTag = searchParams.get("tag");
  const tagFilter =
    !filterByTag || filterByTag === "all"
      ? null
      : { field: "tag", value: filterByTag, method: "eq" };

  // const searchBy = searchParams.get("search");
  // const searchFilter =
  //   !searchBy || searchBy === "" ? null : { value: searchBy };

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookmarks", statusFilter, tagFilter],
    queryFn: () => getBooks({ statusFilter, tagFilter }),
  });
  return { data, isLoading, error };
}
