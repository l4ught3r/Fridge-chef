'use client'

import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RecipeDetailView } from '@/components/features/recipe/RecipeDetailView'
import { AppHeader } from '@/components/layout/AppHeader'
import { PageBackground } from '@/components/layout/PageBackground'
import { PageBackLink } from '@/components/layout/PageBackLink'
import { PageContent } from '@/components/layout/PageContent'
import { PageShell } from '@/components/layout/PageShell'
import { ScrollArea } from '@/components/layout/ScrollArea'
import { addRecentRecipe } from '@/lib/recent'
import { getRecipeBack, parseRecipeFrom } from '@/lib/recipe-navigation'
import { getRecipeById } from '@/lib/recipes'
import { useAppStore } from '@/lib/store'
import type { Recipe } from '@/types/recipe'

export default function RecipePage() {
	const params = useParams<{ id: string }>()
	const router = useRouter()
	const searchParams = useSearchParams()
	const from = parseRecipeFrom(searchParams.get('from'))
	const back = getRecipeBack(from)
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const [recipe, setRecipe] = useState<Recipe | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const id = params.id
		if (!id) {
			setLoading(false)
			return
		}

		setLoading(true)
		getRecipeById(id, selectedIngredients)
			.then(found => {
				setRecipe(found)
				if (found) addRecentRecipe(found.id)
			})
			.finally(() => setLoading(false))
	}, [params.id, selectedIngredients])

	const handleBack = () => {
		if (from === 'home') {
			router.push('/')
			return
		}
		if (from === 'favorites') {
			router.push('/favorites')
			return
		}
		if (window.history.length > 1) {
			router.back()
			return
		}
		router.push(back.href)
	}

	return (
		<PageBackground>
			<PageShell>
				<PageContent>
					<AppHeader className='mb-3' />
				</PageContent>
				<ScrollArea className='fc-page-pb-safe flex-1'>
					<main>
						<div className='mb-4 border-b border-gray-200 pb-3'>
							<PageBackLink
								href={back.href}
								label={back.label}
								onClick={e => {
									e.preventDefault()
									handleBack()
								}}
							/>
						</div>

						{loading && (
							<div
								className='space-y-4'
								id='skeleton_loading'
								aria-busy='true'
							>
								{[1, 2].map(n => (
									<div
										key={n}
										className='animate-pulse space-y-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm'
									>
										<div className='h-6 w-1/3 rounded-lg bg-gray-200' />
										<div className='h-4 w-2/3 rounded-lg bg-gray-200' />
									</div>
								))}
							</div>
						)}

						{!loading && !recipe && (
							<div className='rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center'>
								<p className='text-sm font-bold text-gray-700'>Рецепт не найден.</p>
								<Link
									href={back.href}
									className='mt-4 inline-block cursor-pointer rounded-xl bg-[#E95B3C] px-4 py-2 text-xs font-bold text-white hover:bg-[#D14A2E]'
								>
									{back.label}
								</Link>
							</div>
						)}

						{!loading && recipe && <RecipeDetailView recipe={recipe} />}
					</main>
				</ScrollArea>
			</PageShell>
		</PageBackground>
	)
}
