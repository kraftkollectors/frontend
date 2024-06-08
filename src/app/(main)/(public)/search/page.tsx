import RelatedSearch from "./RelatedSearch";
import SearchResult from "./SearchResult";
import SearchOption from "./SearchOption";
import PostList from "./PostList";
import { fetchServices } from "@/actions";
import { cookies } from "next/headers";

export default async function searchPage() {
  cookies().get('__user_id')
  const ads = await fetchServices();
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
        {/* <Pagination /> */}
      </div>
    </div>
  );
}
