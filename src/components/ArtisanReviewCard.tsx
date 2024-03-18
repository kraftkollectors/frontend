import { RatingStars } from "./ui/RatingStars";

/* eslint-disable @next/next/no-img-element */
export function ArtisanReviewCard() {
  return (
    <div className="flex flex-col gap-2 border-b pb-2">
      <div className="flex gap-3 items-center">
        <img src="/images/auth-bg.png" alt="name" className="avatar size-8" />
        <div className="flex flex-col">
          <h1 className="text-sm r-font-semibold truncate">Joshua Nwanebi</h1>
          <p className="text-xs opacity-60">12/12/2023</p>
        </div>
      </div>
      <RatingStars value={4} />
      <p className="text-sm text-dark-gray">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius rerum ab
        officiis voluptatum repudiandae?
      </p>
      <div className="flex gap-2 items-center">
        <img
          src="/images/auth-bg.png"
          alt=""
          className="w-4/12 object-cover aspect-[5/3] rounded"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-xs opacity-60">Reviewed</h1>
          <h2 className="text-xs">DJ Sets</h2>
          <p className="text-xs r-font-semibold">N20,000 / session</p>
        </div>
      </div>
    </div>
  );
}
