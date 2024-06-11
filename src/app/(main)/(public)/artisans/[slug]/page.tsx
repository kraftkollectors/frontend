import { AppPageProps } from "@/utils/types/basicTypes";
import About from "./About";
import MyServices from "./MyServices";
import Profile from "./Profile";
import Reviews from "./Reviews";
import { fetchUser } from "@/actions";
import { fetchArtisan } from "@/actions/fetch/fetchArtisan";
import { notFound } from "next/navigation";
import { formatDate } from "@/functions/date";
import { fallbackImage, fullName } from "@/functions/helpers";

export default async function Page({ params }: AppPageProps<{ slug: string }>) {
  const userId = params?.slug;
  if (!userId) notFound();
  const user = await fetchUser({ isPublic: true, params: userId });
  if (user == 'error') throw new Error("Connection error");
  if (!user?.isArtisan) notFound()

  let art = await fetchArtisan({ isPublic: true, params: userId });
  if (art == 'error' || !art) throw new Error("Connection error")


  return (
    <>
      <section className="app-container py-10 bg-light-text">
        <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-11 gap-4 md:gap-6">
          <Profile
            userId={user._id}
            memberSince={formatDate(user.createdAt).split('/').pop() ?? '--'}
            socials={art}
            name={fullName(user.firstName, user.lastName)}
            location={`${art.lga}, ${art.state}`}
            img={fallbackImage(user.image)}
            profession={art.areaOfSpecialization}
            phone={art.phoneNumber}
            email={user.email}
            website={art.website}
          />
          <About
            about={art.description}
            userId={user._id}
          />
        </div>
      </section>
      <MyServices userId={user._id} />
      <Reviews />
    </>
  );
}
