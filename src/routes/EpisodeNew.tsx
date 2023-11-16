import { EpisodeForm } from "@/components/forms/EpisodeForm";
import { useParams } from "react-router-dom";

export function EpisodeNew() {
  const animeId = useParams().id as string;
  return (
    <>
      <div className={"my-4"}>
        <h1 className={"font-bold text-xl text-center"}>Add New Episode</h1>
      </div>
      <EpisodeForm animeId={animeId} />
    </>
  );
}
