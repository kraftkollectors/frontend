import RelatedSearch from "../RelatedSearch";
import SearchResult from "../SearchResult";
import SearchOption from "../SearchOption";
import PostList from "../PostList";
import { fetchServices } from "@/actions";
import { Pagination } from "@/components";
import { paths } from "@/utils";
import { AppPageProps } from "@/utils/types/basicTypes";
import { buildUrlQuery, sanitizeSearch } from "@/functions/helpers";

import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";
import { SearchPageParams } from "@/utils/types/search";
import MobileFilterButtons from "@/components/search/MobileButtons";

export async function generateMetadata({
  params,
  searchParams,
}: AppPageProps<
  { query: string | string[] },
  SearchPageParams
>): Promise<Metadata | null> {
  let q =
    typeof params?.query == "string"
      ? params?.query
      : (params?.query ?? []).toString();
  q = sanitizeSearch(q ?? "");
  const filters = buildUrlQuery({ ...searchParams, q });
  const ads = await fetchServices({ params: filters });
  if (!ads || ads == "error") return null;

  return staticMetadata({
    title: `KraftKollectors | Search results for: ${q}`,
    description: `showing ${ads.totalDocuments} search results for ${q}`,
  });
}
export default async function searchPage({
  params,
  searchParams,
}: AppPageProps<{ query: string | string[] }, SearchPageParams>) {
  let q =
    typeof params?.query == "string"
      ? params?.query
      : (params?.query ?? []).join(" ");
  q = sanitizeSearch(q ?? "");
  const filters = buildUrlQuery({ ...searchParams, q });
  const ads = await fetchServices({ params: filters });
  if (!ads || ads == "error") throw new Error("Connection error");

  return (
    <div className="max-md:bg-black-50">
      {/* <RelatedSearch /> */}
      <div className="app-container py-2">
        <SearchResult count={ads.totalDocuments} />
        <SearchOption />
        <MobileFilterButtons />
      </div>
      <PostList services={ads.existingRecords} />
      <div className="flex items-center justify-center py-2">
        <Pagination pagination={ads} />
      </div>
    </div>
  );
}
