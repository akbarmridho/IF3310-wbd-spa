import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className={"flex justify-between mb-2"}>
        <div>
          <h1 className={"text-xl font-bold"}>Anime List</h1>
        </div>
        <div>
          <Button asChild>
            <Link to={"/anime/form"}>Add Anime</Link>
          </Button>
        </div>
      </div>
      <div>Ini list anime</div>
    </div>
  );
}
