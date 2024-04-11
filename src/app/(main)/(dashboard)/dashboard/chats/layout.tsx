import { AppLayoutProps } from '@/utils/types/basicTypes'
import type { Metadata } from 'next'
import MainLayout from './MainLayout'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Create Next App with TypeScript, Tailwind CSS, NextAuth, Prisma, tRPC, and more.',
}

export default function Layout({
	children,
}: AppLayoutProps) {
	return (
		<MainLayout>
			{children}
		</MainLayout>
	)
}
