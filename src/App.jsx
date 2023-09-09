import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useInitialLogin } from "./helpers/useInitialLogin";

import Root from "./pages/Root";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BookMarks from "./pages/BookMarks";
import NewBook from "./pages/NewBook";
import BookMarkDetail from "./pages/BookMarkDetail";
import BookMarkEdit from "./pages/BookMarkEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/bookmarks",
        children: [
          { index: true, element: <BookMarks /> },
          { path: "/bookmarks/:bookId", element: <BookMarkDetail /> },
          { path: "/bookmarks/new", element: <NewBook /> },
          { path: "/bookmarks/:bookId/edit", element: <BookMarkEdit /> },
        ],
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);

function App() {
  useInitialLogin();

  return <RouterProvider router={router} />;
}

export default App;
