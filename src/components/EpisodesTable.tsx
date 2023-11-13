import { ColumnDef } from "@tanstack/react-table";
import { EpisodeDataTable } from "@/components/EpisodeDataTable.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

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
      // todo implement delete dialog
      return (
        <div className={"flex gap-x-2"}>
          <Button asChild size={"sm"}>
            <Link
              to={`/anime/view/${row.original.animeId}/episodes/${row.original.episodeNumber}/edit`}
            >
              Edit
            </Link>
          </Button>

          <Button size={"sm"} variant={"destructive"}>
            Delete
          </Button>
        </div>
      );
    },
  },
];

export function EpisodesTable({ id }: EpisodeTableProps) {
  const data: Episode[] = [
    {
      title: "Beyond Journey End",
      totalViewers: 1000,
      episodeNumber: 1,
      animeId: id,
    },
    {
      title: "Beyond Journey End",
      totalViewers: 1250,
      episodeNumber: 2,
      animeId: id,
    },
    {
      title: "Beyond Journey End",
      totalViewers: 2000,
      episodeNumber: 3,
      animeId: id,
    },
  ];

  return <EpisodeDataTable columns={columns} data={data} />;
}
