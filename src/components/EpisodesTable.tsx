import { ColumnDef } from "@tanstack/react-table";
import { EpisodeDataTable } from "@/components/EpisodeDataTable.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "@/lib/client";
import { DeleteDialog } from "./DeleteDialog";

interface EpisodeTableProps {
  id: string;
}

interface Episode {
  animeId: string;
  title: string;
  episodeNumber: number;
  totalViewers: number;
}

const columns: ColumnDef<Episode>[] = [
  {
    accessorKey: "episodeNumber",
    header: "No",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "totalViewers",
    header: "Viewers",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [showDeleteDialog, setShowDeleteDialog] = useState(false);

      const navigate = useNavigate();

      const handleDeleteClick = () => {
        setShowDeleteDialog(true);
      };

      const handleConfirmDelete = async () => {
        try {
          await client.anime.deleteEpisode(
            row.original.animeId,
            row.original.episodeNumber,
          );
          console.log(row.original);
        } catch (error) {
          console.log(error);
        }
        setShowDeleteDialog(false);

        navigate(`/anime/view/${row.original.animeId}`);
      };

      const handleCancelDelete = () => {
        // Cancel the delete operation
        setShowDeleteDialog(false);
      };

      // FIXME implement delete dialog
      return (
        <>
          <div className={"flex gap-x-2"}>
            <Button asChild size={"sm"}>
              <Link
                to={`/anime/view/${row.original.animeId}/episodes/${row.original.episodeNumber}/edit`}
              >
                Edit
              </Link>
            </Button>

            <Button
              size={"sm"}
              variant={"destructive"}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </div>
          {showDeleteDialog && (
            <DeleteDialog
              onClose={handleCancelDelete}
              onDelete={handleConfirmDelete}
            />
          )}
        </>
      );
    },
  },
];

export function EpisodesTable({ id }: EpisodeTableProps) {
  const [episodeData, setEpisodeData] = useState<Episode[]>([]);

  useEffect(() => {
    client.anime.getAllEpisodes(id).then((response) => {
      setEpisodeData(response.data.data);
    });
  }, []);

  return <EpisodeDataTable columns={columns} data={episodeData} />;
}
