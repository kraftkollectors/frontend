import { FavouriteButton, RatingStars, ReadMoreReadLess } from "@/components";
import { formatNumber } from "@/functions/helpers";
import { ServiceDetails as DetailedService} from "@/utils/types/service";

export default function ServiceDetails({title, estimatedPrice, description, _id, cummulativeRating: {averageRating}}:DetailedService) {
  return (
    <div className="flex flex-col gap-3 my-5 mb-4 border rounded-md p-4 bg-light">
      <h1 className="font-bold text-title text-black-900 md:text-xl">{title}</h1>
      <div className="flex justify-between gap-4 border-b pb-4">
        <p className="text-black-500 font-bold text-title">{formatNumber(Number(estimatedPrice), true)}</p>
        <div className="flex w-fit gap-2 items-center">
          <p className="text-dark-gray r-font-semibold text-label">{averageRating.toFixed(1)}</p>
          <RatingStars value={averageRating} size="md" />
          <FavouriteButton serviceId={_id} />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-black-500">Service Description</h1>
        <ReadMoreReadLess className="text-black-400">
          {description}
        </ReadMoreReadLess>
      </div>
    </div>
  );
}
