import { AppLayoutProps } from "@/utils/types/basicTypes";
import Sidebar from "./Sidebar";
import { adminDashboard } from "@/actions/admin";
import { debugLog } from "@/functions/helpers";
import { redirect, RedirectType } from "next/navigation";
import { paths } from "@/utils";
import { staticMetadata } from "@/functions/metadata";

export const metadata = staticMetadata({
    title: "KraftKollectors | Admin",
    description: "Welcome back to KraftKollectors Admin"
})

export const dynamic = 'force-dynamic';

export default async function Layout({ children }: AppLayoutProps) {
    const admin = await adminDashboard();
    if(!admin || admin === 'error') redirect(paths.adminLogin, RedirectType.replace);
    
    return (
        <section className="flex">
            <aside className="w-0 md:w-[280px] md:min-w-[280px] flex-shrink-0 relative border-r">
                <Sidebar admin={admin} />
            </aside>
            <aside className="w-full md:w-[calc(100%-280px)] md:max-w-[calc(100%-280px)] bg-light-text min-h-screen px-4 md:px-8">
                <div className="py-2" />
                {children}
                <div className="py-2" />
            </aside>
        </section>
    );
}