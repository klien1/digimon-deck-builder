import { createBrowserRouter } from "react-router-dom";
import Root from "../routes/root";
import ErrorRoute from "../routes/error-route";
import Login from "../components/login/login.component";
import { CardGallery } from "../routes/card-gallery";
import Register from "../components/register/register.component";
import LoginRegistration from "../routes/login-registration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "login-registation/",
        element: <LoginRegistration />,
      },
      {
        path: "gallery/",
        element: <CardGallery />,
      },
      // {
      //   path: "register/",
      //   element: <Register />,
      // },
    ],
  },
]);
