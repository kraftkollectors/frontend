import { fetchServiceTotalViews, fetchServiceViews } from "@/actions";
import { FaEye } from "react-icons/fa6";

export default async function ServiceViews({ id }: { id: string }) {
  const views = await fetchServiceViews(id);
  if (!views || views == "error") return null;
  const totalViews = await fetchServiceTotalViews(id);
  if (!totalViews || totalViews == "error") return null;

  return (
    <div className="flex gap-2 font-semibold text-black-400">
      <FaEye />
      <span>
        {totalViews.views} ({views.views} today)
      </span>
    </div>
  );
}
