import { FavouriteButton, RatingStars, ReadMoreReadLess } from "@/components";
import { formatNumber } from "@/functions/helpers";
import { Service } from "@/utils/types/service";

export default function ServiceDetails({title, estimatedPrice, description}:Service) {
  return (
    <div className="flex flex-col gap-3 my-5 mb-4 border rounded-md p-4 bg-light">
      <h1 className="font-bold text-title md:text-xl">{title}</h1>
      <div className="flex justify-between gap-4 border-b pb-4">
        <p className="text-primary r-font-semibold text-title">{formatNumber(Number(estimatedPrice), true)}</p>
        <div className="flex w-fit gap-2 items-center">
          <p className="text-dark-gray r-font-semibold text-label">4.8</p>
          <RatingStars value={4.8} size="md" />
          <FavouriteButton />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold">Service Description</h1>
        <ReadMoreReadLess className="text-black-400">
          {description}
        </ReadMoreReadLess>
      </div>
    </div>
  );
}
