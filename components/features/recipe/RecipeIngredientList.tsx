import { BadgeAlert, MinusCircle, PlusCircle } from 'lucide-react'
import { formatIngredientAmount } from '@/lib/recipes/format-amount'
import { cn } from '@/lib/utils'
import { type Recipe, sortIngredientsByAvailability } from '@/types/recipe'

interface RecipeIngredientListProps {
	recipe: Recipe
	portions: number
	baseServings: number
	onPortionsChange: (portions: number) => void
	variant?: 'card' | 'detail'
}

export function RecipeIngredientList({
	recipe,
	portions,
	baseServings,
	onPortionsChange,
	variant = 'detail'
}: RecipeIngredientListProps) {
	const isDetail = variant === 'detail'
	const portionRatio = portions / (baseServings || 1)
	const sortedIngredients = sortIngredientsByAvailability(
		recipe.ingredients,
		recipe.availableIngredients
	)

	return (
		<div
			className={cn(
				'space-y-4',
				isDetail && 'rounded-3xl border border-gray-100 bg-white p-6 shadow-sm'
			)}
		>
			<div
				className={cn(
					'flex flex-col justify-between gap-3',
					isDetail && 'border-b border-gray-100 pb-3 sm:flex-row sm:items-center'
				)}
			>
				{isDetail ? (
					<h3 className='font-mono text-sm font-bold tracking-wider text-[#1A1A1A] uppercase'>
						🥗 Ингредиенты:
					</h3>
				) : (
					<div className='flex flex-wrap gap-2'>
						<span className='rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800'>
							Есть: {recipe.availableIngredients.length}
						</span>
						<span className='rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-800'>
							Докупить: {recipe.missingIngredients.length}
						</span>
					</div>
				)}

				<div className='flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1 sm:ml-auto'>
					<button
						type='button'
						onClick={() => onPortionsChange(Math.max(1, portions - 1))}
						className='cursor-pointer text-gray-400 transition-colors hover:text-black'
						aria-label='Уменьшить порции'
						title='Уменьшить порции'
					>
						<MinusCircle className='size-4 shrink-0' />
					</button>
					<span className='w-12 text-center font-mono text-xs font-extrabold text-[#E95B3C]'>
						{portions} порц.
					</span>
					<button
						type='button'
						onClick={() => onPortionsChange(Math.min(12, portions + 1))}
						className='cursor-pointer text-gray-400 transition-colors hover:text-black'
						aria-label='Увеличить порции'
						title='Увеличить порции'
					>
						<PlusCircle className='size-4 shrink-0' />
					</button>
				</div>
			</div>

			<ul
				className='space-y-3'
				id='recipe_ingredients_list_scaled'
			>
				{sortedIngredients.map(ingredient => {
					const provided = recipe.availableIngredients.includes(ingredient.name)
					const amountLabel = ingredient.amount
						? formatIngredientAmount(ingredient.amount, portionRatio)
						: null

					return (
						<li
							key={ingredient.name}
							className={cn(
								'flex items-start justify-between gap-3 text-xs',
								isDetail
									? 'border-b border-gray-100 py-1.5 last:border-b-0'
									: 'rounded-lg px-3 py-2',
								!isDetail &&
									(provided ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-50 text-gray-600')
							)}
						>
							<span
								className={cn(
									'inline-flex min-w-0 flex-1 items-center gap-1.5',
									provided ? 'font-bold text-[#166534]' : 'text-gray-400'
								)}
							>
								<span
									className={cn(
										'size-1.5 shrink-0 rounded-full',
										provided ? 'bg-[#166534]' : 'bg-gray-300'
									)}
								/>
								<span className='min-w-0'>
									{ingredient.name}
									{amountLabel && (
										<span className='font-mono font-bold text-gray-500'> · {amountLabel}</span>
									)}
								</span>
							</span>
							<div className='flex shrink-0 flex-col items-end gap-0.5'>
								{!provided && isDetail && (
									<span className='font-mono text-[9px] font-bold text-[#991B1B]'>
										🛒 Нужно докупить
									</span>
								)}
								{!provided && !isDetail && <span aria-hidden>○</span>}
								{provided && !isDetail && <span aria-hidden>✓</span>}
							</div>
						</li>
					)
				})}
			</ul>

			{isDetail && recipe.missingIngredients.length > 0 && (
				<div className='flex items-start gap-1.5 rounded-2xl border border-red-100 bg-red-50/60 p-3 font-sans text-[10px] leading-normal font-medium text-red-800'>
					<BadgeAlert className='mt-0.5 size-3.5 shrink-0 text-red-600' />
					Для рецепта вам пригодятся несколько продуктов, которых нет в вашем холодильнике.
				</div>
			)}
		</div>
	)
}
