import { DashboardReviewCard } from "@/components/dashboard";
import { dummyReviews } from "@/utils/dummy";
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";
import { fetchUser, fetchUserReviews } from "@/actions";
import { NotAnArtisan, Pagination } from "@/components";
import { paths } from "@/utils";

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | My Reviews",
  description: "what other users say about me"
})


export default async function Page() {
  const user = await fetchUser();
  if(!user || user == 'error') return <div className="info-box">An Error Occurred</div>
  if(!user.isArtisan) return <NotAnArtisan />

  const reviews = await fetchUserReviews();
  if(!reviews || reviews == 'error') throw new Error('Connection error')

  return (
    <div className="py-2 flex flex-col gap-2">
      {
        reviews.existingRecords.length == 0 ? <div className="info-box">No Reviews</div>
        : reviews.existingRecords.map((dummy) => (
        <DashboardReviewCard key={dummy._id} {...dummy} />
      ))}
      <Pagination pagination={reviews} />
    </div>
  );
}
