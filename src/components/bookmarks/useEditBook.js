import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { editBook } from "../../helpers/apis";

export function useEditBook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { bookId } = useParams();
  const {
    mutate: editBookFnc,
    isLoading: editLoading,
    error: editError,
  } = useMutation({
    mutationFn: (data) => editBook(data, bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      navigate(-1);
    },
  });

  return { editBookFnc, editLoading, editError };
}
