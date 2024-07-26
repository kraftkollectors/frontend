import { fetchUsers } from "@/actions";
import ArtisanMiniCard from "@/components/search/ArtisanMiniCard";

export default async function ArtisansColumn() {
  const artisans = await fetchUsers({ throwsError: false, params: "?artisanOnly=true" });
  if(!artisans || artisans == 'error') throw new Error("Connection error")
    
    return (
        <div className="rounded-lg p-2 flex flex-col w-full items-start bg-light">
             {artisans.existingRecords.map((artisan) => (
          <ArtisanMiniCard key={artisan._id} {...artisan} />
        ))}
        </div>
    );
}