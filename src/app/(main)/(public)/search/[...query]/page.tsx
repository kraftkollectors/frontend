import RelatedSearch from "../RelatedSearch";
import SearchResult from "../SearchResult";
import SearchOption from "../SearchOption";
import PostList from "../PostList";
import { fetchServices } from "@/actions";
import { Pagination } from "@/components";
import { paths } from "@/utils";
import { AppPageProps } from "@/utils/types/basicTypes";
import { sanitizeSearch } from "@/functions/helpers";

import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";

export async function generateMetadata({ params }: AppPageProps<{ query: string }>):Promise<Metadata|null>{
    let q = typeof params?.query == 'string' ? params?.query : (params?.query ?? []).join(' ')
    q = sanitizeSearch(q ?? '');
    const ads = await fetchServices();
    if (!ads || ads == 'error') return null;

  return staticMetadata({
    title: `KraftKollectors | Search results for: ${q}`,
    description: `showing ${ads.totalDocuments} search results for ${q}`
  })
}
export default async function searchPage({ params }: AppPageProps<{ query: string | string[] }>) {
    let q = typeof params?.query == 'string' ? params?.query : params?.query.join(' ')
    q = sanitizeSearch(q ?? '');
    const ads = await fetchServices();
    if (!ads || ads == 'error') throw new Error("Connection error")

    return (
        <div className="">
            <RelatedSearch />
            <div className="app-container py-2">
                <SearchResult />
                <SearchOption />
            </div>
            <PostList services={ads.existingRecords} />
            <div className=" flex items-center justify-center py-2">
                <Pagination baseUrl={paths.search()} pagination={ads} />
            </div>
        </div>
    );
}
