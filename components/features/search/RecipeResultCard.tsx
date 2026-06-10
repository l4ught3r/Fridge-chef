'use client'

import { Clock, Flame } from 'lucide-react'
import Link from 'next/link'
import { FavoriteButton } from '@/components/features/recipe/FavoriteButton'
import { recipeHref } from '@/lib/recipe-navigation'
import { pluralize } from '@/lib/utils'
import { type Recipe, sortIngredientsByAvailability } from '@/types/recipe'

interface RecipeResultCardProps {
	recipe: Recipe
}

export function RecipeResultCard({ recipe }: RecipeResultCardProps) {
	const matched = recipe.availableIngredients.length
	const total = recipe.ingredients.length
	const sortedIngredients = sortIngredientsByAvailability(
		recipe.ingredients,
		recipe.availableIngredients
	)

	const missingCount = recipe.missingIngredients.length
	const missingLabel = pluralize(missingCount, 'продукт', 'продукта', 'продуктов')

	return (
		<div className='group relative'>
			<div className='absolute top-4 right-4 z-20'>
				<FavoriteButton
					recipeId={recipe.id}
					variant='card'
				/>
			</div>

			<Link
				href={recipeHref(recipe.id, 'search')}
				className='fc-interactive relative flex cursor-pointer flex-col justify-between gap-4 overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 text-left shadow-sm hover:border-orange-200 hover:bg-orange-50/5 hover:shadow-md sm:gap-6 sm:p-6 md:flex-row md:items-center'
			>
				<div className='fc-group-hover-brand-bg pointer-events-none absolute top-0 right-0 h-full w-32 translate-x-16 skew-x-12 bg-[#E95B3C]/3 transition-colors duration-150 ease-[var(--ease-out)]' />

				<div className='relative z-10 flex-1 space-y-3 pr-10'>
					<div className='flex flex-wrap items-center gap-2'>
						<span
							className={`rounded-full border px-2.5 py-1 font-mono text-[11px] font-bold ${
								recipe.matchPercent > 75
									? 'border-emerald-200 bg-emerald-50 text-emerald-700'
									: 'border-amber-200 bg-amber-50 text-amber-700'
							}`}
						>
							Совпадение: {recipe.matchPercent}% ({matched} из {total})
						</span>
						<span className='rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] font-bold text-gray-500'>
							Сложность: {recipe.difficulty}
						</span>
					</div>

					<h3 className='fc-group-hover-brand text-lg font-extrabold text-gray-900 transition-colors duration-150 ease-[var(--ease-out)] sm:text-xl'>
						{recipe.name}
					</h3>

					<div className='flex items-center gap-4 pt-1 font-mono text-xs font-bold text-gray-400'>
						<span className='flex items-center gap-1.5'>
							<Clock className='size-3.5 text-[#E95B3C]' />
							{recipe.timeLabel}
						</span>
						<span className='flex items-center gap-1.5'>
							<Flame className='size-3.5 text-amber-500' />
							{recipe.category}
						</span>
					</div>
				</div>

				<div className='relative z-10 flex max-h-24 shrink-0 flex-col justify-center space-y-1.5 border-gray-100 border-t pt-3 md:w-64 md:border-t-0 md:border-l md:pt-0 md:pl-4'>
					<p className='font-mono text-[9px] font-bold tracking-wider text-gray-400 uppercase'>
						Ингредиенты:
					</p>
					<div className='flex flex-wrap gap-1'>
						{sortedIngredients.slice(0, 4).map(ingredient => {
							const provided = recipe.availableIngredients.includes(ingredient.name)
							return (
								<span
									key={ingredient.name}
									className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
										provided
											? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
											: 'bg-gray-100 text-gray-400'
									}`}
								>
									{ingredient.name}
								</span>
							)
						})}
						{recipe.ingredients.length > 4 && (
							<span className='pl-1 font-mono text-[9px] font-bold text-gray-400'>
								+ещё {recipe.ingredients.length - 4}
							</span>
						)}
					</div>

					{missingCount > 0 ? (
						<span className='text-[10px] font-bold text-rose-600'>
							Не хватает: {missingCount} {missingLabel}
						</span>
					) : (
						<span className='flex items-center gap-1 text-[10px] font-bold text-emerald-600'>
							✓ Все в наличии!
						</span>
					)}
				</div>
			</Link>
		</div>
	)
}
