import { BasicService, BasicUser } from "@/utils/types/basicTypes";
import { Service } from "@/utils/types/service";
import { Suspense } from "react";
import { FaRegHeart } from "react-icons/fa6";
import UserProfile from "./UserProfile";
import { formatNumber } from "@/functions/helpers";
import { FavouriteButton } from "../ui/FavouriteButton";
import Link from "next/link";
import { paths } from "@/utils";
import CardUserSkeleton from "../skeletons/CardUserSkeleton";

/* eslint-disable @next/next/no-img-element */

export function ServiceCard({
  coverPhoto,
  category,
  title,
  estimatedPrice,
  charge,
  _id,
  ...service
}: Service) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative h-44 w-full md:h-48">
        <Link href={paths.service(_id)} className="h-full w-full">
          <img
            src={coverPhoto}
            alt={title}
            loading="lazy"
            className="h-full w-full overflow-hidden rounded-md border border-black-50 object-cover"
          />
        </Link>
        <FavouriteButton
          serviceId={_id}
          className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-md bg-light shadow"
        />
      </div>
      <Link href={paths.singleArtisan(service.userId)}>
        <div className="flex items-center gap-1">
          <Suspense fallback={<CardUserSkeleton />}>
            <UserProfile userId={service.userId} />
          </Suspense>
        </div>
      </Link>
      <p className="truncate text-label text-black-300">{category}</p>
      <Link
        href={paths.service(_id)}
        className="r-font-semibold line-clamp-2 justify-stretch pb-1 text-black-400"
      >
        {title}
      </Link>
      <p className="font-bold text-black-600">
        {formatNumber(Number(estimatedPrice), true)} / {charge}
      </p>
    </div>
  );
}
