import { ArrowLeft, ArrowRight } from "lucide-react";
import AnimeListCard, { AnimeData } from "./AnimeListCard";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/lib/client";

export function AnimeList() {
  // TODO filter

  // fetch all anime
  const [bulkData, setBulkAnimeData] = useState<AnimeData[]>([]);
  useEffect(() => {
    client.anime.getAllAnime().then((response) => {
      setBulkAnimeData(response.data.data);
    });
  }, []);

  const [pageNumber, setPageNumber] = useState<number>(1);

  const animeCount = bulkData.length;
  const animePerPage = 5;
  const maxPage = Math.ceil(animeCount / animePerPage);

  // handlers for pagination buttons
  const handlePrev = () => {
    if (pageNumber == 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    if (pageNumber == maxPage) {
      return;
    }
    setPageNumber(pageNumber + 1);
  };

  // split fetched data
  const [dataOfPage, setDataOfPage] = useState<AnimeData[]>(
    bulkData.slice(
      (pageNumber - 1) * animePerPage,
      Math.min(animeCount, pageNumber * animePerPage),
    ),
  );

  useEffect(() => {
    setDataOfPage(
      bulkData.slice(
        (pageNumber - 1) * animePerPage,
        Math.min(animeCount, pageNumber * animePerPage),
      ),
    );
  }, [pageNumber, animeCount, animePerPage, bulkData]);

  return (
    <>
      {dataOfPage.length != 0
        ? dataOfPage!.map((anime) => (
            <AnimeListCard key={anime.id} data={anime} />
          ))
        : "No results"}
      <div className="flex justify-center my-10">
        {dataOfPage.length != 0 ? (
          <nav
            className="inline-flex rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Button key={"prev"} variant={"secondary"} onClick={handlePrev}>
              <span className="sr-only">Previous</span>
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Button>

            {/* Pagination button pages, update onClick */}
            {Array.from({ length: maxPage }, (_, index) => (
              // TODO handle many pagination
              <Button
                key={index + 1}
                onClick={() => {
                  setPageNumber(index + 1);
                }}
              >
                {index + 1}
              </Button>
            ))}
            <Button key={"next"} variant={"secondary"} onClick={handleNext}>
              <span className="sr-only">Previous</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </nav>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
