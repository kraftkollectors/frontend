import { AdminSearch, PageTitle } from "@/components/admin";
import GridRows from "./GridRows";
import Filters from "./components/Filters";
import Table from "./Table";

export default function Page() {
    return (
        <div className="py-8 flex flex-col gap-4 w-full">
            <PageTitle>Users</PageTitle>
               <GridRows />

            <div className="flex justify-between max-lg:flex-col gap-2">
               <AdminSearch action={() => console.log('hi')} />
               <Filters />
            </div>
            <Table />
        </div>
    );
}