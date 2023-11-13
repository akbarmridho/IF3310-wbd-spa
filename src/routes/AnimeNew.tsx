import { AnimeForm } from "@/components/forms/AnimeForm.tsx";

export function AnimeNew() {
  return (
    <>
      <div className={"my-4"}>
        <h1 className={"font-bold text-xl text-center"}>Add New Anime</h1>
      </div>
      <AnimeForm />
    </>
  );
}
