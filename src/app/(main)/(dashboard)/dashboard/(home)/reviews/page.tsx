import { DashboardReviewCard } from "@/components/dashboard";
import { dummyReviews } from "@/utils/dummy";

export default function Page() {
  return (
    <div className="py-2 flex flex-col gap-2">
      {dummyReviews.map((dummy) => (
        <DashboardReviewCard key={dummy.id} {...dummy} />
      ))}
    </div>
  );
}
