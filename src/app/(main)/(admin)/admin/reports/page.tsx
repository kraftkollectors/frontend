import { AdminSearch, PageTitle } from "@/components/admin";
import GridRows from "./GridRows";
import Filters from "./components/Filters";
import Table from "./Table";
import { buildUrlQuery } from "@/functions/helpers";
import { AppPageProps } from "@/utils/types/basicTypes";

export default function Page({ searchParams }: AppPageProps<any, {
    page?: string;
    q?: string;
    sort?: string;
}>) {
    const query = buildUrlQuery(searchParams)

    return (
        <div className="py-8 flex flex-col gap-4 w-full">
            <PageTitle>Message <span className="text-black-300">/ Reports</span></PageTitle>
            <GridRows />

            <div className="flex justify-between max-lg:flex-col gap-2">
                <AdminSearch />
                <Filters />
            </div>
            <Table query={query} />
        </div>
    );
}