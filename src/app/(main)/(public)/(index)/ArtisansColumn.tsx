import { fetchUsers } from "@/actions";
import ArtisanMiniCard from "@/components/search/ArtisanMiniCard";

export default async function ArtisansColumn() {
  const artisans = await fetchUsers({
    throwsError: false,
    params: "?artisanOnly=true",
  });
  if (!artisans || artisans == "error") throw new Error("Connection error");

  return (
    <div className="flex w-full flex-col items-start divide-y divide-black-50 rounded-lg bg-light p-2">
      {artisans.existingRecords.map((artisan) => (
        <ArtisanMiniCard key={artisan._id} {...artisan} />
      ))}
    </div>
  );
}
