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

import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: AppPageProps<{ slug: string }>): Promise<Metadata | null> {
  const userId = params?.slug;
  if (!userId) return null;
  const user = await fetchUser({ isPublic: true, params: userId });
  if (!user || user == "error") return null;

  return staticMetadata({
    title: `KraftKollectors | Artisan: ${fullName(user.firstName, user.lastName)}`,
    description: `meet ${user.userName} on KraftKollectors, check out their services, reviews, certificates and education`,
    img: user.image,
  });
}

export default async function Page({
  params,
  searchParams,
}: AppPageProps<{ slug: string }>) {
  const userId = params?.slug;
  if (!userId) notFound();
  const user = await fetchUser({ isPublic: true, params: userId });
  if (user == "error" || !user) throw new Error("Connection error");
  // if (!user?.isArtisan) notFound()

  let art = user.isArtisan
    ? await fetchArtisan({ isPublic: true, params: userId })
    : undefined;
  if (art == "error" || art == null) art = undefined;

  return (
    <>
      <section className="app-container bg-light-text py-10">
        <div
          className={`${user.isArtisan ? "grid grid-cols-1 gap-4 md:grid-cols-10 md:gap-6 lg:grid-cols-11" : "flex items-center justify-center [&>div]:max-w-[400px]"}`}
        >
          <Profile
            userId={user._id}
            memberSince={formatDate(user.createdAt).split("/").pop() ?? "--"}
            socials={art}
            name={fullName(user.firstName, user.lastName)}
            location={art ? `${art?.lga}, ${art?.state}` : undefined}
            img={fallbackImage(user.image)}
            profession={art?.areaOfSpecialization}
            phone={art?.phoneNumber}
            email={user.email}
            website={art?.website}
            artisan={art}
          />
          {user.isArtisan && (
            <About about={art?.description} userId={user._id} />
          )}
        </div>
      </section>
      {user.isArtisan && (
        <>
          <MyServices userId={user._id} />
          <Reviews page={searchParams.page ?? "1"} userId={user._id} />
        </>
      )}
    </>
  );
}
