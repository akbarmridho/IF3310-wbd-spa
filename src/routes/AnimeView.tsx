import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { EpisodesTable } from "@/components/EpisodesTable.tsx";
import { client } from "@/lib/client";
import { useEffect, useState } from "react";
import { AnimeData } from "@/components/AnimeListCard";
import { DeleteAnimeDialog } from "@/components/DeleteAnimeDialog.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import { isAxiosError } from "axios";
import { ApiValidationError, ApiValidationSingleError } from "@/lib/Api.ts";

export function AnimeView() {
  const id = useParams().id as string;

  const [animeData, setAnimeData] = useState<AnimeData | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    client.anime.getAnime(id).then((response) => {
      setAnimeData(response.data.data);
    });
  }, [id]);

  const handleConfirmDelete = async () => {
    try {
      await client.anime.deleteAnime(id);

      toast({
        description: "Anime deleted",
      });
      navigate("/");
    } catch (e) {
      if (isAxiosError<ApiValidationSingleError | ApiValidationError>(e)) {
        if (e.response && e.response.status === 400) {
          if ("message" in e.response.data) {
            const message = e.response.data.message;

            toast({
              description: message,
              variant: "destructive",
            });
          }
        }
      }
      setShowDeleteDialog(false);
    }
  };

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
          <Button
            size={"sm"}
            variant={"destructive"}
            className={"ml-2"}
            onClick={() => setShowDeleteDialog(true)}
          >
            Delete
          </Button>
          {showDeleteDialog && (
            <DeleteAnimeDialog
              onClose={() => setShowDeleteDialog(false)}
              onDelete={handleConfirmDelete}
            />
          )}
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
          <div className={"flex justify-end gap-x-2"}>
            <Button asChild size={"sm"} variant={"outline"}>
              <Link to={`/anime/view/${id}/episodes/new`}>New Episode</Link>
            </Button>
          </div>
          <EpisodesTable id={id} />
        </div>
      </div>
    </>
  );
}
