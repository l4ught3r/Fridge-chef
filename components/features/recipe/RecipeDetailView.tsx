'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, ChefHat, Clock, Flame, UtensilsCrossed } from 'lucide-react'
import { useState } from 'react'
import { CookingMode } from '@/components/features/recipe/CookingMode'
import { FavoriteButton } from '@/components/features/recipe/FavoriteButton'
import { RecipeImage } from '@/components/features/recipe/RecipeImage'
import { RecipeIngredientList } from '@/components/features/recipe/RecipeIngredientList'
import type { Recipe } from '@/types/recipe'

interface RecipeDetailViewProps {
	recipe: Recipe
}

export function RecipeDetailView({ recipe }: RecipeDetailViewProps) {
	const reduceMotion = useReducedMotion()
	const baseServings = recipe.servings || 2
	const [cookingOpen, setCookingOpen] = useState(false)
	const [portions, setPortions] = useState(baseServings)
	const [completedSteps, setCompletedSteps] = useState<boolean[]>(() =>
		new Array(recipe.steps.length).fill(false)
	)

	const toggleStep = (index: number) => {
		setCompletedSteps(prev => {
			const next = [...prev]
			next[index] = !next[index]
			return next
		})
	}

	const allCompleted = completedSteps.length > 0 && completedSteps.every(Boolean)

	return (
		<>
			<div className='space-y-6 text-left'>
				<div className='relative h-44 w-full overflow-hidden rounded-3xl sm:h-48 md:h-56'>
					<RecipeImage
						src={recipe.image}
						alt={recipe.name}
						priority
					/>
					<div className='absolute top-3 right-3 z-10'>
						<FavoriteButton
							recipeId={recipe.id}
							variant='detail'
							className='shadow-md backdrop-blur-sm'
						/>
					</div>
				</div>

				<div className='space-y-4'>
					<span className='inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-3 py-1 font-mono text-xs font-bold text-[#E95B3C] shadow-sm'>
						🍽️ Детальный рецепт шеф-повара
					</span>
					<h1 className='text-2xl leading-tight font-extrabold text-gray-900 md:text-3xl'>
						{recipe.name}
					</h1>
					<p className='max-w-3xl text-xs leading-relaxed font-semibold text-gray-500 md:text-sm'>
						{recipe.category} · совпадение {recipe.matchPercent}%
					</p>
				</div>

				<div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4'>
					<div className='flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-xs sm:p-4'>
						<Clock className='mb-1 size-5 text-[#E95B3C]' />
						<span className='font-mono text-[10px] font-bold tracking-wide text-gray-400 uppercase'>
							Время
						</span>
						<span className='mt-0.5 text-sm font-bold text-gray-700'>{recipe.timeLabel}</span>
					</div>
					<div className='flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-xs sm:p-4'>
						<ChefHat className='mb-1 size-5 text-amber-500' />
						<span className='font-mono text-[10px] font-bold tracking-wide text-gray-400 uppercase'>
							Сложность
						</span>
						<span className='mt-0.5 max-w-full truncate text-sm font-bold text-gray-700'>
							{recipe.difficulty}
						</span>
					</div>
					<div className='flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-xs sm:p-4'>
						<UtensilsCrossed className='mb-1 size-5 text-emerald-600' />
						<span className='font-mono text-[10px] font-bold tracking-wide text-gray-400 uppercase'>
							Порции
						</span>
						<span className='mt-0.5 text-sm font-bold text-gray-700'>{portions} порц.</span>
					</div>
					<div className='hidden flex-col items-center rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-xs sm:flex sm:p-4'>
						<Flame className='mb-1 size-5 text-orange-500' />
						<span className='font-mono text-[10px] font-bold tracking-wide text-gray-400 uppercase'>
							Категория
						</span>
						<span className='mt-0.5 text-sm font-bold text-gray-700'>{recipe.category}</span>
					</div>
				</div>

				<div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-12'>
					<div className='lg:col-span-5'>
						<RecipeIngredientList
							recipe={recipe}
							portions={portions}
							baseServings={baseServings}
							onPortionsChange={setPortions}
							variant='detail'
						/>
					</div>

					<div className='space-y-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-7'>
						<div className='border-b border-gray-100 pb-3'>
							<h3 className='font-mono text-sm font-bold tracking-wider text-[#1A1A1A] uppercase'>
								🍳 Пошаговый процесс приготовления:
							</h3>
						</div>

						<div
							className='space-y-4'
							id='instructions_step_scroller'
						>
							{recipe.steps.map((step, idx) => {
								const isCompleted = completedSteps[idx]
								return (
									<button
										key={step}
										type='button'
										aria-pressed={isCompleted}
										onClick={() => toggleStep(idx)}
										className={`fc-interactive fc-press flex w-full cursor-pointer items-start gap-4 rounded-2xl border p-3 text-left sm:p-4 ${
											isCompleted
												? 'border-gray-200 bg-gray-50/50 text-gray-400 opacity-60'
												: 'border-gray-100 bg-white text-gray-700 shadow-xs hover:border-gray-200'
										}`}
									>
										<div
											className={`flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors duration-150 ease-[var(--ease-out)] ${
												isCompleted
													? 'bg-[#E95B3C] text-white'
													: 'border border-gray-200 bg-gray-50 text-gray-500'
											}`}
										>
											{isCompleted ? <Check className='size-3.5 stroke-[3]' /> : idx + 1}
										</div>
										<p
											className={`flex-1 text-sm leading-relaxed font-medium md:text-base ${isCompleted ? 'line-through decoration-[#E95B3C]/30' : ''}`}
										>
											{step}
										</p>
									</button>
								)
							})}
						</div>

						{allCompleted && (
							<motion.div
								initial={reduceMotion ? false : { scale: 0.95, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
								className='space-y-2 rounded-2xl border border-[#bbf7d0] bg-[#DCFCE7]/70 p-4 text-center'
							>
								<ChefHat className='mx-auto size-6 animate-bounce text-[#166534]' />
								<p className='text-xs font-extrabold text-[#15803d]'>🎉 Приятного аппетита!</p>
							</motion.div>
						)}

						<button
							type='button'
							onClick={() => setCookingOpen(true)}
							className='fc-interactive fc-press flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#E95B3C] py-3.5 font-extrabold text-white shadow-lg shadow-orange-200/50 hover:bg-[#D14A2E] sm:py-4'
						>
							<ChefHat className='size-5' />
							Режим готовки
						</button>
					</div>
				</div>
			</div>

			<CookingMode
				recipe={recipe}
				isOpen={cookingOpen}
				onClose={() => setCookingOpen(false)}
			/>
		</>
	)
}
