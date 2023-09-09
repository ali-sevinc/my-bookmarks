import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginContext from "./context/login-context.jsx";

import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginContext>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </LoginContext>
  </React.StrictMode>,
);
