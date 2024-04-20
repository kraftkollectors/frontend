import RelatedSearch from "./RelatedSearch";
import SearchResult from "./SearchResult";
import SearchOption from "./SearchOption";

export default function searchPage() {
  return (
    <div className="">
      <RelatedSearch />
      <div className="app-container py-2">
        <SearchResult />
        <SearchOption />
      </div>
    </div>
  );
}
