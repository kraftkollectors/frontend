import { AppLayoutProps } from "@/utils/types/basicTypes";
import Sidebar from "./Sidebar";

export default function Layout({ children }: AppLayoutProps) {
    return (
        <section className="flex">
            <aside className="w-[280px] relative">
                <Sidebar />
            </aside>
            <aside className="w-[100%-280px] bg-light min-h-screen">
                {children}
            </aside>
        </section>
    );
}