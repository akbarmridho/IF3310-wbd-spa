import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { EpisodesTable } from "@/components/EpisodesTable.tsx";
import { client } from "@/lib/client";
import { useEffect, useState } from "react";
import { AnimeData } from "@/components/AnimeListCard";

export function AnimeView() {
  const id = useParams().id as string;

  const [animeData, setAnimeData] = useState<AnimeData | null>(null);

  useEffect(() => {
    client.anime.getAnime(id).then((response) => {
      setAnimeData(response.data.data);
    });
  });

  if (animeData === null) {
    return "Anime data not found";
  }

  return (
    <>
      <div className={"my-4 flex justify-between"}>
        <div>
          <h1 className={"text-xl font-bold"}>{animeData.title}</h1>
        </div>
        <div>
          <Button asChild size={"sm"}>
            <Link to={`/anime/form/${id}`}>Edit</Link>
          </Button>
        </div>
      </div>
      <div className={"grid grid-cols-4 w-full"}>
        <div className={"col-span-4 md:col-span-1"}>
          <p>
            <span className={"font-semibold"}>Total Episodes: </span>
            {animeData.totalEpisodes}
          </p>
          <p>
            <span className={"font-semibold"}>Aired Episodes: </span>
            {animeData.airedEpisodes}
          </p>
          <p>
            <span className={"font-semibold"}>Status: </span>
            {animeData.status}
          </p>
          <p className={"font-semibold"}>Broadcast Information: </p>
          <p>{animeData.broadcastInformation}</p>
        </div>
        <div className={"col-span-4 md:col-span-3"}>
          <EpisodesTable id={id} />
        </div>
      </div>
    </>
  );
}
