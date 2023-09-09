import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./apis";
import { useLoginContext } from "../context/login-context";

export function useInitialLogin() {
  const { handleLogin } = useLoginContext();
  const { data, error } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 0,
    //only fetch on first-render
    refetchOnWindowFocus: false,
  });

  //if there is sessions this will autoAuth!
  useEffect(
    function () {
      handleLogin(data);
    },
    [data, handleLogin],
  );
  return { data, error };
}
