import { AdminSearch, PageTitle } from "@/components/admin";
import AppInput from "@/components/ui/AppInput";
import GridRows from "./GridRows";
import Filters from "./components/Filters";
import Table from "./Table";

export default function Page() {
    return (
        <div className="py-8 flex flex-col gap-4">
            <PageTitle>Users</PageTitle>
               <GridRows />

            <div className="flex justify-between max-md:flex-col gap-2">
               <AdminSearch />
               <Filters />
            </div>
            <Table />
        </div>
    );
}