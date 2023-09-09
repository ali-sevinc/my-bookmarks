import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBook } from "../../helpers/apis";

export function useToggleFav(bookId) {
  const queryClient = useQueryClient();
  const {
    mutate: toggleFav,
    isLoading: favLoading,
    error: favError,
  } = useMutation({
    mutationFn: (data) => editBook(data, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  return { toggleFav, favLoading, favError };
}
