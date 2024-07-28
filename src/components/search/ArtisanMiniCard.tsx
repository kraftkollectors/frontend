/* eslint-disable @next/next/no-img-element */
import { debugLog, fallbackImage, fullName } from "@/functions/helpers";
import AppIcons from "../AppIcons";
import { UserDetails } from "@/utils/types/user";
import { Suspense } from "react";
import ArtisanInfo from "./ArtisanInfo";
import ArtisanCardReviews from "./ArtisanCardReviews";
import Link from "next/link";
import { paths } from "@/utils";

export default function ArtisanCard({
  _id,
  firstName,
  lastName,
  // userName,
  image,
}: UserDetails) {
  return (
    <Link
      href={paths.singleArtisan(_id)}
      className="flex w-full items-center justify-stretch gap-1.5 bg-light p-4 hover:bg-black-50"
    >
      <img
        height={56}
        width={56}
        src={fallbackImage(image)}
        alt={fullName(firstName, lastName)}
        loading="lazy"
        className="avatar profile-img size-[56px] flex-shrink-0"
      />
      <div className="flex w-full flex-shrink flex-col gap-1">
        <h4 className="line-clamp-1 flex items-center justify-start gap-1 overflow-hidden text-label font-semibold text-black-500">
          {fullName(firstName, lastName)
            .split(" ")
            .map((name) => (
              <span key={name}>{name}</span>
            ))}
          <span className="text-[#599F79]">
            <AppIcons.Verified />
          </span>
        </h4>
        <Suspense fallback={<div className="skeleton h-4 w-8"></div>}>
          <ArtisanInfo userId={_id} />
        </Suspense>
        <Suspense fallback={<div className="skeleton h-4 w-10"></div>}>
          <ArtisanCardReviews size="sm" userId={_id} />
        </Suspense>
      </div>
    </Link>
  );
}
