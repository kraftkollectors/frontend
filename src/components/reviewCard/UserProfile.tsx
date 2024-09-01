import { fetchUser } from "@/actions";
import { fallbackImage, fullName } from "@/functions/helpers";
import CardUserSkeleton from "../skeletons/CardUserSkeleton";
import { formatDate } from "@/functions/date";

/* eslint-disable @next/next/no-img-element */
export default async function UserProfile({ userId, date }: { userId: string, date: string }) {
    const artisan = await fetchUser({ params: userId, isPublic: true, throwsError: false });
    if (!artisan || artisan == 'error') return <CardUserSkeleton />

    const fullname = fullName(artisan.firstName, artisan.lastName);
    return (
        <>
            <img src={fallbackImage(artisan.image)} alt={fullname} className="avatar size-8 profile-img" />
            <div className="flex flex-col">
                <h2 className="text-black-900 r-font-semibold truncate">
                    {fullname}
                </h2>
                <p className=" text-black-300">{formatDate(date)}</p>
            </div>
        </>
    );
}