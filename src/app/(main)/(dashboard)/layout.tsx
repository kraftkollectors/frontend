import { fetchUser, logout } from "@/actions";
import { Navbar } from "@/components";
import AuthProvider from "@/components/server/AuthProvider";
import { AppLayoutProps } from "@/utils/types/basicTypes";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'
export const revalidate = 0;

export default async function RootLayout({
  children,
}: AppLayoutProps) {
  const user = await fetchUser();
  if(user === 'error') throw new Error("Unable to get profile info")
  if(!user) {
    await logout();
    redirect('/login');
  };
    
  return (
    <>
    <Navbar />
    <Suspense>
      <AuthProvider />
    </Suspense>
    {children}
    </>
  );
}
