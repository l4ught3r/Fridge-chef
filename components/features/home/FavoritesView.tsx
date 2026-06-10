'use client'

import { Clock, Heart } from 'lucide-react'
import Link from 'next/link'
import { type CSSProperties, useEffect, useState } from 'react'
import { RecipeImage } from '@/components/features/recipe/RecipeImage'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { getFavoriteRecipes } from '@/lib/favorites'
import { recipeHref } from '@/lib/recipe-navigation'
import { useAppStore } from '@/lib/store'
import type { Recipe } from '@/types/recipe'

export function FavoritesView() {
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const [favorites, setFavorites] = useState<Recipe[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let cancelled = false

		const load = () => {
			setLoading(true)
			getFavoriteRecipes(selectedIngredients)
				.then(items => {
					if (!cancelled) setFavorites(items)
				})
				.finally(() => {
					if (!cancelled) setLoading(false)
				})
		}

		load()
		window.addEventListener('focus', load)
		window.addEventListener('fridge-chef-favorites-changed', load)
		return () => {
			cancelled = true
			window.removeEventListener('focus', load)
			window.removeEventListener('fridge-chef-favorites-changed', load)
		}
	}, [selectedIngredients])

	if (loading) {
		return (
			<div
				className='space-y-4'
				aria-busy='true'
			>
				{[1, 2, 3].map(n => (
					<div
						key={n}
						className='animate-pulse rounded-3xl border border-gray-100 bg-white p-4 shadow-sm'
					>
						<div className='h-32 rounded-2xl bg-gray-200' />
						<div className='mt-3 h-5 w-2/3 rounded-lg bg-gray-200' />
					</div>
				))}
			</div>
		)
	}

	if (favorites.length === 0) {
		return (
			<EmptyState
				icon={Heart}
				title='Избранное пусто'
				description='Добавляйте понравившиеся рецепты во время просмотра — они появятся здесь.'
			>
				<Button
					asChild
					className='mt-2'
				>
					<Link href='/search'>Найти рецепты</Link>
				</Button>
			</EmptyState>
		)
	}

	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
			{favorites.map((recipe, index) => (
				<Link
					key={recipe.id}
					href={recipeHref(recipe.id, 'favorites')}
					className='fc-stagger-in group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm fc-interactive hover:border-orange-200 hover:shadow-md'
					style={{ '--stagger': index } as CSSProperties}
				>
					<div className='relative h-32 w-full sm:h-36'>
						<RecipeImage
							src={recipe.image}
							alt={recipe.name}
							sizes='(max-width: 640px) 100vw, 50vw'
						/>
					</div>
					<div className='space-y-1 p-4 text-left'>
						<h2 className='fc-group-hover-brand line-clamp-2 text-sm font-extrabold text-[#1A1A1A] transition-colors duration-150 ease-[var(--ease-out)]'>
							{recipe.name}
						</h2>
						<span className='inline-flex items-center gap-1 font-mono text-[10px] text-gray-400'>
							<Clock className='size-3 text-[#E95B3C]' />
							{recipe.timeLabel}
						</span>
					</div>
				</Link>
			))}
		</div>
	)
}
