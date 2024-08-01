import { DashboardReviewCard } from "@/components/dashboard";
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";
import { fetchUser, fetchUserReviews } from "@/actions";
import { NotAnArtisan, Pagination } from "@/components";
import { paths } from "@/utils";
import { AppPageProps } from "@/utils/types/basicTypes";
import { buildUrlQuery } from "@/functions/helpers";

export const metadata: Metadata = staticMetadata({
  title: "KraftKollectors | My Reviews",
  description: "what other users say about me",
});

export default async function Page({ searchParams }: AppPageProps) {
  const user = await fetchUser();
  if (!user || user == "error")
    return <div className="info-box">An Error Occurred</div>;
  if (!user.isArtisan) return <NotAnArtisan />;

  const reviews = await fetchUserReviews({
    params: buildUrlQuery(searchParams),
  });
  if (!reviews || reviews == "error") throw new Error("Connection error");

  return (
    <div className="flex flex-col gap-2 py-2">
      {reviews.existingRecords.length == 0 ? (
        <div className="info-box">No Reviews</div>
      ) : (
        reviews.existingRecords.map((dummy) => (
          <DashboardReviewCard key={dummy._id} {...dummy} />
        ))
      )}
      <Pagination pagination={reviews} />
    </div>
  );
}
