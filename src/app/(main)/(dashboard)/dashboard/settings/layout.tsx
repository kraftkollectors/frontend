import { AppLayoutProps } from '@/utils/types/basicTypes'
import MainLayout from './MainLayout'
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | Settings",
  description: "settings and preferences"
})


export default function Layout({
	children,
}: AppLayoutProps) {
	return (
		<MainLayout>
			{children}
		</MainLayout>
	)
}
