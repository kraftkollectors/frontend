import { fetchUser, logout } from "@/actions";
import { Navbar } from "@/components";
import AuthProvider from "@/components/server/AuthProvider";
import { staticMetadata } from "@/functions/metadata";
import { paths } from "@/utils";
import { AppLayoutProps } from "@/utils/types/basicTypes";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | User Dashboard",
  description: "Manage your account and preferences"
})

export const dynamic = 'force-dynamic'
// export const revalidate = 0;

export default async function RootLayout({
  children,
}: AppLayoutProps) {
  const user = await fetchUser();
  if(!user) {
    await logout();
    redirect(paths.login);
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
