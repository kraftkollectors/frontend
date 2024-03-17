import { AppLayoutProps } from "@/utils/types/basicTypes";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({ children }: AppLayoutProps) {
  return (
    <main>
      <header className="app-container flex items-center py-6 border-b-4">
        <nav />
      </header>
      <section className="py-10">
        <div className="app-container">
          <div className="md:rounded-md md:shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px] max-w-[900px] mx-auto">
            <div className="relative max-md:hidden h-full w-full">
              <Image
                src="/images/auth-bg.png"
                alt="KraftKllectors"
                fill
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-full h-fit md:p-8">
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
