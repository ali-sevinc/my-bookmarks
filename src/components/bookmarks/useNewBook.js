import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addBook } from "../../helpers/apis";

export function useNewBook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: createBook,
    isLoading: createLoading,
    error: createError,
  } = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      navigate("/bookmarks");
    },
  });
  return { createBook, createLoading, createError };
}
