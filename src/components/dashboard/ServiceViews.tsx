import { fetchServiceTotalViews, fetchServiceViews } from "@/actions";
import { FaEye } from "react-icons/fa6";

export default async function ServiceViews({ id }: { id: string }) {
  const views = await fetchServiceViews(id);
  if (!views || views == "error") return null;
  const totalViews = await fetchServiceTotalViews(id);
  if (!totalViews || totalViews == "error") return null;

  return (
    <div className="flex items-center justify-end gap-2 text-label font-semibold text-black-400 max-md:w-full max-md:pt-4">
      <FaEye />
      <span>
        {totalViews.views} ({views.views} today)
      </span>
    </div>
  );
}
