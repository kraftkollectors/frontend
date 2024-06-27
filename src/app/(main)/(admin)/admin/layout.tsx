import { AppLayoutProps } from "@/utils/types/basicTypes";
import Sidebar from "./Sidebar";

export default function Layout({ children }: AppLayoutProps) {
    return (
        <section className="flex">
            <aside className="w-0 md:w-[280px] md:min-w-[280px] flex-shrink-0 relative border-r">
                <Sidebar />
            </aside>
            <aside className="w-full bg-light-text min-h-screen px-4 md:px-8">
                <div className="py-2" />
                {children}
            </aside>
        </section>
    );
}