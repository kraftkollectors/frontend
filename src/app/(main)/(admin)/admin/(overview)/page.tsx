import { PageTitle } from "@/components/admin";
import CardsGrid from "./CardsGrid";
import OtherGrids from "./OtherGrids";

export default function Page() {
    return (
        <section className="flex flex-col gap-6">
            <PageTitle>Overview</PageTitle>
            <CardsGrid />
            <OtherGrids />
        </section>
    );
}