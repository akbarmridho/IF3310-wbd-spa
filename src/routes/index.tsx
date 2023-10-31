import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "@/routes/auth";
import Home from "@/routes/Home.tsx";

export const router = createBrowserRouter([
  // unprotected routes
  authRoutes,
  // protected routes
  {
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
