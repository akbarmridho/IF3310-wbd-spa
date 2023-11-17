import { ArrowLeft, ArrowRight } from "lucide-react";
import AnimeListCard, { AnimeData } from "./AnimeListCard";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/lib/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function AnimeList() {
  // filter status using select menu
  const [statusFilter, setStatusFilter] = useState<string>("none");

  // fetch all anime
  const [bulkData, setBulkAnimeData] = useState<AnimeData[]>([]);
  const [animeCount, setAnimeCount] = useState<number>(bulkData.length);
  useEffect(() => {
    client.anime.getAllAnime().then((response) => {
      setBulkAnimeData(response.data.data);
      setAnimeCount(bulkData.length);
    });
  }, []);

  const [pageNumber, setPageNumber] = useState<number>(1);

  // split fetched data
  // const animeCount = bulkData.length;
  const animePerPage = 5;
  const [dataOfPage, setDataOfPage] = useState<AnimeData[]>(
    bulkData.slice(
      (pageNumber - 1) * animePerPage,
      Math.min(animeCount, pageNumber * animePerPage),
    ),
  );

  // handlers for pagination buttons
  const handlePrev = () => {
    if (pageNumber == 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    if (pageNumber == Math.ceil(animeCount / animePerPage)) {
      return;
    }
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    const filteredData =
      statusFilter === "none"
        ? bulkData
        : bulkData.filter((item) => item.status === statusFilter);
    setAnimeCount(filteredData.length);

    setDataOfPage(
      filteredData.slice(
        (pageNumber - 1) * animePerPage,
        Math.min(filteredData.length, pageNumber * animePerPage),
      ),
    );
  }, [pageNumber, animePerPage, bulkData, statusFilter]);
  useEffect(() => {
    setPageNumber(1);
  }, [statusFilter]);

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  console.log(pageNumber, animeCount);
  console.log(bulkData);
  console.log(dataOfPage);
  return (
    <>
      <Select onValueChange={handleFilterChange}>
        <SelectTrigger>
          <SelectValue placeholder={"Filter"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"upcoming"}>Upcoming</SelectItem>
          <SelectItem value={"airing"}>Airing</SelectItem>
          <SelectItem value={"aired"}>Aired</SelectItem>
          <SelectItem value={"none"}>No Filter</SelectItem>
        </SelectContent>
      </Select>
      {dataOfPage.length != 0 ? (
        <>
          {dataOfPage!.map((anime) => (
            <AnimeListCard key={anime.id} data={anime} />
          ))}
        </>
      ) : (
        "No results"
      )}
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
            {Array.from(
              { length: Math.ceil(animeCount / animePerPage) },
              (_, index) => (
                // TODO handle many pagination
                <Button
                  key={index + 1}
                  onClick={() => {
                    setPageNumber(index + 1);
                  }}
                >
                  {index + 1}
                </Button>
              ),
            )}
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
