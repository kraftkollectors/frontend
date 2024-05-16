import { fetchUser } from "@/actions";
import { Navbar } from "@/components";
import { debugLog } from "@/functions/helpers";
import { AppLayoutProps } from "@/utils/types/basicTypes";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'
export const revalidate = 0;

export default async function RootLayout({
  children,
}: AppLayoutProps) {
  const user = await fetchUser();
  if(user === 'error') throw new Error("Unable to get profile info")
  if(!user) redirect('/login');
  debugLog('rendered template')
    
  return (
    <>
    <Navbar />
    {children}
    </>
  );
}
