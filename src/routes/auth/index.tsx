import { RouteObject } from "react-router-dom";
import Login from "@/routes/auth/Login.tsx";

export const authRoutes: RouteObject = {
  children: [
    {
      path: "login",
      element: <Login />,
    },
  ],
};
