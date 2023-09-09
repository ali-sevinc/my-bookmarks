import { createContext, useCallback, useContext, useReducer } from "react";

const initialState = {
  user: null,
};

const loginContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "user/login":
      return { ...state, user: action.payload };
    case "user/logout":
      return { ...state, user: null };

    default:
      break;
  }
}

export default function LoginContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = state;

  const handleLogin = useCallback(function handleLogin(data) {
    dispatch({ type: "user/login", payload: data });
  }, []);

  function handleLogout() {
    dispatch({ type: "user/logout" });
  }

  return (
    <loginContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </loginContext.Provider>
  );
}

export function useLoginContext() {
  const context = useContext(loginContext);
  return context;
}
