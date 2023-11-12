import { QueryClient } from "react-query";
import { Api } from "@/lib/Api.ts";

export const queryClient = new QueryClient();

export const API_BASE_URL = import.meta.env.VITE_API_URL as string;

export const client = new Api({
  withCredentials: true,
  format: "json",
  baseURL: API_BASE_URL,
});
