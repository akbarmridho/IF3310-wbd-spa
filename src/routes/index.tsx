import { createBrowserRouter, defer } from "react-router-dom";
import { authRoutes } from "@/routes/auth";
import Home from "@/routes/Home.tsx";
import { client } from "@/lib/client.ts";
import { Layout } from "@/components/Layout.tsx";
import Profile from "@/routes/Profile.tsx";
import { AnimeNew } from "@/routes/AnimeNew.tsx";
import { AnimeEdit } from "@/routes/AnimeEdit.tsx";
import { AnimeView } from "@/routes/AnimeView.tsx";

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
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/anime/form",
        element: <AnimeNew />,
      },
      {
        path: "/anime/form/:id",
        element: <AnimeEdit />,
      },
      {
        path: "/anime/view/:id",
        element: <AnimeView />,
      },
    ],
  },
]);
