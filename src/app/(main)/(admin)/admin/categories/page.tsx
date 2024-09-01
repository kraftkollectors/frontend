import { AdminSearch, PageTitle } from "@/components/admin";
import GridRows from "./GridRows";
import Table from "./Table";
import { paths } from "@/utils";
import Link from "next/link";
import { buildUrlQuery } from "@/functions/helpers";
import { AppPageProps } from "@/utils/types/basicTypes";

export default function Page({searchParams}:AppPageProps<any,{
    page?: string;
    q?: string;
}>) {
    const query = buildUrlQuery({page:searchParams?.page, q:searchParams?.q});

    return (
        <div className="py-8 flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between gap-6">
                <PageTitle>Categories</PageTitle>
                <Link href={paths.adminCategories + "?action=create"}
                    className="btn-dark-tiny flex-shrink-0 px-4 font-semibold py-2">Add Category +</Link>
            </div>
            <GridRows />
            <div className="flex justify-between max-lg:flex-col gap-2">
                <AdminSearch />
            </div>
            <Table query={query} />
        </div>
    );
}