import RelatedSearch from "./RelatedSearch";
import SearchResult from "./SearchResult";
import SearchOption from "./SearchOption";
import { Pagination } from "@/components";
import PostList from "./PostList";

export default function searchPage() {
  return (
    <div className="">
      <RelatedSearch />
      <div className="app-container py-2">
        <SearchResult />
        <SearchOption />
      </div>
      <PostList />
      <div className=" flex items-center justify-center py-2">
        <Pagination />
      </div>
    </div>
  );
}
