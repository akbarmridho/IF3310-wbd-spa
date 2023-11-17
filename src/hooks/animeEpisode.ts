import { createContext, useContext } from "react";

interface ContextValue {
  refresh: () => void;
}
export const EpisodeRefresherContext = createContext<ContextValue>({
  refresh: () => {},
});

export const useEpisodeRefresher = () => {
  return useContext(EpisodeRefresherContext);
};
