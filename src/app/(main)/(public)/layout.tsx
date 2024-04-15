import { Navbar } from "@/components";
import { AppLayoutProps } from "@/utils/types/basicTypes";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({ children }: AppLayoutProps) {
  return (
    <Theme>
      <Navbar />
      {children}
    </Theme>
  );
}
