import RelatedSearch from "./RelatedSearch";
import SearchResult from "./SearchResult";
import SearchOption from "./SearchOption";
import PostList from "./PostList";
import { fetchUsers } from "@/actions";
import { Pagination } from "@/components";
import { paths } from "@/utils";
import { Suspense } from "react";
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";
import { AppPageProps } from "@/utils/types/basicTypes";
import { SearchPageParams } from "@/utils/types/search";
import { buildUrlQuery } from "@/functions/helpers";
import MobileFilterButtons from "@/components/search/MobileButtons";
import ArtisanCard from "@/components/search/ArtisanCard";

export const metadata: Metadata = staticMetadata({
  title: "KraftKollectors | Explore services and artisans",
  description:
    "find the best services and artisans for your needs ranging from home needs to event planning and many more",
});

export default async function SearchPage({
  searchParams,
}: AppPageProps<null, SearchPageParams>) {
  const filters = buildUrlQuery({ ...searchParams });
  const artisans = await fetchUsers({
    throwsError: false,
    isPublic: true,
  });
  if (!artisans || artisans == "error") throw new Error("Connection error");

  return (
    <div className="max-md:bg-black-50">
      {/* <RelatedSearch /> */}
      <div className="app-container py-2 max-md:bg-black-50">
        <SearchResult count={artisans.totalDocuments} />
        <Suspense>
          <SearchOption />
        </Suspense>
        <MobileFilterButtons />
      </div>
      <section className="app-container py-6 md:py-10">
        <div className="services-grid">
          {artisans.existingRecords.map((artisan) => (
            <ArtisanCard key={artisan._id} {...artisan} />
          ))}
        </div>
      </section>
      <div className="flex items-center justify-center py-2">
        <Suspense>
          <Pagination pagination={artisans} />
        </Suspense>
      </div>
    </div>
  );
}
