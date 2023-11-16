import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "@/lib/client.ts";
import { Episode, EpisodeForm } from "@/components/forms/EpisodeForm";

export function EpisodeEdit() {
  const animeId = useParams().id as string;
  const episodeId = parseInt(useParams().eid as string);
  const [episode, setEpisode] = useState<null | Episode>(null);

  useEffect(() => {
    client.anime.getEpisode(animeId, episodeId).then((response) => {
      setEpisode(response.data.data);
    });
  }, []);

  return (
    <>
      <div className={"my-4"}>
        <h1 className={"font-bold text-xl text-center"}>Update Episode</h1>
      </div>
      {episode && <EpisodeForm episode={episode} animeId={animeId} />}
    </>
  );
}
