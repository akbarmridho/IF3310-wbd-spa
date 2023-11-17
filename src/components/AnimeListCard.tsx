import { Link } from "react-router-dom";
import { z } from "zod";

const animeViewSchema = z.object({
  id: z.string(),
  title: z.string().min(2).max(255),
  status: z.enum(["upcoming", "airing", "aired"]),
  broadcastInformation: z.string().optional(),
  totalEpisodes: z.number().int().min(1).optional(),
  airedEpisodes: z.number().int().min(1).optional(),
});

export interface AnimeData extends z.infer<typeof animeViewSchema> {}

export type AnimeCard = {
  data: AnimeData;
};

const AnimeListCard: React.FC<AnimeCard> = ({ data }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-auto m-3">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm font-bold">
            <Link to={`/anime/view/${data.id}`}>{data.title}</Link>
          </div>
          <p className="mt-2 text-gray-500">
            Broadcast Information:{" "}
            {data.broadcastInformation
              ? data.broadcastInformation.substring(0, 47) + "..."
              : "No information available                          "}
          </p>
          <p className="mt-2 text-gray-500">
            Total Episodes: {data.totalEpisodes || "N/A"}
          </p>
          <p className="mt-2 text-gray-500">
            Aired Episodes: {data.airedEpisodes || "N/A"}
          </p>
          <p className="mt-2 text-gray-500 capitalize">Status: {data.status}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeListCard;
