'use client'

import { IngredientInput } from '@/components/features/ingredients/IngredientInput'
import { SearchResults } from '@/components/features/search/SearchResults'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { PageBackground } from '@/components/layout/PageBackground'
import { PageContent } from '@/components/layout/PageContent'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageShell } from '@/components/layout/PageShell'
import { ScrollArea } from '@/components/layout/ScrollArea'

export default function SearchPage() {
	return (
		<PageBackground>
			<PageShell>
				<PageContent>
					<AppHeader className='mb-3' />
				</PageContent>
				<ScrollArea className='fc-page-pb-nav flex-1'>
					<main
						className='space-y-6'
						id='search_view'
					>
						<PageHeader
							title='Рецепты по вашим продуктам'
							backHref='/'
							backLabel='На главную'
						/>

						<IngredientInput compact />

						<SearchResults />
					</main>
				</ScrollArea>
				<BottomNav />
			</PageShell>
		</PageBackground>
	)
}
