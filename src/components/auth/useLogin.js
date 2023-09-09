import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "../../helpers/apis";
import { useLoginContext } from "../../context/login-context";

export function useLogin() {
  const { handleLogin } = useLoginContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: loginFnc,
    isLoading: loginLoading,
    error: loginError,
  } = useMutation({
    //supabase backend library add session token automatically
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      handleLogin(data?.user);
      navigate("/bookmarks");
    },
  });
  return { loginFnc, loginError, loginLoading };
}
