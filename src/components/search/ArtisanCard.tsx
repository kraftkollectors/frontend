/* eslint-disable @next/next/no-img-element */
import { debugLog, fallbackImage, fullName } from "@/functions/helpers";
import AppIcons from "../AppIcons";
import { UserDetails } from "@/utils/types/user";
import { Suspense } from "react";
import ArtisanInfo from "./ArtisanInfo";
import ArtisanCardReviews from "./ArtisanCardReviews";
import Link from "next/link";
import { paths } from "@/utils";

export default function ArtisanCard({_id, firstName, lastName, userName, image,  }: UserDetails) {
    return (
        <Link
        href={paths.singleArtisan(_id)}
         className="border bg-light rounded-lg border-black-50 p-4 flex flex-col items-center justify-center gap-1.5">
            <img src={fallbackImage(image)} alt={fullName(firstName, lastName)} className="avatar profile-img size-[72px] flex-shrink-0 " />
            <h3 className="font-semibold text-black-500 text-label text-center flex justify-center items-center flex-wrap gap-1">
                {fullName(firstName, lastName).split(' ').map(name => <span key={name}>{name}</span>)}
                <AppIcons.Verified />
            </h3>
            <h4 className="text-black-400 text-label">@{userName}</h4>
            <Suspense fallback={<div className="skeleton h-4 w-8"></div>}>
                <ArtisanInfo userId={_id} />
            </Suspense>
            <Suspense fallback={<div className="skeleton h-4 w-10"></div>}>
                <ArtisanCardReviews userId={_id} />
            </Suspense>
        </Link>
    );
}