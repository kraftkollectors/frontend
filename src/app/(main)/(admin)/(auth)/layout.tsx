import { AppLogo } from "@/components";
import { AppLayoutProps } from "@/utils/types/basicTypes";

export default function Layout({ children }: AppLayoutProps) {
    return (
        <section>
            <header className="app-container flex items-center py-3 border-b">
                <AppLogo />
            </header>
            <div className="flex app-container py-8 md:py-16 justify-center">
                <div className="rounded-lg md:px-8 md:py-10 shadow-lg border max-w-[400px] w-full">
                    {children}
                </div>
            </div>
        </section>
    );
}