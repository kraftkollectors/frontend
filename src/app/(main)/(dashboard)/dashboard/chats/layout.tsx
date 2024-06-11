import { AppLayoutProps } from '@/utils/types/basicTypes'
import type { Metadata } from 'next'
import MainLayout from './MainLayout'
import { staticMetadata } from "@/functions/metadata";

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | My Conversations",
  description: "conversations and messages"
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
