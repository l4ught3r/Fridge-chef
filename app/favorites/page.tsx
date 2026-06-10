'use client'

import { FavoritesView } from '@/components/features/home/FavoritesView'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { PageBackground } from '@/components/layout/PageBackground'
import { PageContent } from '@/components/layout/PageContent'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageShell } from '@/components/layout/PageShell'
import { ScrollArea } from '@/components/layout/ScrollArea'

export default function FavoritesPage() {
	return (
		<PageBackground>
			<PageShell>
				<PageContent>
					<AppHeader className='mb-3' />
				</PageContent>
				<ScrollArea className='fc-page-pb-nav flex-1'>
					<main className='space-y-6'>
						<PageHeader
							title='Избранное'
							backHref='/'
							backLabel='На главную'
						/>
						<FavoritesView />
					</main>
				</ScrollArea>
				<BottomNav />
			</PageShell>
		</PageBackground>
	)
}
