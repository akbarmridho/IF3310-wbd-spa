import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "@/routes/auth";

export const router = createBrowserRouter([
  // unprotected routes
  authRoutes,
  // protected routes
]);
