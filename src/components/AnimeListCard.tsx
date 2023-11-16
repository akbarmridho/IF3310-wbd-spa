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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            <Link to={`/anime/view/${data.id}`}>{data.title}</Link>
          </div>
          <p className="mt-2 text-gray-500">
            Broadcast Information: {data.broadcastInformation}
          </p>
          <p className="mt-2 text-gray-500">
            Total Episodes: {data.totalEpisodes}
          </p>
          <p className="mt-2 text-gray-500">
            Aired Episodes: {data.airedEpisodes}
          </p>
          <p className="mt-2 text-gray-500">Status: {data.status}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeListCard;
