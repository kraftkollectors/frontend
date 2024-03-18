import { FaHeart } from "react-icons/fa6";

/* eslint-disable @next/next/no-img-element */
export function ServiceCard() {
  return (
    <div className="flex flex-col p-1 gap-1">
      <div className="relative w-full h-44 md:h-48">
        <img
          src="/images/auth-bg.png"
          alt=""
          className="rounded-md overflow-hidden object-cover w-full h-full"
        />
        <button className="absolute right-[10%] -bottom-3 size-6 rounded-md shadow inline-flex items-center justify-center bg-light">
          <FaHeart />
        </button>
      </div>
      <div className="flex gap-1 items-center">
        <img src="/images/auth-bg.png" alt="name" className="avatar size-6" />
        <h1 className="text-sm r-font-semibold truncate">Joshua Nwanebi</h1>
      </div>
      <p className="truncate text-dark-gray opacity-80">Entertainment | DJ</p>
      <p className="r-font-semibold text-base pb-1 line-clamp-2 opacity-80">
        I will Create The Altimate sound track for your event
      </p>
      <p className="font-bold">N200,000 / session</p>
    </div>
  );
}
