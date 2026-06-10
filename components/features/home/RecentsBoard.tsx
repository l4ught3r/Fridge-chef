'use client'

import { BookOpen, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { type CSSProperties, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { HOME_SHORTCUT_COUNT } from '@/lib/constants'
import { getRecentRecipes } from '@/lib/recent'
import { recipeHref } from '@/lib/recipe-navigation'
import { useAppStore } from '@/lib/store'
import type { Recipe } from '@/types/recipe'

export function RecentsBoard() {
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const [recents, setRecents] = useState<Recipe[]>([])

	useEffect(() => {
		let cancelled = false

		const load = () => {
			getRecentRecipes(selectedIngredients, HOME_SHORTCUT_COUNT).then(items => {
				if (!cancelled) setRecents(items)
			})
		}

		load()
		window.addEventListener('focus', load)
		return () => {
			cancelled = true
			window.removeEventListener('focus', load)
		}
	}, [selectedIngredients])

	return (
		<div className='min-h-40 space-y-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-[2.5rem] sm:p-6'>
			<h3 className='flex min-w-0 items-center gap-2 font-mono text-xs font-bold tracking-wider text-gray-800 uppercase'>
				<Calendar className='size-4 shrink-0 text-emerald-600' />
				<span className='truncate'>Недавние просмотры ({recents.length})</span>
			</h3>

			{recents.length > 0 ? (
				<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
					{recents.map((recipe, index) => (
						<Link
							key={recipe.id}
							href={recipeHref(recipe.id, 'home')}
							className='fc-stagger-in group cursor-pointer rounded-2xl border border-gray-100 bg-gray-50 p-3.5 text-left shadow-xs fc-interactive hover:border-orange-200 hover:bg-orange-50/10'
							style={{ '--stagger': index } as CSSProperties}
						>
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
					icon={BookOpen}
					title='Список недавно просмотренного пуст'
					description='Откройте рецепт — он появится здесь для быстрого доступа.'
					className='border-none bg-transparent p-8 shadow-none'
				>
					<Button
						asChild
						variant='outline'
						className='mt-2'
					>
						<Link href='/search'>Подобрать рецепты</Link>
					</Button>
				</EmptyState>
			)}
		</div>
	)
}
