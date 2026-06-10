'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface FindRecipesButtonProps {
	className?: string
}

const buttonClassName =
	'group fc-interactive fc-press flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#E95B3C] px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-orange-200/50 hover:bg-[#D14A2E] hover:shadow-orange-300/60 disabled:pointer-events-none disabled:opacity-40 md:text-base'

export function FindRecipesButton({ className }: FindRecipesButtonProps) {
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const hasIngredients = selectedIngredients.length > 0

	if (!hasIngredients) {
		return (
			<button
				type='button'
				disabled
				title='Сначала добавьте продукты'
				id='main_generate_trigger'
				className={cn(buttonClassName, className)}
			>
				<Search className='fc-group-hover-scale size-5 shrink-0 transition-transform duration-150 ease-[var(--ease-out)]' />
				Подобрать рецепты
			</button>
		)
	}

	return (
		<Link
			href='/search'
			prefetch
			id='main_generate_trigger'
			className={cn(buttonClassName, className)}
		>
			<Search className='fc-group-hover-scale size-5 shrink-0 transition-transform duration-150 ease-[var(--ease-out)]' />
			Подобрать рецепты
		</Link>
	)
}
