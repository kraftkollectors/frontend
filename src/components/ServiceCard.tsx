import { BasicService, BasicUser } from "@/utils/types/basicTypes";
import { FaRegHeart } from "react-icons/fa6";

/* eslint-disable @next/next/no-img-element */

export type ServiceCardProps = BasicService & {
  artisan: BasicUser;
  category: string;
};

export function ServiceCard({
  img,
  artisan,
  category,
  title,
  price,
  duration,
  id
}: ServiceCardProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative w-full h-44 md:h-48">
        <img
          src={img}
          alt={title}
          className="rounded-md overflow-hidden object-cover w-full h-full"
        />
        <button className="absolute right-[5%] -bottom-3 size-7 rounded-md shadow inline-flex items-center justify-center bg-light">
          <FaRegHeart />
        </button>
      </div>
      <div className="flex gap-1 items-center">
        <img src={artisan.img} alt={artisan.name} className="avatar size-6" />
        <h1 className="text-label font-bold truncate line-clamp-1">
          {artisan.name}
        </h1>
      </div>
      <p className="truncate text-label text-black-300">
        {category}
      </p>
      <p className="r-font-semibold text-black-400 pb-1 line-clamp-2">
        {title}
      </p>
      <p className="font-bold text-black-600">
        N{price} / {duration}
      </p>
    </div>
  );
}
