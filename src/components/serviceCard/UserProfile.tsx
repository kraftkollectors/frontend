import { fetchUser } from "@/actions";
import { fullName } from "@/functions/helpers";

/* eslint-disable @next/next/no-img-element */
export default async function UserProfile({userId}:{userId:string}) {
    const artisan = await fetchUser({params: userId, isPublic: true});
    if(!artisan || artisan == 'error') return <>
    <div className="skeleton avatar size-6"></div>
    <div className="skeleton h-4 w-20"></div>
</>
    
    const fullname = fullName(artisan.firstName, artisan.lastName);
    return (
        <>
        <img src={artisan.image} alt={fullname} className="avatar size-6" />
        <h1 className="text-label font-bold truncate line-clamp-1">
          {fullname}
        </h1>
        </>
    );
}