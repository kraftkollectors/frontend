import { BasicService, BasicUser } from "@/utils/types/basicTypes";
import { FaHeart } from "react-icons/fa6";

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
    <div className="flex flex-col p-1 gap-1">
      <div className="relative w-full h-44 md:h-48">
        <img
          src={img}
          alt={title}
          className="rounded-md overflow-hidden object-cover w-full h-full"
        />
        <button className="absolute right-[10%] -bottom-3 size-6 rounded-md shadow inline-flex items-center justify-center bg-light">
          <FaHeart />
        </button>
      </div>
      <div className="flex gap-1 items-center">
        <img src={artisan.img} alt={artisan.name} className="avatar size-6" />
        <h1 className="text-sm r-font-semibold truncate">
          {artisan.name}
        </h1>
      </div>
      <p className="truncate text-dark-gray opacity-80">
        {category}
      </p>
      <p className="r-font-semibold text-base pb-1 line-clamp-2 opacity-80">
        {title}
      </p>
      <p className="font-bold">
        N{price} / {duration}
      </p>
    </div>
  );
}
