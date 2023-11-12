import { RouteObject } from "react-router-dom";
import Login from "@/routes/auth/Login.tsx";
import Register from "@/routes/auth/Register.tsx";

export const authRoutes: RouteObject = {
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};
