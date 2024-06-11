import RelatedSearch from "./RelatedSearch";
import SearchResult from "./SearchResult";
import SearchOption from "./SearchOption";
import PostList from "./PostList";
import { fetchServices } from "@/actions";
import { Pagination } from "@/components";
import { paths } from "@/utils";
import { Suspense } from "react";

export default async function searchPage() {
  const ads = await fetchServices({isPublic: true});
  if(!ads || ads == 'error') throw new Error("Connection error")
  
  return (
    <div className="">
      <RelatedSearch />
      <div className="app-container py-2">
        <SearchResult />
        <SearchOption />
      </div>
      <PostList services={ads.existingRecords} />
      <div className=" flex items-center justify-center py-2">
        <Suspense><Pagination baseUrl={paths.search()} pagination={ads} /></Suspense>
      </div>
    </div>
  );
}
