import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { EpisodesTable } from "@/components/EpisodesTable.tsx";

export function AnimeView() {
  const id = useParams().id as string;

  const data = {
    id,
    totalEpisodes: 25,
    airedEpisodes: 10,
    broadcastInformation: "Asadadsadsadsa",
    status: "airing",
    title: "Sousou No Frieren",
  };

  return (
    <>
      <div className={"my-4 flex justify-between"}>
        <div>
          <h1 className={"text-xl font-bold"}>{data.title}</h1>
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
            <span className={"font-semibold"}>Total Episodes</span>{" "}
            {data.totalEpisodes}
          </p>
          <p>
            <span className={"font-semibold"}>Aired Episodes</span>
            {data.airedEpisodes}
          </p>
          <p>
            <span className={"font-semibold"}>Status </span>
            {data.status}
          </p>
          <p className={"font-semibold"}>Broadcast Information</p>
          <p>{data.broadcastInformation}</p>
        </div>
        <div className={"col-span-4 md:col-span-3"}>
          <EpisodesTable id={id} />
        </div>
      </div>
    </>
  );
}
