'use client'

import { Clock, Heart, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { type CSSProperties, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { HOME_SHORTCUT_COUNT } from '@/lib/constants'
import { getFavoriteRecipes } from '@/lib/favorites'
import { recipeHref } from '@/lib/recipe-navigation'
import { useAppStore } from '@/lib/store'
import type { Recipe } from '@/types/recipe'

export function FavoritesBoard() {
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const [favorites, setFavorites] = useState<Recipe[]>([])

	useEffect(() => {
		let cancelled = false

		const load = () => {
			getFavoriteRecipes(selectedIngredients, HOME_SHORTCUT_COUNT).then(items => {
				if (!cancelled) setFavorites(items)
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

	return (
		<div className='min-h-40 space-y-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-[2.5rem] sm:p-6'>
			<div className='flex items-center justify-between gap-2'>
				<h3 className='flex min-w-0 items-center gap-2 font-mono text-xs font-bold tracking-wider text-gray-800 uppercase'>
					<Heart className='size-4 fill-[#E95B3C] text-[#E95B3C]' />
					<span className='truncate'>Избранная кулинарная книга ({favorites.length})</span>
				</h3>
				{favorites.length > 0 && (
					<Link
						href='/favorites'
						className='font-mono text-[10px] font-bold text-[#E95B3C] hover:underline'
					>
						Все →
					</Link>
				)}
			</div>

			{favorites.length > 0 ? (
				<div
					className='grid grid-cols-1 gap-3 sm:grid-cols-2'
					id='favorites_grid'
				>
					{favorites.map((recipe, index) => (
						<Link
							key={recipe.id}
							href={recipeHref(recipe.id, 'home')}
							className='fc-stagger-in group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-3.5 text-left shadow-xs fc-interactive hover:border-orange-200 hover:bg-orange-50/10'
							style={{ '--stagger': index } as CSSProperties}
						>
							<div className='pointer-events-none absolute top-0 right-0 size-16 rounded-full bg-[#E95B3C]/5 blur-xl' />
							<h4 className='fc-group-hover-brand mb-1 line-clamp-2 text-xs font-extrabold text-[#1A1A1A] transition-colors duration-150 ease-[var(--ease-out)]'>
								{recipe.name}
							</h4>
							<span className='inline-flex items-center gap-1 font-mono text-[10px] text-gray-400'>
								<Clock className='size-3 text-[#E95B3C]' />
								{recipe.timeLabel}
							</span>
						</Link>
					))}
				</div>
			) : (
				<EmptyState
					icon={HelpCircle}
					title='Ничего в избранном пока нет'
					description='Добавляйте понравившиеся рецепты в избранное во время просмотра деталей.'
					className='border-none bg-transparent p-8 shadow-none'
				>
					<Button
						asChild
						className='mt-2'
					>
						<Link href='/search'>Найти рецепты</Link>
					</Button>
				</EmptyState>
			)}
		</div>
	)
}
