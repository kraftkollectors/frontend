import { fetchArtisan } from "@/actions/fetch/fetchArtisan";

export default async function ArtisanInfo({userId}: {userId: string}) {
    const artisan = await fetchArtisan({throwsError: false, isPublic: true, params: userId})
    if(!artisan || artisan == 'error') return <div className="skeleton h-4 w-8"></div>
    
    return (
        <p className="text-black-400 text-label font-semibold">{artisan.areaOfSpecialization}</p>
    );
}