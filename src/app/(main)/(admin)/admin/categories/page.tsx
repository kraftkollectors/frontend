import { AdminSearch, PageTitle } from "@/components/admin";
import GridRows from "./GridRows";
import Table from "./Table";
import { redirect } from "next/navigation";
import { paths } from "@/utils";
import Link from "next/link";

export default function Page() {
    async function search(formData: FormData){
        'use server'
        redirect(`${paths.adminUsers}?search=${formData.get('search')}`)
    }
    
    return (
        <div className="py-8 flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between gap-6">
            <PageTitle>Categories</PageTitle>
            <Link href={paths.adminCategories + "?action=create"} 
            className="btn-dark-tiny flex-shrink-0 px-4 font-semibold py-2">Add Category +</Link>
            </div>
               <GridRows />

            <div className="flex justify-between max-lg:flex-col gap-2">
               <AdminSearch action={search} />
            </div>
            <Table />
        </div>
    );
}