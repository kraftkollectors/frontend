
import { fetchSingleArtisanService } from "@/actions";
import Main from "./Main";
import Profile from "./Profile";
import SimilarPosts from "./SimilarPosts";
import { AppPageProps } from "@/utils/types/basicTypes";
import { notFound } from "next/navigation";
import { debugLog } from "@/functions/helpers";
import { Suspense } from "react";

export default async function Page({params}:AppPageProps) {
  const service = await fetchSingleArtisanService(params.slug);
  if(!service) notFound();

  if(service == 'error') throw new Error("Connection Error")
  const {category, subCategory, title} = service;
  debugLog(service);
  
  return (
    <>
    <section className="md:app-container md:pt-5 pb-10 bg-gray-100">
      <div className="pb-6 flex gap-2 max-md:hidden text-label text-black-400 font-semibold">
        <span>home</span> &gt;
        <span>{category}</span> &gt;
        <span>{subCategory}</span> &gt;
        <span>{title}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 md:gap-6">
        <Main s={service} />
       <div className="max-md:hidden md:col-span-4 md:sticky top-6 h-fit">
        <Suspense fallback={
          <div className="skeleton h-96 w-full flex items-center p-10 flex-col gap-4">
            <div className="avatar skeleton size-28"></div>
            <div className="skeleton h-5 w-28"></div>
            <div className="skeleton h-4 w-40"></div>
          </div>
        }>
        <Profile userId={service.userId} />
        </Suspense>
       </div>
      </div>
    </section>
    <SimilarPosts />
    </>
  );
}
