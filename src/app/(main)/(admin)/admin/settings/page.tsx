import { PageTitle } from "@/components/admin";
import ChangePassword from "./ChangePassword";


export default function Page() {
    return (
        <section className="flex flex-col gap-6">
            <PageTitle>Settings</PageTitle>
            <ChangePassword />
        </section>
    );
}