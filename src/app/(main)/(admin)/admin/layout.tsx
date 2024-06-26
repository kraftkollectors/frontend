import { AppLayoutProps } from "@/utils/types/basicTypes";
import Sidebar from "./Sidebar";

export default function Layout({ children }: AppLayoutProps) {
    return (
        <section className="flex">
            <aside className="w-[280px] min-w-[280px] flex-shrink-0 relative border-r">
                <Sidebar />
            </aside>
            <aside className="w-full bg-light-text min-h-screen">
                {children}
            </aside>
        </section>
    );
}