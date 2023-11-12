import { createBrowserRouter, defer } from "react-router-dom";
import { authRoutes } from "@/routes/auth";
import Home from "@/routes/Home.tsx";
import { client } from "@/lib/client.ts";
import { Layout } from "@/components/Layout.tsx";

export const router = createBrowserRouter([
  // unprotected routes
  authRoutes,
  // protected routes
  {
    loader: () => {
      const data = client.profile.profile().then((res) => res.data.data);
      return defer({ user: data });
    },
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
