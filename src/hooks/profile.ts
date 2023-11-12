import { createContext, useContext } from "react";
import { ApiUserInstance } from "@/lib/Api.ts";

export const ProfileContext = createContext<ApiUserInstance>({} as never);

export function useProfile() {
  return useContext(ProfileContext);
}
