import { BasicService, BasicUser } from "@/utils/types/basicTypes";
import { Service } from "@/utils/types/service";
import { Suspense } from "react";
import { FaRegHeart } from "react-icons/fa6";
import UserProfile from "./UserProfile";

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
      <div className="relative w-full h-44 md:h-48">
        <img
          src={coverPhoto}
          alt={title}
          className="rounded-md overflow-hidden object-cover w-full h-full"
        />
        <button className="absolute right-[5%] -bottom-3 size-7 rounded-md shadow inline-flex items-center justify-center bg-light">
          <FaRegHeart />
        </button>
      </div>
      <div className="flex gap-1 items-center">
        <Suspense fallback={<>
        <div className="skeleton avatar size-6"></div>
        <div className="skeleton h-4 w-20"></div>
    </>}>
          <UserProfile userId={service.userId} />
        </Suspense>
      </div>
      <p className="truncate text-label text-black-300">
        {category}
      </p>
      <p className="r-font-semibold text-black-400 pb-1 line-clamp-2">
        {title}
      </p>
      <p className="font-bold text-black-600">
        N{estimatedPrice} / {charge}
      </p>
    </div>
  );
}
