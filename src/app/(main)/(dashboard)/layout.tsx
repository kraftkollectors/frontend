import { Navbar } from "@/components";
import { AppLayoutProps } from "@/utils/types/basicTypes";

export default function RootLayout({
  children,
}: AppLayoutProps) {
  return (
    <>
    <Navbar />
    {children}
    </>
  );
}
