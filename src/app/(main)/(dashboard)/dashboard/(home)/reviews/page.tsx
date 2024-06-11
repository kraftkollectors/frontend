import { DashboardReviewCard } from "@/components/dashboard";
import { dummyReviews } from "@/utils/dummy";
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";
import { fetchUser } from "@/actions";
import { NotAnArtisan } from "@/components";

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | My Reviews",
  description: "what other users say about me"
})


export default async function Page() {
  const user = await fetchUser();
  if(!user || user == 'error') return <div className="info-box">An Error Occurred</div>
  if(!user.isArtisan) return <NotAnArtisan />

  return (
    <div className="py-2 flex flex-col gap-2">
      {dummyReviews.map((dummy) => (
        <DashboardReviewCard key={dummy._id} {...dummy} />
      ))}
    </div>
  );
}
