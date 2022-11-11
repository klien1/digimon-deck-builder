import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from "../routes/root";
import ErrorRoute from "../routes/error-route";
import Login from "../routes/login";
import { CardGallery } from "../routes/card-gallery";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "gallery/",
        element: <CardGallery />,
      },
    ],
  },
]);
