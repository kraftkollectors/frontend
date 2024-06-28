import { AdminSearch, PageTitle } from "@/components/admin";
import GridRows from "./GridRows";
import Filters from "./components/Filters";
import Table from "./Table";
import { redirect } from "next/navigation";
import { paths } from "@/utils";

export default function Page() {
    async function search(formData: FormData){
        'use server'
        redirect(`${paths.adminUsers}?search=${formData.get('search')}`)
    }
    
    return (
        <div className="py-8 flex flex-col gap-4 w-full">
            <PageTitle>Message <span className="text-black-300">/Contact Us</span></PageTitle>
               <GridRows />

            <div className="flex justify-between max-lg:flex-col gap-2">
               <AdminSearch action={search} />
               <Filters />
            </div>
            <Table />
        </div>
    );
}