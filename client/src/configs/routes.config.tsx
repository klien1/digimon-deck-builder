import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from "../routes/root";
import ErrorRoute from "../routes/error-route";
import Login from "../routes/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorRoute />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorRoute />,
  },
]);
