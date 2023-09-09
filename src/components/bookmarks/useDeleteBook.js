import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../../helpers/apis";

export function useDeleteBook() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteFnc,
    error: deleteError,
    isLoading: deleteLoading,
  } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
  return {
    deleteFnc,
    deleteError,
    deleteLoading,
  };
}
