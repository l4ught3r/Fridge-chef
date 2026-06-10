'use client'

import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { RouletteOverlay } from '@/components/features/home/RouletteOverlay'
import { ROULETTE_STAGES } from '@/lib/constants'
import { recipeHref } from '@/lib/recipe-navigation'
import { getRandomRecipes } from '@/lib/recipes'
import { useAppStore } from '@/lib/store'
import { toast } from '@/lib/toast'
import { cn } from '@/lib/utils'

interface RandomRecipeButtonProps {
	className?: string
}

export function RandomRecipeButton({ className }: RandomRecipeButtonProps) {
	const router = useRouter()
	const selectedIngredients = useAppStore(state => state.selectedIngredients)
	const [loading, setLoading] = useState(false)
	const [rouletteText, setRouletteText] = useState('')

	const hasIngredients = selectedIngredients.length > 0

	const handleRandom = async () => {
		if (!hasIngredients || loading) return
		setLoading(true)

		for (const stage of ROULETTE_STAGES) {
			setRouletteText(stage)
			await new Promise(resolve => setTimeout(resolve, 650))
		}

		try {
			const [recipe] = await getRandomRecipes(1, selectedIngredients)
			if (recipe) {
				router.push(recipeHref(recipe.id, 'home'))
				return
			}
			toast.error(
				'Не нашли рецепт по вашим продуктам. Добавьте ещё ингредиенты и попробуйте снова.'
			)
		} finally {
			setLoading(false)
			setRouletteText('')
		}
	}

	return (
		<>
			<button
				type='button'
				disabled={!hasIngredients || loading}
				onClick={handleRandom}
				id='roulette_trigger_btn'
				title={hasIngredients ? undefined : 'Сначала добавьте продукты'}
				className={cn(
					'fc-interactive fc-press flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 font-mono text-xs font-bold text-gray-700 shadow-sm hover:border-orange-200 hover:bg-orange-50/10 hover:text-[#E95B3C] disabled:pointer-events-none disabled:opacity-40 md:text-sm',
					className
				)}
			>
				<Sparkles className='size-4 text-[#E95B3C]' />
				{loading ? 'Выбираем…' : 'Не знаю что готовить'}
			</button>

			<RouletteOverlay
				active={loading}
				text={rouletteText}
			/>
		</>
	)
}
