'use client'

import { Sparkle } from 'lucide-react'
import { QUICK_SUGGESTION_CATEGORIES } from '@/lib/constants'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface CategorizedIngredientSuggestionsProps {
	compact?: boolean
}

export function CategorizedIngredientSuggestions({
	compact = false
}: CategorizedIngredientSuggestionsProps) {
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const toggleIngredient = useAppStore(state => state.toggleIngredient)
	const addIngredient = useAppStore(state => state.addIngredient)

	if (compact) {
		return (
			<div className='flex flex-wrap gap-1.5'>
				{QUICK_SUGGESTION_CATEGORIES.flatMap(cat => cat.items).map(item => {
					const isSelected = selectedIngredients.includes(item)
					return (
						<button
							key={item}
							type='button'
							aria-pressed={isSelected}
							onClick={() => (isSelected ? toggleIngredient(item) : addIngredient(item))}
							className={cn(
								'fc-interactive fc-press rounded-full border px-2.5 py-1 text-[11px] font-bold',
								isSelected
									? 'border-[#E95B3C] bg-[#E95B3C] text-white shadow-sm'
									: 'border-gray-200 bg-white text-gray-600 shadow-xs hover:border-orange-100 hover:bg-orange-50/5 hover:text-[#E95B3C]'
							)}
						>
							{item}
						</button>
					)
				})}
			</div>
		)
	}

	return (
		<div className='space-y-4 border-t border-gray-100 pt-4'>
			<div className='flex items-center gap-2'>
				<Sparkle className='size-4 text-[#E95B3C]' />
				<h4 className='font-mono text-xs font-bold tracking-wider text-[#1A1A1A] uppercase'>
					Быстрый подбор популярных ингредиентов
				</h4>
			</div>

			<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
				{QUICK_SUGGESTION_CATEGORIES.map(cat => (
					<div
						key={cat.category}
						className='space-y-2.5 rounded-2xl border border-gray-100 bg-gray-50/60 p-4 shadow-xs'
					>
						<span className='block font-mono text-xs font-extrabold tracking-tight text-[#1A1A1A]/90'>
							{cat.category}
						</span>
						<div className='flex flex-wrap gap-1.5'>
							{cat.items.map(item => {
								const isSelected = selectedIngredients.includes(item)
								return (
									<button
										key={item}
										type='button'
										aria-pressed={isSelected}
										onClick={() => toggleIngredient(item)}
										className={cn(
											'fc-interactive fc-press cursor-pointer rounded-full border px-3 py-1.5 text-[11px] font-bold',
											isSelected
												? 'border-[#E95B3C] bg-[#E95B3C] text-white shadow-sm'
												: 'border-gray-200 bg-white text-gray-600 shadow-xs hover:border-orange-100 hover:bg-orange-50/5 hover:text-[#E95B3C]'
										)}
									>
										{item}
										{isSelected ? (
											<span className='ml-1 text-[10px] font-black text-white'>✓</span>
										) : (
											<span className='ml-1 text-[10px] font-bold text-gray-400'>+</span>
										)}
									</button>
								)
							})}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
