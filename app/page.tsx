'use client'

import { HomeView } from '@/components/features/home/HomeView'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { PageBackground } from '@/components/layout/PageBackground'
import { PageContent } from '@/components/layout/PageContent'
import { PageShell } from '@/components/layout/PageShell'
import { ScrollArea } from '@/components/layout/ScrollArea'

export default function Home() {
	return (
		<PageBackground>
			<PageShell>
				<PageContent>
					<AppHeader />
				</PageContent>
				<ScrollArea className='fc-page-pb-nav flex-1'>
					<main>
						<HomeView />
					</main>
				</ScrollArea>
				<BottomNav />
			</PageShell>
		</PageBackground>
	)
}
