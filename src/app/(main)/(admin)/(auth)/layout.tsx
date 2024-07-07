import { AppLogo } from "@/components";
import { staticMetadata } from "@/functions/metadata";
import { AppLayoutProps } from "@/utils/types/basicTypes";

export const metadata = staticMetadata({
    title: "KraftKollectors | Admin",
    description: "Welcome back to KraftKollectors Admin"
})

export default function Layout({ children }: AppLayoutProps) {
    return (
        <section>
            <header className="app-container flex items-center py-3 border-b">
                <AppLogo />
            </header>
            <div className="flex app-container py-8 md:py-16 justify-center">
                <div className="rounded-lg md:px-10 md:py-10 md:shadow-lg md:border max-w-[500px] w-full">
                    {children}
                </div>
            </div>
        </section>
    );
}