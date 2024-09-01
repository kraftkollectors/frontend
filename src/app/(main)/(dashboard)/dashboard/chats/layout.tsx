import { AppLayoutProps } from '@/utils/types/basicTypes'
import type { Metadata } from 'next'
import MainLayout from './MainLayout'
import { staticMetadata } from "@/functions/metadata";
import { fetchChatHeads } from '@/actions';
import SideBar from './SideBar';

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | My Conversations",
  description: "conversations and messages"
})


export default async function Layout({
	children,
}: AppLayoutProps) {
	const chatHeads = await fetchChatHeads();
	if(!chatHeads || chatHeads == 'error') throw new Error("Connection error!")
	
	return (
		<MainLayout 
		sideBar={<SideBar chatHeads={chatHeads.existingRecords} />}
		// chatHeads={chatHeads}
		>
			{children}
		</MainLayout>
	)
}
