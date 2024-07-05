import { AdminSearch, PageTitle } from "@/components/admin";
import GridRows from "./GridRows";
import Filters from "./components/Filters";
import Table from "./Table";
import { paths } from "@/utils";
import Link from "next/link";
import { AppPageProps } from "@/utils/types/basicTypes";
import { buildUrlQuery } from "@/functions/helpers";

export default function Page({searchParams}:AppPageProps<any,{
    page?: string;
    q?: string;
    sort?: string;
}>) {
    const query = buildUrlQuery(searchParams);
    
    return (
        <div className="py-8 flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between gap-6">
                <PageTitle>Advertisements</PageTitle>
                <Link href={paths.adminAdverts + "?action=create"}
                    className="btn-dark-tiny flex-shrink-0 px-4 font-semibold py-2">New Advert +</Link>
            </div>
               <GridRows />

            <div className="flex justify-between max-lg:flex-col gap-2">
               <AdminSearch />
               <Filters />
            </div>
            <Table query={query} />
        </div>
    );
}