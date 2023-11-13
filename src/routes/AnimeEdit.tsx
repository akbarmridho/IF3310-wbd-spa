import { AnimeForm } from "@/components/forms/AnimeForm.tsx";
import { useParams } from "react-router-dom";

export function AnimeEdit() {
  // todo: fetch data here
  const id = useParams().id as string;

  return (
    <>
      <div className={"my-4"}>
        <h1 className={"font-bold text-xl text-center"}>Update Anime</h1>
      </div>
      <AnimeForm
        anime={{
          id: id,
          title: "Sousou No Frieren",
          totalEpisodes: 28,
          status: "airing",
          broadcastInformation: "AOTY",
        }}
      />
    </>
  );
}
