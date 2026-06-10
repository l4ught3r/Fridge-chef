'use client'

import { AlertCircle, Sparkles, UtensilsCrossed } from 'lucide-react'
import Link from 'next/link'
import { type CSSProperties, useEffect, useMemo, useState } from 'react'
import { RecipeResultCard } from '@/components/features/search/RecipeResultCard'
import { SearchToolbar } from '@/components/features/search/SearchToolbar'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { suggestIngredientAlternatives } from '@/lib/ingredient-hints'
import { buildCategoryCounts } from '@/lib/recipe-categories'
import { sortRecipes } from '@/lib/recipe-sort'
import { searchRecipesByIngredients } from '@/lib/recipes'
import { useAppStore } from '@/lib/store'

function SearchSkeleton() {
	return (
		<div
			className='space-y-4'
			id='skeleton_loading'
			aria-busy='true'
		>
			{[1, 2, 3].map(n => (
				<div
					key={n}
					className='animate-pulse space-y-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm'
				>
					<div className='h-6 w-1/3 rounded-lg bg-gray-200' />
					<div className='h-4 w-2/3 rounded-lg bg-gray-200' />
					<div className='grid grid-cols-3 gap-4'>
						<div className='h-8 rounded-xl bg-gray-200' />
						<div className='h-8 rounded-xl bg-gray-200' />
						<div className='h-8 rounded-xl bg-gray-200' />
					</div>
				</div>
			))}
		</div>
	)
}

export function SearchResults() {
	const pantryHydrated = useAppStore(state => state.pantryHydrated)
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const searchSort = useAppStore(state => state.searchSort)
	const searchCategory = useAppStore(state => state.searchCategory)
	const setSearchCategory = useAppStore(state => state.setSearchCategory)
	const addIngredient = useAppStore(state => state.addIngredient)
	const [rawRecipes, setRawRecipes] = useState<
		Awaited<ReturnType<typeof searchRecipesByIngredients>>
	>([])
	const [loading, setLoading] = useState(false)
	const [hints, setHints] = useState<string[]>([])

	const categoryCounts = useMemo(() => buildCategoryCounts(rawRecipes), [rawRecipes])

	const recipes = useMemo(() => {
		const sorted = sortRecipes(rawRecipes, searchSort)
		if (!searchCategory) return sorted
		return sorted.filter(recipe => recipe.category === searchCategory)
	}, [rawRecipes, searchSort, searchCategory])

	useEffect(() => {
		if (!searchCategory) return
		if ((categoryCounts[searchCategory] ?? 0) === 0) {
			setSearchCategory(null)
		}
	}, [searchCategory, categoryCounts, setSearchCategory])

	useEffect(() => {
		if (!pantryHydrated) return

		if (selectedIngredients.length === 0) {
			setRawRecipes([])
			setHints([])
			setLoading(false)
			return
		}

		let cancelled = false
		setLoading(true)

		searchRecipesByIngredients(selectedIngredients)
			.then(found => {
				if (!cancelled) setRawRecipes(found)
			})
			.finally(() => {
				if (!cancelled) setLoading(false)
			})

		return () => {
			cancelled = true
		}
	}, [pantryHydrated, selectedIngredients])

	useEffect(() => {
		if (loading || rawRecipes.length > 0 || selectedIngredients.length === 0) {
			setHints([])
			return
		}

		suggestIngredientAlternatives(selectedIngredients).then(setHints)
	}, [loading, rawRecipes.length, selectedIngredients])

	const hasIngredients = selectedIngredients.length > 0
	const isCategoryEmpty = rawRecipes.length > 0 && recipes.length === 0 && searchCategory !== null

	if (!pantryHydrated) {
		return <SearchSkeleton />
	}

	if (!hasIngredients) {
		return (
			<EmptyState
				icon={UtensilsCrossed}
				title='Холодильник пуст'
				description='Добавьте продукты выше — здесь появятся подобранные рецепты.'
			>
				<Button
					asChild
					className='mt-2'
				>
					<Link href='/'>На главную</Link>
				</Button>
			</EmptyState>
		)
	}

	return (
		<>
			<SearchToolbar categoryCounts={categoryCounts} />

			{loading && rawRecipes.length === 0 ? (
				<SearchSkeleton />
			) : isCategoryEmpty ? (
				<EmptyState
					icon={AlertCircle}
					title={`В категории «${searchCategory}» ничего не найдено`}
					description='Попробуйте другую категорию или посмотрите все подобранные рецепты.'
				>
					<Button
						type='button'
						onClick={() => setSearchCategory(null)}
						className='mt-2'
					>
						Показать все
					</Button>
				</EmptyState>
			) : recipes.length === 0 ? (
				<EmptyState
					icon={AlertCircle}
					title='Рецептов не найдено'
					description='Попробуйте добавить более универсальные продукты (картофель, сыр, лук, мясо или яйца).'
				>
					{hints.length > 0 && (
						<div className='mt-4'>
							<p className='mb-2 flex items-center justify-center gap-1 text-xs text-gray-500'>
								<Sparkles className='size-3.5' />
								Попробуйте:
							</p>
							<div className='flex flex-wrap justify-center gap-1.5'>
								{hints.map(hint => (
									<button
										key={hint}
										type='button'
										onClick={() => addIngredient(hint)}
										className='cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-bold text-gray-700 hover:border-orange-200 hover:text-[#E95B3C]'
									>
										{hint}
									</button>
								))}
							</div>
						</div>
					)}
				</EmptyState>
			) : (
				<div
					className='space-y-4'
					id='recipes_results_list'
				>
					{recipes.map((recipe, index) => (
						<div
							key={recipe.id}
							className='fc-stagger-in'
							style={{ '--stagger': index } as CSSProperties}
						>
							<RecipeResultCard recipe={recipe} />
						</div>
					))}
				</div>
			)}
		</>
	)
}
