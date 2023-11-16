import { Anime, AnimeForm } from "@/components/forms/AnimeForm.tsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "@/lib/client.ts";

export function AnimeEdit() {
  const id = useParams().id as string;
  const [anime, setAnime] = useState<null | Anime>(null);

  useEffect(() => {
    client.anime.getAnime(id).then((response) => {
      setAnime(response.data.data);
    });
  }, []);

  return (
    <>
      <div className={"my-4"}>
        <h1 className={"font-bold text-xl text-center"}>Update Anime</h1>
      </div>
      {anime && <AnimeForm anime={anime} />}
    </>
  );
}
