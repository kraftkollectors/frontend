import { fetchSingleArtisanService } from "@/actions";
import Main from "./Main";
import Profile from "./Profile";
import SimilarPosts from "./SimilarPosts";
import { AppPageProps } from "@/utils/types/basicTypes";
import { notFound } from "next/navigation";
import { debugLog } from "@/functions/helpers";
import { Suspense } from "react";
import UserProfileSkeleton from "@/components/skeletons/UserProfileSkeleton";
import { FaChevronRight } from "react-icons/fa6";

import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";
import UpdateServiceViews from "@/components/server/UpdateServiceViews";

export async function generateMetadata({
  params,
}: AppPageProps<{ slug: string }>): Promise<Metadata | null> {
  const service = await fetchSingleArtisanService(params?.slug ?? "", {
    isPublic: true,
  });
  if (!service || service == "error") return null;

  return staticMetadata({
    title: `KraftKollectors | Service: ${service.title}`,
    description: `Location: ${service.address}, ${service.state}. Description: ${service.description}`,
    img: service.coverPhoto,
  });
}

export default async function Page({ params, searchParams }: AppPageProps) {
  const service = await fetchSingleArtisanService(params.slug, {
    isPublic: true,
  });
  if (!service) notFound();

  if (service == "error") throw new Error("Connection Error");
  const { category, subCategory, title } = service;

  return (
    <>
      <UpdateServiceViews serviceId={service._id} />
      <section className="md:app-container bg-gray-100 pb-10 md:pt-5">
        <div className="flex flex-wrap items-center gap-2 pb-6 text-label font-semibold text-black-400 max-md:hidden">
          <span>home</span> <FaChevronRight />
          <span>{category}</span> <FaChevronRight />
          <span>{subCategory}</span> <FaChevronRight />
          <span>{title}</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-11 md:gap-6">
          <Main s={service} reviewsPage={searchParams.page} />
          <div className="top-6 h-fit max-md:hidden md:sticky md:col-span-4">
            <Suspense fallback={<UserProfileSkeleton />}>
              <Profile userId={service.userId} />
            </Suspense>
          </div>
        </div>
      </section>
      <SimilarPosts items={service.similarAds} />
    </>
  );
}
