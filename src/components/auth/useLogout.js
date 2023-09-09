import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../helpers/apis";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: logoutFnc,
    isLoading: logoutLoading,
    error: logoutError,
  } = useMutation({
    //supabase backend library will delete localstorage token automatically
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      queryClient.refetchQueries();
      navigate("/");
    },
  });

  return { logoutFnc, logoutError, logoutLoading };
}
